const AdsMissPolin = require('../models/adsMissPolin');
const format = require('date-format') ;
const mongoose = require('mongoose');

const getBillboard = async () => {
    return await AdsMissPolin.find({type: 'билборд'});
}

const getBanner = async () => {
    return await AdsMissPolin.findRandom({type: 'банер'}).limit(1);
};

const getAdsMissPolin = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'изображение',
        'название',
        'url',
        'тип',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='название'&&sort[1]=='descending')
        sort = '-name';
    else if(sort[0]=='название'&&sort[1]=='ascending')
        sort = 'name';
    else if(sort[0]=='url'&&sort[1]=='descending')
        sort = '-url';
    else if(sort[0]=='url'&&sort[1]=='ascending')
        sort = 'url';
    else if(sort[0]=='тип'&&sort[1]=='descending')
        sort = '-type';
    else if(sort[0]=='тип'&&sort[1]=='ascending')
        sort = 'type';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await AdsMissPolin.count();
        findResult = await AdsMissPolin
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('image name url type updatedAt _id');
    } else if (mongoose.Types.ObjectId.isValid(search)) {
        count = await AdsMissPolin.count({
            $or: [
                {_id: search},
                {image: {'$regex': search, '$options': 'i'}},
                {name: {'$regex': search, '$options': 'i'}},
                {url: {'$regex': search, '$options': 'i'}},
                {type: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await AdsMissPolin.find({
            $or: [
                {_id: search},
                {image: {'$regex': search, '$options': 'i'}},
                {name: {'$regex': search, '$options': 'i'}},
                {url: {'$regex': search, '$options': 'i'}},
                {type: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
    } else {
        count = await AdsMissPolin.count({
            $or: [
                {image: {'$regex': search, '$options': 'i'}},
                {name: {'$regex': search, '$options': 'i'}},
                {url: {'$regex': search, '$options': 'i'}},
                {type: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await AdsMissPolin.find({
            $or: [
                {image: {'$regex': search, '$options': 'i'}},
                {name: {'$regex': search, '$options': 'i'}},
                {url: {'$regex': search, '$options': 'i'}},
                {type: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
    }
    for (let i=0; i<findResult.length; i++){
        data.push([findResult[i].image, findResult[i].name, findResult[i].url, findResult[i].type, format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addAdsMissPolin = async (object) => {
        let _object = new AdsMissPolin(object);
        await AdsMissPolin.create(_object);

}

const setAdsMissPolin = async (object, id) => {
    try{
        await AdsMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteAdsMissPolin = async (id) => {
        await AdsMissPolin.deleteMany({_id: {$in: id}});
}

module.exports.deleteAdsMissPolin = deleteAdsMissPolin;
module.exports.getAdsMissPolin = getAdsMissPolin;
module.exports.setAdsMissPolin = setAdsMissPolin;
module.exports.addAdsMissPolin = addAdsMissPolin;
module.exports.getBillboard = getBillboard;
module.exports.getBanner = getBanner;