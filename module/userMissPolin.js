const UserMissPolin = require('../models/userMissPolin');
const MailingMissPolin = require('../models/mailingMissPolin');
const mailchimp = require('../module/mailchimp');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const format = require('date-format') ;
const mongoose = require('mongoose');

const getUserMissPolin = async (search, sort, skip) => {
    
        //await UserMissPolin.deleteMany()
        let findResult = [], data = [], count;
        const row = [
            'имя',
            'email',
            'телефон',
            'роль',
            'статус',
            'дополнительно',
            'рефер',
            'уровень',
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
        } else if (mongoose.Types.ObjectId.isValid(search)) {

            count = await UserMissPolin.count({
                $and: [
                    {
                        $or: [
                            {_id: search},
                            {name: {'$regex': search, '$options': 'i'}},
                            {email: {'$regex': search, '$options': 'i'}},
                            {phonenumber: {'$regex': search, '$options': 'i'}},
                            {status: {'$regex': search, '$options': 'i'}},
                            {data: {'$regex': search, '$options': 'i'}},
                        ]
                    }, {
                        role: {$ne: 'admin'}
                    }]
            });
            findResult = await UserMissPolin.find({
                $and: [
                    {
                        $or: [
                            {_id: search},
                            {name: {'$regex': search, '$options': 'i'}},
                            {email: {'$regex': search, '$options': 'i'}},
                            {phonenumber: {'$regex': search, '$options': 'i'}},
                            {status: {'$regex': search, '$options': 'i'}},
                            {data: {'$regex': search, '$options': 'i'}},
                        ]}, {
                        role:
                            {$ne: 'admin'}
                    }]
            })
                .sort(sort)
                .skip(parseInt(skip))
                .limit(10);
        } else {
            count = await UserMissPolin.count({
                $and: [
                    {
                        $or: [
                            {name: {'$regex': search, '$options': 'i'}},
                            {email: {'$regex': search, '$options': 'i'}},
                            {phonenumber: {'$regex': search, '$options': 'i'}},
                            {status: {'$regex': search, '$options': 'i'}},
                            {data: {'$regex': search, '$options': 'i'}},
                        ]
                    }, {
                        role: {$ne: 'admin'}
                    }]
            });
            findResult = await UserMissPolin.find({
                $and: [
                    {
                        $or: [
                            {name: {'$regex': search, '$options': 'i'}},
                            {email: {'$regex': search, '$options': 'i'}},
                            {phonenumber: {'$regex': search, '$options': 'i'}},
                            {status: {'$regex': search, '$options': 'i'}},
                            {data: {'$regex': search, '$options': 'i'}},
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
            let name = ''
            if (findResult[i].name!==undefined)
                name = findResult[i].name
            let email = ''
            if (findResult[i].email!==undefined)
                email = findResult[i].email
            let phonenumber = ''
            if (findResult[i].phonenumber!==undefined)
                phonenumber = findResult[i].phonenumber
            let role = ''
            if (findResult[i].role!==undefined)
                role = findResult[i].role
            let status = ''
            if (findResult[i].status!==undefined)
                status = findResult[i].status
            let data1 = ''
            if (findResult[i].data!==undefined)
                data1 = findResult[i].data
            let ref = ''
            if (findResult[i].ref!==undefined)
                ref = findResult[i].ref
            let lvl = '0'
            if (findResult[i].lvl!==undefined)
                lvl = findResult[i].lvl

            data.push([
                name,
                email,
                phonenumber,
                role,
                status,
                data1,
                ref,
                lvl,
                format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt),
                findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    
}

const addUserMissPolin = async (object) => {
    
        let _object = new UserMissPolin(object);
        await UserMissPolin.create(_object);
        await mailchimp.send(object.email, object.name, object.surname, object._id)
    
}

const setUserMissPolin = async (object, id) => {
    
            await UserMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    
}

let recoveryPass = async (email) => {
    if(await UserMissPolin.count({email: email})>0){
        let newPassword = randomstring.generate(8);
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
                    return 'error'
                } else {
                    console.log('Email sent: ' + info.response);
                    return 'ok'
                }
            });
        }
    } else return 'error'
}

const deleteUserMissPolin = async (id) => {
    
        await UserMissPolin.deleteMany({_id: {$in: id}});
    
}

module.exports.recoveryPass = recoveryPass;
module.exports.deleteUserMissPolin = deleteUserMissPolin;
module.exports.getUserMissPolin = getUserMissPolin;
module.exports.setUserMissPolin = setUserMissPolin;
module.exports.addUserMissPolin = addUserMissPolin;
module.exports.recoveryPass = recoveryPass;
