const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
    title: { type: String, required: true },
    studio: { type: Schema.Types.ObjectId, ref: 'Studio', required: true },
    released: { type: Number, required: true },
    cast: [{
        actor: {
            role: {type: String, required: false }
        }
    }]
});

module.exports = mongoose.model('Film', filmSchema);