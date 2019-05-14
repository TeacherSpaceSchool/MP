const OrderMissPolin = require('../models/orderMissPolin');
const HistoryOrderMissPolin = require('../models/historyOrderMissPolin');
const format = require('date-format') ;

const getOrderMissPolin = async (search, sort, skip) => {
    //await OrderMissPolin.deleteMany()
    console.log(await HistoryOrderMissPolin.find())
    let findResult = [], data = [], count;
    const row = [
        'товар',
        'клиент',
        'сумма',
        'категория',
        'адрес',
        'статус',
        'информация',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='товар'&&sort[1]=='descending')
        sort = '-items';
    else if(sort[0]=='товар'&&sort[1]=='ascending')
        sort = 'items';
    else if(sort[0]=='пользователь'&&sort[1]=='descending')
        sort = '-user';
    else if(sort[0]=='пользователь'&&sort[1]=='ascending')
        sort = 'user';
    else if(sort[0]=='сумма'&&sort[1]=='descending')
        sort = '-sum';
    else if(sort[0]=='сумма'&&sort[1]=='ascending')
        sort = 'sum';
    else if(sort[0]=='категория'&&sort[1]=='descending')
        sort = '-kategory';
    else if(sort[0]=='категория'&&sort[1]=='ascending')
        sort = 'kategory';
    else if(sort[0]=='адрес'&&sort[1]=='descending')
        sort = '-adress';
    else if(sort[0]=='адрес'&&sort[1]=='ascending')
        sort = 'adress';
    else if(sort[0]=='статус'&&sort[1]=='descending')
        sort = '-status';
    else if(sort[0]=='статус'&&sort[1]=='ascending')
        sort = 'status';
    else if(sort[0]=='информация'&&sort[1]=='descending')
        sort = '-data';
    else if(sort[0]=='информация'&&sort[1]=='ascending')
        sort = 'data';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await OrderMissPolin.count();
        findResult = await OrderMissPolin
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    } else {
        count = await OrderMissPolin.count({
            $or: [
                {items: {'$regex': search, '$options': 'i'}},
                {user: {'$regex': search, '$options': 'i'}},
                {sum: {'$regex': search, '$options': 'i'}},
                {kategory: {'$regex': search, '$options': 'i'}},
                {typePay: {'$regex': search, '$options': 'i'}},
                {adress: {'$regex': search, '$options': 'i'}},
                {status: {'$regex': search, '$options': 'i'}},
                {data: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await OrderMissPolin.find({
            $or: [
                {items: {'$regex': search, '$options': 'i'}},
                {user: {'$regex': search, '$options': 'i'}},
                {sum: {'$regex': search, '$options': 'i'}},
                {kategory: {'$regex': search, '$options': 'i'}},
                {typePay: {'$regex': search, '$options': 'i'}},
                {adress: {'$regex': search, '$options': 'i'}},
                {status: {'$regex': search, '$options': 'i'}},
                {data: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    }
    for (let i=0; i<findResult.length; i++){
        let adress = ''
        if(findResult[i].adress!==undefined) {
            adress = JSON.parse(findResult[i].adress)
            adress = 'email: ' + adress['email'] + '; \nимя: ' + adress['name'] + '; \nтелефон: ' + adress['phone'] + '; \nгород: ' + adress['city'] + '; \nулица: ' + adress['street'] + '; \nквартира: ' + adress['room'] + '; \nиндекс: ' + adress['index']
        }
        let items = '', itemsParse = JSON.parse(findResult[i].items)
        for (let i1=0; i1<itemsParse.length; i1++) {
            items += ' ART: '+itemsParse[i1].item.art+'; '+
                'цвет: '+itemsParse[i1].data.color+'; '+
                'сумма: '+itemsParse[i1].data.pricefull+'$; '+
                'кол: '+itemsParse[i1].data.count+'; '
        }
        data.push([
            findResult[i].items,
            findResult[i].user,
            findResult[i].sum,
            findResult[i].kategory,
            findResult[i].adress,
            findResult[i].status,
            findResult[i].data,
            format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addOrderMissPolin = async (object) => {
    
        let _object = new OrderMissPolin(object);
        await OrderMissPolin.create(_object);
    
}

const setOrderMissPolin = async (object, id) => {
    
        await OrderMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    
}

const deleteOrderMissPolin = async (id) => {
    
        await OrderMissPolin.deleteMany({_id: {$in: id}});
    
}

module.exports.deleteOrderMissPolin = deleteOrderMissPolin;
module.exports.getOrderMissPolin = getOrderMissPolin;
module.exports.setOrderMissPolin = setOrderMissPolin;
module.exports.addOrderMissPolin = addOrderMissPolin;