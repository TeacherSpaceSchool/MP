const express = require('express');
const router = express.Router();
const ReferMissPolin = require('../models/referMissPolin');
const ReferipMissPolin = require('../models/referipMissPolin');
const CatalogMissPolin = require('../models/catalogMissPolin');
const StaticMissPolin = require('../models/staticMissPolin');
const Mailchimp = require('../module/mailchimp');
const path = require('path');
let  dirname1 = __dirname.replace('\\routes', '')
dirname1 = dirname1.replace('/routes', '')
var geoip = require('geoip-lite');
const MailingMissPolin = require('../models/mailingMissPolin');
const nodemailer = require('nodemailer');

/* GET users listing. */
router.get('/', async (req, res, next) => {
    console.log('landing')
    if(req.param('refer')!==undefined&&req.param('refer')!==''){
        if(await ReferMissPolin.count({refer: req.param('refer')})===0){
            let _object = new ReferMissPolin({
                refer: req.param('refer'),
                count: 1,
                type: 'landing'
            });
            await ReferMissPolin.create(_object);
        } else {
            let ip = JSON.stringify(req.ip)
            if(ReferipMissPolin.count({ip: req.param(ip)})===0){
                let _object = new ReferipMissPolin({
                    refer: req.param('refer'),
                    ip: ip,
                });
                await ReferipMissPolin.create(_object);
                _object = await ReferMissPolin.findOne({refer: req.param('refer')});
                _object.count+=1
                await ReferMissPolin.findOneAndUpdate({refer: req.param('refer')}, {$set: _object});
            }
        }
    }
    res.sendFile(path.join(dirname1, 'aclient', 'land.html'));
});

router.post('/', async (req, res, next) => {
    let ip = req.ip
    if(req.body.Refer===undefined)
        req.body.Refer='-'
    let geo = geoip.lookup(ip);
    let mailingMissPolin = await MailingMissPolin.findOne();
    let staticMissPolin = await StaticMissPolin.findOne();
    if (mailingMissPolin !== null) {
        console.log(mailingMissPolin.mailuser, mailingMissPolin.mailpass)
        let mailOptions = {
            from: mailingMissPolin.mailuser,
            to: req.body.Email,
            subject: 'Каталог MissPolin',
            text: 'Здравствуйте!\n' +
            'Благодарим за проявленный интерес к нашей компании!\n' +
            'Ниже представляем Вам каталог наших товаров для более детального ознакомления.\n' +
            'C уважением, компания Miss Polin',
            attachments: [{path: staticMissPolin.catalog, filename: 'Каталог MissPolin.pdf',}],
        };
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: mailingMissPolin.mailuser,
                pass: mailingMissPolin.mailpass
            }
        });
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
       // Mailchimp.send(req.body.Email)
    }
    if(geo===null)geo={country: '*', city: '*'}
    let _object = new CatalogMissPolin({
        email: req.body.Email,
        name: req.body.Name,
        phone: req.body.Phone,
        data: geo.country+' \n'+geo.city,
        refer: req.body.Refer
    });
    await CatalogMissPolin.create(_object);
    res.sendFile(path.join(dirname1, 'aclient', 'land.html'));
});

module.exports = router;
