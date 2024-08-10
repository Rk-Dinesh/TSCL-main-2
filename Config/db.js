const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/tscl";
const connection = mongoose.createConnection(mongoURI);
connection.on('open', () => {
    console.log("MongoDB Connected");
}).on('error', (error) => {
    console.log("MongoDB Connection error:", error);
});

module.exports = connection;
