const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UrlSchema = new Schema({
    shortened: {type: String, required: true},
    original: {type: String, required: true}    
});

module.exports = mongoose.model('Url', UrlSchema);
