const express = require('express');
const router = express.Router();
const ModelsItemMissPolin = require('../models/itemMissPolin');


router.post('/', async (req, res, next) => {
    console.log(req.param('count'))
    let statusq = ''
    let count1 = req.param('count'), count2 = [];
    count1 = count1.split(';');
    for (let i=0; i<count1.length; i++){
        if(count1[i].split(':')[1]!==undefined)
            count2[i] = {'color': count1[i].split(':')[0].replace('\n', '').trim(), 'kolichestvo': count1[i].split(':')[1].trim()}
    }
    console.log(count2)
    let price1 = req.param('price'), price2 = [];
    price1 = price1.split(';');
    for (let i=0; i<price1.length; i++){
        if(price1[i].split(':')[1]!==undefined)
            price2[i] = {'typeprice': price1[i].split(':')[0].replace('\n', '').trim(), 'price': price1[i].split(':')[1].trim()}
    }

    if(count2.length<1||price2.length<1)
        statusq = 'нет в наличие'
    else
        statusq = 'в наличие'
    if(await ModelsItemMissPolin.count({cod: req.param('cod')})===0){
        if(count2.length>0&&price2.length>0){
            let _object = new ModelsItemMissPolin({
                art: req.param('name'),
                price: JSON.stringify(price2),
                line: req.param('line'),
                count: JSON.stringify(count2),
                kategoria: req.param('kategoria'),
                cod: req.param('cod'),
                weight: req.param('weight'),
                status: statusq,
                material: req.param('material'),
                hit: 'отключено',
                prices: price2[0]!==undefined?price2[0].price:'0',
                news: 'отключено'
            });
            await ModelsItemMissPolin.create(_object);
        }
    }
    else {
        if(await ModelsItemMissPolin.findOne({cod: req.param('cod')}).status=='отключен')
            statusq = 'отключен'
        await ModelsItemMissPolin.findOneAndUpdate({cod: req.param('cod')}, {$set: {
            art: req.param('name'),
            prices: price2[0]!==undefined?price2[0].price:'0',
            price: JSON.stringify(price2),
            line: req.param('line'),
            count: JSON.stringify(count2),
            kategoria: req.param('kategoria'),
            cod: req.param('cod'),
            status: statusq,
            weight: req.param('weight'),
            material: req.param('material')
        }});
    }


});

module.exports = router;
