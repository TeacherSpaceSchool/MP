const FavoriteMissPolin = require('../models/favoriteMissPolin');
const UserMissPolin = require('../models/userMissPolin');
const ItemMissPolin = require('../models/itemMissPolin');
const format = require('date-format') ;

const getFavoriteMissPolin = async (search, sort, skip) => {
    //await FavoriteMissPolin.deleteMany()
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
        let item = ''
        if(findResult[i].item!=undefined) {
            item = await ItemMissPolin.findOne({_id: findResult[i].item})
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
        data.push([item, user, format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addFavoriteMissPolin = async (object) => {
    
        let _object = new FavoriteMissPolin(object);
        await FavoriteMissPolin.create(_object);
    
}

const setFavoriteMissPolin = async (object, id) => {
    
        await FavoriteMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    
}

const deleteFavoriteMissPolin = async (id) => {
    
        await FavoriteMissPolin.deleteMany({_id: {$in: id}});
    
}

module.exports.deleteFavoriteMissPolin = deleteFavoriteMissPolin;
module.exports.getFavoriteMissPolin = getFavoriteMissPolin;
module.exports.setFavoriteMissPolin = setFavoriteMissPolin;
module.exports.addFavoriteMissPolin = addFavoriteMissPolin;