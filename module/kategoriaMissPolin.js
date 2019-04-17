const KategoriaMissPolin = require('../models/kategoriaMissPolin');
const format = require('date-format') ;
const mongoose = require('mongoose');

const getClient = async () => {
    return await KategoriaMissPolin.find({status: 'active'});
}

const getKategoriaMissPolin = async (search, sort, skip) => {
    //await KategoriaMissPolin.deleteMany()
    let findResult = [], data = [], count;
    const row = [
        'изображение',
        'название',
        'статус',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await KategoriaMissPolin.count();
        findResult = await KategoriaMissPolin
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    } else if (mongoose.Types.ObjectId.isValid(search)) {
        count = await KategoriaMissPolin.count({
            $or: [
                {_id: search},
                {title: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await KategoriaMissPolin.find({
            $or: [
                {_id: search},
                {title: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
    } else {
        count = await KategoriaMissPolin.count({
            $or: [
                {title: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await KategoriaMissPolin.find({
            $or: [
                {title: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    }
    for (let i=0; i<findResult.length; i++){
        let status = ''
        if(findResult[i].status!==undefined){
            status = findResult[i].status
        }
        data.push([
            findResult[i].image,
            findResult[i].title,
            status,
            format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt),
            findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addKategoriaMissPolin = async (object) => {
    try{
        let _object = new KategoriaMissPolin(object);
        await KategoriaMissPolin.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setKategoriaMissPolin = async (object, id) => {
    try{
        await KategoriaMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteKategoriaMissPolin = async (id) => {
    try{
        await KategoriaMissPolin.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.deleteKategoriaMissPolin = deleteKategoriaMissPolin;
module.exports.getKategoriaMissPolin = getKategoriaMissPolin;
module.exports.setKategoriaMissPolin = setKategoriaMissPolin;
module.exports.addKategoriaMissPolin = addKategoriaMissPolin;
module.exports.getClient = getClient;