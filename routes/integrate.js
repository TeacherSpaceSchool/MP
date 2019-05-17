const express = require('express');
const router = express.Router();
const ModelsItemMissPolin = require('../models/itemMissPolin');
const HistoryOrderMissPolin = require('../models/historyOrderMissPolin');
const windows1251 = require('windows-1251');

router.get('/', async (req, res, next) => {
    await res.send(windows1251.encode(JSON.stringify(await HistoryOrderMissPolin.find().select('email code color count'))))
})

router.post('/', async (req, res, next) => {
    let statusq = ''
    let count1 = windows1251.decode(req.param('count')), count2 = [];
    count1 = count1.split(';');
    for (let i=0; i<count1.length; i++){
        if(count1[i].split(':')[1]!==undefined)
            count2[i] = {'color': count1[i].split(':')[0].replace('\n', '').trim(), 'kolichestvo': count1[i].split(':')[1].trim()}
    }
    let price1 = windows1251.decode(req.param('price')), price2 = [];
    price1 = price1.split(';');
    for (let i=0; i<price1.length; i++){
        if(price1[i].split(':')[1]!==undefined)
            price2[i] = {'typeprice': price1[i].split(':')[0].replace('\n', '').trim(), 'price': price1[i].split(':')[1].trim()}
    }

    if(count2.length<1||price2.length<1)
        statusq = 'нет в наличие'
    else
        statusq = 'в наличие'
    if(await ModelsItemMissPolin.count({cod: windows1251.decode(req.param('cod'))})===0){
        if(count2.length>0&&price2.length>0){
            let _object = new ModelsItemMissPolin({
                art: windows1251.decode(req.param('art')),
                price: JSON.stringify(price2),
                line: windows1251.decode(req.param('line')),
                count: JSON.stringify(count2),
                kategoria: windows1251.decode(req.param('kategoria')),
                cod: windows1251.decode(req.param('cod')),
                weight: windows1251.decode(req.param('weight')),
                status: statusq,
                material: windows1251.decode(req.param('material')),
                hit: 'отключено',
                prices: price2[0]!==undefined?price2[0].price:'0',
                news: 'отключено'
            });
            await ModelsItemMissPolin.create(_object);
        }
    }
    else {
        if(await ModelsItemMissPolin.findOne({cod: windows1251.decode(req.param('cod'))}).status=='отключен')
            statusq = 'отключен'
        await ModelsItemMissPolin.findOneAndUpdate({cod: windows1251.decode(req.param('cod'))}, {$set: {
            art: windows1251.decode(req.param('art')),
            prices: price2[0]!==undefined?price2[0].price:'0',
            price: JSON.stringify(price2),
            line: windows1251.decode(req.param('line')),
            count: JSON.stringify(count2),
            kategoria: windows1251.decode(req.param('kategoria')),
            cod: windows1251.decode(req.param('cod')),
            status: statusq,
            weight: windows1251.decode(req.param('weight')),
            material: windows1251.decode(req.param('material'))
        }});
    }
    await res.send('ok')

});



router.get('/', async (req, res, next) => {
    console.log('lol')

    console.log(req.param('lol'))

});


module.exports = router;
