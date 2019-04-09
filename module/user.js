const UserMuseumKNMII = require('../models/userMissPolin');
const ColorMissPolin = require('../models/colorMissPolin');
let adminId = '';
const adminLogin = require('./const').adminLogin,
    adminPass = require('./const').adminPass;


let getAdminId = () => {
    return adminId
}

let checkAdmin = async (role, status) => {
    return (role=='admin'&&status=='active')
}

let createAdmin = async () => {
    try{
        let findAdmin = await UserMuseumKNMII.findOne({email: adminLogin});
        if(findAdmin==null){
            const _user = new UserMuseumKNMII({
                email: adminLogin,
                role: 'admin',
                status: 'active',
                password: adminPass,
            });
            findAdmin = await UserMuseumKNMII.create(_user);
        }
        adminId = findAdmin._id.toString();
        let findColor = await ColorMissPolin.findOne({title: 'Ментол'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Ментол',
                RGB: '#91FDD5'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Розовый'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Розовый',
                RGB: '#FCA8DA'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Арбуз'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Арбуз',
                RGB: '#F0694D'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Малиновый'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Малиновый',
                RGB: '#DE2386'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Электрик'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Электрик',
                RGB: '#1919D4'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Голубой'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Голубой',
                RGB: '#65D3FC'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Золото'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Золото',
                RGB: '#E8D662'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Фуксия'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Фуксия',
                RGB: '#BF13B3'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Красный'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Красный',
                RGB: '#FF4500'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Синий'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Синий',
                RGB: '#0000FF'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Шампань'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Шампань',
                RGB: '#FFFFE0'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Молочный'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Молочный',
                RGB: '#FAFAE4'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Темно-синий'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Темно-синий',
                RGB: '#00008B'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Белый'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Белый',
                RGB: '#FFFFFF'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Черный'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Черный',
                RGB: '#000'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Серый'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Серый',
                RGB: '#D3D3D3'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Сирень'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Сирень',
                RGB: '#E59AEE'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Керамик'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Керамик',
                RGB: '#4DE0F0'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Персик'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Персик',
                RGB: '#FCDDBE'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Неон-лимон'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Неон-лимон',
                RGB: '#ADFF2F'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Светло-серый'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Светло-серый',
                RGB: '#F5F5F5'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Лиловый'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Лиловый',
                RGB: '#E605E6'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'КофеМолоко'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'КофеМолоко',
                RGB: '#895E2E'
            });
            await ColorMissPolin.create(color);
        }
        findColor = await ColorMissPolin.findOne({title: 'Коричневый'});
        if(findColor==null){
            const color = new ColorMissPolin({
                title: 'Коричневый',
                RGB: '#46050F'
            });
            await ColorMissPolin.create(color);
        }
    } catch(error) {
        console.error(error)
    }
}


module.exports.createAdmin = createAdmin;
module.exports.createAdmin = createAdmin;
module.exports.getAdminId = getAdminId;
module.exports.checkAdmin = checkAdmin;
