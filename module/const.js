const url = '/',
    adminLogin = 'admin',
    adminPass = '5Qtg?TFQQj';

const searchRepeat = (arr1)=>{
    let mf = 1;
    let m = 0;
    let item = arr1[0];
    for (let i=0; i<arr1.length; i++)
    {
        for (let j=i; j<arr1.length; j++)
        {
            if (arr1[i] == arr1[j]){
                m++;
            }
            if (mf<m)
            {
                mf=m;
                item = arr1[i];
                console.log(item)
            }
        }
        m=0;
    }
    console.log(item)
    return item;
}

module.exports.adminPass = adminPass;
module.exports.adminLogin = adminLogin;
module.exports.url = url;
module.exports.searchRepeat = searchRepeat;
