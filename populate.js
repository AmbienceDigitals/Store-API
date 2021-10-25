// dynamically add json to database
require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        // delete all that is there should there be any 
        await Product.deleteMany();
        // create a database with the contents of jsonProducts
        await Product.create(jsonProducts);
        // if all works exit
        process.exit(0)
        console.log('SUCCESS!!!')
    } catch (error) {
        console.log(error)
        // if there is an error
        process.exit(1)
    }
}

start()