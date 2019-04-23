const ContactsMissPolin = require('../models/contactsMissPolin');
const format = require('date-format') ;

const getContactsMissPolin = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'контакт',
        'тип',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='контакт'&&sort[1]=='descending')
        sort = '-data';
    else if(sort[0]=='контакт'&&sort[1]=='ascending')
        sort = 'data';
    else if(sort[0]=='тип'&&sort[1]=='descending')
        sort = '-type';
    else if(sort[0]=='тип'&&sort[1]=='ascending')
        sort = 'type';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await ContactsMissPolin.count();
        findResult = await ContactsMissPolin
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('data type updatedAt _id');
    } else {
        count = await ContactsMissPolin.count({
            $or: [
                {data: {'$regex': search, '$options': 'i'}},
                {type: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await ContactsMissPolin.find({
            $or: [
                {data: {'$regex': search, '$options': 'i'}},
                {type: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('data type updatedAt _id');
    }
    for (let i=0; i<findResult.length; i++){
        data.push([findResult[i].data, findResult[i].type, format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addContactsMissPolin = async (object) => {
    
        let _object = new ContactsMissPolin(object);
        await ContactsMissPolin.create(_object);
    
}

const setContactsMissPolin = async (object, id) => {
    
        await ContactsMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    
}

const deleteContactsMissPolin = async (id) => {
    
        await ContactsMissPolin.deleteMany({_id: {$in: id}});
    
}

module.exports.deleteContactsMissPolin = deleteContactsMissPolin;
module.exports.getContactsMissPolin = getContactsMissPolin;
module.exports.setContactsMissPolin = setContactsMissPolin;
module.exports.addContactsMissPolin = addContactsMissPolin;