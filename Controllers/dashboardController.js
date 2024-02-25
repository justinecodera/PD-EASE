const PI = require('../Models/PDS');
const User = require('../Models/PDS');


module.exports.dashboard_get = (req, res) => {
    res.render('Dashboard', { title: 'Dashboard', page: 'home'});
}

//personal info
module.exports.personalinformation_get = (req, res) => {
    res.render('Dashboard', { title: 'Dashboard', page: 'personalinformation'});
}
module.exports.personalinformation_post = async (req, res) => {
    const {userId, middleName, nameExtension, birthDate, placeOfBirth, sex, civilStatus, height, 
        weight, bloodType, gsisId, pagibigId, philhealthId, sssId, tinId, agencyEmployeeId, telNo,
        citizenship} = req.body;
    const residentialAddress = req.body.residentialAddress;
    const permanentAddress = req.body.permanentAddress;

    const body = {userId, middleName, nameExtension, birthDate, placeOfBirth, sex, civilStatus, height, 
        weight, bloodType, gsisId, pagibigId, philhealthId, sssId, tinId, agencyEmployeeId, telNo,
        citizenship, residentialAddress, permanentAddress}

    console.log(body)
    try {
        const pi = new PI({userId, middleName, nameExtension, birthDate, placeOfBirth, sex, civilStatus, height, 
            weight, bloodType, gsisId, pagibigId, philhealthId, sssId, tinId, agencyEmployeeId, telNo,
            citizenship, residentialAddress, permanentAddress});
        console.log(pi);
    }
    catch (err) {
        console.log(err)
    }
}