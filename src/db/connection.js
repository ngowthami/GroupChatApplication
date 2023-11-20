const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

function connectToDatabase() {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database...");
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });
}
module.exports = connectToDatabase;
