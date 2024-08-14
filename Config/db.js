const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/tscl";
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  
  db.on('connected', () => {
    console.log('MongoDB connected');
  });
  
  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  const gfs = new mongoose.mongo.GridFSBucket(db, {
    bucketName: 'Attachments',
  });

  module.exports = { gfs};
