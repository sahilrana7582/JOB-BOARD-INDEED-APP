const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const url = process.env.DB_URL;

    await mongoose.connect(url);
    console.log('DataBase Connect');
  } catch (e) {
    console.log('Error While DB Connection', e);
  }
};

module.exports = dbConnect;
