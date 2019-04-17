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
    try{
        if(await DisRazdelMissPolin.count()===0){
            let _object = new DisRazdelMissPolin(object);
            await DisRazdelMissPolin.create(_object);
        }
    } catch(error) {
        console.error(error)
    }
}

const setDisRazdelMissPolin = async (object, id) => {
    try{
        await DisRazdelMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteDisRazdelMissPolin = async (id) => {
    try{
        await DisRazdelMissPolin.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.deleteDisRazdelMissPolin = deleteDisRazdelMissPolin;
module.exports.getDisRazdelMissPolin = getDisRazdelMissPolin;
module.exports.setDisRazdelMissPolin = setDisRazdelMissPolin;
module.exports.addDisRazdelMissPolin = addDisRazdelMissPolin;
module.exports.getClient = getClient;
