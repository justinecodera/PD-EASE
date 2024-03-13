const User = require('../Models/users');
const UserOtpVerification = require('../Models/userVerificationOTP');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')

//handle errors
const handleErrors = (err) => {
    // console.log('start', err.message, err.code, 'end');
    let errors = {institutionalEmail: '',password: '', otp: '' };

    //
    if (err.message === 'OTP does not Exist') {
        errors.otp = 'OTP does not Exist';
    }
    if (err.message === 'OTP IS EXPIRED') {
        errors.otp = 'OTP IS EXPIRED';
    }
    if (err.message === 'Incorrect OTP') {
        errors.otp = 'Incorrect OTP';
    }

    //incorrect email
    if (err.message === 'Email Not Registered') {
        errors.institutionalEmail = 'Email Not Registered';
    }

    //incorrect password
    if (err.message === 'Incorrect Password') {
        errors.password = 'Incorrect Password';
    }

    // duplicate error codes
    if (err.code === 11000){
        errors.institutionalEmail = "Email is already used";
        return errors;
    }

    //validation errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

//create a token function
const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
    // console.log('hello');
    // console.log(id);

    return jwt.sign({ id }, 'sikretong malupet pwede pabulong', {
       
    })
}

module.exports.signup_get = (req, res) => {
    res.render('signup', { title: 'signup'});
}
module.exports.signup_post = async (req, res) => {
    const {firstname, lastname, institutionalEmail, password } = req.body;
    try {
        const user = await User.create({firstname, lastname, institutionalEmail, password, verified: false})
        // .then((result) => {
        //     sendOTPVerificationEmail();
        // });

    
        // magrurun lang dapat to pag verified na email
        const token = createToken(user._id);
        // console.log(token);
        res.cookie('PEEDS', token, {httpOnly: true});
        res.status(201).json({user: user._id});
    }
    catch (err){
        const errors = handleErrors(err);
        console.log(res.json({ errors }));
        console.log(err.message)
    }


    // user.save()
    //     .then((result) => {
    //         res.redirect('/')
    //     })
    //     .catch((err) => {
    //         handleErrors(err)
    //     })
}
module.exports.login_get = (req, res) => {
    res.render('index', { title: 'Home'});
}
module.exports.login_post = async (req, res) => {
    const {institutionalEmail, password } = req.body;

    try {
        const user = await User.login(institutionalEmail, password);
        const token = createToken(user._id);
        // console.log(token);
        res.cookie('PEEDS', token, {httpOnly: true});
        res.status(200).json({user: user._id, userloggedin: 'yes'});
    }
    catch (err) {
        console.log(err)
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('PEEDS', '', {maxAge: 1});
    res.redirect('/login');
}


module.exports.verifyOTP_post = async (req, res) => {
    const {userId, otp} = req.body
    const otpdata = await UserOtpVerification.findOne({userId: userId})
    try {
        const user = await UserOtpVerification.verify(userId, otp);
        console.log('hello');
        await User.updateOne({_id: userId}, {verified: true})
        await UserOtpVerification.deleteOne({userId: userId})
        res.status(200).json({user: user.userId, userloggedin: 'yes'});
    } catch (err) {
        // Handle any errors that occur within the try block
        console.log(err)
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}



module.exports.sendOTP_get = async (req, res) => {
    const userId = req.params.id;
    const userdata = await User.findById(userId);
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const userotp = await UserOtpVerification.exists({ userId: userId });
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'pdeasenoreply@gmail.com',
            pass: 'lqfe ozbs ljln lquq'
        }
    })

    const mailOptions = {
        from: 'pdeasenoreply@gmail.com',
        to: userdata.institutionalEmail,
        subject: 'Your PD-EASE Verification One-Time Password (OTP)',
    text: `Subject: Your PD-EASE Verification One-Time Password (OTP)\n\n` +
        `Dear ${userdata.firstname},\n\n` +
        `We hope this message finds you well. Thank you for choosing PD-EASE to enhance your experience. To ensure the security of your account, we kindly request your cooperation in completing the verification process using the following One-Time Password (OTP):\n\n` +
        `OTP: ${otp}\n\n` +
        `This unique code is valid for the next 10 minutes. For your safety, please refrain from sharing this OTP with anyone.\n\n` +
        `Should you not have initiated this verification, please disregard this email. However, if you find yourself repeatedly receiving such emails, we encourage you to reach out to our dedicated support team promptly.\n\n` +
        `Your trust in PD-EASE is greatly appreciated.\n\n` +
        `Best Regards,\n\n` +
        `PD-EASE Support Team\n` +
        `Contact: pdeasesupport@gmail.com`
    };

    let redirectTo = '/verifyotp/' + userId; // Initialize redirection URL here

    try {
        const currentDate = new Date();
        const expiresAt = new Date(currentDate.getTime() + 10 * 60000);

        if (userotp === null) {
            // Create new entry
            await UserOtpVerification.create({ userId, otp, createdAT: currentDate, expiresAt: expiresAt });
        } else {
            // Update existing entry
            await UserOtpVerification.updateOne({ userId }, { otp, createdAT: currentDate, expiresAt: expiresAt });
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send('Error Sending Email');
            } else {
                // console.log('Email sent: ' + info.response);
                res.redirect(redirectTo);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error Processing Request');
    }
}

module.exports.verifyOTP_get = (req, res) => {
    const userId = req.params.id;
    res.render('verifyEmail', {title: 'Verify Your Email'});
}
