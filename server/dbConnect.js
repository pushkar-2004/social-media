const mongoose = require('mongoose');


module.exports = async() => {
    const mongoUri = 'mongodb+srv://pushkar2004:pushkar2004@cluster0.v0w7k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    try{
        const connect = await mongoose.connect(mongoUri);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}