const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserOtpVerificationSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    otp: String,
    createdAT: Date,
    expiresAt: Date
})
const UserOtpVerification = mongoose.model("UserOtpVerification", UserOtpVerificationSchema);
module.exports = UserOtpVerification;