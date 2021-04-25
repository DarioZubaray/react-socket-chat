const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.DB_CNN_URL, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log('Database online');
    } catch (error) {
        console.error(error);
        throw new Error('Error on database connection');
    }
}

module.exports = { dbConnection }
