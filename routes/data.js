const Jimp = require('jimp');
const express = require('express');
const router = express.Router();
const passportEngine = require('../module/passport');
const AdsMissPolin = require('../module/adsMissPolin');
const BlogMissPolin = require('../module/blogMissPolin');
const CatalogMissPolin = require('../module/catalogMissPolin');
const ContactsMissPolin = require('../module/contactsMissPolin');
const FavoriteMissPolin = require('../module/favoriteMissPolin');
const ItemMissPolin = require('../module/itemMissPolin');
const ModelsItemMissPolin = require('../models/itemMissPolin');
const ColorMissPolin = require('../module/colorMissPolin');
const DisRazdelMissPolin = require('../module/disRazdelMissPolin');
const MetrikMissPolin = require('../module/metrikMissPolin');
const CurrencyMissPolin = require('../module/currencyMissPolin');
const StaticMissPolinModel = require('../models/staticMissPolin');
const ReferipMissPolin = require('../models/referipMissPolin');
const MailingMissPolin = require('../module/mailingMissPolin');
const MailingMissPolinModel = require('../models/mailingMissPolin');
const OrderMissPolin = require('../module/orderMissPolin');
const UserMissPolin = require('../module/userMissPolin');
const ReferMissPolin = require('../module/referMissPolin');
const PreitemUserMissPolin = require('../module/preitemUserMissPolin');
const StaticMissPolin = require('../module/staticMissPolin');
const KategoriaMissPolin = require('../module/kategoriaMissPolin');
const PreitemMissPolin = require('../module/preitemMissPolin');
const readsql = require('../module/readsql');
const myConst = require('../module/const');
const randomstring = require('randomstring');
const app = require('../app');
const fs = require('fs');
const path = require('path');
const Mailchimp = require('../module/mailchimp');
const geoip = require('geoip-lite');
const nodemailer = require('nodemailer');

router.post('/getclient', async (req, res) => {
    try{
        let data;
        if(req.body.data!==undefined)
            data = JSON.parse(req.body.data)
        if(req.body.name == 'Новинки'){
            await res.send(await ItemMissPolin.getNew(data.search))
        } else if(req.body.name == 'Хиты'){
            await res.send(await ItemMissPolin.getHit(data.search))
        } else if(req.body.name == 'Категории'){
            await res.send(await ItemMissPolin.getKategory())
        } else if(req.body.name == 'Податегории'){
            await res.send(await ItemMissPolin.getPodkategoria(data.search))
        } else if(req.body.name == 'ВосстановлениеПароля'){
            await res.send(await UserMissPolin.recoveryPass(data.email))
        } else if(req.body.name == 'Подписка'){
            Mailchimp.send(data.email)
            let mailingMissPolin = await MailingMissPolinModel.findOne();
            let staticMissPolin = await StaticMissPolinModel.findOne();
            if (mailingMissPolin !== null && staticMissPolin !== null) {
                let mailOptions = {
                    from: mailingMissPolin.mailuser,
                    to: data.email,
                    subject: 'Каталог MissPolin',
                    text: 'Здравствуйте!\n' +
                    'Благодарим за проявленный интерес к нашей компании!\n' +
                    'Ниже представляем Вам каталог наших товаров для более детального ознакомления.\n' +
                    'C уважением, компания Miss Polin',
                    attachments: [{path: staticMissPolin.catalog, filename: 'Каталог MissPolin.pdf',}],
                };
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: mailingMissPolin.mailuser,
                        pass: mailingMissPolin.mailpass
                    },
                    tls: {
                        // do not fail on invalid certs
                        rejectUnauthorized: false
                    }
                });
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                Mailchimp.send(req.body.Email)
            }
            await res.send('ok')
        } else if(req.body.name == 'Товары'){
            if(data.kategoria!=undefined) {
                let ip = req.ip
                let geo = geoip.lookup(ip);
                if (geo === null) geo = {country: '*', city: '*'}
                await MetrikMissPolin.setKategoryGeoMetrik(data.kategoria, geo.country + ' \n' + geo.city)
            }
            await res.send(await ItemMissPolin.getItems(data.search, data.sort, data.skip, data.kategoria, data.podkategory))
        } else if(req.body.name == 'Товар'){
            let ip = req.ip
            let geo = geoip.lookup(ip);
            if(geo===null)geo={country: '*', city: '*'}
            await MetrikMissPolin.setItemGeoMetrik(data.art, geo.country+' \n'+geo.city)
            await res.send(await ItemMissPolin.getItem(data.art.trim()))
        } else if(req.body.name == 'Рекомендуем'){
            await res.send(await ItemMissPolin.getRecom())
        } else if(req.body.name == 'Скидки'){
            await res.send(await ItemMissPolin.getDiscountItems(data.skip))
        } else if(req.body.name == 'ВосстановлениеПароля'){
            let data = JSON.parse(req.body.data);
            await res.send(await UserMissPolin.recoveryPass(data.email))
        } else if(req.body.name == 'Цвет'){
            await res.send(await ColorMissPolin.getClient())
        } else if(req.body.name == 'Категория'){
            await res.send(await KategoriaMissPolin.getClient())
        } else if(req.body.name == 'Предзаказы'){
            await res.send(await PreitemMissPolin.getClient())
        } else if(req.body.name == 'Биллборд'){
            await res.send(await AdsMissPolin.getBillboard())
        } else if(req.body.name == 'Баннер'){
            await res.send(await AdsMissPolin.getBanner())
        } else if(req.body.name == 'Вверх'){
            await res.send(await AdsMissPolin.getUp())
        } else if(req.body.name == 'Блог'){
            await res.send(await BlogMissPolin.getClient())
        } else if(req.body.name == 'Предзаказ'){
            await res.send(await PreitemMissPolin.getItem(data.art))
        } else if(req.body.name == 'Валюта'){
            await res.send(await CurrencyMissPolin.getClient())
        } else if(req.body.name == 'БлогПоИмени'){
            await res.send(await BlogMissPolin.getClient1(data.title))
        } else if(req.body.name == 'Разделы'){
            await res.send(await DisRazdelMissPolin.getClient())
        } else if(req.body.name == 'Аналитика поиск'){
            if(data.search!=undefined){
                let ip = req.ip
                let geo = geoip.lookup(ip);
                if(geo===null)geo={country: '*', city: '*'}
                await MetrikMissPolin.setSearchGeoMetrik(data.search, geo.country+' \n'+geo.city)
                await MetrikMissPolin.setSearchMetrik(data.search)
            }
        } else if(req.body.name == 'Рефералка'){
            let ip = JSON.stringify(req.ip)
            if(await ReferMissPolin.count({refer: data.refer})===0){
                let _object = new ReferMissPolin({
                    refer: data.refer,
                    count: 1,
                    type: 'store'
                });
                await ReferMissPolin.create(_object);
                _object = new ReferipMissPolin({
                    refer: data.refer,
                    ip: ip,
                });
                await ReferipMissPolin.create(_object);
            } else {
                if(ReferipMissPolin.count({ip: ip, refer: data.refer})===0){
                    let _object = new ReferipMissPolin({
                        refer: data.refer,
                        ip: ip,
                    });
                    await ReferipMissPolin.create(_object);
                    _object = await ReferMissPolin.findOne({refer: data.refer});
                    _object.count+=1
                    await ReferMissPolin.findOneAndUpdate({refer: data.refer}, {$set: _object});
                }
            }
        }
    } catch(error) {
        console.error(error)
    }
});

router.post('/getclientsecure', async (req, res) => {
    try{
        if(req.body.name === 'Профиль'){
            await passportEngine.getProfile(req, res)
        } else if(req.body.name == 'ПроверкаПредзаказ'){
            await passportEngine.checkPreitemUser(req, res)
        } else if(req.body.name === 'ИзменитьПрофиль'){
            await passportEngine.setProfile(req, res)
        } else if(req.body.name == 'ПредзаказПользователь'){
            await passportEngine.getPreitemUser(req, res)
        } else if(req.body.name == 'ДобавитьПредзаказ'){
            await passportEngine.addPreitemUser(req, res)
        } else if(req.body.name == 'УдалитьПредзаказ'){
            await passportEngine.delPreitemUser(req, res)
        } else if(req.body.name == 'ДобавитьИзбранное'){
            await passportEngine.addFavoriteUser(req, res)
        } else if(req.body.name == 'УдалитьИзбранное'){
            await passportEngine.delFavorite(req, res)
        } else if(req.body.name == 'ПроверкаИзбранное'){
            await passportEngine.checkFavorite(req, res)
        } else if(req.body.name == 'ИзбранноеПользователь'){
            await passportEngine.getFavorite(req, res)
        } else if(req.body.name == 'ДобавитьКорзина'){
            await passportEngine.addCart(req, res)
        } else if(req.body.name == 'ПроверкаКорзина'){
            await passportEngine.checkCart(req, res)
        } else if(req.body.name == 'УдалитьКорзина'){
            await passportEngine.delCart(req, res)
        } else if(req.body.name == 'ПроверитьАдрес'){
            await passportEngine.checkAddress(req, res)
        } else if(req.body.name == 'ЗадатьАдрес'){
            await passportEngine.setAddress(req, res)
        } else if(req.body.name == 'СоздатьЗаказ'){
            await passportEngine.generateOrder(req, res)
        } else if(req.body.name == 'ПолучитьЗаказы'){
            await passportEngine.getOrders(req, res)
        } else if(req.body.name == 'ПолучитьЗаказ'){
            await passportEngine.getOrder(req, res)
        } else if(req.body.name == 'ОтменитьЗаказ'){
            await passportEngine.cancelOrder(req, res)
        } else if(req.body.name == 'Уровень'){
            await passportEngine.getLvl(req, res)
        }
    } catch(error) {
        console.error(error)
        app.logger1.error(error)
    }
});

router.post('/get', async (req, res) => {
  await passportEngine.verifydadmin(req, res, async ()=>{
      if(req.body.name == 'Реклама'){
          await res.send(await AdsMissPolin.getAdsMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Блог'){
          await res.send(await BlogMissPolin.getBlogMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Аналитика товар'){
          await res.send(await MetrikMissPolin.getItemMetrik(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Аналитика категория'){
          await res.send(await MetrikMissPolin.getKategoryMetrik(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Аналитика предзаказ'){
          await res.send(await MetrikMissPolin.getPreitemMetrik(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Аналитика заказы'){
          await res.send(await MetrikMissPolin.getOrderMetrik())
      } else if(req.body.name == 'Каталог'){
          await res.send(await CatalogMissPolin.getCatalogMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Файлы'){
          await res.send(await StaticMissPolin.getStaticMissPolin())
      } else if(req.body.name == 'Контакты'){
          await res.send(await ContactsMissPolin.getContactsMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Избранное'){
          await res.send(await FavoriteMissPolin.getFavoriteMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Товары'){
          await res.send(await ItemMissPolin.getItemMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Рассылка'){
          await res.send(await MailingMissPolin.getMailingMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Заказы'){
          await res.send(await OrderMissPolin.getOrderMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Пользователи'){
          await res.send(await UserMissPolin.getUserMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Предзаказы пользователи'){
          await res.send(await PreitemUserMissPolin.getPreitemUserMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Предзаказы'){
          await res.send(await PreitemMissPolin.getPreitemMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Рефералка'){
          await res.send(await ReferMissPolin.getReferMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Цвет'){
          await res.send(await ColorMissPolin.getColorMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Категория'){
          await res.send(await KategoriaMissPolin.getKategoriaMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Категории'){
          await res.send(await ItemMissPolin.getKategoria())
      } else if(req.body.name == 'Валюта'){
          await res.send(await CurrencyMissPolin.getCurrencyMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Разделы'){
          await res.send(await DisRazdelMissPolin.getDisRazdelMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Аналитика поиск'){
          await res.send(await MetrikMissPolin.getSearchMetrik(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Аналитика пользователь'){
          await res.send(await MetrikMissPolin.getUserMetrik(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Аналитика геолокация'){
          await res.send(await MetrikMissPolin.getGeoMetrik(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Аналитика рефералка'){
          await res.send(await MetrikMissPolin.getRefMetrik(req.body.search, req.body.sort, req.body.skip))
      }
  });
});

router.post('/delete', async (req, res) => {
    await passportEngine.verifydadmin(req, res, async ()=>{
        if(req.body.oldFile!=undefined) {
            let photos = req.body.oldFile.split('\n');
            for(let i=0; i<photos.length; i++){
                if(photos[i].length>0){
                    fs.unlink(photos[i].replace(myConst.url + 'images/', path.join(app.dirname, 'public', 'images')+'\\'), ()=>{console.log('successfully deleted');})
                    fs.unlink(photos[i].replace(myConst.url + 'images/', path.join(app.dirname, 'public', 'thumbnail')+'\\'), ()=>{console.log('successfully deleted');})
                }
            }
        }
        if(req.body.name == 'Реклама'){
            await AdsMissPolin.deleteAdsMissPolin(JSON.parse(req.body.deleted))
            await res.send(await AdsMissPolin.getAdsMissPolin(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Блог'){
            await BlogMissPolin.deleteBlogMissPolin(JSON.parse(req.body.deleted))
            await res.send(await BlogMissPolin.getBlogMissPolin(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Контакты'){
            await ContactsMissPolin.deleteContactsMissPolin(JSON.parse(req.body.deleted))
            await res.send(await ContactsMissPolin.getContactsMissPolin(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Рассылка'){
            await MailingMissPolin.deleteMailingMissPolin(JSON.parse(req.body.deleted))
            await res.send(await MailingMissPolin.getMailingMissPolin(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Пользователи'){
            await UserMissPolin.deleteUserMissPolin(JSON.parse(req.body.deleted))
            await res.send(await UserMissPolin.getUserMissPolin(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Предзаказы пользователи'){
            await PreitemUserMissPolin.deletePreitemUserMissPolin(JSON.parse(req.body.deleted))
            await res.send(await PreitemUserMissPolin.getPreitemUserMissPolin(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Предзаказы'){
            await PreitemMissPolin.deletePreitemMissPolin(JSON.parse(req.body.deleted))
            await res.send(await PreitemMissPolin.getPreitemMissPolin(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Цвет'){
            await ColorMissPolin.deleteColorMissPolin(JSON.parse(req.body.deleted))
            await res.send(await ColorMissPolin.getColorMissPolin(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Категория'){
            await KategoriaMissPolin.deleteKategoriaMissPolin(JSON.parse(req.body.deleted))
            await res.send(await KategoriaMissPolin.getKategoriaMissPolin(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Валюта'){
            await CurrencyMissPolin.deleteCurrencyMissPolin(JSON.parse(req.body.deleted))
            await res.send(await CurrencyMissPolin.getCurrencyMissPolin(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Товары'){
            await ItemMissPolin.deleteItemMissPolin(JSON.parse(req.body.deleted))
            await res.send(await ItemMissPolin.getItemMissPolin(req.body.search, req.body.sort, req.body.skip))
        }
    });
});

router.post('/add', async (req, res) => {
    await passportEngine.verifydadmin(req, res, async ()=>{
        if(req.body.name == 'Файлы') {
            let staticMissPolinModel = await StaticMissPolinModel.findOne();
            if(staticMissPolinModel!==null)
                fs.unlink(staticMissPolinModel.catalog, ()=>{console.log('successfully deleted');})
            let filename = randomstring.generate(7) + '.pdf';
            let filepath = path.join(app.dirname, 'public', 'catalog', filename);
            let fstream = fs.createWriteStream(filepath);
            let stream = await req.body['file0'].pipe(fstream);
            stream.on('finish', async () => {
                let data = {
                    catalog: filepath
                }
                if(req.body.id==undefined)
                    await StaticMissPolin.addStaticMissPolin(data)
                else
                    await StaticMissPolin.setStaticMissPolin(data, req.body.id)
                await res.send(await StaticMissPolin.getStaticMissPolin())
            })
        }
        else
        if(req.body.name == 'Интеграция') {
            let filename = randomstring.generate(7) + req.body['fileName' + 0];
            let filepath = path.join(app.dirname, 'integration', filename);
            let fstream = fs.createWriteStream(filepath);
            let stream = await req.body['file' + 0].pipe(fstream);
            stream.on('finish', async () => {
                fs.readFile(filepath, 'utf8', async function (err, contents) {
                    let queries = contents.split(';')
                    let Kategoria = readsql.getCategories(queries[28])
                    let Colors = readsql.getColors(queries[5])
                    let Material = readsql.getMaterials(queries[19])
                    let Count = readsql.getCount(queries[31], Colors)
                    let TypPrice = readsql.getTypPrice(queries[8])
                    let Price = readsql.getPrice(queries[11], TypPrice)
                    let Models = readsql.getModels(queries[2], Price, Count, Kategoria, Material)
                    for(let i = 0; i<Models.length; i++) {
                        let statusq = ''
                        if(Models[i].count.length<0||Models[i].price.length<0)
                            statusq = 'нет в наличие'
                        else
                            statusq = 'в наличие'
                        if(await ModelsItemMissPolin.count({cod: Models[i].cod})===0){
                            if(Models[i].count.length>0&&Models[i].price.length>0){
                                let _object = new ModelsItemMissPolin({
                                    art: Models[i].name,
                                    price: JSON.stringify(Models[i].price),
                                    line: Models[i].line,
                                    count: JSON.stringify(Models[i].count),
                                    kategoria: Models[i].kategoria,
                                    cod: Models[i].cod,
                                    weight: Models[i].weight,
                                    status: statusq,
                                    material: Models[i].material,
                                    hit: 'отключено',
                                    prices: Models[i].price[0]!==undefined?Models[i].price[0].price:'0',
                                    news: 'отключено'
                                });
                                await ModelsItemMissPolin.create(_object);
                            }
                        }
                        else {
                            if(await ModelsItemMissPolin.findOne({cod: Models[i].cod}).status=='отключен')
                                statusq = 'отключен'
                            await ModelsItemMissPolin.findOneAndUpdate({cod: Models[i].cod}, {$set: {
                                art: Models[i].name,
                                prices: Models[i].price[0]!==undefined?Models[i].price[0].price:'0',
                                price: JSON.stringify(Models[i].price),
                                line: Models[i].line,
                                count: JSON.stringify(Models[i].count),
                                kategoria: Models[i].kategoria,
                                cod: Models[i].cod,
                                status: statusq,
                                weight: Models[i].weight,
                                material: Models[i].material
                            }});
                        }
                    }
                    await res.send(await ItemMissPolin.getItemMissPolin(req.body.search, req.body.sort, req.body.skip))
                });
            })
        }
        else
        {
            let data, myNew = JSON.parse(req.body.new), photos = [], photosThumbnail = []
            if(req.body.oldFile!=undefined) {
                photos = req.body.oldFile.split('\n');
                for(let i = 0; i< photos.length; i++){
                    photosThumbnail.push(photos[i].replace('images', 'thumbnail'))
                }
            }
            if(req.body.fileLength>0) {
                for(let i=0; i<photos.length; i++){
                    if(photos[i].length>0){
                        fs.unlink(photos[i].replace(myConst.url + 'images/', path.join(app.dirname, 'public', 'images')+'\\'), ()=>{console.log('successfully deleted');})
                        fs.unlink(photosThumbnail[i].replace(myConst.url + 'thumbnail/', path.join(app.dirname, 'public', 'thumbnail')+'\\'), ()=>{console.log('successfully deleted');})
                    }
                }
                photos = []
                photosThumbnail = []
                for (let i = 0; i < parseInt(req.body.fileLength); i++) {
                    let filename = randomstring.generate(7) + req.body['fileName' + i];
                    let filepath = path.join(app.dirname, 'public', 'images', filename);
                    let filepathThumbnail = path.join(app.dirname, 'public', 'thumbnail', filename);
                    let fstream = fs.createWriteStream(filepath);
                    let stream = await req.body['file' + i].pipe(fstream);
                    photos.push(myConst.url + 'images/' + filename)
                    photosThumbnail.push(myConst.url + 'thumbnail/' + filename)
                    stream.on('finish', async () => {
                        let image = await Jimp.read(filepath)
                        if(image.bitmap.width>1500||image.bitmap.height>1500) {
                            await image.resize(1500, Jimp.AUTO);
                            await image.write(filepath);
                        }
                        image = await Jimp.read(filepath)
                        await image.resize(320, Jimp.AUTO);
                        await image.write(filepathThumbnail);
                        if(i === parseInt(req.body.fileLength)-1){
                            if(req.body.name == 'Реклама'){
                                data = {
                                    image: photos,
                                    imageThumbnail: photosThumbnail,
                                    name: myNew.name,
                                    url: myNew.url,
                                    type: myNew.type
                                }
                                if(req.body.id==undefined)
                                    await AdsMissPolin.addAdsMissPolin(data)
                                else
                                    await AdsMissPolin.setAdsMissPolin(data, req.body.id)
                                await res.send(await AdsMissPolin.getAdsMissPolin(req.body.search, req.body.sort, req.body.skip))
                            }
                            else if(req.body.name == 'Предзаказы'){
                                data = {
                                    prices: myNew.prices,
                                    line: myNew.line,
                                    material: myNew.material,
                                    status: myNew.status,
                                    image: photos,
                                    imageThumbnail: photosThumbnail,
                                    art: myNew.art,
                                    final: myNew.final
                                }
                                if(req.body.id==undefined)
                                    await PreitemMissPolin.addPreitemMissPolin(data)
                                else
                                    await PreitemMissPolin.setPreitemMissPolin(data, req.body.id)
                                await res.send(await PreitemMissPolin.getPreitemMissPolin(req.body.search, req.body.sort, req.body.skip))
                            }
                            else if(req.body.name == 'Предзаказы пользователи'){
                                data = {
                                    status: myNew.status,
                                    data: myNew.data,
                                };
                                if(req.body.id!=undefined)
                                    await PreitemUserMissPolin.setPreitemUserMissPolin(data, req.body.id)
                                await res.send(await PreitemUserMissPolin.getPreitemUserMissPolin(req.body.search, req.body.sort, req.body.skip))
                            }
                            else if(req.body.name == 'Блог'){
                                data = {
                                    image: photos,
                                    imageThumbnail: photosThumbnail,
                                    title: myNew.title,
                                    text: myNew.text,
                                }

                                if(req.body.id==undefined)
                                    await BlogMissPolin.addBlogMissPolin(data)
                                else
                                    await BlogMissPolin.setBlogMissPolin(data, req.body.id)
                                await res.send(await BlogMissPolin.getBlogMissPolin(req.body.search, req.body.sort, req.body.skip))
                            }
                            else if(req.body.name == 'Каталог'){
                                data = {
                                    status: myNew.status,
                                }
                                if(req.body.id!=undefined)
                                    await CatalogMissPolin.setCatalogMissPolin(data, req.body.id)
                                await res.send(await CatalogMissPolin.getCatalogMissPolin(req.body.search, req.body.sort, req.body.skip))
                            }
                            else if(req.body.name == 'Категория'){
                                data = {
                                    image: photos,
                                    imageThumbnail: photosThumbnail,
                                    title: myNew.title,
                                    status: myNew.status,
                                }
                                if(req.body.id==undefined)
                                    await KategoriaMissPolin.addKategoriaMissPolin(data)
                                else
                                    await KategoriaMissPolin.setKategoriaMissPolin(data, req.body.id)
                                await res.send(await KategoriaMissPolin.getKategoriaMissPolin(req.body.search, req.body.sort, req.body.skip))
                            }
                            else if(req.body.name == 'Цвет'){
                                data = {
                                    title: myNew.title,
                                    RGB: myNew.RGB,
                                }
                                if(req.body.id==undefined)
                                    await ColorMissPolin.addColorMissPolin(data)
                                else
                                    await ColorMissPolin.setColorMissPolin(data, req.body.id)
                                await res.send(await ColorMissPolin.getColorMissPolin(req.body.search, req.body.sort, req.body.skip))
                            }
                            else if(req.body.name == 'Контакты'){
                                data = {
                                    data: myNew.data,
                                    type: myNew.type,
                                }
                                if(req.body.id==undefined)
                                    await ContactsMissPolin.addContactsMissPolin(data)
                                else
                                    await ContactsMissPolin.setContactsMissPolin(data, req.body.id)
                                await res.send(await ContactsMissPolin.getContactsMissPolin(req.body.search, req.body.sort, req.body.skip))
                            }
                            else if(req.body.name == 'Товары'){
                                data = {
                                    image: photos,
                                    imageThumbnail: photosThumbnail,
                                    podkategoria: myNew.podkategoria,
                                    status: myNew.status,
                                    level: myNew.level,
                                    keyword: myNew.keyword,
                                    discount: myNew.discount,
                                    hit: myNew.hit,
                                    art: myNew.art,
                                    news: myNew.news,
                                    kategoria: myNew.kategoria,
                                    count: JSON.stringify(myNew.count),
                                    material: myNew.material,
                                    line: myNew.line,
                                    prices: myNew.price[0].price,
                                    price: JSON.stringify(myNew.price),
                                    weight: myNew.weight,
                                    description: myNew.description
                                }
                                if(req.body.id!=undefined)
                                    await ItemMissPolin.setItemMissPolin(data, req.body.id)
                                else
                                    await ItemMissPolin.addItemMissPolin(data)
                                await res.send(await ItemMissPolin.getItemMissPolin(req.body.search, req.body.sort, req.body.skip))
                            }
                            else if(req.body.name == 'Рассылка'){
                                data = {
                                    mailuser: myNew.mailuser,
                                    mailpass: myNew.mailpass,
                                    mailchimpInstance: myNew.mailchimpInstance,
                                    listUniqueId: myNew.listUniqueId,
                                    mailchimpApiKey: myNew.mailchimpApiKey
                                };
                                if(req.body.id===undefined)
                                    await MailingMissPolin.addMailingMissPolin(data)
                                else
                                    await MailingMissPolin.setMailingMissPolin(data, req.body.id)
                                await res.send(await MailingMissPolin.getMailingMissPolin(req.body.search, req.body.sort, req.body.skip))
                            }
                            else if(req.body.name == 'Заказы'){
                                data = {
                                    status: myNew.status,
                                    data: myNew.data,
                                };
                                if(req.body.id!=undefined)
                                    await OrderMissPolin.setOrderMissPolin(data, req.body.id)
                                await res.send(await OrderMissPolin.getOrderMissPolin(req.body.search, req.body.sort, req.body.skip))
                            }
                            else if(req.body.name == 'Пользователи'){
                                data = {
                                    lvl: myNew.lvl,
                                    status: myNew.status,
                                };
                                if(req.body.id!=undefined)
                                    await UserMissPolin.setUserMissPolin(data, req.body.id)
                                await res.send(await UserMissPolin.getUserMissPolin(req.body.search, req.body.sort, req.body.skip))
                            } else if(req.body.name == 'Разделы'){
                                data = {
                                    discount: myNew.discount,
                                    preorder: myNew.preorder,
                                };
                                if(req.body.id===undefined)
                                    await DisRazdelMissPolin.addDisRazdelMissPolin(data)
                                else
                                    await DisRazdelMissPolin.setDisRazdelMissPolin(data, req.body.id)
                                await res.send(await DisRazdelMissPolin.getDisRazdelMissPolin(req.body.search, req.body.sort, req.body.skip))
                            }
                        }
                    })
                }
            }
            else {
                if(req.body.name == 'Реклама'){
                    data = {
                        image: photos,
                        imageThumbnail: photosThumbnail,
                        name: myNew.name,
                        url: myNew.url,
                        type: myNew.type
                    }
                    if(req.body.id==undefined)
                        await AdsMissPolin.addAdsMissPolin(data)
                    else
                        await AdsMissPolin.setAdsMissPolin(data, req.body.id)
                    await res.send(await AdsMissPolin.getAdsMissPolin(req.body.search, req.body.sort, req.body.skip))
                }
                else if(req.body.name == 'Предзаказы'){
                    data = {
                        prices: myNew.prices,
                        line: myNew.line,
                        material: myNew.material,
                        status: myNew.status,
                        image: photos,
                        imageThumbnail: photosThumbnail,
                        art: myNew.art,
                        final: myNew.final
                    }
                    if(req.body.id==undefined)
                        await PreitemMissPolin.addPreitemMissPolin(data)
                    else
                        await PreitemMissPolin.setPreitemMissPolin(data, req.body.id)
                    await res.send(await PreitemMissPolin.getPreitemMissPolin(req.body.search, req.body.sort, req.body.skip))
                }
                else if(req.body.name == 'Предзаказы пользователи'){
                    data = {
                        status: myNew.status,
                        data: myNew.data,
                    };
                    if(req.body.id!=undefined)
                        await PreitemUserMissPolin.setPreitemUserMissPolin(data, req.body.id)
                    await res.send(await PreitemUserMissPolin.getPreitemUserMissPolin(req.body.search, req.body.sort, req.body.skip))
                }
                else if(req.body.name == 'Блог'){
                    data = {
                        image: photos,
                        imageThumbnail: photosThumbnail,
                        title: myNew.title,
                        text: myNew.text,
                    }
                    if(req.body.id==undefined)
                        await BlogMissPolin.addBlogMissPolin(data)
                    else
                        await BlogMissPolin.setBlogMissPolin(data, req.body.id)
                    await res.send(await BlogMissPolin.getBlogMissPolin(req.body.search, req.body.sort, req.body.skip))
                }
                else if(req.body.name == 'Каталог'){
                    data = {
                        status: myNew.status,
                    }
                    if(req.body.id!=undefined)
                        await CatalogMissPolin.setCatalogMissPolin(data, req.body.id)
                    await res.send(await CatalogMissPolin.getCatalogMissPolin(req.body.search, req.body.sort, req.body.skip))
                }
                else if(req.body.name == 'Контакты'){
                    data = {
                        data: myNew.data,
                        type: myNew.type,
                    }
                    if(req.body.id==undefined)
                        await ContactsMissPolin.addContactsMissPolin(data)
                    else
                        await ContactsMissPolin.setContactsMissPolin(data, req.body.id)
                    await res.send(await ContactsMissPolin.getContactsMissPolin(req.body.search, req.body.sort, req.body.skip))
                }
                else if(req.body.name == 'Товары'){
                    data = {
                        image: photos,
                        imageThumbnail: photosThumbnail,
                        podkategoria: myNew.podkategoria,
                        status: myNew.status,
                        level: myNew.level,
                        keyword: myNew.keyword,
                        discount: myNew.discount,
                        hit: myNew.hit,
                        art: myNew.art,
                        news: myNew.news,
                        kategoria: myNew.kategoria,
                        count: JSON.stringify(myNew.count),
                        material: myNew.material,
                        line: myNew.line,
                        prices: myNew.price[0].price,
                        price: JSON.stringify(myNew.price),
                        weight: myNew.weight,
                        description: myNew.description
                    }
                    if(req.body.id!=undefined)
                        await ItemMissPolin.setItemMissPolin(data, req.body.id)
                    else
                        await ItemMissPolin.addItemMissPolin(data)
                    await res.send(await ItemMissPolin.getItemMissPolin(req.body.search, req.body.sort, req.body.skip))
                }
                else if(req.body.name == 'Рассылка'){
                    data = {
                        mailuser: myNew.mailuser,
                        mailpass: myNew.mailpass,
                        mailchimpInstance: myNew.mailchimpInstance,
                        listUniqueId: myNew.listUniqueId,
                        mailchimpApiKey: myNew.mailchimpApiKey
                    };
                    if(req.body.id===undefined)
                        await MailingMissPolin.addMailingMissPolin(data)
                    else
                        await MailingMissPolin.setMailingMissPolin(data, req.body.id)
                    await res.send(await MailingMissPolin.getMailingMissPolin(req.body.search, req.body.sort, req.body.skip))
                }
                else if(req.body.name == 'Заказы'){
                    data = {
                        status: myNew.status,
                        data: myNew.data,
                    };
                    if(req.body.id!=undefined)
                        await OrderMissPolin.setOrderMissPolin(data, req.body.id)
                    await res.send(await OrderMissPolin.getOrderMissPolin(req.body.search, req.body.sort, req.body.skip))
                }
                else if(req.body.name == 'Пользователи'){
                    data = {
                        lvl: myNew.lvl,
                        status: myNew.status,
                    };
                    if(req.body.id!=undefined)
                        await UserMissPolin.setUserMissPolin(data, req.body.id)
                    await res.send(await UserMissPolin.getUserMissPolin(req.body.search, req.body.sort, req.body.skip))
                }
                else if(req.body.name == 'Категория'){
                    data = {
                        image: photos,
                        imageThumbnail: photosThumbnail,
                        title: myNew.title,
                        status: myNew.status,
                    }
                    if(req.body.id==undefined)
                        await KategoriaMissPolin.addKategoriaMissPolin(data)
                    else
                        await KategoriaMissPolin.setKategoriaMissPolin(data, req.body.id)
                    await res.send(await KategoriaMissPolin.getKategoriaMissPolin(req.body.search, req.body.sort, req.body.skip))
                }
                else if(req.body.name == 'Валюта'){
                    data = {
                        title: myNew.title,
                        value: myNew.value,
                    }
                    if(req.body.id==undefined)
                        await CurrencyMissPolin.addCurrencyMissPolin(data)
                    else
                        await CurrencyMissPolin.setCurrencyMissPolin(data, req.body.id)
                    await res.send(await CurrencyMissPolin.getCurrencyMissPolin(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Цвет'){
                    data = {
                        title: myNew.title,
                        RGB: myNew.RGB,
                    }
                    if(req.body.id==undefined)
                        await ColorMissPolin.addColorMissPolin(data)
                    else
                        await ColorMissPolin.setColorMissPolin(data, req.body.id)
                    await res.send(await ColorMissPolin.getColorMissPolin(req.body.search, req.body.sort, req.body.skip))
                } else if(req.body.name == 'Разделы'){
                    data = {
                        discount: myNew.discount,
                        preorder: myNew.preorder,
                    };
                    if(req.body.id===undefined)
                        await DisRazdelMissPolin.addDisRazdelMissPolin(data)
                    else
                        await DisRazdelMissPolin.setDisRazdelMissPolin(data, req.body.id)
                    await res.send(await DisRazdelMissPolin.getDisRazdelMissPolin(req.body.search, req.body.sort, req.body.skip))
                }
            }
        }
    });
});

module.exports = router;
