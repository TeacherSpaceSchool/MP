const CurrencyMissPolin = require('../models/currencyMissPolin');
const format = require('date-format') ;

const getClient = async () => {
    let data = await CurrencyMissPolin.find()
    let res = {}
    for(let i = 0; i<data.length; i++)
        res[data[i].title] = data[i].value
    return res;
}

const getCurrencyMissPolin = async (search, sort, skip) => {
    //await CurrencyMissPolin.deleteMany()
    let findResult = [], data = [], count;
    const row = [
        'название',
        'значение',
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
        count = await CurrencyMissPolin.count();
        findResult = await CurrencyMissPolin
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    } else {
        count = await CurrencyMissPolin.count({
            $or: [
                {title: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await CurrencyMissPolin.find({
            $or: [
                {title: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    }
    for (let i=0; i<findResult.length; i++){
        data.push([findResult[i].title, findResult[i].value, format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addCurrencyMissPolin = async (object) => {
    try{
        let _object = new CurrencyMissPolin(object);
        await CurrencyMissPolin.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setCurrencyMissPolin = async (object, id) => {
    try{
        await CurrencyMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteCurrencyMissPolin = async (id) => {
    try{
        await CurrencyMissPolin.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.deleteCurrencyMissPolin = deleteCurrencyMissPolin;
module.exports.getClient = getClient;
module.exports.getCurrencyMissPolin = getCurrencyMissPolin;
module.exports.setCurrencyMissPolin = setCurrencyMissPolin;
module.exports.addCurrencyMissPolin = addCurrencyMissPolin;