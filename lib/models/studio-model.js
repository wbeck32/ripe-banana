const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Film = require('./film-model');

const studioSchema = new Schema({
    name: { type: String, required: true },
    address: {
        city: String,
        state: String,
        country: String
    }
});

studioSchema.statics.verifyRemove = function(id) {
    return Film.existsFor(id)
    .then(exists => {
        if(exists) {
            throw {
                code: 400,
                error: 'Cannot remove Studio when it has Films'
            };
        }
        else return this.findByIdAndRemove(id);
    });
};

module.exports = mongoose.model('Studio', studioSchema);

