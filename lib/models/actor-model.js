const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: false
    },
    pob: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('Actors', schema);
