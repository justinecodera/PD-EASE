const jwt = require('jsonwebtoken');
const User = require('../Models/users');
const Admin = require('../Models/admin');

const requireAuth = (req, res, next) => {
    //get token
    const token = req.cookies.PEEDS;
    const admintoken = req.cookies.ADMIN;
    // check if token exists
    if (token) {
        jwt.verify(token, 'sikretong malupet pwede pabulong', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                // console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.redirect('/login');
    }
}
const requireAuthAdmin = (req, res, next) => {
    //get token
    const token = req.cookies.PEEDS;
    const admintoken = req.cookies.ADMIN;
    // check if token exists
    if (admintoken) {
        jwt.verify(admintoken, 'sikretong malupet pwede pabulong', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/loginAdmin');
            }
            else {
                // console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.redirect('/loginAdmin');
    }
}

//check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.PEEDS;
    // console.log("user present");
    if (token) {
        console.log('token present');
        jwt.verify(token, 'sikretong malupet pwede pabulong', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                // console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                // console.log('User '+user.firstname+ ' is online' );
                res.locals.user = user;
                next();
            }
        });
    }
    else {
        console.log('token NOT present');
        res.locals.user = null;
        next();
    }
}
const checkAdmin = (req, res, next) => {
    const admintoken = req.cookies.ADMIN;
    // console.log("user present");
    if (admintoken) {
        jwt.verify(admintoken, 'sikretong malupet pwede pabulong', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.admin = null;
                next();
            }
            else {
                // console.log(decodedToken);
                let admin = await Admin.findById(decodedToken.id);
                // console.log('Admin '+admin.firstname+' '+admin.lastname+ ' is online at '+ new Date().toLocaleString() );
                res.locals.admin = admin;
                next();
            }
        });
    }
    else {
        res.locals.admin = null;
        next();
    }
}

module.exports = { requireAuth, checkUser, checkAdmin, requireAuthAdmin };