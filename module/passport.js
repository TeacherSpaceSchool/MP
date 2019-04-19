const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtsecret = '@615141ViDiK141516@';
const UserMissPolin = require('../models/userMissPolin');
const jwt = require('jsonwebtoken');
const Mailchimp = require('../module/mailchimp');
const geoip = require('geoip-lite');
const PreitemUserMissPolin = require('../models/preitemUserMissPolin');
const OrderMissPolin = require('../models/orderMissPolin');
const CartMissPolin = require('../models/cartMissPolin');
const FavoriteMissPolin = require('../models/favoriteMissPolin');
const ItemMissPolin = require('../models/itemMissPolin');
const PreitemMissPolin = require('../models/preitemMissPolin');
const AdressMissPolin = require('../models/adressMissPolin');

let start = () => {
//настройка паспорта
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        function (email, password, done) {

            UserMissPolin.findOne({email}, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user || !user.checkPassword(password) || user.status!='active') {
                    return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
                }
                return done(null, user);
            });
        }
        )
    );
    const jwtOptions = {};
    jwtOptions.jwtFromRequest= ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey=jwtsecret;
    passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
            UserMissPolin.findOne({email:payload.email}, (err, user) => {
                if (err) {
                    return done(err)
                }
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })
        })
    );
}

const verifydeuser = async (req, res, func) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user) {
                await func()
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const signinuser = (req, res) => {
    passport.authenticate('local', async function (err, user) {
        try{
            if (user == false) {
                res.status(401);
                res.end('Login failed',401)
            } else {
                const payload = {
                    id: user._id,
                    email: user.email,
                    role: user.role
                };
                const token = await jwt.sign(payload, jwtsecret); //здесь создается JWT
                res.status(200);
                res.end(token);
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('email not be unique')
        }
    })(req, res);
}

const verifydrole = async (req, res, func) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                await func(user.role)
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const verifydadmin = async (req, res, func) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active'&&(user.role==='admin'||user.role==='manager')) {
                await func()
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const signupuser = async (req, res) => {
    try{
        let geo = geoip.lookup(req.ip);
        if(geo===null)geo={country: '*', city: '*'}
        let _user = new UserMissPolin({
            address: '',
            data: geo.country+' \n'+geo.city,
            activeTime: '',
            ref: req.query.ref,
            email: req.query.email,
            role: 'client',
            status: 'active',
            name: '',
            phonenumber: '',
            lvl: '1',
            password: req.query.password,
        });
        const user = await UserMissPolin.create(_user);
        const payload = {
            id: user._id,
            email: user.email,
            status: user.status,
            role: user.role
        };
        Mailchimp.send(user.email)
        const token = jwt.sign(payload, jwtsecret); //здесь создается JWT*/
        res.status(200);
        res.end(token)
    } catch (err) {
        console.error(err)
        res.status(401);
        res.end('email not be unique')
    }
}

const setProfile = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active'&&user.role==='client') {
                let data = JSON.parse(req.body.data);
                await UserMissPolin.findOneAndUpdate({_id: user._id}, {$set: {
                    email: data.email,
                    name: data.name,
                    phonenumber: data.phonenumber
                }});
                res.status(200);
                res.end(JSON.stringify(await UserMissPolin.findOne({_id: user._id})));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const getProfile = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                res.status(200);
                res.end(JSON.stringify(await UserMissPolin.findOne({_id: user._id})));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const checkFavorite = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                let data = JSON.parse(req.body.data);
                res.status(200);
                res.end(JSON.stringify(await FavoriteMissPolin.findOne({item: data.item, user: user._id})));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const checkPreitemUser = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                let data = JSON.parse(req.body.data);
                res.status(200);
                res.end(JSON.stringify(await PreitemUserMissPolin.findOne({preitem: data.preitem, user: user._id})));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const addPreitemUser = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                let geo = geoip.lookup(req.ip);
                if(geo===null)geo={country: '*', city: '*'}
                let data = JSON.parse(req.body.data);
                res.status(200);
                let _object = new PreitemUserMissPolin({
                    preitem: data.preitem,
                    user: user._id,
                    data: geo.country+' \n'+geo.city
                });
                await PreitemUserMissPolin.create(_object);
                res.end('ok');
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const addFavoriteUser = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                let geo = geoip.lookup(req.ip);
                if(geo===null)geo={country: '*', city: '*'}
                let data = JSON.parse(req.body.data);
                res.status(200);
                console.log(data.item, user._id)
                let _object = new FavoriteMissPolin({
                    item: data.item,
                    user: user._id,
                    data: geo.country+' \n'+geo.city
                });
                await FavoriteMissPolin.create(_object);
                res.end('ok');
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const addCart = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                let geo = geoip.lookup(req.ip);
                if(geo===null)geo={country: '*', city: '*'}
                let data = JSON.parse(req.body.data);
                res.status(200);
                let _object = new CartMissPolin({
                    item: data.item,
                    user: user._id,
                    data: geo.country+' \n'+geo.city,
                    priceone: data.priceone,
                    pricefull: data.pricefull,
                    color: data.color,
                    count: data.count
                });
                await CartMissPolin.create(_object);
                res.end('ok');
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const delCart = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                let data = JSON.parse(req.body.data);
                await CartMissPolin.deleteMany({_id: data.id, user: user._id})
                res.status(200);
                res.end('ok');
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const delFavorite = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                let data = JSON.parse(req.body.data);
                await FavoriteMissPolin.deleteMany({item: data.item, user: user._id})
                res.status(200);
                res.end('ok');
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const delPreitemUser = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                let data = JSON.parse(req.body.data);
                await PreitemUserMissPolin.deleteMany({preitem: data.preitem, user: user._id})
                res.status(200);
                res.end('ok');
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const getFavorite = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                let x = await FavoriteMissPolin.find({user: user._id})
                let z = []
                for(let i=0; i<x.length; i++){
                    z[i]=await ItemMissPolin.findOne({_id: x[i].item})
                }
                res.status(200);
                res.end(JSON.stringify(z));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const getPreitemUser = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                let x = await PreitemUserMissPolin.find({user: user._id})
                let z = []
                for(let i=0; i<x.length; i++){
                    z[i]=await PreitemMissPolin.findOne({_id: x[i].preitem})
                }
                res.status(200);
                res.end(JSON.stringify(z));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const getBasket = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                res.status(200);
                res.end(JSON.stringify(await OrderMissPolin.find({status: 'корзина',user: user._id})));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const checkCart = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                res.status(200);
                let x = await CartMissPolin.find({user: user._id})
                let z = []
                for(let i=0; i<x.length; i++){
                    z[i] = {item: await ItemMissPolin.findOne({_id: x[i].item}), data: x[i]}
                }
                res.status(200);
                res.end(JSON.stringify(z));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const checkAddress = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                let x = await AdressMissPolin.findOne({user: user._id})
                if (x==null)
                    x = { email: '', user: '', name: '', phone: '', city: '', street: '', room: '', index: ''}
                res.status(200);
                res.end(JSON.stringify(x));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const setAddress = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                let data = JSON.parse(req.body.data);
                let x = await AdressMissPolin.findOne({user: user._id})
                if (x == null) {
                    data.user = user._id
                    let _object = new AdressMissPolin(data);
                    await AdressMissPolin.create(_object);
                } else {
                    await AdressMissPolin.findOneAndUpdate({user: user._id}, data)
                }
                res.status(200);
                res.end(JSON.stringify('ok'));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const generateOrder = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                let geo = geoip.lookup(req.ip);
                if(geo===null)geo={country: '*', city: '*'}
                let data = JSON.parse(req.body.data);
                data.user = user._id
                data.status = 'принят'
                data.data = geo.country+' \n'+geo.city
                let _object = new OrderMissPolin(data);
                await OrderMissPolin.create(_object);
                await CartMissPolin.deleteMany({user: user._id});
                res.status(200);
                res.end(JSON.stringify('ok'));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const getOrders = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                res.status(200);
                res.end(JSON.stringify(await OrderMissPolin.find({user: user._id})));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const getOrder = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                let data = JSON.parse(req.body.data);
                res.status(200);
                res.end(JSON.stringify(await OrderMissPolin.findOne({user: user._id, _id: data.id})));
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const cancelOrder = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                let data = JSON.parse(req.body.data);
                await OrderMissPolin.findOneAndUpdate({user: user._id, _id: data.id}, {status: 'отмена'})
                res.status(200);
                res.end('ok');
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const getLvl = async (req, res) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user&&user.status==='active') {
                res.status(200);
                res.end(user.lvl);
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}


module.exports.start = start;
module.exports.verifydeuser = verifydeuser;
module.exports.signinuser = signinuser;
module.exports.verifydrole = verifydrole;
module.exports.verifydadmin = verifydadmin;
module.exports.signupuser = signupuser;
module.exports.setProfile = setProfile;
module.exports.getProfile = getProfile;
module.exports.getPreitemUser = getPreitemUser;
module.exports.getBasket = getBasket;
module.exports.getOrders = getOrders;
module.exports.checkPreitemUser = checkPreitemUser;
module.exports.addPreitemUser = addPreitemUser;
module.exports.delPreitemUser = delPreitemUser;
module.exports.addFavoriteUser = addFavoriteUser;
module.exports.checkFavorite = checkFavorite;
module.exports.delFavorite = delFavorite;
module.exports.getFavorite = getFavorite;
module.exports.addCart = addCart;
module.exports.checkCart = checkCart;
module.exports.delCart = delCart;
module.exports.checkAddress = checkAddress;
module.exports.setAddress = setAddress;
module.exports.generateOrder = generateOrder;
module.exports.getOrder = getOrder;
module.exports.cancelOrder = cancelOrder;
module.exports.getLvl = getLvl;
