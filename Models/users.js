const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
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
        validate: [isEmail, 'Please Enter a Valid Email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a Password'],
        minlength: [6, 'minimum password length is 6 characters']
    }
}, {timestamps: true});

//fire a function before doc is saved to db
usersSchema.pre('save', async function (next){
    const salt =  await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//static method to login user
usersSchema.statics.login = async function(institutionalEmail, password) {
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

const User = mongoose.model('User', usersSchema);
module.exports = User;