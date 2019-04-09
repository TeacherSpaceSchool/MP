const CatalogMissPolin = require('../models/catalogMissPolin');
const format = require('date-format') ;

const getCatalogMissPolin = async (search, sort, skip) => {
    //await CatalogMissPolin.deleteMany()
    let findResult = [], data = [], count;
    const row = [
        'email',
        'имя',
        'телефон',
        'данные',
        'рефералка',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='email'&&sort[1]=='descending')
        sort = '-email';
    else if(sort[0]=='email'&&sort[1]=='ascending')
        sort = 'email';
    else if(sort[0]=='статус'&&sort[1]=='descending')
        sort = '-status';
    else if(sort[0]=='статус'&&sort[1]=='ascending')
        sort = 'status';
    else if(sort[0]=='имя'&&sort[1]=='descending')
        sort = '-name';
    else if(sort[0]=='имя'&&sort[1]=='ascending')
        sort = 'name';
    else if(sort[0]=='телефон'&&sort[1]=='descending')
        sort = '-phone';
    else if(sort[0]=='телефон'&&sort[1]=='ascending')
        sort = 'phone';
    else if(sort[0]=='данные'&&sort[1]=='descending')
        sort = '-data';
    else if(sort[0]=='данные'&&sort[1]=='ascending')
        sort = 'data';
    else if(sort[0]=='рефералка'&&sort[1]=='descending')
        sort = '-refer';
    else if(sort[0]=='рефералка'&&sort[1]=='ascending')
        sort = 'refer';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await CatalogMissPolin.count();
        findResult = await CatalogMissPolin
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    } else {
        count = await CatalogMissPolin.count({
            $or: [
                {name: {'$regex': search, '$options': 'i'}},
                {phone: {'$regex': search, '$options': 'i'}},
                {email: {'$regex': search, '$options': 'i'}},
                {data: {'$regex': search, '$options': 'i'}},
                {refer: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await CatalogMissPolin.find({
            $or: [
                {name: {'$regex': search, '$options': 'i'}},
                {phone: {'$regex': search, '$options': 'i'}},
                {email: {'$regex': search, '$options': 'i'}},
                {data: {'$regex': search, '$options': 'i'}},
                {refer: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    }
    for (let i=0; i<findResult.length; i++){
        data.push([findResult[i].email, findResult[i].name, findResult[i].phone, findResult[i].data, findResult[i].refer, format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addCatalogMissPolin = async (object) => {
    try{
        let _object = new CatalogMissPolin(object);
        await CatalogMissPolin.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setCatalogMissPolin = async (object, id) => {
    try{
        await CatalogMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteCatalogMissPolin = async (id) => {
    try{
        await CatalogMissPolin.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.deleteCatalogMissPolin = deleteCatalogMissPolin;
module.exports.getCatalogMissPolin = getCatalogMissPolin;
module.exports.setCatalogMissPolin = setCatalogMissPolin;
module.exports.addCatalogMissPolin = addCatalogMissPolin;