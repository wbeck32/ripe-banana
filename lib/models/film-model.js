const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
    title: { type: String, required: true },
    studio: { type: Schema.Types.ObjectId, ref: 'Studio', required: true },
    released: { type: Number, required: true },
    cast:  [
        {
            role: { type: String, required: false },
            actor: { type: Schema.Types.ObjectId, ref: 'Actor', required: true }
        }
    ],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Reviews', required: true }]
});

module.exports = mongoose.model('Film', filmSchema);