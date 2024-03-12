const User = require('../Models/users');
const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = (err) => {
    // console.log('start', err.message, err.code, 'end');
    let errors = {institutionalEmail: '',password: '', };

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

// const sendOTPVerificationEmail = async () => {
//     try {
//         const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
//     } catch (error) {
        
//     }
// }