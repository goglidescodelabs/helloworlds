const mongoose = require('mongoose');  
const Schema = mongoose.Schema;

let BookSchema = new Schema({  
    name: {type: String, required: true},  
    author: {type: String, required: true},
    isbn : {type: Number, required: true},
});
  
module.exports = mongoose.model('Book', BookSchema);