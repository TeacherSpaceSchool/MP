const MailingMissPolin = require('../models/mailingMissPolin');
const format = require('date-format') ;

const getClient = async () => {
    return await MailingMissPolin.findOne();
}

const getMailingMissPolin = async (search, sort, skip) => {
    try{
        let findResult = [], data = [], count;
        const row = [
            'mailuser',
            'mailpass',
            'mailchimpInstance',
            'listUniqueId',
            'mailchimpApiKey',
            'создан',
            '_id'
        ];
        if(sort == undefined||sort=='')
            sort = '-updatedAt';
        count = await MailingMissPolin.count();
        findResult = await MailingMissPolin
                .find()
                .sort(sort)
                .select('mailuser mailpass mailchimpInstance listUniqueId mailchimpApiKey updatedAt _id');
        for (let i=0; i<findResult.length; i++){
            data.push([findResult[i].mailuser, findResult[i].mailpass, findResult[i].mailchimpInstance, findResult[i].listUniqueId, findResult[i].mailchimpApiKey, format(findResult[i].updatedAt), findResult[i]._id]);
        }
        return {data: data, count: count, row: row}
    } catch(error) {
        console.error(error)
    }
}

const addMailingMissPolin = async (object) => {
    try{
        if(await MailingMissPolin.count()===0){
            let _object = new MailingMissPolin(object);
            await MailingMissPolin.create(_object);
        }
    } catch(error) {
        console.error(error)
    }
}

const setMailingMissPolin = async (object, id) => {
    try{
        await MailingMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteMailingMissPolin = async (id) => {
    try{
        await MailingMissPolin.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteMailingMissPolin = deleteMailingMissPolin;
module.exports.getMailingMissPolin = getMailingMissPolin;
module.exports.setMailingMissPolin = setMailingMissPolin;
module.exports.addMailingMissPolin = addMailingMissPolin;