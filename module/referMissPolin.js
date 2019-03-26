const ReferMissPolin = require('../models/referMissPolin');
const format = require('date-format') ;

const getReferMissPolin = async (search, sort, skip) => {
    //await ReferMissPolin.deleteMany()
    let findResult = [], data = [], count;
    const row = [
        'рефералка',
        'тип',
        'количество',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='рефералка'&&sort[1]=='descending')
        sort = '-refer';
    else if(sort[0]=='рефералка'&&sort[1]=='ascending')
        sort = 'refer';
    else if(sort[0]=='количество'&&sort[1]=='descending')
        sort = '-count';
    else if(sort[0]=='количество'&&sort[1]=='ascending')
        sort = 'count';
    else if(sort[0]=='тип'&&sort[1]=='descending')
        sort = '-type';
    else if(sort[0]=='тип'&&sort[1]=='ascending')
        sort = 'type';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await ReferMissPolin.count();
        findResult = await ReferMissPolin
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    } else {
        count = await ReferMissPolin.count({
            $or: [
                {refer: {'$regex': search, '$options': 'i'}},
                {type: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await ReferMissPolin.find({
            $or: [
                {refer: {'$regex': search, '$options': 'i'}},
                {type: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('image name url type updatedAt _id');
    }
    for (let i=0; i<findResult.length; i++){
        data.push([findResult[i].refer, findResult[i].type, findResult[i].count, format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}


module.exports.getReferMissPolin = getReferMissPolin;
