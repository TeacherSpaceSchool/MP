const express = require('express');
const router = express.Router();
const ReferMissPolin = require('../models/referMissPolin');
const ReferipMissPolin = require('../models/referipMissPolin');
const CatalogMissPolin = require('../models/catalogMissPolin');
const path = require('path');
let  dirname1 = __dirname.replace('\\routes', '')
dirname1 = dirname1.replace('/routes', '')
var geoip = require('geoip-lite');
/* GET users listing. */
router.get('/', async (req, res, next) => {
    if(req.param('refer')!==undefined&&req.param('refer')!==''){
        if(await ReferMissPolin.count({refer: req.param('refer')})===0){
            let _object = new ReferMissPolin({
                refer: req.param('refer'),
                count: 1,
                type: 'landing'
            });
            await ReferMissPolin.create(_object);
        } else {
            let ip = JSON.stringify(req.ip)
            if(ReferipMissPolin.count({ip: req.param(ip)})===0){
                let _object = new ReferipMissPolin({
                    refer: req.param('refer'),
                    ip: ip,
                });
                await ReferipMissPolin.create(_object);
                _object = await ReferMissPolin.findOne({refer: req.param('refer')});
                _object.count+=1
                await ReferMissPolin.findOneAndUpdate({refer: req.param('refer')}, {$set: _object});
            }
        }
    }
    res.sendFile(path.join(dirname1, 'landing', 'index.html'));
});

router.post('/', async (req, res, next) => {
    let ip = JSON.stringify(req.ip)
    if(req.body.Refer===undefined)
        req.body.Refer='-'
    let geo = geoip.lookup(ip);
    console.log(JSON.stringify(req.ip))
    console.log(geo)
    if(geo===null)geo={country: '', city: ''}
    let _object = new CatalogMissPolin({
        email: req.body.Email,
        status: 'ожидает',
        name: req.body.Name,
        phone: req.body.Phone,
        data: geo.country+' \n'+geo.city,
        refer: req.body.Refer
    });
    await CatalogMissPolin.create(_object);
    res.sendFile(path.join(dirname1, 'landing', 'index.html'));
});

module.exports = router;
