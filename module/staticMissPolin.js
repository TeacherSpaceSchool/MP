const StaticMissPolin = require('../models/staticMissPolin');
const format = require('date-format') ;

const getStaticMissPolin = async () => {
    
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
    
}

const addStaticMissPolin = async (object) => {
    
        if(await StaticMissPolin.count()===0){
            let _object = new StaticMissPolin(object);
            await StaticMissPolin.create(_object);
        }
    
}

const setStaticMissPolin = async (object, id) => {
    
        await StaticMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    
}

module.exports.getStaticMissPolin = getStaticMissPolin;
module.exports.setStaticMissPolin = setStaticMissPolin;
module.exports.addStaticMissPolin = addStaticMissPolin;