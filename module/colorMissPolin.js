const ColorMissPolin = require('../models/colorMissPolin');
const format = require('date-format') ;

const getClient = async () => {
    let data = await ColorMissPolin.find();
    let res = {}
    for(let i = 0; i<data.length; i++){
        res[data[i].title] = data[i].RGB;
    }
    return res
}

const getColorMissPolin = async (search, sort, skip) => {
    //await ColorMissPolin.deleteMany()
    let findResult = [], data = [], count;
    const row = [
        'название',
        'rgb',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='название'&&sort[1]=='descending')
        sort = '-title';
    else if(sort[0]=='название'&&sort[1]=='ascending')
        sort = 'title';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await ColorMissPolin.count();
        findResult = await ColorMissPolin
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    } else {
        count = await ColorMissPolin.count({
            $or: [
                {title: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await ColorMissPolin.find({
            $or: [
                {title: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    }
    for (let i=0; i<findResult.length; i++){
        data.push([findResult[i].title, findResult[i].RGB, format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addColorMissPolin = async (object) => {
    try{
        let _object = new ColorMissPolin(object);
        await ColorMissPolin.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setColorMissPolin = async (object, id) => {
    try{
        await ColorMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteColorMissPolin = async (id) => {
    try{
        await ColorMissPolin.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.deleteColorMissPolin = deleteColorMissPolin;
module.exports.getClient = getClient;
module.exports.getColorMissPolin = getColorMissPolin;
module.exports.setColorMissPolin = setColorMissPolin;
module.exports.addColorMissPolin = addColorMissPolin;