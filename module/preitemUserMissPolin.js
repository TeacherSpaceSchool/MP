const PreitemUserMissPolin = require('../models/preitemUserMissPolin');
const UserMissPolin = require('../models/userMissPolin');
const PreitemMissPolin = require('../models/preitemMissPolin');
const format = require('date-format') ;

const getPreitemUserMissPolin = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'товар',
        'клиент',
        'информация',
        'статус',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='товар'&&sort[1]=='descending')
        sort = '-preitem';
    else if(sort[0]=='товар'&&sort[1]=='ascending')
        sort = 'preitem';
    else if(sort[0]=='клиент'&&sort[1]=='descending')
        sort = '-user';
    else if(sort[0]=='клиент'&&sort[1]=='ascending')
        sort = 'user';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await PreitemUserMissPolin.count();
        findResult = await PreitemUserMissPolin
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    } else {
        count = await PreitemUserMissPolin.count({
            $or: [
                {preitem: {'$regex': search, '$options': 'i'}},
                {user: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await PreitemUserMissPolin.find({
            $or: [
                {preitem: {'$regex': search, '$options': 'i'}},
                {user: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    }
    for (let i=0; i<findResult.length; i++){
        let item = ''
        if(findResult[i].preitem!=undefined) {
            item = await PreitemMissPolin.findOne({_id: findResult[i].preitem})
            if(item!=null)
                item = item.art
            else
                item = ''
        }
        let user = ''
        if(findResult[i].user!=undefined) {
            user = await UserMissPolin.findOne({_id: findResult[i].user})
            if(user!=null)
                user = user.name+' '+user.email
            else
                user = ''
        }
        let status = ''
        if(findResult[i].status!=undefined) {
            if(status!=undefined)
                status = findResult[i].status
        }
        data.push([
            item,
            user,
            findResult[i].data,
            status,
            format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt),
            findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addPreitemUserMissPolin = async (object) => {
    
        let _object = new PreitemUserMissPolin(object);
        await PreitemUserMissPolin.create(_object);
    
}

const setPreitemUserMissPolin = async (object, id) => {
    
        await PreitemUserMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    
}

const deletePreitemUserMissPolin = async (id) => {
    
        await PreitemUserMissPolin.deleteMany({_id: {$in: id}});
    
}

module.exports.deletePreitemUserMissPolin = deletePreitemUserMissPolin;
module.exports.getPreitemUserMissPolin = getPreitemUserMissPolin;
module.exports.setPreitemUserMissPolin = setPreitemUserMissPolin;
module.exports.addPreitemUserMissPolin = addPreitemUserMissPolin;
