const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MaterialsSchema = new Schema({
    name: {
        type: String,
        minLength: 1,
        maxLength: 1000
    }
});

MaterialsSchema.virtual('url').get(function () {
    return `/materials/${this._id}`;
});

module.exports = mongoose.model('Materials', MaterialsSchema);

