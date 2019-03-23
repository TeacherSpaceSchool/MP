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
const MailingMissPolin = require('../module/mailingMissPolin');
const OrderMissPolin = require('../module/orderMissPolin');
const UserMissPolin = require('../module/userMissPolin');
const PreitemUserMissPolin = require('../module/preitemUserMissPolin');
const PreitemMissPolin = require('../module/preitemMissPolin');
const readsql = require('../module/readsql');
const myConst = require('../module/const');
const randomstring = require('randomstring');
const app = require('../app');
const fs = require('fs');
const path = require('path');

router.post('/get', async (req, res) => {
  await passportEngine.verifydadmin(req, res, async ()=>{
      if(req.body.name == 'Реклама'){
          await res.send(await AdsMissPolin.getAdsMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Блог'){
          await res.send(await BlogMissPolin.getBlogMissPolin(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Каталог'){
          await res.send(await CatalogMissPolin.getCatalogMissPolin(req.body.search, req.body.sort, req.body.skip))
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
        } else if(req.body.name == 'Предзаказы'){
            await PreitemUserMissPolin.deletePreitemUserMissPolin(JSON.parse(req.body.deleted))
            await res.send(await PreitemUserMissPolin.getPreitemUserMissPolin(req.body.search, req.body.sort, req.body.skip))
        }
    });
});

router.post('/add', async (req, res) => {
    console.log(req.body.name)
    await passportEngine.verifydadmin(req, res, async ()=>{
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
                        if(Models[i].count.length>0){
                            if(await ModelsItemMissPolin.count({cod: Models[i].cod})===0){
                                let _object = new ModelsItemMissPolin({
                                    art: Models[i].name,
                                    price: JSON.stringify(Models[i].price),
                                    line: Models[i].line,
                                    count: JSON.stringify(Models[i].count),
                                    kategoria: Models[i].kategoria,
                                    cod: Models[i].cod,
                                    weight: Models[i].weight,
                                    status: 'в наличие',
                                    material: Models[i].material
                                });
                                await ModelsItemMissPolin.create(_object);
                            } else {
                                await ModelsItemMissPolin.findOneAndUpdate({cod: Models[i].cod}, {$set: {
                                    art: Models[i].name,
                                    price: JSON.stringify(Models[i].price),
                                    line: Models[i].line,
                                    count: JSON.stringify(Models[i].count),
                                    kategoria: Models[i].kategoria,
                                    cod: Models[i].cod,
                                    status: 'в наличие',
                                    weight: Models[i].weight,
                                    material: Models[i].material
                                }});
                            }
                        } else if(await ModelsItemMissPolin.count({cod: Models[i].cod})!==0) {
                            await ModelsItemMissPolin.findOneAndUpdate({cod: Models[i].cod}, {$set: {
                                art: Models[i].name,
                                price: JSON.stringify(Models[i].price),
                                line: Models[i].line,
                                count: JSON.stringify(Models[i].count),
                                kategoria: Models[i].kategoria,
                                cod: Models[i].cod,
                                status: 'нет в наличие',
                                weight: Models[i].weight,
                                material: Models[i].material
                            }});
                        }
                    }
                    await res.send(await ItemMissPolin.getItemMissPolin(req.body.search, req.body.sort, req.body.skip))
                });
            })
        } else
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
                                    price: myNew.price,
                                    line: myNew.line,
                                    material: myNew.material,
                                    status: myNew.status,
                                    image: photos,
                                    imageThumbnail: photosThumbnail,
                                    name: myNew.name,
                                    url: myNew.url,
                                    type: myNew.type
                                }
                                if(req.body.id==undefined)
                                    await PreitemMissPolin.addPreitemMissPolin(data)
                                else
                                    await PreitemMissPolin.setPreitemMissPolin(data, req.body.id)
                                await res.send(await PreitemMissPolin.setPreitemMissPolin(req.body.search, req.body.sort, req.body.skip))
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
                                    discount: myNew.discount
                                }
                                console.log(data)
                                if(req.body.id!=undefined)
                                    await ItemMissPolin.setItemMissPolin(data, req.body.id)
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
                                    role: myNew.role,
                                    status: myNew.status,
                                    data: myNew.data,
                                };
                                if(req.body.id!=undefined)
                                    await UserMissPolin.setUserMissPolin(data, req.body.id)
                                await res.send(await UserMissPolin.getUserMissPolin(req.body.search, req.body.sort, req.body.skip))
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
                        price: myNew.price,
                        line: myNew.line,
                        material: myNew.material,
                        status: myNew.status,
                        image: photos,
                        imageThumbnail: photosThumbnail,
                        name: myNew.name,
                        url: myNew.url,
                        type: myNew.type
                    }
                    if(req.body.id==undefined)
                        await PreitemMissPolin.addPreitemMissPolin(data)
                    else
                        await PreitemMissPolin.setPreitemMissPolin(data, req.body.id)
                    await res.send(await PreitemMissPolin.setPreitemMissPolin(req.body.search, req.body.sort, req.body.skip))
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
                        discount: myNew.discount
                    }
                    console.log(data)
                    if(req.body.id!=undefined)
                        await ItemMissPolin.setItemMissPolin(data, req.body.id)
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
                    role: myNew.role,
                    status: myNew.status,
                    data: myNew.data,
                };
                if(req.body.id!=undefined)
                    await UserMissPolin.setUserMissPolin(data, req.body.id)
                await res.send(await UserMissPolin.getUserMissPolin(req.body.search, req.body.sort, req.body.skip))
            }
            }
        }
    });
});

module.exports = router;
