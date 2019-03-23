const UserMissPolin = require('../models/userMissPolin');
const format = require('./const').stringifyDateTime
const mailchimp = require('../module/mailchimp');

const getUserMissPolin = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'имя',
            'email',
            'телефон',
            'адрес',
            'роль',
            'статус',
            'дополнительно',
            'активность',
            'рефер',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        else if(sort[0]=='имя'&&sort[1]=='descending')
            sort = '-name';
        else if(sort[0]=='имя'&&sort[1]=='ascending')
            sort = 'name';
        else if(sort[0]=='email'&&sort[1]=='descending')
            sort = '-email';
        else if(sort[0]=='email'&&sort[1]=='ascending')
            sort = 'email';
        else if(sort[0]=='телефон'&&sort[1]=='descending')
            sort = '-phonenumber';
        else if(sort[0]=='телефон'&&sort[1]=='ascending')
            sort = 'phonenumber';
        else if(sort[0]=='адрес'&&sort[1]=='descending')
            sort = '-address';
        else if(sort[0]=='адрес'&&sort[1]=='ascending')
            sort = 'address';
        else if(sort[0]=='роль'&&sort[1]=='descending')
            sort = '-role';
        else if(sort[0]=='роль'&&sort[1]=='ascending')
            sort = 'role';
        else if(sort[0]=='статус'&&sort[1]=='descending')
            sort = '-status';
        else if(sort[0]=='статус'&&sort[1]=='ascending')
            sort = 'status';
        else if(sort[0]=='дополнительно'&&sort[1]=='descending')
            sort = '-data';
        else if(sort[0]=='дополнительно'&&sort[1]=='ascending')
            sort = 'data';
        else if(sort[0]=='активность'&&sort[1]=='descending')
            sort = '-activeTime';
        else if(sort[0]=='активность'&&sort[1]=='ascending')
            sort = 'activeTime';
        else if(sort[0]=='создан'&&sort[1]=='descending')
            sort = '-updatedAt';
        else if(sort[0]=='создан'&&sort[1]=='ascending')
            sort = 'updatedAt';
        if(search == ''){
            count = await UserMissPolin.count();
            findResult = await UserMissPolin
                .find({role: {$ne: 'admin'}})
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10);
        } else {
            count = await UserMissPolin.count({
                $and: [
                    {
                        $or: [
                            {_id: {'$regex': search, '$options': 'i'}},
                            {name: {'$regex': search, '$options': 'i'}},
                            {email: {'$regex': search, '$options': 'i'}},
                            {phonenumber: {'$regex': search, '$options': 'i'}},
                            {role: {'$regex': search, '$options': 'i'}},
                            {status: {'$regex': search, '$options': 'i'}},
                            {address: {'$regex': search, '$options': 'i'}},
                            {data: {'$regex': search, '$options': 'i'}},
                            {activeTime: {'$regex': search, '$options': 'i'}},
        ]}, {
                        role:
                            {$ne: 'admin'}
                    }]
            });
            findResult = await UserMissPolin.find({
                $and: [
                    {
                        $or: [
                            {_id: {'$regex': search, '$options': 'i'}},
                            {name: {'$regex': search, '$options': 'i'}},
                            {email: {'$regex': search, '$options': 'i'}},
                            {phonenumber: {'$regex': search, '$options': 'i'}},
                            {role: {'$regex': search, '$options': 'i'}},
                            {status: {'$regex': search, '$options': 'i'}},
                            {address: {'$regex': search, '$options': 'i'}},
                            {data: {'$regex': search, '$options': 'i'}},
                            {activeTime: {'$regex': search, '$options': 'i'}},
                        ]}, {
                        role:
                            {$ne: 'admin'}
                    }]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10);
        }
        for (let i=0; i<findResult.length; i++){
            data.push([
                findResult[i].name,
                findResult[i].email,
                findResult[i].phonenumber,
                findResult[i].address,
                findResult[i].role,
                findResult[i].status,
                findResult[i].data,
                findResult[i].activeTime,
                format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addUserMissPolin = async (object) => {
    try{
        let _object = new UserMissPolin(object);
        await UserMissPolin.create(_object);
        await mailchimp.send(object.email, object.name, object.surname, object._id)
    } catch(error) {
        console.error(error)
    }
}

const setUserMissPolin = async (object, id) => {
    try{
        if(object.password!==undefined&&object.password.length>0) {
            let user = await UserMissPolin.findById({_id: id});
            user.email = object.email;
            user.name = object.name;
            user.surname = object.surname;
            user.phonenumber = object.phonenumber;
            user.role = object.role;
            user.status = object.status;
            user.password = object.password;
            await user.save();
        } else {
            await UserMissPolin.findOneAndUpdate({_id: id}, {$set: object});
        }
    } catch(error) {
        console.error(error)
    }
}
/*
let recoveryPass = async (email) => {
    if(await UserMissPolin.count({email: email})>0){
        let newPassword = randomstring.generate(7);
        let user = await UserMissPolin.findOne({email: email});
        user.password = newPassword;
        await user.save();
        let mailingMissPolin = await MailingMissPolin.findOne();
        let mailOptions = {
            from: mailingMissPolin.mailuser,
            to: email,
            subject: 'Восстановление пароля',
            text: 'Ваш новый пароль: '+newPassword
        };
        if(mailingMissPolin!==null){
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: mailingMissPolin.mailuser,
                    pass: mailingMissPolin.mailpass
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false
                }
            });
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    }
}*/

const deleteUserMissPolin = async (id) => {
    try{
        await UserMissPolin.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

//module.exports.recoveryPass = recoveryPass;
module.exports.deleteUserMissPolin = deleteUserMissPolin;
module.exports.getUserMissPolin = getUserMissPolin;
module.exports.setUserMissPolin = setUserMissPolin;
module.exports.addUserMissPolin = addUserMissPolin;