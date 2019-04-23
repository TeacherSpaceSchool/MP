const PreitemMissPolin = require('../models/preitemMissPolin');
const format = require('date-format') ;
const mongoose = require('mongoose');

const getClient = async () => {
    return await PreitemMissPolin.find();
}

const getItem = async (art) => {
    return await PreitemMissPolin
        .findOne({art: art})

}

const getPreitemMissPolin = async (search, sort, skip) => {
    //await PreitemMissPolin.deleteMany()
    let findResult = [], data = [], count;
    const row = [
        'изображение',
        'артикул',
        'линейка',
        'материал',
        'цена',
        'статус',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='материал'&&sort[1]=='descending')
        sort = '-material';
    else if(sort[0]=='материал'&&sort[1]=='ascending')
        sort = 'material';
    else if(sort[0]=='артикул'&&sort[1]=='descending')
        sort = '-art';
    else if(sort[0]=='артикул'&&sort[1]=='ascending')
        sort = 'art';
    else if(sort[0]=='линейка'&&sort[1]=='descending')
        sort = '-line';
    else if(sort[0]=='линейка'&&sort[1]=='ascending')
        sort = 'line';
    else if(sort[0]=='статус'&&sort[1]=='descending')
        sort = '-status';
    else if(sort[0]=='статус'&&sort[1]=='ascending')
        sort = 'status';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await PreitemMissPolin.count();
        findResult = await PreitemMissPolin
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    } else if (mongoose.Types.ObjectId.isValid(search)) {
        count = await PreitemMissPolin.count({
            $or: [
                {_id: search},
                {image: {'$regex': search, '$options': 'i'}},
                {art: {'$regex': search, '$options': 'i'}},
                {line: {'$regex': search, '$options': 'i'}},
                {material: {'$regex': search, '$options': 'i'}},
                {prices: {'$regex': search, '$options': 'i'}},
                {status: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await PreitemMissPolin.find({
            $or: [
                {_id: search},
                {image: {'$regex': search, '$options': 'i'}},
                {art: {'$regex': search, '$options': 'i'}},
                {line: {'$regex': search, '$options': 'i'}},
                {material: {'$regex': search, '$options': 'i'}},
                {prices: {'$regex': search, '$options': 'i'}},
                {status: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('descriptionRu descriptionKg updatedAt _id');
    } else {
        count = await PreitemMissPolin.count({
            $or: [
                {image: {'$regex': search, '$options': 'i'}},
                {art: {'$regex': search, '$options': 'i'}},
                {line: {'$regex': search, '$options': 'i'}},
                {material: {'$regex': search, '$options': 'i'}},
                {prices: {'$regex': search, '$options': 'i'}},
                {status: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await PreitemMissPolin.find({
            $or: [
                {image: {'$regex': search, '$options': 'i'}},
                {art: {'$regex': search, '$options': 'i'}},
                {line: {'$regex': search, '$options': 'i'}},
                {material: {'$regex': search, '$options': 'i'}},
                {prices: {'$regex': search, '$options': 'i'}},
                {status: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    }
    for (let i=0; i<findResult.length; i++){
        let image = ''
        if (findResult[i].image!=undefined)
            image = findResult[i].image
        let art = ''
        if (findResult[i].art!=undefined)
            art = findResult[i].art
        let line = ''
        if (findResult[i].line!=undefined)
            line = findResult[i].line
        let material = ''
        if (findResult[i].material!=undefined)
            material = findResult[i].material
        let prices = ''
        if (findResult[i].prices!=undefined)
            prices = findResult[i].prices
        let status = ''
        if (findResult[i].status!=undefined)
            status = findResult[i].status
        data.push([
            image,
            art,
            line,
            material,
            prices,
            status,
            format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    console.log(data)
    return {data: data, count: count, row: row}
}

const addPreitemMissPolin = async (object) => {
    
        let _object = new PreitemMissPolin(object);
        await PreitemMissPolin.create(_object);
    
}

const setPreitemMissPolin = async (object, id) => {
    
        await PreitemMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    
}

const deletePreitemMissPolin = async (id) => {
    
        await PreitemMissPolin.deleteMany({_id: {$in: id}});
    
}

module.exports.deletePreitemMissPolin = deletePreitemMissPolin;
module.exports.getPreitemMissPolin = getPreitemMissPolin;
module.exports.setPreitemMissPolin = setPreitemMissPolin;
module.exports.addPreitemMissPolin = addPreitemMissPolin;
module.exports.getClient = getClient;
module.exports.getItem = getItem;