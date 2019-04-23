const DisRazdelMissPolin = require('../models/disRazdelMissPolin');
const format = require('date-format') ;

const getClient = async () => {
    return await DisRazdelMissPolin.findOne();
}

const getDisRazdelMissPolin = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'скидки',
        'предзаказ',
        'создан',
        '_id'
    ];
        count = await DisRazdelMissPolin.count();
        findResult = await DisRazdelMissPolin
            .find()
            .skip(parseInt(skip))
            .limit(10);
    for (let i=0; i<findResult.length; i++){
        data.push([findResult[i].discount, findResult[i].preorder, format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addDisRazdelMissPolin = async (object) => {
    
        if(await DisRazdelMissPolin.count()===0){
            let _object = new DisRazdelMissPolin(object);
            await DisRazdelMissPolin.create(_object);
        }
    
}

const setDisRazdelMissPolin = async (object, id) => {
    
        await DisRazdelMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    
}

const deleteDisRazdelMissPolin = async (id) => {
    
        await DisRazdelMissPolin.deleteMany({_id: {$in: id}});
    
}

module.exports.deleteDisRazdelMissPolin = deleteDisRazdelMissPolin;
module.exports.getDisRazdelMissPolin = getDisRazdelMissPolin;
module.exports.setDisRazdelMissPolin = setDisRazdelMissPolin;
module.exports.addDisRazdelMissPolin = addDisRazdelMissPolin;
module.exports.getClient = getClient;
