const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

function validateEmailDomain(email) {
    // Regular expression to match email addresses with "@rtu.edu.ph" domain
    const regex = /^[a-zA-Z0-9._%+-]+@rtu\.edu\.ph$/;
    return regex.test(email);
}

const passwordComplexity = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // At least one letter and one number, minimum 6 characters

const adminSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter your Name']
    },
    lastname: {
        type: String,
        required: [true, 'Please enter Surname']
    },
    institutionalEmail: {
        type: String,
        required: [true, 'Please enter an Email'],
        unique: true,
        lowercase: true,
        validate: [
            { validator: isEmail, msg: 'Please Enter a Valid Email' },
            { validator: validateEmailDomain, msg: 'Email domain must be @rtu.edu.ph' }
        ]
    },
    password: {
        type: String,
        required: [true, 'Please enter a Password'],
        validate: {
            validator: function(v) {
                return passwordComplexity.test(v);
            },
            message: 'Password must contain at least one letter, one number, and be minimum 6 characters long'
        }
    },
    accessType: {
        type: String
    }
    
}, {timestamps: true});


//fire a function before doc is saved to db
adminSchema.pre('save', async function (next){
    const salt =  await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//static method to login user
adminSchema.statics.login = async function(institutionalEmail, password) {
    const user = await this.findOne({ institutionalEmail });
    if (user) {
        const auth = await bcrypt.compare(password, user.password); 
        if (auth) {
            return user;
        }    
        throw Error('Incorrect Password')
    }
    throw Error('Email Not Registered')
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;