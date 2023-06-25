const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  username: { type: String, required: true },
  phonenumber: { type: Number, required: true , min : 1000000000, max : 9999999999},
  email: { type: String, required: true },
  image:{type: String}
});

const Database = mongoose.model('Database', contactSchema);

module.exports = Database;