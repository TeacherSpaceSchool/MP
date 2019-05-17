const ItemMissPolin = require('../models/itemMissPolin');
const format = require('date-format') ;
const mongoose = require('mongoose');

const getRecom = async () => {
    return await ItemMissPolin.findRandom({image: {$ne: undefined}, status: 'в наличие'}).limit(4);
}

const getNew = async (search) => {
    return await ItemMissPolin.findRandom({status: 'в наличие', kategoria: {'$regex': search, '$options': 'i'}, news: 'включено', image: {$ne: undefined}}).limit(4);
}

const getHit = async (search) => {
    return await ItemMissPolin.findRandom({status: 'в наличие', image: {$ne: undefined}, $or: [{kategoria: {'$regex': search, '$options': 'i'}}, {podkategoria: {'$regex': search, '$options': 'i'}}], hit: 'включено'}).limit(4);
}

const getPodkategoria = async (search) => {
    let a = await ItemMissPolin.find({kategoria: search}).distinct('podkategoria')
    return a

}

const getKategoria = async () => {
    let a = await ItemMissPolin.find().distinct('kategoria')
    console.log(a)
    return a

}

const getItem = async (art) => {
    console.log(art, await ItemMissPolin
        .findOne({art: art}))
   return await ItemMissPolin
            .findOne({art: art})

}

const getItems = async (search, sort, skip, kategoria, podkategory) => {
    if(kategoria == undefined)
        kategoria = ''
    if(podkategory == undefined)
        podkategory = ''
    if(sort===''){
        return await ItemMissPolin
            .find({status: 'в наличие', image: {$ne: undefined}, $or: [{material: {'$regex': search, '$options': 'i'}}, {art: {'$regex': search, '$options': 'i'}}, {keyword: {'$regex': search, '$options': 'i'}}], podkategoria: {'$regex': podkategory, '$options': 'i'}, kategoria: {'$regex': kategoria, '$options': 'i'}})
            .sort('-updatedAt')
            .skip(parseInt(skip))
            .limit(9)
    }
}

const getDiscountItems = async (skip) => {
    return await ItemMissPolin
        .find({status: 'в наличие', discount: {$ne: ''}, image: {$ne: undefined}})
        .sort('-updatedAt')
        .skip(parseInt(skip))
        .limit(9)
}

const getItemMissPolin = async (search, sort, skip) => {
    //await ItemMissPolin.deleteMany()
    let findResult = [], data = [], count;
    const row = [
        'изображение',
        'артикул',
        'линейка',
        'материал',
        'вес',
        'цена',
        'количество',
        'категория',
        'подкатегория',
        'статус',
        'уровень',
        'ключевые слова',
        'скидка',
        'код',
        'новинка',
        'хит',
        'описание',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='материал'&&sort[1]=='descending')
        sort = '-material';
    else if(sort[0]=='материал'&&sort[1]=='ascending')
        sort = 'material';
    else if(sort[0]=='артикул'&&sort[1]=='descending')
        sort = '-art';
    else if(sort[0]=='артикул'&&sort[1]=='ascending')
        sort = 'art';
    else if(sort[0]=='линейка'&&sort[1]=='descending')
        sort = '-line';
    else if(sort[0]=='линейка'&&sort[1]=='ascending')
        sort = 'line';
    else if(sort[0]=='вес'&&sort[1]=='descending')
        sort = '-weight';
    else if(sort[0]=='вес'&&sort[1]=='ascending')
        sort = 'weight';
    else if(sort[0]=='количество'&&sort[1]=='descending')
        sort = '-count';
    else if(sort[0]=='количество'&&sort[1]=='ascending')
        sort = 'count';
    else if(sort[0]=='категория'&&sort[1]=='descending')
        sort = '-kategoria';
    else if(sort[0]=='категория'&&sort[1]=='ascending')
        sort = 'kategoria';
    else if(sort[0]=='подкатегория'&&sort[1]=='descending')
        sort = '-podkategoria';
    else if(sort[0]=='подкатегория'&&sort[1]=='ascending')
        sort = 'podkategoria';
    else if(sort[0]=='статус'&&sort[1]=='descending')
        sort = '-status';
    else if(sort[0]=='статус'&&sort[1]=='ascending')
        sort = 'status';
    else if(sort[0]=='уровень'&&sort[1]=='descending')
        sort = '-level';
    else if(sort[0]=='уровень'&&sort[1]=='ascending')
        sort = 'level';
    else if(sort[0]=='ключевые слова'&&sort[1]=='descending')
        sort = '-keyword';
    else if(sort[0]=='ключевые слова'&&sort[1]=='ascending')
        sort = 'keyword';
    else if(sort[0]=='скидка'&&sort[1]=='descending')
        sort = '-discount';
    else if(sort[0]=='скидка'&&sort[1]=='ascending')
        sort = 'discount';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await ItemMissPolin.count();
        findResult = await ItemMissPolin
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    }
    else if (mongoose.Types.ObjectId.isValid(search)) {
        count = await ItemMissPolin.count({
            $or: [
                {_id: search},
                {image: {'$regex': search, '$options': 'i'}},
                {art: {'$regex': search, '$options': 'i'}},
                {line: {'$regex': search, '$options': 'i'}},
                {material: {'$regex': search, '$options': 'i'}},
                {weight: {'$regex': search, '$options': 'i'}},
                {price: {'$regex': search, '$options': 'i'}},
                {count: {'$regex': search, '$options': 'i'}},
                {kategoria: {'$regex': search, '$options': 'i'}},
                {podkategoria: {'$regex': search, '$options': 'i'}},
                {status: {'$regex': search, '$options': 'i'}},
                {level: {'$regex': search, '$options': 'i'}},
                {keyword: {'$regex': search, '$options': 'i'}},
                {discount: {'$regex': search, '$options': 'i'}},
                {cod: {'$regex': search, '$options': 'i'}}
            ]
        });
        findResult = await ItemMissPolin.find({
            $or: [
                {_id: search},
                {image: {'$regex': search, '$options': 'i'}},
                {art: {'$regex': search, '$options': 'i'}},
                {line: {'$regex': search, '$options': 'i'}},
                {material: {'$regex': search, '$options': 'i'}},
                {weight: {'$regex': search, '$options': 'i'}},
                {price: {'$regex': search, '$options': 'i'}},
                {count: {'$regex': search, '$options': 'i'}},
                {kategoria: {'$regex': search, '$options': 'i'}},
                {podkategoria: {'$regex': search, '$options': 'i'}},
                {status: {'$regex': search, '$options': 'i'}},
                {level: {'$regex': search, '$options': 'i'}},
                {keyword: {'$regex': search, '$options': 'i'}},
                {discount: {'$regex': search, '$options': 'i'}},
                {cod: {'$regex': search, '$options': 'i'}}
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
    }
    else {
        count = await ItemMissPolin.count({
            $or: [
                {image: {'$regex': search, '$options': 'i'}},
                {art: {'$regex': search, '$options': 'i'}},
                {line: {'$regex': search, '$options': 'i'}},
                {material: {'$regex': search, '$options': 'i'}},
                {weight: {'$regex': search, '$options': 'i'}},
                {price: {'$regex': search, '$options': 'i'}},
                {count: {'$regex': search, '$options': 'i'}},
                {kategoria: {'$regex': search, '$options': 'i'}},
                {podkategoria: {'$regex': search, '$options': 'i'}},
                {status: {'$regex': search, '$options': 'i'}},
                {level: {'$regex': search, '$options': 'i'}},
                {keyword: {'$regex': search, '$options': 'i'}},
                {discount: {'$regex': search, '$options': 'i'}},
                {cod: {'$regex': search, '$options': 'i'}}
            ]
        });
        findResult = await ItemMissPolin.find({
            $or: [
                {image: {'$regex': search, '$options': 'i'}},
                {art: {'$regex': search, '$options': 'i'}},
                {line: {'$regex': search, '$options': 'i'}},
                {material: {'$regex': search, '$options': 'i'}},
                {weight: {'$regex': search, '$options': 'i'}},
                {price: {'$regex': search, '$options': 'i'}},
                {count: {'$regex': search, '$options': 'i'}},
                {kategoria: {'$regex': search, '$options': 'i'}},
                {podkategoria: {'$regex': search, '$options': 'i'}},
                {status: {'$regex': search, '$options': 'i'}},
                {level: {'$regex': search, '$options': 'i'}},
                {keyword: {'$regex': search, '$options': 'i'}},
                {discount: {'$regex': search, '$options': 'i'}},
                {cod: {'$regex': search, '$options': 'i'}}
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    }
    for (let i=0; i<findResult.length; i++){
        let image = ''
        if (findResult[i].image!=undefined)
            image = findResult[i].image
        let art = ''
        if (findResult[i].art!=undefined)
            art = findResult[i].art
        let line = ''
        if (findResult[i].line!=undefined)
            line = findResult[i].line
        let material = ''
        if (findResult[i].material!=undefined)
            material = findResult[i].material
        let weight = ''
        if (findResult[i].weight!=undefined)
            weight = findResult[i].weight
        let price = ''
        if (findResult[i].price!=undefined)
            price = findResult[i].price
        let count1 = ''
        if (findResult[i].count!=undefined)
            count1 = findResult[i].count
        let kategoria = ''
        if (findResult[i].kategoria!=undefined)
            kategoria = findResult[i].kategoria
        let podkategoria = ''
        if (findResult[i].podkategoria!=undefined)
            podkategoria = findResult[i].podkategoria
        let status = ''
        if (findResult[i].status!=undefined)
            status = findResult[i].status
        let level = ''
        if (findResult[i].level!=undefined)
            level = findResult[i].level
        let keyword = ''
        if (findResult[i].keyword!=undefined)
            keyword = findResult[i].keyword
        let discount = ''
        if (findResult[i].discount!=undefined)
            discount = findResult[i].discount
        let cod = ''
        if (findResult[i].cod!=undefined)
            cod = findResult[i].cod
        let hit = ''
        if (findResult[i].hit!=undefined)
            hit = findResult[i].hit
        let news = ''
        if (findResult[i].news!=undefined)
            news = findResult[i].news
        let description = ''
        if (findResult[i].description!=undefined)
            description = findResult[i].description
        data.push([
            image,
            art,
            line,
            material,
            weight,
            price,
            count1,
            kategoria,
            podkategoria,
            status,
            level,
            keyword,
            discount,
            cod,
            news,
            hit,
            description,
            format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt),
            findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addItemMissPolin = async (object) => {
    
        let _object = new ItemMissPolin(object);
        await ItemMissPolin.create(_object);
    
}

const setItemMissPolin = async (object, id) => {
    
        await ItemMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    
}

const deleteItemMissPolin = async (id) => {
    
        await ItemMissPolin.deleteMany({_id: {$in: id}});
    
}

module.exports.deleteItemMissPolin = deleteItemMissPolin;
module.exports.getItemMissPolin = getItemMissPolin;
module.exports.setItemMissPolin = setItemMissPolin;
module.exports.addItemMissPolin = addItemMissPolin;
module.exports.getHit = getHit;
module.exports.getNew = getNew;
module.exports.getItems = getItems;
module.exports.getItem = getItem;
module.exports.getRecom = getRecom;
module.exports.getDiscountItems = getDiscountItems;
module.exports.getKategoria = getKategoria;
module.exports.getPodkategoria = getPodkategoria;