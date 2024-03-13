const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserOtpVerificationSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    otp: {
        type: String
    },
    createdAT: Date,
    expiresAt: Date
})

UserOtpVerificationSchema.statics.verify = async function(userId, otp) {
    const otpdata = await this.findOne({ userId });
    if (otpdata === null) {
        throw Error('OTP does not Exist')
    } else {
        const currentTime = new Date();
        if (currentTime > otpdata.expiresAt) {
            throw Error('OTP IS EXPIRED')
        } else {
            if (otpdata.otp === otp) {
                return otpdata
            } else {
                throw Error('Incorrect OTP')
            }
        }
    }
}

const UserOtpVerification = mongoose.model("UserOtpVerification", UserOtpVerificationSchema);
module.exports = UserOtpVerification;