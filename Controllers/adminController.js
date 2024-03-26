const User = require('../Models/users');
const {PI, FB, ED, EB, WE, VW, TR, OI, QT, RR, SR, profile, PDF} = require('../Models/PDS');
const pdsS = require('../Models/tracker');
const Admin = require('../Models/admin');

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

module.exports.loginAdmin_get = (req, res) => {
    res.render('adminLogin', { title: 'Admin'});
}
module.exports.admin_get = (req, res) => {
    res.render('admin/admin', { title: 'Admin'});
}

module.exports.newadmin_get = (req, res) => {
    res.render('admin/newAdmin', { title: 'Admin'});
}
module.exports.adminsignup_post = async (req, res) => {
    const {firstname, lastname, institutionalEmail, password, access } = req.body;
    try {
        const admin = await Admin.create({firstname, lastname, institutionalEmail, password, accessType: access })
        // .then((result) => {
        //     sendOTPVerificationEmail();
        // });

    
        // magrurun lang dapat to pag verified na email
        // console.log(token);
        res.status(201).json({ status: 'Success' });
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

module.exports.adminUsers_get = async (req, res) => {
    try {
        const usersWithProfileAndPDS = await User.aggregate([
            {
                $lookup: {
                    from: 'profiles', // name of the 'profile' collection
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'profileData'
                }
            },
            {
                $lookup: {
                    from: 'pdssubmissions', // name of the 'PDS' collection
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'PDSData'
                }
            }
        ]);
        // console.log(usersWithProfileAndPDS)
        res.render('admin/searchUser', { title: 'Admin', userdatas: usersWithProfileAndPDS });
    } catch (err) {
        console.error('Error fetching users with profile and PDS data:', err);
        res.status(500).send('Error fetching users with profile and PDS data');
    }
}
module.exports.userProfile_get = async (req, res) => {
    const userId = req.params.id;
    console.log(userId)
    const userdata = await User.findById(userId)
    const profiledata = await profile.findOne({userId: userId})
    const pdsdata = await pdsS.findOne({userId: userId})
    console.log(userdata, profiledata, pdsdata)
    try {
        
        res.render('admin/userprofile', { title: 'Admin', userdata: userdata, profiledata: profiledata, pdsdata: pdsdata });
    } catch (err) {
        console.error('Error fetching users with profile and PDS data:', err);
        res.status(500).send('Error fetching users with profile and PDS data');
    }
}