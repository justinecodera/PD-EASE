const { isEmpty } = require('validator');
const {PI, FB, ED, EB, WE, VW, TR, OI, QT, RR, SR, profile} = require('../Models/PDS');
const User = require('../Models/users');
const moment = require('moment');
const pdsS = require('../Models/tracker');


module.exports.dashboard_get = async (req, res) => {
    const userid = req.params.id;
    const userdata = await User.findById(userid);
    const piData = await PI.findOne({userId: userid});
    const fbData = await FB.findOne({userId: userid});
    const edData = await ED.findOne({userId: userid});
    const ebData = await EB.findOne({userId: userid});
    const weData = await WE.findOne({userId: userid});
    const vwData = await VW.findOne({userId: userid});
    const trData = await TR.findOne({userId: userid});
    const oiData = await OI.findOne({userId: userid});
    const qtData = await QT.findOne({userId: userid});
    const rrData = await RR.findOne({userId: userid});
    const srData = await SR.findOne({userId: userid});
    const pdsSData = await pdsS.findOne({userId: userid});


    res.render('Dashboard', { title: 'Dashboard', page: 'home', pi: piData, fb: fbData, ed: edData, eb: ebData, we: weData, vw: vwData, tr: trData, oi: oiData, qt: qtData, rr: rrData, sr: srData, pdsSData: pdsSData});
}

//personal info
module.exports.personalinformation_get = async (req, res) => {
    const id = req.params.id;
    await PI.findOne({userId: id})
        .then(result => {
            console.log(result)
            if (result === null) {
                console.log(result,'eto ba nagpiprint')
                res.render('Dashboard', {pibirthDate: null, pi: null, title: "Personal Information", page: "personalinformation"});
            } else {
                convertedBirthdate = moment(result.birthDate).format('YYYY-MM-DD');
                res.render('Dashboard', {pibirthDate: convertedBirthdate, pi: result, title: "Personal Information", page: "personalinformation"});
                console.log(result,'eto ba nagpiprint')
            }
            
        })
        .catch (err => {
            console.log(err)
        })
}
module.exports.personalinformation_post = async (req, res) => {

    const {userId, middleName, nameExtension, birthDate, placeOfBirth, sex, civilStatus, height, 
        weight, bloodType, gsisId, pagibigId, philhealthId, sssId, tinId, agencyEmployeeId, telNo, celNo,
        citizenship} = req.body;
    const {dcType, dcCountry} = req.body.dualCitizenship;
    const {raHBLN, raStrt, raSubVil, raBarangay, raCity, raProvince, raZipCode} = req.body.residentialAddress;
    const {paHBLN, paStrt, paSubVil, paBarangay, paCity, paProvince, paZipCode} = req.body.permanentAddress;
    const userpi = await PI.exists({userId: userId});
    if (userpi === null) {
        //create new entry
        try {
            const picreate = await PI.create({userId, middleName, nameExtension, birthDate, placeOfBirth, sex, civilStatus, height, 
                weight, bloodType, gsisId, pagibigId, philhealthId, sssId, tinId, agencyEmployeeId, telNo, celNo,
                citizenship, dualCitizenship: {dcType, dcCountry}, residentialAddress: {raHBLN, raStrt, raSubVil, raBarangay, raCity, raProvince, raZipCode}, 
                permanentAddress: {paHBLN, paStrt, paSubVil, paBarangay, paCity, paProvince, paZipCode}});
            console.log(picreate);
            res.status(200).json({status: 'Update Success'});
        }
        catch (err) {
            res.status(200).json({status: 'Update Success'});
            console.log(err)
        }
    } else {
        //update existing entry
        try {
            const piupdate = await PI.updateOne({userId: userId}, {userId, middleName, nameExtension, birthDate, placeOfBirth, sex, civilStatus, height, 
                weight, bloodType, gsisId, pagibigId, philhealthId, sssId, tinId, agencyEmployeeId, telNo,
                citizenship, dualCitizenship: {dcType, dcCountry}, residentialAddress: {raHBLN, raStrt, raSubVil, raBarangay, raCity, raProvince, raZipCode}, 
                permanentAddress: {paHBLN, paStrt, paSubVil, paBarangay, paCity, paProvince, paZipCode}});
                console.log(piupdate)
                res.status(200).json({status: 'Update Success'});
        }
        catch (error){
            console.log(error)
            res.status(200).json({status: 'Update Failed'});
        }
    }    
}

//family background
module.exports.familybackground_get = async (req, res) => {
    const id = req.params.id;
    const userfb = await FB.findOne({userId: id})
    await FB.findOne({userId: id})
        .then(result => {
            // console.log(result)
            if (result === null) {
                // console.log(result,'eto ba nagpiprint')
                res.render('Dashboard', { fb: null, title: "Family Background", page: "familybackground"});
            } else {
                res.render('Dashboard', { fb: result, title: "Family Background", page: "familybackground"});
                // console.log(result,'eto ba nagpiprint')
            }
            
        })
        .catch (err => {
            console.log(err)
        })
}
//post
module.exports.familybackground_post = async (req, res) => {

    const userId = req.body.userId;
    const {sLastName, sFirstName, sMiddleName, sNameExtension, sOccupation, sEmployerBusinessName, sTelNo} = req.body.spouse;
    const {fLastName, fFirstName, fMiddleName, fNameExtension} = req.body.father;
    const {mLastName, mFirstName, mMiddleName} = req.body.mother;
    const children = req.body.children;
    console.log('pumasok')
    const userfb = await FB.exists({userId: userId});
    if (userfb === null) {
        //create new entry
        try {
            const fbcreate = await FB.create({userId, spouse:{sLastName, sFirstName, sMiddleName, sNameExtension, sOccupation, sEmployerBusinessName, sTelNo}, father: {fLastName,
                fFirstName, fMiddleName, fNameExtension}, mother:{mLastName, mFirstName, mMiddleName}, children});
            console.log(fbcreate);
            res.status(200).json({status: 'Update Success'});
        }
        catch (err) {
            res.status(200).json({status: 'Update Success'});
            console.log(err)
        }
    } else {
        //update existing entry
        try {
            const fbupdate = await FB.updateOne({userId: userId}, {userId, spouse:{sLastName, sFirstName, sMiddleName, sNameExtension, sOccupation, sEmployerBusinessName, sTelNo}, father: {fLastName,
                fFirstName, fMiddleName, fNameExtension}, mother:{mLastName, mFirstName, mMiddleName}, children});
                console.log(fbupdate)
                res.status(200).json({status: 'Update Success'});
        }
        catch (error){
            console.log(error)
            res.status(200).json({status: 'Update Failed'});
        }
    }    
}
//education
module.exports.education_get = async (req, res) => {
    const id = req.params.id;
    const usered = await ED.findOne({userId: id})
    await ED.findOne({userId: id})
        .then(result => {
            // console.log(result)
            if (result === null) {
                // console.log(result,'eto ba nagpiprint')
                res.render('Dashboard', { ed: null, title: "Educational Background", page: "education"});
            } else {
                res.render('Dashboard', { ed: result, title: "Educational Background", page: "education"});
                // console.log(result,'eto ba nagpiprint')
            }
            
        })
        .catch (err => {
            console.log(err)
        })
}
//post
module.exports.education_post = async (req, res) => {

    const userId = req.body.userId;
    const ed = req.body.ed;
    console.log('pumasok')
    const usered = await ED.exists({userId: userId});
    if (usered === null) {
        //create new entry
        try {
            const edcreate = await ED.create({userId, ed});
            console.log(edcreate);
            res.status(200).json({status: 'Update Success'});
        }
        catch (err) {
            res.status(200).json({status: 'Update Success'});
            console.log(err)
        }
    } else {
        //update existing entry
        try {
            const edupdate = await ED.updateOne({userId, ed});
                console.log(edupdate)
                res.status(200).json({status: 'Update Success'});
        }
        catch (error){
            console.log(error)
            res.status(200).json({status: 'Update Failed'});
        }
    }    
}

//eligibility
module.exports.eligibility_get = async (req, res) => {
    console.log('pumapasok ba')
    const id = req.params.id;
    const usereb = await EB.findOne({userId: id})
    await EB.findOne({userId: id})
        .then(result => {
            console.log(result)
            if (result === null) {
                // console.log(result,'eto ba nagpiprint')
                res.render('Dashboard', { eb: null, title: "Eligibility", page: "eligibility"});
            } else {
                res.render('Dashboard', { eb: result, title: "Eligibility", page: "eligibility"});
                // console.log(result,'eto ba nagpiprint')
            }
            
        })
        .catch (err => {
            console.log(err)
        })
}
//post
module.exports.eligibility_post = async (req, res) => {

    const userId = req.body.userId;
    const cse = req.body.cse;
    console.log('pumasok')
    const usereb = await EB.exists({userId: userId});
    if (usereb === null) {
        //create new entry
        try {
            const ebcreate = await EB.create({userId, cse});
            console.log(ebcreate);
            res.status(200).json({status: 'Update Success'});
        }
        catch (err) {
            res.status(200).json({status: 'Update Success'});
            console.log(err)
        }
    } else {
        //update existing entry
        try {
            const ebupdate = await EB.updateOne({userId, cse});
                console.log(ebupdate)
                res.status(200).json({status: 'Update Success'});
        }
        catch (error){
            console.log(error)
            res.status(200).json({status: 'Update Failed'});
        }
    }    
}

//work experience
module.exports.workexperience_get = async (req, res) => {
    const id = req.params.id;
    const userwe = await WE.findOne({userId: id})
    await WE.findOne({userId: id})
        .then(result => {
            // console.log(result)
            if (result === null) {
                // console.log(result,'eto ba nagpiprint')
                res.render('Dashboard', { we: null, title: "Work Experience", page: "workexperience"});
            } else {
                res.render('Dashboard', { we: result, title: "Work Experience", page: "workexperience"});
                // console.log(result,'eto ba nagpiprint')
            }
            
        })
        .catch (err => {
            console.log(err)
        })
}
//post
module.exports.workexperience_post = async (req, res) => {

    const userId = req.body.userId;
    const we = req.body.we;
    console.log('pumasok')
    const userwe = await WE.exists({userId: userId});
    if (userwe === null) {
        //create new entry
        try {
            const wecreate = await WE.create({userId, we});
            console.log(wecreate);
            res.status(200).json({status: 'Update Success'});
        }
        catch (err) {
            res.status(200).json({status: 'Update Success'});
            console.log(err)
        }
    } else {
        //update existing entry
        try {
            const weupdate = await WE.updateOne({userId, we});
                console.log(weupdate)
                res.status(200).json({status: 'Update Success'});
        }
        catch (error){
            console.log(error)
            res.status(200).json({status: 'Update Failed'});
        }
    }    
}

//voluntary work
module.exports.voluntarywork_get = async (req, res) => {
    const id = req.params.id;
    const uservw = await VW.findOne({userId: id})
    await VW.findOne({userId: id})
        .then(result => {
            // console.log(result)
            if (result === null) {
                // console.log(result,'eto ba nagpiprint')
                res.render('Dashboard', { vw: null, title: "Voluntary Work", page: "voluntarywork"});
            } else {
                res.render('Dashboard', { vw: result, title: "Voluntary Work", page: "voluntarywork"});
                // console.log(result,'eto ba nagpiprint')
            }
            
        })
        .catch (err => {
            console.log(err)
        })
}
//post
module.exports.voluntarywork_post = async (req, res) => {

    const userId = req.body.userId;
    const vw = req.body.vw;
    console.log('pumasok')
    const uservw = await VW.exists({userId: userId});
    if (uservw === null) {
        //create new entry
        try {
            const vwcreate = await VW.create({userId, vw});
            console.log(vwcreate);
            res.status(200).json({status: 'Update Success'});
        }
        catch (err) {
            res.status(200).json({status: 'Update Failed'});
            console.log(err)
        }
    } else {
        //update existing entry
        try {
            const vwupdate = await VW.updateOne({userId, vw});
                console.log(vwupdate)
                res.status(200).json({status: 'Update Success'});
        }
        catch (error){
            console.log(error)
            res.status(200).json({status: 'Update Failed'});
        }
    }    
}

//training
module.exports.training_get = async (req, res) => {
    const id = req.params.id;
    const usertr = await TR.findOne({userId: id})
    await TR.findOne({userId: id})
        .then(result => {
            // console.log(result)
            if (result === null) {
                // console.log(result,'eto ba nagpiprint')
                res.render('Dashboard', { tr: null, title: "Training", page: "training"});
            } else {
                res.render('Dashboard', { tr: result, title: "Training", page: "training"});
                // console.log(result,'eto ba nagpiprint')
            }
            
        })
        .catch (err => {
            console.log(err)
        })
}
//post
module.exports.training_post = async (req, res) => {

    const userId = req.body.userId;
    const ldit = req.body.ldit;
    console.log('pumasok')
    const usertr = await TR.exists({userId: userId});
    if (usertr === null) {
        //create new entry
        try {
            const trcreate = await TR.create({userId, ldit});
            console.log(trcreate);
            res.status(200).json({status: 'Update Success'});
        }
        catch (err) {
            res.status(200).json({status: 'Update Failed'});
            console.log(err)
        }
    } else {
        //update existing entry
        try {
            const trupdate = await TR.updateOne({userId, ldit});
                console.log(trupdate)
                res.status(200).json({status: 'Update Success'});
        }
        catch (error){
            console.log(error)
            res.status(200).json({status: 'Update Failed'});
        }
    }    
}

//other information
module.exports.otherinfo_get = async (req, res) => {
    const id = req.params.id;
    const useroi = await OI.findOne({userId: id})
    await OI.findOne({userId: id})
        .then(result => {
            // console.log(result)
            if (result === null) {
                // console.log(result,'eto ba nagpiprint')
                res.render('Dashboard', { oi: null, title: "Other Information", page: "otherinformation"});
            } else {
                res.render('Dashboard', { oi: result, title: "Other Information", page: "otherinformation"});
                // console.log(result,'eto ba nagpiprint')
            }
            
        })
        .catch (err => {
            console.log(err)
        })
}
//post
module.exports.otherinfo_post = async (req, res) => {

    const userId = req.body.userId;
    const specialSkillsHobbies = req.body.specialSkillsHobbies;
    const nonAcadDistRecog = req.body.nonAcadDistRecog;
    const membershipAssocOrg = req.body.membershipAssocOrg;
    console.log('pumasok', specialSkillsHobbies)
    const useroi = await OI.exists({userId: userId});
    if (useroi === null) {
        //create new entry
        try {
            const oicreate = await OI.create({userId, specialSkillsHobbies, nonAcadDistRecog, membershipAssocOrg});
            console.log(oicreate);
            res.status(200).json({status: 'Update Success'});
        }
        catch (err) {
            res.status(200).json({status: 'Update Failed'});
            console.log(err)
        }
    } else {
        //update existing entry
        try {
            const oiupdate = await OI.updateOne({userId} ,{userId, specialSkillsHobbies, nonAcadDistRecog, membershipAssocOrg});
                console.log(oiupdate)
                res.status(200).json({status: 'Update Success'});
        }
        catch (error){
            console.log(error)
            res.status(200).json({status: 'Update Failed'});
        }
    }    
}

//questions
module.exports.questions_get = async (req, res) => {
    const id = req.params.id;
    const userqt = await QT.findOne({userId: id})
    await QT.findOne({userId: id})
        .then(result => {
            // console.log(result)
            if (result === null) {
                // console.log(result,'eto ba nagpiprint')
                res.render('Dashboard', { qt: null, title: "Questions", page: "questions"});
            } else {
                convertedq2bDateFiled = moment(result.q2.q2bDateFiled).format('YYYY-MM-DD');
                res.render('Dashboard', {convertedq2bDateFiled: convertedq2bDateFiled, qt: result, title: "Questions", page: "questions"});
                // console.log(result,'eto ba nagpiprint')
            }
            
        })
        .catch (err => {
            console.log(err)
        })
}
//post
module.exports.questions_post = async (req, res) => {

    const userId = req.body.userId;
    const {q1a, q1b, q1bYesDetails}= req.body.q1;
    const {q2a, q2aYesDetails, q2b, q2bDateFiled, q2bStatusofCase}= req.body.q2;
    const {q3a, q3aYesDetails}= req.body.q3;
    const {q4a, q4aYesDetails}= req.body.q4;
    const {q5a, q5aYesDetails, q5b, q5bYesDetails}= req.body.q5;
    const {q6a, q6aYesDetails}= req.body.q6;
    const {q7a, q7aYesDetails, q7b, q7bYesDetails, q7c, q7cYesDetails}= req.body.q7;
    const userqt = await QT.exists({userId: userId});
    if (userqt === null) {
        //create new entry
        try {
            const qtcreate = await QT.create({userId, q1: {q1a, q1b, q1bYesDetails}, q2: {q2a, q2aYesDetails, q2b, q2bDateFiled, q2bStatusofCase}, 
                q3: {q3a, q3aYesDetails}, q4: {q4a, q4aYesDetails}, q5: {q5a, q5aYesDetails, q5b, q5bYesDetails}, q6: {q6a, q6aYesDetails},
                 q7: {q7a, q7aYesDetails, q7b, q7bYesDetails, q7c, q7cYesDetails}});
            console.log(qtcreate);
            res.status(200).json({status: 'Update Success'});
        }
        catch (err) {
            res.status(200).json({status: 'Update Success'});
            console.log(err)
        }
    } else {
        //update existing entry
        try {
            const qtupdate = await QT.updateOne({userId, q1: {q1a, q1b, q1bYesDetails}, q2: {q2a, q2aYesDetails, q2b, q2bDateFiled, q2bStatusofCase}, 
                q3: {q3a, q3aYesDetails}, q4: {q4a, q4aYesDetails}, q5: {q5a, q5aYesDetails, q5b, q5bYesDetails}, q6: {q6a, q6aYesDetails},
                 q7: {q7a, q7aYesDetails, q7b, q7bYesDetails, q7c, q7cYesDetails}});
                console.log(qtupdate)
                res.status(200).json({status: 'Update Success'});
        }
        catch (error){
            console.log(error)
            res.status(200).json({status: 'Update Failed'});
        }
    }    
}

//references
module.exports.references_get = async (req, res) => {
    const id = req.params.id;
    const userrr= await RR.findOne({userId: id})
    await RR.findOne({userId: id})
        .then(result => {
            // console.log(result)
            if (result === null) {
                // console.log(result,'eto ba nagpiprint')
                res.render('Dashboard', { rr: null, title: "References", page: "references"});
            } else {
                res.render('Dashboard', { rr: result, title: "References", page: "references"});
                // console.log(result,'eto ba nagpiprint')
            }
            
        })
        .catch (err => {
            console.log(err)
        })
}
//post
module.exports.references_post = async (req, res) => {

    const userId = req.body.userId;
    const rr = req.body.rr;
    console.log('pumasok')
    const userrr = await RR.exists({userId: userId});
    if (userrr === null) {
        //create new entry
        try {
            const rrcreate = await RR.create({userId, rr});
            console.log(rrcreate);
            res.status(200).json({status: 'Update Success'});
        }
        catch (err) {
            res.status(200).json({status: 'Update Success'});
            console.log(err)
        }
    } else {
        //update existing entry
        try {
            const rrupdate = await RR.updateOne({userId, ref: rr});
                console.log(rrupdate)
                res.status(200).json({status: 'Update Success'});
        }
        catch (error){
            console.log(error)
            res.status(200).json({status: 'Update Failed'});
        }
    }    
}

//service records
module.exports.servicerecords_get = async (req, res) => {
    const id = req.params.id;
    const usersr = await SR.findOne({userId: id})
    await SR.findOne({userId: id})
        .then(result => {
            // console.log(result)
            if (result === null) {
                // console.log(result,'eto ba nagpiprint')
                res.render('Dashboard', { sr: null, title: "Service Records", page: "servicerecords"});
            } else {
                res.render('Dashboard', { sr: result, title: "Service Records", page: "servicerecords"});
                // console.log(result,'eto ba nagpiprint')
            }
            
        })
        .catch (err => {
            console.log(err)
        })
}
//post
module.exports.servicerecords_post = async (req, res) => {

    const userId = req.body.userId;
    const govIssuedIdType = req.body.govIssuedIdType;
    const govIssuedIdNumber = req.body.govIssuedIdNumber;
    const DatePlaceIssued = req.body.DatePlaceIssued;
    console.log('pumasok')
    const usersr = await SR.exists({userId: userId});
    if (usersr === null) {
        //create new entry
        try {
            const srcreate = await SR.create({userId, govIssuedIdType, govIssuedIdNumber, DatePlaceIssued});
            console.log(srcreate);
            res.status(200).json({status: 'Update Success'});
        }
        catch (err) {
            res.status(200).json({status: 'Update Success'});
            console.log(err)
        }
    } else {
        //update existing entry
        try {
            const srupdate = await SR.updateOne({userId}, {govIssuedIdType, govIssuedIdNumber, DatePlaceIssued});
                console.log(srupdate)
                res.status(200).json({status: 'Update Success'});
        }
        catch (error){
            console.log(error)
            res.status(200).json({status: 'Update Failed'});
        }
    }    
}

//profile
module.exports.profile_get = async (req, res) => {
    const id = req.params.id;
    await profile.findOne({userId: id})
        .then(result => {
            console.log(result)
            if (result === null) {
                console.log(result,'eto ba nagpiprint')
                res.render('Dashboard', {profile: null, title: "Profile", page: "profile"});
            } else {
                res.render('Dashboard', {profile: result, title: "Profile", page: "profile"});
                console.log(result,'eto ba nagpiprint')
            }
            
        })
        .catch (err => {
            console.log(err)
        })
}
module.exports.profile_post = async (req, res) => {

    const {userId, employmentStatus, campus} = req.body;
    const userprofile = await profile.exists({userId: userId});
    if (userprofile === null) {
        //create new entry
        try {
            const profilecreate = await profile.create({userId, employmentStatus, campus});
            console.log(profilecreate);
            res.status(200).json({status: 'Update Success'});
        }
        catch (err) {
            res.status(200).json({status: 'Update Success'});
            console.log(err)
        }
    } else {
        //update existing entry
        try {
            const profileupdate = await profile.updateOne({userId, employmentStatus, campus});
                console.log(profileupdate)
                res.status(200).json({status: 'Update Success'});
        }
        catch (error){
            console.log(error)
            res.status(200).json({status: 'Update Failed'});
        }
    }    
}

module.exports.forums_get = async (req, res) => {
    const id = req.params.id;
    await profile.findOne({userId: id})
        .then(result => {
            console.log(result)
            if (result === null) {
                console.log(result,'eto ba nagpiprint')
                res.render('Dashboard', {profile: null, title: "Forums", page: "forums"});
            } else {
                res.render('Dashboard', {profile: result, title: "Forums", page: "forums"});
                console.log(result,'eto ba nagpiprint')
            }
            
        })
        .catch (err => {
            console.log(err)
        })
}