const ItemMissPolin = require('../models/itemMissPolin');
const mongoose = require('mongoose');
const FavoriteMissPolin = require('../models/favoriteMissPolin');
const KategoriaMissPolin = require('../models/kategoriaMissPolin');
const CartMissPolin = require('../models/cartMissPolin');
const OrderMissPolin = require('../models/orderMissPolin');
const PreitemMissPolin = require('../models/preitemMissPolin');
const PreitemUserMissPolin = require('../models/preitemUserMissPolin');
const SearchMissPolin = require('../models/searchMissPolin');
const UserMissPolin = require('../models/userMissPolin');
const SearchGeoMissPolin = require('../models/searchGeoMissPolin');
const KategoryGeoMissPolin = require('../models/kategoryGeoMissPolin');
const CatalogMissPolin = require('../models/catalogMissPolin');
const ItemGeoMissPolin = require('../models/itemGeoMissPolin');
const ReferipMissPolin = require('../models/referipMissPolin');
const const1 = require('../module/const');

const getItemMetrik = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'товар',
        'избранное',
        'корзина',
        'заказали',
        'купили',
        'отмена',
    ];

    if(search == ''){
        count = await ItemMissPolin.count();
        findResult = await ItemMissPolin
            .find();
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
        });
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
        });
    }
    for(let i = 0; i<findResult.length; i++){
        data.push([
            findResult[i].art,
            await FavoriteMissPolin.count({item: findResult[i]._id}),
            await CartMissPolin.count({item: findResult[i]._id}),
            await OrderMissPolin.count({status: 'принят', items: {'$regex': JSON.stringify(findResult[i]._id), '$options': 'i'}}),
            await OrderMissPolin.count({status: 'выполнен', items: {'$regex': JSON.stringify(findResult[i]._id), '$options': 'i'}}),
            await OrderMissPolin.count({status: 'отменен', items: {'$regex': JSON.stringify(findResult[i]._id), '$options': 'i'}}),
        ]);
    }
    if(sort[0]=='избранное'&&sort[1]=='descending')
        data.sort((a, b) => (a[1] > b[1]) ? 1 : -1)
    else if(sort[0]=='избранное'&&sort[1]=='ascending')
        data.sort((a, b) => (a[1] < b[1]) ? 1 : -1)
    else if(sort[0]=='корзина'&&sort[1]=='descending')
        data.sort((a, b) => (a[2] > b[2]) ? 1 : -1)
    else if(sort[0]=='корзина'&&sort[1]=='ascending')
        data.sort((a, b) => (a[2] < b[2]) ? 1 : -1)
    else if(sort[0]=='заказали'&&sort[1]=='descending')
        data.sort((a, b) => (a[3] > b[3]) ? 1 : -1)
    else if(sort[0]=='заказали'&&sort[1]=='ascending')
        data.sort((a, b) => (a[3] < b[3]) ? 1 : -1)
    else if(sort[0]=='купили'&&sort[1]=='descending')
        data.sort((a, b) => (a[4] > b[4]) ? 1 : -1)
    else if(sort[0]=='купили'&&sort[1]=='ascending')
        data.sort((a, b) => (a[4] < b[4]) ? 1 : -1)
    else if(sort[0]=='отмена'&&sort[1]=='descending')
        data.sort((a, b) => (a[5] > b[5]) ? 1 : -1)
    else if(sort[0]=='отмена'&&sort[1]=='ascending')
        data.sort((a, b) => (a[5] < b[5]) ? 1 : -1)
    return {data: data.slice(parseInt(skip), parseInt(skip)+10), count: count, row: row}
}

const getKategoryMetrik = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'категория',
        'избранное',
        'корзина',
        'заказали',
        'купили',
        'отмена',
    ];

    if(search == ''){
        count = await KategoriaMissPolin.count();
        findResult = await KategoriaMissPolin
            .find();
    } else if (mongoose.Types.ObjectId.isValid(search)) {
        count = await KategoriaMissPolin.count({
            $or: [
                {_id: search},
                {title: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await KategoriaMissPolin
            .find({
                $or: [
                    {_id: search},
                    {title: {'$regex': search, '$options': 'i'}},
                ]
            });
    } else {
        count = await KategoriaMissPolin.count({
            $or: [
                {title: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await KategoriaMissPolin.find({
            $or: [
                {title: {'$regex': search, '$options': 'i'}},
            ]
        });
    }
    for(let i = 0; i<findResult.length; i++){
        data.push([
            findResult[i].title,
            await FavoriteMissPolin.count({item: { '$in' : await ItemMissPolin.find({kategoria: findResult[i].title}).distinct('_id')}}),
            await CartMissPolin.count({item: { '$in' : await ItemMissPolin.find({kategoria: findResult[i].title}).distinct('_id')}}),
            await OrderMissPolin.count({status: 'принят', kategory: {'$regex': JSON.stringify(findResult[i].title), '$options': 'i'}}),
            await OrderMissPolin.count({status: 'выполнен', kategory: {'$regex': JSON.stringify(findResult[i].title), '$options': 'i'}}),
            await OrderMissPolin.count({status: 'отменен', kategory: {'$regex': JSON.stringify(findResult[i].title), '$options': 'i'}}),
        ]);
    }
    if(sort[0]=='избранное'&&sort[1]=='descending')
        data.sort((a, b) => (a[1] > b[1]) ? 1 : -1)
    else if(sort[0]=='избранное'&&sort[1]=='ascending')
        data.sort((a, b) => (a[1] < b[1]) ? 1 : -1)
    else if(sort[0]=='корзина'&&sort[1]=='descending')
        data.sort((a, b) => (a[2] > b[2]) ? 1 : -1)
    else if(sort[0]=='корзина'&&sort[1]=='ascending')
        data.sort((a, b) => (a[2] < b[2]) ? 1 : -1)
    else if(sort[0]=='заказали'&&sort[1]=='descending')
        data.sort((a, b) => (a[3] > b[3]) ? 1 : -1)
    else if(sort[0]=='заказали'&&sort[1]=='ascending')
        data.sort((a, b) => (a[3] < b[3]) ? 1 : -1)
    else if(sort[0]=='купили'&&sort[1]=='descending')
        data.sort((a, b) => (a[4] > b[4]) ? 1 : -1)
    else if(sort[0]=='купили'&&sort[1]=='ascending')
        data.sort((a, b) => (a[4] < b[4]) ? 1 : -1)
    else if(sort[0]=='отмена'&&sort[1]=='descending')
        data.sort((a, b) => (a[5] > b[5]) ? 1 : -1)
    else if(sort[0]=='отмена'&&sort[1]=='ascending')
        data.sort((a, b) => (a[5] < b[5]) ? 1 : -1)
    return {data: data.slice(parseInt(skip), parseInt(skip)+10), count: count, row: row}
}

const getPreitemMetrik = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'артикул',
        'интересует',
    ];


    if(search == ''){
        count = await PreitemMissPolin.count();
        findResult = await PreitemMissPolin
            .find();
    }
    else if (mongoose.Types.ObjectId.isValid(search)) {
        count = await PreitemMissPolin.count({
            $or: [
                {_id: search},
                {image: {'$regex': search, '$options': 'i'}},
                {art: {'$regex': search, '$options': 'i'}},
                {line: {'$regex': search, '$options': 'i'}},
                {material: {'$regex': search, '$options': 'i'}},
                {prices: {'$regex': search, '$options': 'i'}},
                {status: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await PreitemMissPolin.find({
            $or: [
                {_id: search},
                {image: {'$regex': search, '$options': 'i'}},
                {art: {'$regex': search, '$options': 'i'}},
                {line: {'$regex': search, '$options': 'i'}},
                {material: {'$regex': search, '$options': 'i'}},
                {prices: {'$regex': search, '$options': 'i'}},
                {status: {'$regex': search, '$options': 'i'}},
            ]
        });
    }
    else {
        count = await PreitemMissPolin.count({
            $or: [
                {image: {'$regex': search, '$options': 'i'}},
                {art: {'$regex': search, '$options': 'i'}},
                {line: {'$regex': search, '$options': 'i'}},
                {material: {'$regex': search, '$options': 'i'}},
                {prices: {'$regex': search, '$options': 'i'}},
                {status: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await PreitemMissPolin.find({
            $or: [
                {image: {'$regex': search, '$options': 'i'}},
                {art: {'$regex': search, '$options': 'i'}},
                {line: {'$regex': search, '$options': 'i'}},
                {material: {'$regex': search, '$options': 'i'}},
                {prices: {'$regex': search, '$options': 'i'}},
                {status: {'$regex': search, '$options': 'i'}},
            ]
        })
    }

    for(let i = 0; i<findResult.length; i++){
        data.push([
            findResult[i].art,
            await PreitemUserMissPolin.count({preitem: findResult[i]._id}),
        ]);
    }
    if(sort[0]=='интересует'&&sort[1]=='descending')
        data.sort((a, b) => (a[1] > b[1]) ? 1 : -1)
    else if(sort[0]=='интересует'&&sort[1]=='ascending')
        data.sort((a, b) => (a[1] < b[1]) ? 1 : -1)
    return {data: data.slice(parseInt(skip), parseInt(skip)+10), count: count, row: row}
}

const getOrderMetrik = async () => {
    let data = [];
    const row = [
        'заказали',
        'купили',
        'отмена',
    ];

   data.push([
       await OrderMissPolin.count({status: 'принят'}),
       await OrderMissPolin.count({status: 'выполнен'}),
       await OrderMissPolin.count({status: 'отменен'}),
   ]);
    return {data: data, count: 0, row: row}
}

const getSearchMetrik = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'слово',
        'частота',
    ];

    if(search == ''){
        count = await SearchMissPolin.count();
        findResult = await SearchMissPolin
            .find();
    } else {
        count = await SearchMissPolin.count({
            $or: [
                {word: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await KategoriaMissPolin.find({
            $or: [
                {word: {'$regex': search, '$options': 'i'}},
            ]
        });
    }
    for(let i = 0; i<findResult.length; i++){
        data.push([
            findResult[i].word,
            findResult[i].count,
        ]);
    }
    if(sort[0]=='частота'&&sort[1]=='descending')
        data.sort((a, b) => (a[1] > b[1]) ? 1 : -1)
    else if(sort[0]=='частота'&&sort[1]=='ascending')
        data.sort((a, b) => (a[1] < b[1]) ? 1 : -1)
    return {data: data.slice(parseInt(skip), parseInt(skip)+10), count: count, row: row}
}

const setSearchMetrik = async (search) => {
    let data = await SearchMissPolin.findOne({word: search})
    if(data==null){
        data = new SearchMissPolin({
            word: search,
            count: 1,
        });
        await SearchMissPolin.create(data);
    } else {
        data.count = parseInt(data.count) + 1
        await SearchMissPolin.findOneAndUpdate({word: search}, {$set: {count: data.count}});
    }
}

const setSearchGeoMetrik = async (search, geo) => {
    let data = new SearchGeoMissPolin({
        word: search,
        geo: geo,
    });
    await SearchGeoMissPolin.create(data);
}

const setKategoryGeoMetrik = async (search, geo) => {
    let data = new KategoryGeoMissPolin({
        word: search,
        geo: geo,
    });
    await KategoryGeoMissPolin.create(data);
}

const setItemGeoMetrik = async (search, geo) => {
    let data = new ItemGeoMissPolin({
        word: search,
        geo: geo,
    });
    await ItemGeoMissPolin.create(data);
}

const getUserMetrik = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'пользователь',
        'страна',
        'избранное',
        'корзина',
        'заказали',
        'купили',
        'отмена'
    ];
    if(search == ''){
        count = await UserMissPolin.count();
        findResult = await UserMissPolin
            .find({role: {$ne: 'admin'}});
    }
    else if (mongoose.Types.ObjectId.isValid(search)) {
        count = await UserMissPolin.count({
            $and: [
                {
                    $or: [
                        {_id: search},
                        {name: {'$regex': search, '$options': 'i'}},
                        {email: {'$regex': search, '$options': 'i'}},
                        {phonenumber: {'$regex': search, '$options': 'i'}},
                        {status: {'$regex': search, '$options': 'i'}},
                        {data: {'$regex': search, '$options': 'i'}},
                    ]
                }, {
                    role: {$ne: 'admin'}
                }]
        });
        findResult = await UserMissPolin.find({
            $and: [
                {
                    $or: [
                        {_id: search},
                        {name: {'$regex': search, '$options': 'i'}},
                        {email: {'$regex': search, '$options': 'i'}},
                        {phonenumber: {'$regex': search, '$options': 'i'}},
                        {status: {'$regex': search, '$options': 'i'}},
                        {data: {'$regex': search, '$options': 'i'}},
                    ]}, {
                    role:
                        {$ne: 'admin'}
                }]
        });
    }
    else {
        count = await UserMissPolin.count({
            $and: [
                {
                    $or: [
                        {name: {'$regex': search, '$options': 'i'}},
                        {email: {'$regex': search, '$options': 'i'}},
                        {phonenumber: {'$regex': search, '$options': 'i'}},
                        {status: {'$regex': search, '$options': 'i'}},
                        {data: {'$regex': search, '$options': 'i'}},
                    ]
                }, {
                    role: {$ne: 'admin'}
                }]
        });
        findResult = await UserMissPolin.find({
            $and: [
                {
                    $or: [
                        {name: {'$regex': search, '$options': 'i'}},
                        {email: {'$regex': search, '$options': 'i'}},
                        {phonenumber: {'$regex': search, '$options': 'i'}},
                        {status: {'$regex': search, '$options': 'i'}},
                        {data: {'$regex': search, '$options': 'i'}},
                    ]}, {
                    role:
                        {$ne: 'admin'}
                }]
        });
    }
    for(let i = 0; i<findResult.length; i++){
        data.push([
            findResult[i].name+' '+findResult[i].email,
            findResult[i].data,
            await FavoriteMissPolin.count({user: findResult[i]._id}),
            await CartMissPolin.count({user: findResult[i]._id}),
            await OrderMissPolin.count({status: 'принят', user: findResult[i]._id}),
            await OrderMissPolin.count({status: 'выполнен', user: findResult[i]._id}),
            await OrderMissPolin.count({status: 'отменен', user: findResult[i]._id}),
        ]);
    }
    if(sort[0]=='избранное'&&sort[1]=='descending')
        data.sort((a, b) => (a[2] > b[2]) ? 1 : -1)
    else if(sort[0]=='избранное'&&sort[1]=='ascending')
        data.sort((a, b) => (a[2] < b[2]) ? 1 : -1)
    else if(sort[0]=='корзина'&&sort[1]=='descending')
        data.sort((a, b) => (a[3] > b[3]) ? 1 : -1)
    else if(sort[0]=='корзина'&&sort[1]=='ascending')
        data.sort((a, b) => (a[3] < b[3]) ? 1 : -1)
    else if(sort[0]=='заказали'&&sort[1]=='descending')
        data.sort((a, b) => (a[4] > b[4]) ? 1 : -1)
    else if(sort[0]=='заказали'&&sort[1]=='ascending')
        data.sort((a, b) => (a[4] < b[4]) ? 1 : -1)
    else if(sort[0]=='купили'&&sort[1]=='descending')
        data.sort((a, b) => (a[5] > b[5]) ? 1 : -1)
    else if(sort[0]=='купили'&&sort[1]=='ascending')
        data.sort((a, b) => (a[5] < b[5]) ? 1 : -1)
    else if(sort[0]=='отмена'&&sort[1]=='descending')
        data.sort((a, b) => (a[6] > b[6]) ? 1 : -1)
    else if(sort[0]=='отмена'&&sort[1]=='ascending')
        data.sort((a, b) => (a[6] < b[6]) ? 1 : -1)
    return {data: data.slice(parseInt(skip), parseInt(skip)+10), count: count, row: row}
}

const getGeoMetrik = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'страна',
        'ищут',
        'категория',
        'товар',
        'избранное',
        'корзина',
        'заказали',
        'купили',
        'отмена',
        'каталог',
    ];
    count = await UserMissPolin.count();
    findResult = await UserMissPolin
        .find({role: {$ne: 'admin'}}).distinct('data');

    for(let i = 0; i<findResult.length; i++){
        let searchArr1 = await SearchGeoMissPolin.find({geo: findResult[i]}), searchArr = []
        if(searchArr1==undefined||searchArr1.length<1) {
            searchArr = ''
        } else {
            for(let i1 = 0; i1<searchArr1.length; i1++) {
                searchArr.push(searchArr1[i1].word)
            }
            searchArr = const1.searchRepeat(searchArr)
        }
        let itemArr1 = await ItemGeoMissPolin.find({geo: findResult[i]}), itemArr = []
        if(itemArr1==undefined||itemArr1.length<1) {
            itemArr = ''
        } else {
            for(let i1 = 0; i1<itemArr1.length; i1++) {
                itemArr.push(itemArr1[i1].word)
            }
            itemArr = const1.searchRepeat(itemArr)
        }
        let kategoryArr1 = await KategoryGeoMissPolin.find({geo: findResult[i]}), kategoryArr = []
        if(kategoryArr1==undefined||kategoryArr1.length<1) {
            kategoryArr = ''
        } else {
            for(let i1 = 0; i1<kategoryArr1.length; i1++) {
                kategoryArr.push(kategoryArr1[i1].word)
            }
            kategoryArr = const1.searchRepeat(kategoryArr)
        }
        data.push([
            findResult[i],
            searchArr,
            kategoryArr,
            itemArr,
            await FavoriteMissPolin.count({geo: findResult[i]}),
            await CartMissPolin.count({geo: findResult[i]}),
            await OrderMissPolin.count({status: 'принят', geo: findResult[i]}),
            await OrderMissPolin.count({status: 'выполнен', geo: findResult[i]}),
            await OrderMissPolin.count({status: 'отменен', geo: findResult[i]}),
            await CatalogMissPolin.count({data: findResult[i]}),
        ]);
    }
    if(sort[0]=='избранное'&&sort[1]=='descending')
        data.sort((a, b) => (a[4] > b[4]) ? 1 : -1)
    else if(sort[0]=='избранное'&&sort[1]=='ascending')
        data.sort((a, b) => (a[4] < b[4]) ? 1 : -1)
    else if(sort[0]=='корзина'&&sort[1]=='descending')
        data.sort((a, b) => (a[5] > b[5]) ? 1 : -1)
    else if(sort[0]=='корзина'&&sort[1]=='ascending')
        data.sort((a, b) => (a[5] < b[5]) ? 1 : -1)
    else if(sort[0]=='заказали'&&sort[1]=='descending')
        data.sort((a, b) => (a[6] > b[6]) ? 1 : -1)
    else if(sort[0]=='заказали'&&sort[1]=='ascending')
        data.sort((a, b) => (a[6] < b[6]) ? 1 : -1)
    else if(sort[0]=='купили'&&sort[1]=='descending')
        data.sort((a, b) => (a[7] > b[7]) ? 1 : -1)
    else if(sort[0]=='купили'&&sort[1]=='ascending')
        data.sort((a, b) => (a[7] < b[7]) ? 1 : -1)
    else if(sort[0]=='отмена'&&sort[1]=='descending')
        data.sort((a, b) => (a[8] > b[8]) ? 1 : -1)
    else if(sort[0]=='отмена'&&sort[1]=='ascending')
        data.sort((a, b) => (a[8] < b[8]) ? 1 : -1)
    else if(sort[0]=='каталог'&&sort[1]=='descending')
        data.sort((a, b) => (a[9] > b[9]) ? 1 : -1)
    else if(sort[0]=='каталог'&&sort[1]=='ascending')
        data.sort((a, b) => (a[9] < b[9]) ? 1 : -1)
    console.log(data)
    return {data: data.slice(parseInt(skip), parseInt(skip)+10), count: count, row: row}
}

const getRefMetrik = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'рефералка',
        'посещение',
        'избранное',
        'корзина',
        'заказали',
        'купили',
        'отмена',
    ];
    count = await ReferipMissPolin.count();
    findResult = await ReferipMissPolin
        .find().distinct('refer');
    for(let i = 0; i<findResult.length; i++){
        let userArr = await UserMissPolin.find({ref: findResult[i]}).distinct('_id')
        data.push([
            findResult[i],
            await ReferipMissPolin.count({refer: findResult[i]}),
            await FavoriteMissPolin.count({user: {'$in' : userArr}}),
            await CartMissPolin.count({user: {'$in' : userArr}}),
            await OrderMissPolin.count({status: 'принят', user: {'$in' : userArr}}),
            await OrderMissPolin.count({status: 'выполнен', user: {'$in' : userArr}}),
            await OrderMissPolin.count({status: 'отменен', user: {'$in' : userArr}}),
        ]);
    }
    if(sort[0]=='избранное'&&sort[1]=='descending')
        data.sort((a, b) => (a[2] > b[2]) ? 1 : -1)
    else if(sort[0]=='избранное'&&sort[1]=='ascending')
        data.sort((a, b) => (a[2] < b[2]) ? 1 : -1)
    else if(sort[0]=='корзина'&&sort[1]=='descending')
        data.sort((a, b) => (a[3] > b[3]) ? 1 : -1)
    else if(sort[0]=='корзина'&&sort[1]=='ascending')
        data.sort((a, b) => (a[3] < b[3]) ? 1 : -1)
    else if(sort[0]=='заказали'&&sort[1]=='descending')
        data.sort((a, b) => (a[4] > b[4]) ? 1 : -1)
    else if(sort[0]=='заказали'&&sort[1]=='ascending')
        data.sort((a, b) => (a[4] < b[4]) ? 1 : -1)
    else if(sort[0]=='купили'&&sort[1]=='descending')
        data.sort((a, b) => (a[5] > b[5]) ? 1 : -1)
    else if(sort[0]=='купили'&&sort[1]=='ascending')
        data.sort((a, b) => (a[5] < b[5]) ? 1 : -1)
    else if(sort[0]=='отмена'&&sort[1]=='descending')
        data.sort((a, b) => (a[6] > b[6]) ? 1 : -1)
    else if(sort[0]=='отмена'&&sort[1]=='ascending')
        data.sort((a, b) => (a[6] < b[6]) ? 1 : -1)
    console.log(data)
    return {data: data.slice(parseInt(skip), parseInt(skip)+10), count: count, row: row}
}


module.exports.getItemMetrik = getItemMetrik;
module.exports.getKategoryMetrik = getKategoryMetrik;
module.exports.getPreitemMetrik = getPreitemMetrik;
module.exports.getOrderMetrik = getOrderMetrik;
module.exports.getSearchMetrik = getSearchMetrik;
module.exports.setSearchMetrik = setSearchMetrik;
module.exports.getUserMetrik = getUserMetrik;
module.exports.setSearchGeoMetrik = setSearchGeoMetrik;
module.exports.getGeoMetrik = getGeoMetrik;
module.exports.setItemGeoMetrik = setItemGeoMetrik;
module.exports.setKategoryGeoMetrik = setKategoryGeoMetrik;
module.exports.getRefMetrik = getRefMetrik;
