const FavoriteMissPolin = require('../models/favoriteMissPolin');
const format = require('date-format') ;

const getFavoriteMissPolin = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'товар',
        'клиент',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='товар'&&sort[1]=='descending')
        sort = '-item';
    else if(sort[0]=='товар'&&sort[1]=='ascending')
        sort = 'item';
    else if(sort[0]=='клиент'&&sort[1]=='descending')
        sort = '-user';
    else if(sort[0]=='клиент'&&sort[1]=='ascending')
        sort = 'user';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await FavoriteMissPolin.count();
        findResult = await FavoriteMissPolin
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    } else {
        count = await FavoriteMissPolin.count({
            $or: [
                {item: {'$regex': search, '$options': 'i'}},
                {user: {'$regex': search, '$options': 'i'}},
                {client: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await FavoriteMissPolin.find({
            $or: [
                {item: {'$regex': search, '$options': 'i'}},
                {user: {'$regex': search, '$options': 'i'}},
                {client: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    }
    for (let i=0; i<findResult.length; i++){
        data.push([findResult[i].item, findResult[i].user, format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addFavoriteMissPolin = async (object) => {
    try{
        let _object = new FavoriteMissPolin(object);
        await FavoriteMissPolin.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setFavoriteMissPolin = async (object, id) => {
    try{
        await FavoriteMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteFavoriteMissPolin = async (id) => {
    try{
        await FavoriteMissPolin.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.deleteFavoriteMissPolin = deleteFavoriteMissPolin;
module.exports.getFavoriteMissPolin = getFavoriteMissPolin;
module.exports.setFavoriteMissPolin = setFavoriteMissPolin;
module.exports.addFavoriteMissPolin = addFavoriteMissPolin;