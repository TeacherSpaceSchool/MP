const StaticMissPolin = require('../models/staticMissPolin');
const format = require('date-format') ;

const getStaticMissPolin = async () => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'каталог',
            'создан',
            '_id'
        ];
        count = await StaticMissPolin.count();
        findResult = await StaticMissPolin.find()
        for (let i=0; i<findResult.length; i++){
            data.push([findResult[i].catalog, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addStaticMissPolin = async (object) => {
    try{
        if(await StaticMissPolin.count()===0){
            let _object = new StaticMissPolin(object);
            await StaticMissPolin.create(_object);
        }
    } catch(error) {
        console.error(error)
    }
}

const setStaticMissPolin = async (object, id) => {
    try{
        await StaticMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getStaticMissPolin = getStaticMissPolin;
module.exports.setStaticMissPolin = setStaticMissPolin;
module.exports.addStaticMissPolin = addStaticMissPolin;