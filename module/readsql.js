let getCategories = (data) => {
    let Kategoria = {}
    let KategoriaSQL =  data.split('VALUES')
    KategoriaSQL = KategoriaSQL[1]
    while( KategoriaSQL.includes('('))
        KategoriaSQL =  KategoriaSQL.replace('(', '');
    while( KategoriaSQL.includes('\''))
        KategoriaSQL =  KategoriaSQL.replace('\'', '');
    while( KategoriaSQL.includes('\r\n'))
        KategoriaSQL =  KategoriaSQL.replace('\r\n', '');
    while( KategoriaSQL.includes(', '))
        KategoriaSQL =  KategoriaSQL.replace(', ', ',');
    KategoriaSQL =  KategoriaSQL.split('),')
    for(let i = 0; i<KategoriaSQL.length; i++){
        Kategoria[KategoriaSQL[i].split(',')[0].trim()] = {kategoria: KategoriaSQL[i].split(',')[1].replace(')', '').trim()}
    }
    return Kategoria
}

let getCount = (data, Colors) => {
    let Count = []
    let CountSQL =  data.split('VALUES')
    CountSQL = CountSQL[1]
    while(CountSQL.includes('('))
        CountSQL = CountSQL.replace('(', '');
    while(CountSQL.includes('\''))
        CountSQL = CountSQL.replace('\'', '');
    while(CountSQL.includes('\r\n'))
        CountSQL = CountSQL.replace('\r\n', '');
    while(CountSQL.includes(', '))
        CountSQL = CountSQL.replace(', ', ',');
    CountSQL = CountSQL.split('),')
    for(let i = 0; i<CountSQL.length; i++){
        Count[i] = {cod: CountSQL[i].split(',')[0].trim(), model: CountSQL[i].split(',')[1].trim(), color: Colors[CountSQL[i].split(',')[2].trim()].name, kolichestvo: CountSQL[i].split(',')[3].replace(')', '').trim()}
    }
    return Count
}

let getMaterials  = (data) => {
    let Colors = {}
    let ColorsSQL =  data.split('VALUES')
    ColorsSQL = ColorsSQL[1]
    while(ColorsSQL.includes('('))
        ColorsSQL = ColorsSQL.replace('(', '');
    while(ColorsSQL.includes('\''))
        ColorsSQL = ColorsSQL.replace('\'', '');
    while(ColorsSQL.includes('\r\n'))
        ColorsSQL = ColorsSQL.replace('\r\n', '');
    while(ColorsSQL.includes(', '))
        ColorsSQL = ColorsSQL.replace(', ', ',');
    ColorsSQL = ColorsSQL.split('),')
    for(let i = 0; i<ColorsSQL.length; i++){
        Colors[ColorsSQL[i].split(',')[0].trim()] = {name: ColorsSQL[i].split(',')[1].replace(')', '').trim()}
    }
    return Colors
}

let getColors  = (data) => {
    let Colors = {}
    let ColorsSQL =  data.split('VALUES')
    ColorsSQL = ColorsSQL[1]
    while(ColorsSQL.includes('('))
        ColorsSQL = ColorsSQL.replace('(', '');
    while(ColorsSQL.includes('\''))
        ColorsSQL = ColorsSQL.replace('\'', '');
    while(ColorsSQL.includes('\r\n'))
        ColorsSQL = ColorsSQL.replace('\r\n', '');
    while(ColorsSQL.includes(', '))
        ColorsSQL = ColorsSQL.replace(', ', ',');
    ColorsSQL = ColorsSQL.split('),')
    for(let i = 0; i<ColorsSQL.length; i++){
        Colors[ColorsSQL[i].split(',')[0].trim()] = {name: ColorsSQL[i].split(',')[1].replace(')', '').trim()}
    }
    return Colors
}

let getTypPrice  = (data) => {
    let TypPrice = {}
    let TypPriceSQL =  data.split('VALUES')
    TypPriceSQL = TypPriceSQL[1]
    while(TypPriceSQL.includes('('))
        TypPriceSQL = TypPriceSQL.replace('(', '');
    while(TypPriceSQL.includes('\''))
        TypPriceSQL = TypPriceSQL.replace('\'', '');
    while(TypPriceSQL.includes('\r\n'))
        TypPriceSQL = TypPriceSQL.replace('\r\n', '');
    while(TypPriceSQL.includes(', '))
        TypPriceSQL = TypPriceSQL.replace(', ', ',');
    TypPriceSQL = TypPriceSQL.split('),')
    for(let i = 0; i<TypPriceSQL.length; i++){
        TypPrice[TypPriceSQL[i].split(',')[0].trim()] = {name: TypPriceSQL[i].split(',')[1].replace(')', '').trim()}
    }
    return TypPrice
}

let getPrice  = (data, TypPrice) => {
    let Price = []
    let PriceSQL =  data.split('VALUES')
    PriceSQL = PriceSQL[1]
    while(PriceSQL.includes('('))
        PriceSQL = PriceSQL.replace('(', '');
    while(PriceSQL.includes('\''))
        PriceSQL = PriceSQL.replace('\'', '');
    while(PriceSQL.includes('\r\n'))
        PriceSQL = PriceSQL.replace('\r\n', '');
    while(PriceSQL.includes(', '))
        PriceSQL = PriceSQL.replace(', ', ',');
    PriceSQL = PriceSQL.split('),')
    for(let i = 0; i<PriceSQL.length; i++){
        Price[i] = {model: PriceSQL[i].split(',')[2].trim(),cod: PriceSQL[i].split(',')[0].trim(), typeprice: TypPrice[PriceSQL[i].split(',')[3].trim()].name, price: PriceSQL[i].split(',')[4].replace(')', '').trim()}
    }
    return Price
}

let getModels  = (data, Price, Count, Categories, Materials) => {
    let Data = []
    let DataSQL =  data.split('VALUES')
    DataSQL = DataSQL[1]
    while(DataSQL.includes('('))
        DataSQL = DataSQL.replace('(', '');
    while(DataSQL.includes('\r\n'))
        DataSQL = DataSQL.replace('\r\n', '');
    while(DataSQL.includes(', '))
        DataSQL = DataSQL.replace(', ', ',');
    DataSQL = DataSQL.split('),')
    for(let i = 0; i<DataSQL.length; i++){
        while(DataSQL[i].includes('\''))
            DataSQL[i] = DataSQL[i].replace('\'', '');
    }
    for(let i = 0; i<DataSQL.length; i++){
        //console.log(i)
        let material = Materials[DataSQL[i].split(',')[6].trim()]
        if(material!=undefined)
            material = material.name
        else
            material = 'не указано'
        let kategoria = Categories[DataSQL[i].split(',')[8].trim()]
        if(kategoria!=undefined)
            kategoria = kategoria.kategoria
        else
            kategoria = 'не указано'
        Data[i] = {
            cod: DataSQL[i].split(',')[0].trim(),
            name: DataSQL[i].split(',')[1].trim(),
            weight: DataSQL[i].split(',')[4].trim(),
            line: DataSQL[i].split(',')[5].trim(),
            material: material,
            status: DataSQL[i].split(',')[7].trim(),
            kategoria: kategoria,
            price: Price.filter(price => price.model == DataSQL[i].split(',')[0].trim()),
            count: Count.filter(count => count.model == DataSQL[i].split(',')[0].trim()),
        }
    }
    return Data
}

module.exports.getCategories = getCategories;
module.exports.getCount = getCount;
module.exports.getMaterials = getMaterials;
module.exports.getColors = getColors;
module.exports.getTypPrice = getTypPrice;
module.exports.getPrice = getPrice;
module.exports.getModels = getModels;
