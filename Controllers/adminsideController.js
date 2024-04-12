const User = require('../Models/users');
const globalsettings = require('../Models/globalSetting');
const {PI, FB, ED, EB, WE, VW, TR, OI, QT, RR, SR, profile, PDF} = require('../Models/PDS');
const {pdsS, userlogs, adminlogs} = require('../Models/tracker');
const Admin = require('../Models/admin');

const moment = require('moment');

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
module.exports.admin_get = async (req, res) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 00:00:00:000 for the start of the day
    const userlogdatas = await userlogs.countDocuments({
        action: 'Logged In',
        createdAt: { $gte: today, $lt: new Date(today.getTime() + 86400000) } // 86400000 milliseconds = 24 hours
    });
    const usersubmitdatas = await userlogs.countDocuments({
        action: 'Submit PDS',
        createdAt: { $gte: today, $lt: new Date(today.getTime() + 86400000) } // 86400000 milliseconds = 24 hours
    });
    const allusersinpasig = await User.aggregate([
        {
            $lookup: {
                from: 'profiles',
                localField: '_id',
                foreignField: 'userId',
                as: 'profileData'
            }
        },
        {
            $lookup: {
                from: 'pdssubmissions',
                localField: '_id',
                foreignField: 'userId',
                as: 'PDSData'
            }
        },
        {
            $match: {
                'profileData.campus': 'Pasig'
            }
        }
    ]);
    const allusersinboni = await User.aggregate([
        {
            $lookup: {
                from: 'profiles',
                localField: '_id',
                foreignField: 'userId',
                as: 'profileData'
            }
        },
        {
            $lookup: {
                from: 'pdssubmissions',
                localField: '_id',
                foreignField: 'userId',
                as: 'PDSData'
            }
        },
        {
            $match: {
                'profileData.campus': 'Boni'
            }
        }
    ]);
    const submittedinBoni = await User.aggregate([
        {
            $lookup: {
                from: 'profiles',
                localField: '_id',
                foreignField: 'userId',
                as: 'profileData'
            }
        },
        {
            $lookup: {
                from: 'pdssubmissions',
                localField: '_id',
                foreignField: 'userId',
                as: 'PDSData'
            }
        },
        {
            $match: {
                verified: true
            }
        },
        {
            $match: {
                'PDSData.status': 'Submitted'
            }
        },
        {
            $match: {
                'profileData.campus': 'Boni'
            }
        }
    ]);
    const approvedinBoni = await User.aggregate([
        {
            $lookup: {
                from: 'profiles',
                localField: '_id',
                foreignField: 'userId',
                as: 'profileData'
            }
        },
        {
            $lookup: {
                from: 'pdssubmissions',
                localField: '_id',
                foreignField: 'userId',
                as: 'PDSData'
            }
        },
        {
            $match: {
                verified: true
            }
        },
        {
            $match: {
                'PDSData.status': 'Approved'
            }
        },
        {
            $match: {
                'profileData.campus': 'Boni'
            }
        }
    ]);
    const generatedinBoni = await User.aggregate([
        {
            $lookup: {
                from: 'profiles',
                localField: '_id',
                foreignField: 'userId',
                as: 'profileData'
            }
        },
        {
            $lookup: {
                from: 'pdssubmissions',
                localField: '_id',
                foreignField: 'userId',
                as: 'PDSData'
            }
        },
        {
            $match: {
                verified: true
            }
        },
        {
            $match: {
                'PDSData.status': 'Generated'
            }
        },
        {
            $match: {
                'profileData.campus': 'Boni'
            }
        }
    ]);
    const submittedinPasig = await User.aggregate([
        {
            $lookup: {
                from: 'profiles',
                localField: '_id',
                foreignField: 'userId',
                as: 'profileData'
            }
        },
        {
            $lookup: {
                from: 'pdssubmissions',
                localField: '_id',
                foreignField: 'userId',
                as: 'PDSData'
            }
        },
        {
            $match: {
                verified: true
            }
        },
        {
            $match: {
                'PDSData.status': 'Submitted'
            }
        },
        {
            $match: {
                'profileData.campus': 'Pasig'
            }
        }
    ]);
    const approvedinPasig = await User.aggregate([
        {
            $lookup: {
                from: 'profiles',
                localField: '_id',
                foreignField: 'userId',
                as: 'profileData'
            }
        },
        {
            $lookup: {
                from: 'pdssubmissions',
                localField: '_id',
                foreignField: 'userId',
                as: 'PDSData'
            }
        },
        {
            $match: {
                verified: true
            }
        },
        {
            $match: {
                'PDSData.status': 'Approved'
            }
        },
        {
            $match: {
                'profileData.campus': 'Pasig'
            }
        }
    ]);
    const generatedinPasig = await User.aggregate([
        {
            $lookup: {
                from: 'profiles',
                localField: '_id',
                foreignField: 'userId',
                as: 'profileData'
            }
        },
        {
            $lookup: {
                from: 'pdssubmissions',
                localField: '_id',
                foreignField: 'userId',
                as: 'PDSData'
            }
        },
        {
            $match: {
                verified: true
            }
        },
        {
            $match: {
                'PDSData.status': 'Generated'
            }
        },
        {
            $match: {
                'profileData.campus': 'Pasig'
            }
        }
    ]);
    const notupdatedinboni = allusersinboni.length - (approvedinBoni.length+generatedinBoni.length+submittedinBoni.length)
    const notupdatedinpasig = allusersinpasig.length - (approvedinPasig.length+generatedinPasig.length+submittedinPasig.length)
    console.log()
    res.render('admin/admin', { title: 'Admin', userlogdatas: userlogdatas, usersubmitdatas: usersubmitdatas, allusersinboni: allusersinboni, allusersinpasig: allusersinpasig, generatedinPasig: generatedinPasig.length, approvedinPasig: approvedinPasig.length, submittedinPasig: submittedinPasig.length, generatedinBoni: generatedinBoni.length, approvedinBoni: approvedinBoni.length, submittedinBoni: submittedinBoni.length, notupdatedinpasig: notupdatedinpasig, notupdatedinboni: notupdatedinboni });
}

module.exports.newadmin_get = async (req, res) => {
    const admindatas = await Admin.find()
    res.render('admin/newAdmin', { title: 'Admin', admindatas: admindatas});
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
module.exports.adminProfile_get = async (req, res) => {
    const adminId = req.params.id;
    const admindata = await Admin.findById(adminId)
    try {
        
        res.render('admin/adminprofile', { title: 'Admin', admindata: admindata});
    } catch (err) {
        console.error('Error fetching users with profile and PDS data:', err);
        res.status(500).send('Error fetching users with profile and PDS data');
    }
}

module.exports.updateuserprofile_post = async (req, res) => {
    const {userId, firstname, lastname, institutionalEmail, campus, employmentStatus} = req.body;
    try {
        const user = await User.updateOne({_id: userId},{firstname, lastname, institutionalEmail})
        const userprofile = await profile.exists({userId: userId});
        // console.log(userprofile)
        if (userprofile === null) {
            //create new entry
            try {
                
            const userprofilecreate = await profile.create({userId: userId, campus, employmentStatus})
                // console.log(userprofilecreate);
                res.status(200).json({status: 'Update Success'});
            }
            catch (err) {
                res.status(200).json({status: 'Update Failed', notification: 'saved'});
                console.log(err)
            }
        } else {
            //update existing entry
            try {
                
            const userprofileupdate = await profile.updateOne({userId: userId}, {employmentStatus, campus})
                    // console.log(userprofileupdate)
                    res.status(200).json({status: 'Update Success'});
            }
            catch (error){
                console.log(error)
                res.status(200).json({status: 'Update Failed'});
            }
        }    
    }
    catch (err){
        const errors = handleErrors(err);
        console.log(res.json({ errors }));
        console.log(err.message)
    }
}
module.exports.updateadminprofile_post = async (req, res) => {
    const {userId, firstname, lastname, institutionalEmail, accessType} = req.body;
    try {
        const user = await Admin.updateOne({_id: userId},{firstname, lastname, institutionalEmail , accessType})
        res.status(200).json({status: 'Update Success'});
        
    }
    catch (err){
        const errors = handleErrors(err);
        console.log(res.json({ errors }));
        console.log(err.message)
        res.status(200).json({status: 'Update Failed'});
    }
}

module.exports.updateuserrestriction_post = async (req, res) => {
    const {userId, restrictaccount} = req.body;
    // console.log(userId, "hello")
    try {
                
        const userrestrictionupdate = await User.updateOne({_id: userId}, {restricted: restrictaccount})
                // console.log(userrestrictionupdate)
                res.status(200).json({status: 'Update Success'});
        }
        catch (error){
            // console.log(error)
            res.status(500).json({status: 'Update Failed'});
        }
    

    // user.save()
    //     .then((result) => {
    //         res.redirect('/')
    //     })
    //     .catch((err) => {
    //         handleErrors(err)
    //     })
}

module.exports.downloadPDS_get = async (req, res) => {
    const userId = req.params.id;
    const pdfData = await PDF.findOne({userId: userId});
    res.setHeader('Content-disposition', 'attachment; filename=Personal_Data_Sheet.pdf');
    res.setHeader('Content-type', 'application/pdf');
    if(pdfData.status === 'Approved'){
        res.send(pdfData.approved_pdf);
    }else{
        res.send(pdfData.pdf_data);
    }
    
    
}

module.exports.deleteuser_delete = async (req, res) => {
    const userId = req.params.id
    try {
        const userdelete = await User.deleteOne({_id: userId})
        res.redirect('/adminUsers');
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'Delete Failed'});
    }
}
module.exports.unsubmitpds_get = async (req, res) => {
    const userId = req.params.id
    try {
        const unsubmit = await pdsS.updateOne({userId: userId}, {status: 'Generated'})
        res.redirect('/userProfile/'+userId)
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'Delete Failed'});
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('ADMIN', '', {maxAge: 1});
    res.redirect('/loginadmin');
}

module.exports.pdssettings_get = async (req, res) => {
    const settings = await globalsettings.findOne()
    const submissionDate = moment(settings.submissionDate).format('YYYY-MM-DD')
    res.render('admin/pdssettings', { title: 'Admin', settings: settings, submissionDate: submissionDate});
    
}
module.exports.pdssettings_post = async (req, res) => {
    const {inputdate, pdssubmissions, announcement} = req.body;
    const settings = await globalsettings.findOne()
  
    const settingID = settings._id
    const updatesettings = await globalsettings.updateOne({_id: settingID}, {submissionDate: inputdate,openSubmission: pdssubmissions, anouncement: announcement});
    res.status(200).json({status: 'Update Success'});
      
  
}

module.exports.logs_get = async (req, res) => {
    const userlogdatas = await userlogs.find()
    const adminlogdatas = await adminlogs.find()
    console.log(adminlogdatas)
    res.render('admin/logs', { title: 'Admin', userlogdatas: userlogdatas, adminlogdatas: adminlogdatas});
}