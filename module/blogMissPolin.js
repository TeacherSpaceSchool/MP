const BlogMissPolin = require('../models/blogMissPolin');
const format = require('date-format') ;

const getClient1 = async(title)=>{
    return await BlogMissPolin.findOne({title: title})
}

const getClient = async()=>{
    return await BlogMissPolin.find().sort('-updatedAt')
}

const getBlogMissPolin = async (search, sort, skip) => {
    //await BlogMissPolin.deleteMany()
    let findResult = [], data = [], count;
    const row = [
        'изображение',
        'название',
        'текст',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='название'&&sort[1]=='descending')
        sort = '-title';
    else if(sort[0]=='название'&&sort[1]=='ascending')
        sort = 'title';
    else if(sort[0]=='текст'&&sort[1]=='descending')
        sort = '-text';
    else if(sort[0]=='текст'&&sort[1]=='ascending')
        sort = 'text';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await BlogMissPolin.count();
        findResult = await BlogMissPolin
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    } else {
        count = await BlogMissPolin.count({
            $or: [
                {image: {'$regex': search, '$options': 'i'}},
                {title: {'$regex': search, '$options': 'i'}},
                {text: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await BlogMissPolin.find({
            $or: [
                {image: {'$regex': search, '$options': 'i'}},
                {title: {'$regex': search, '$options': 'i'}},
                {text: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10);
    }
    for (let i=0; i<findResult.length; i++){
        data.push([findResult[i].image, findResult[i].title, findResult[i].text, format.asString('dd.MM.yyyy hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addBlogMissPolin = async (object) => {
    
        let _object = new BlogMissPolin(object);
        await BlogMissPolin.create(_object);
    }

const setBlogMissPolin = async (object, id) => {
    
        await BlogMissPolin.findOneAndUpdate({_id: id}, {$set: object});
    }

const deleteBlogMissPolin = async (id) => {
    
        await BlogMissPolin.deleteMany({_id: {$in: id}});
    }

module.exports.deleteBlogMissPolin = deleteBlogMissPolin;
module.exports.getBlogMissPolin = getBlogMissPolin;
module.exports.setBlogMissPolin = setBlogMissPolin;
module.exports.addBlogMissPolin = addBlogMissPolin;
module.exports.getClient = getClient;
module.exports.getClient1 = getClient1;