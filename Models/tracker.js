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

const userlogsSchema = new Schema({ 
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    action: {
        type: String
    }
}, {timestamps: true});
const adminlogsSchema = new Schema({ 
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    action: {
        type: String
    }
}, {timestamps: true});

const pdsS = mongoose.model('pdssubmission', pdssubmission);
const userlogs = mongoose.model('userlog', userlogsSchema);
const adminlogs = mongoose.model('adminlog', adminlogsSchema);
module.exports = {pdsS, userlogs, adminlogs};