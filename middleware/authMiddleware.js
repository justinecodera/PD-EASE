const jwt = require('jsonwebtoken');
const User = require('../Models/users');

const requireAuth = (req, res, next) => {
    //get token
    const token = req.cookies.PEEDS;

    // check if token exists
    if (token) {
        jwt.verify(token, 'sikretong malupet pwede pabulong', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/');
            }
            else {
                console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.redirect('/');
    }
}

//check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.PEEDS;

    if (token) {
        jwt.verify(token, 'sikretong malupet pwede pabulong', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                console.log(user);
                res.locals.user = user;
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };