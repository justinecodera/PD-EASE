const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdssubmission = new Schema({ 
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true
    },
    comment: {
        type: String
    }
}, {timestamps: true});

const pdsS = mongoose.model('pdssubmission', pdssubmission);
module.exports = pdsS;