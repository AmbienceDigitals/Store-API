const Product = require('../models/product');


const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).sort('-name').select('name price')
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields} = req.query;

    const queryObject = {};
    // featured query
    if(featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    // company query
    if(company) {
        queryObject.company = company;
    }

    // name query
    if(name) {
        // using regex to match patterns
        queryObject.name = {$regex: name, $options: 'i'};
    }
    let result = Product.find(queryObject);
    
    // sorting
    if(sort) {
        const sortList = sort.split(',').join('');
        result = result.sort(sortList)
    }
    else {
        result = result.sort('createdAt')
    }

    // selection
    if(fields) {
        const fieldsList = fields.split(',').join('');
        result = result.select(fieldsList);
    }

    // creating pagination
    const page =Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    // determining number of items to be skipped per page
    // if page = 1, number of skipped item is zero and it increase per page based on limit
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit)

    const products = await result;
    res.status(200).json({products, nbHits: products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}