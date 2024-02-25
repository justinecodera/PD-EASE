const mongoose = require('mongoose');
const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const personalInfoSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
    },
    middleName: {
        type: String,
        required: true,
        lowercase: true
    },
    nameExtension: {
        type: String,
        lowercase: true
    },
    birthDate: {
        type: Date,
        required: true,
        lowercase: true
    },
    placeOfBirth: {
        type: String,
        required: true,
        lowercase: true,
    },
    sex: {
        type: String,
        required: true,
        lowercase: true
    },
    civilStatus: {
        type: String,
        required: true,
        lowercase: true
    },
    height: {
        type: Number,
        required: true,
        lowercase: true
    },
    weight: {
        type: Number,
        required: true,
        lowercase: true
    },
    bloodType: {
        type: String,
        required: true,
        lowercase: true
    },
    gsisId: {
        type: String,
        required: true,
        lowercase: true
    },
    pagibigId: {
        type: String,
        required: true,
        lowercase: true
    },
    philhealthId: {
        type: String,
        required: true,
        lowercase: true
    },
    sssId: {
        type: String,
        required: true,
        lowercase: true
    },
    tinId: {
        type: String,
        required: true,
        lowercase: true
    },
    agencyEmployeeId: {
        type: String,
        required: true,
        lowercase: true
    },
    citizenship: {
        type: String,
        required: true,
        lowercase: true
    },
    residentialAddress: {
        HBLN: {
            type: String,
            required: true,
            lowercase: true
        },
        Strt: {
            type: String,
            required: true,
            lowercase: true
        },
        SubVil: {
            type: String,
            required: true,
            lowercase: true
        },
        Barangay: {
            type: String,
            required: true,
            lowercase: true
        },
        City: {
            type: String,
            required: true,
            lowercase: true
        },
        Province: {
            type: String,
            required: true,
            lowercase: true
        },
        ZipCode: {
            type: String,
            required: true,
            lowercase: true
        }
    },
    permanentAddress: {
        HBLN: {
            type: String,
            required: true,
            lowercase: true
        },
        Strt: {
            type: String,
            required: true,
            lowercase: true
        },
        SubVil: {
            type: String,
            required: true,
            lowercase: true
        },
        Barangay: {
            type: String,
            required: true,
            lowercase: true
        },
        City: {
            type: String,
            required: true,
            lowercase: true
        },
        Province: {
            type: String,
            required: true,
            lowercase: true
        },
        ZipCode: {
            type: String,
            required: true,
            lowercase: true
        }
    },
    
    telNo: {
        type: String,
        required: true,
        lowercase: true
    },
}, {timestamps: true});

const PI = mongoose.model('pi', personalInfoSchema);
module.exports = PI;