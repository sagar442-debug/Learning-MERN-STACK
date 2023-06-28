const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/copying"

const connectToMongo = async ()=>{
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected to the mongo db")
    } catch (error) {
            console.log("There was an error", error)
    }   
}

module.exports = connectToMongo;

