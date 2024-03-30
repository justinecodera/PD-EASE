const {PI, FB, ED, EB, WE, VW, TR, OI, QT, RR, SR, PDF} = require('../Models/PDS');
const {pdsS, userlogs} = require('../Models/tracker');
const User = require('../Models/users');
const moment = require('moment');
const { drawTable } = require('pdf-lib-draw-table-beta');
const pdflib = require('pdf-lib');
const fs = require('fs')
const {readFile, writeFile} = require('fs/promises')
const pdf2pic = require('pdf2pic');


async function fillPDF(filename, userid) {
    console.log("error");
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
    

    const pdsfilepath = './PDF/2017_CSCPDS.pdf';
    try {
        const unfilledPDS = await pdflib.PDFDocument.load(await readFile(pdsfilepath))

        //modify PDS
        const fieldNames = unfilledPDS.getForm().getFields().map(f => f.getName());
        // console.log(fieldNames.join(', '));

        const pdsform = unfilledPDS.getForm();

        //Personal Information
        const lastname = pdsform.getField('Surname');
        const firstname = pdsform.getField('First Name');
        const middleName = pdsform.getField('middleName');
        const nameExtension = pdsform.getField('nameExtension');
        const birthDate = pdsform.getField('birthDate');
        const placeOfBirth = pdsform.getField('placeOfBirth');
        const female = pdsform.getField('female');
        const male = pdsform.getField('male');
        const single = pdsform.getField('single');
        const widowed = pdsform.getField('widowed');
        const others = pdsform.getField('others');
        const married = pdsform.getField('married');
        const separated = pdsform.getField('separated');
        const height = pdsform.getField('height');
        const weight = pdsform.getField('weight');
        const bloodType = pdsform.getField('bloodType');
        const gsisId = pdsform.getField('gsisId');
        const pagibigId = pdsform.getField('pagibigId');
        const philhealthId = pdsform.getField('philhealthId');
        const sssId = pdsform.getField('sssId');
        const tinId = pdsform.getField('tinId');
        const agencyEmployeeId = pdsform.getField('agencyEmployeeId');
        const filipino = pdsform.getField('filipino');
        const dualCitizenship = pdsform.getField('dual citizenship');
        const byBirth = pdsform.getField('bybirth');
        const byNaturalization = pdsform.getField('bynaturalization');
        const dcCountry = pdsform.getField('dcCountry');

        const raHBLN = pdsform.getField('raHBLN');
        const raStrt = pdsform.getField('raStrt');
        const raSubVil = pdsform.getField('raSubVil');
        const raBarangay = pdsform.getField('raBarangay');
        const raCity = pdsform.getField('raCity');
        const raProvince = pdsform.getField('raPrv');
        const raZipCode = pdsform.getField('raZipCode');

        const paHBLN = pdsform.getField('paHBLN');
        const paStrt = pdsform.getField('paStrt');
        const paSubVil = pdsform.getField('paSubVil');
        const paBarangay = pdsform.getField('paBarangay');
        const paCity = pdsform.getField('paCity');
        const paProvince = pdsform.getField('paProvince');
        const paZipCode = pdsform.getField('paZipCode');

        const telNo = pdsform.getField('telNo');
        const celNo = pdsform.getField('Mobile No');
        const institutionalEmail = pdsform.getField('institutionalEmail');

        //Family Background
        const sLastName = pdsform.getField('sLastName');
        const sFirstName = pdsform.getField('sFirstName');
        const sNameExtension = pdsform.getField('sNameExtension');
        const sMiddleName = pdsform.getField('sMiddleName');
        const sOccupation = pdsform.getField('sOccupation');
        const sEmployerBusinessName = pdsform.getField('sEmployerBusinessName');
        const sBusinessAdress = pdsform.getField('sBusinessAdress');
        const sTelNo = pdsform.getField('sTelNo');

        const fLastName = pdsform.getField('fLastName');
        const fFirstName = pdsform.getField('fFirstName');
        const fMiddleName = pdsform.getField('fMiddleName');
        const fNameExtension = pdsform.getField('fNameExtension');

        const mLastName = pdsform.getField('mLastname');
        const mFirstName = pdsform.getField('mFirstname');
        const mMiddleName = pdsform.getField('mMiddlename');

        //Educational Background
        const schoolName1 = pdsform.getField('schoolName1');
        const schoolName2 = pdsform.getField('schoolName2');
        const schoolName3 = pdsform.getField('schoolName3');
        const schoolName4 = pdsform.getField('schoolName4');
        const schoolName5 = pdsform.getField('schoolName5');

        const basicEduDegCor1 = pdsform.getField('basicEduDegCor1');
        const basicEduDegCor2 = pdsform.getField('basicEduDegCor2');
        const basicEduDegCor3 = pdsform.getField('basicEduDegCor3');
        const basicEduDegCor4 = pdsform.getField('basicEduDegCor4');
        const basicEduDegCor5 = pdsform.getField('basicEduDegCor5');
        
        const attendanceFrom1 = pdsform.getField('attendanceFrom1');
        const attendanceFrom2 = pdsform.getField('attendanceFrom2');
        const attendanceFrom3 = pdsform.getField('attendanceFrom3');
        const attendanceFrom4 = pdsform.getField('attendanceFrom4');
        const attendanceFrom5 = pdsform.getField('attendanceFrom5');

        const attendanceTo1 = pdsform.getField('attendanceTo1');
        const attendanceTo2 = pdsform.getField('attendanceTo2');
        const attendanceTo3 = pdsform.getField('attendanceTo3');
        const attendanceTo4 = pdsform.getField('attendanceTo4');
        const attendanceTo5 = pdsform.getField('attendanceTo5');


        const highestLevel1 = pdsform.getField('highestLevel1');
        const highestLevel2 = pdsform.getField('highestLevel2');
        const highestLevel3 = pdsform.getField('highestLevel3');
        const highestLevel4 = pdsform.getField('highestLevel4');
        const highestLevel5 = pdsform.getField('highestLevel5');

        const yearGraduated1 = pdsform.getField('yearGraduated1');
        const yearGraduated2 = pdsform.getField('yearGraduated2');
        const yearGraduated3 = pdsform.getField('yearGraduated3');
        const yearGraduated4 = pdsform.getField('yearGraduated4');
        const yearGraduated5 = pdsform.getField('yearGraduated5');

        const honorsRecieved1 = pdsform.getField('honorsRecieved1');
        const honorsRecieved2 = pdsform.getField('honorsRecieved2');
        const honorsRecieved3 = pdsform.getField('honorsRecieved3');
        const honorsRecieved4 = pdsform.getField('honorsRecieved4');
        const honorsRecieved5 = pdsform.getField('honorsRecieved5');

        //Civil Service Eligibility
        const license1 = pdsform.getField('license1');
        const license2 = pdsform.getField('license2');
        const license3 = pdsform.getField('license3');
        const license4 = pdsform.getField('license4');
        const license5 = pdsform.getField('license5');
        const license6 = pdsform.getField('license6');
        const license7 = pdsform.getField('license7');

        const rating1 = pdsform.getField('rating1');
        const rating2 = pdsform.getField('rating2');
        const rating3 = pdsform.getField('rating3');
        const rating4 = pdsform.getField('rating4');
        const rating5 = pdsform.getField('rating5');
        const rating6 = pdsform.getField('rating6');
        const rating7 = pdsform.getField('rating7');

        const dateOfExamination1 = pdsform.getField('dateOfExamination1');
        const dateOfExamination2 = pdsform.getField('dateOfExamination2');
        const dateOfExamination3 = pdsform.getField('dateOfExamination3');
        const dateOfExamination4 = pdsform.getField('dateOfExamination4');
        const dateOfExamination5 = pdsform.getField('dateOfExamination5');
        const dateOfExamination6 = pdsform.getField('dateOfExamination6');
        const dateOfExamination7 = pdsform.getField('dateOfExamination7');

        const placeOfExamination1 = pdsform.getField('placeOfExamination1');
        const placeOfExamination2 = pdsform.getField('placeOfExamination2');
        const placeOfExamination3 = pdsform.getField('placeOfExamination3');
        const placeOfExamination4 = pdsform.getField('placeOfExamination4');
        const placeOfExamination5 = pdsform.getField('placeOfExamination5');
        const placeOfExamination6 = pdsform.getField('placeOfExamination6');
        const placeOfExamination7 = pdsform.getField('placeOfExamination7');

        const licenseNumber1 = pdsform.getField('licenseNumber1');
        const licenseNumber2 = pdsform.getField('licenseNumber2');
        const licenseNumber3 = pdsform.getField('licenseNumber3');
        const licenseNumber4 = pdsform.getField('licenseNumber4');
        const licenseNumber5 = pdsform.getField('licenseNumber5');
        const licenseNumber6 = pdsform.getField('licenseNumber6');
        const licenseNumber7 = pdsform.getField('licenseNumber7');

        const dateOfValidity1 = pdsform.getField('dateOfValidity1');
        const dateOfValidity2 = pdsform.getField('dateOfValidity2');
        const dateOfValidity3 = pdsform.getField('dateOfValidity3');
        const dateOfValidity4 = pdsform.getField('dateOfValidity4');
        const dateOfValidity5 = pdsform.getField('dateOfValidity5');
        const dateOfValidity6 = pdsform.getField('dateOfValidity6');
        const dateOfValidity7 = pdsform.getField('dateOfValidity7');

        // Work Experience
        const workedFrom1 = pdsform.getField('workedFrom1');
        const workedFrom2 = pdsform.getField('work from 2');
        const workedFrom3 = pdsform.getField('workedFrom3');
        const workedFrom4 = pdsform.getField('workedFrom4');
        const workedFrom5 = pdsform.getField('workedFrom5');
        const workedFrom6 = pdsform.getField('workedFrom6');
        const workedFrom7 = pdsform.getField('workedFrom7');
        const workedFrom8 = pdsform.getField('workedFrom8');
        const workedFrom9 = pdsform.getField('workedFrom9');
        const workedFrom10 = pdsform.getField('workedFrom10');
        const workedFrom11 = pdsform.getField('workedFrom11');
        const workedFrom12 = pdsform.getField('workedFrom12');
        const workedFrom13 = pdsform.getField('workedFrom13');
        const workedFrom14 = pdsform.getField('workedFrom14');
        const workedFrom15 = pdsform.getField('workedFrom15');
        const workedFrom16 = pdsform.getField('workedFrom16');
        const workedFrom17 = pdsform.getField('workedFrom17');
        const workedFrom18 = pdsform.getField('workedFrom18');
        const workedFrom19 = pdsform.getField('workedFrom19');
        const workedFrom20 = pdsform.getField('workedFrom20');
        const workedFrom21 = pdsform.getField('workedFrom21');
        const workedFrom22 = pdsform.getField('workedFrom22');
        const workedFrom23 = pdsform.getField('workedFrom23');
        const workedFrom24 = pdsform.getField('workedFrom24');
        const workedFrom25 = pdsform.getField('workedFrom25');
        const workedFrom26 = pdsform.getField('workedFrom26');
        const workedFrom27 = pdsform.getField('workedFrom27');
        const workedFrom28 = pdsform.getField('workedFrom28');
        
        const workedTo1 = pdsform.getField('workedTo1');
        const workedTo2 = pdsform.getField('workedTo2');
        const workedTo3 = pdsform.getField('workedTo3');
        const workedTo4 = pdsform.getField('workedTo4');
        const workedTo5 = pdsform.getField('workedTo5');
        const workedTo6 = pdsform.getField('workedTo6');
        const workedTo7 = pdsform.getField('workedTo7');
        const workedTo8 = pdsform.getField('workedTo8');
        const workedTo9 = pdsform.getField('workedTo9');
        const workedTo10 = pdsform.getField('workedTo10');
        const workedTo11 = pdsform.getField('workedTo11');
        const workedTo12 = pdsform.getField('workedTo12');
        const workedTo13 = pdsform.getField('workedTo13');
        const workedTo14 = pdsform.getField('workedTo14');
        const workedTo15 = pdsform.getField('workedTo15');
        const workedTo16 = pdsform.getField('workedTo16');
        const workedTo17 = pdsform.getField('workedTo17');
        const workedTo18 = pdsform.getField('workedTo18');
        const workedTo19 = pdsform.getField('workedTo19');
        const workedTo20 = pdsform.getField('workedTo20');
        const workedTo21 = pdsform.getField('workedTo21');
        const workedTo22 = pdsform.getField('workedTo22');
        const workedTo23 = pdsform.getField('workedTo23');
        const workedTo24 = pdsform.getField('workedTo24');
        const workedTo25 = pdsform.getField('workedTo25');
        const workedTo26 = pdsform.getField('workedTo26');
        const workedTo27 = pdsform.getField('workedTo27');
        const workedTo28 = pdsform.getField('workedTo28');
        
        const positionTitle1 = pdsform.getField('positionTitle1');
        const positionTitle2 = pdsform.getField('positionTitle2');
        const positionTitle3 = pdsform.getField('positionTitle3');
        const positionTitle4 = pdsform.getField('positionTitle4');
        const positionTitle5 = pdsform.getField('positionTitle5');
        const positionTitle6 = pdsform.getField('positionTitle6');
        const positionTitle7 = pdsform.getField('positionTitle7');
        const positionTitle8 = pdsform.getField('positionTitle8');
        const positionTitle9 = pdsform.getField('positionTitle9');
        const positionTitle10 = pdsform.getField('positionTitle10');
        const positionTitle11 = pdsform.getField('positionTitle11');
        const positionTitle12 = pdsform.getField('positionTitle12');
        const positionTitle13 = pdsform.getField('positionTitle13');
        const positionTitle14 = pdsform.getField('positionTitle14');
        const positionTitle15 = pdsform.getField('positionTitle15');
        const positionTitle16 = pdsform.getField('positionTitle16');
        const positionTitle17 = pdsform.getField('positionTitle17');
        const positionTitle18 = pdsform.getField('positionTitle18');
        const positionTitle19 = pdsform.getField('positionTitle19');
        const positionTitle20 = pdsform.getField('positionTitle20');
        const positionTitle21 = pdsform.getField('positionTitle21');
        const positionTitle22 = pdsform.getField('positionTitle22');
        const positionTitle23 = pdsform.getField('positionTitle23');
        const positionTitle24 = pdsform.getField('positionTitle24');
        const positionTitle25 = pdsform.getField('positionTitle25');
        const positionTitle26 = pdsform.getField('positionTitle26');
        const positionTitle27 = pdsform.getField('positionTitle27');
        const positionTitle28 = pdsform.getField('positionTitle28');
        
        const daoc1 = pdsform.getField('daoc1');
        const daoc2 = pdsform.getField('daoc2');
        const daoc3 = pdsform.getField('daoc3');
        const daoc4 = pdsform.getField('daoc4');
        const daoc5 = pdsform.getField('daoc5');
        const daoc6 = pdsform.getField('daoc6');
        const daoc7 = pdsform.getField('daoc7');
        const daoc8 = pdsform.getField('daoc8');
        const daoc9 = pdsform.getField('daoc9');
        const daoc10 = pdsform.getField('daoc10');
        const daoc11 = pdsform.getField('daoc11');
        const daoc12 = pdsform.getField('daoc12');
        const daoc13 = pdsform.getField('daoc13');
        const daoc14 = pdsform.getField('daoc14');
        const daoc15 = pdsform.getField('daoc15');
        const daoc16 = pdsform.getField('daoc16');
        const daoc17 = pdsform.getField('daoc17');
        const daoc18 = pdsform.getField('daoc18');
        const daoc19 = pdsform.getField('daoc19');
        const daoc20 = pdsform.getField('daoc20');
        const daoc21 = pdsform.getField('daoc21');
        const daoc22 = pdsform.getField('daoc22');
        const daoc23 = pdsform.getField('daoc23');
        const daoc24 = pdsform.getField('daoc24');
        const daoc25 = pdsform.getField('daoc25');
        const daoc26 = pdsform.getField('daoc26');
        const daoc27 = pdsform.getField('daoc27');
        const daoc28 = pdsform.getField('daoc28');
        
        const monthlySalary1 = pdsform.getField('monthlySalary1');
        const monthlySalary2 = pdsform.getField('monthlySalary2');
        const monthlySalary3 = pdsform.getField('monthlySalary3');
        const monthlySalary4 = pdsform.getField('monthlySalary4');
        const monthlySalary5 = pdsform.getField('monthlySalary5');
        const monthlySalary6 = pdsform.getField('monthlySalary6');
        const monthlySalary7 = pdsform.getField('monthlySalary7');
        const monthlySalary8 = pdsform.getField('monthlySalary8');
        const monthlySalary9 = pdsform.getField('monthlySalary9');
        const monthlySalary10 = pdsform.getField('monthlySalary10');
        const monthlySalary11 = pdsform.getField('monthlySalary11');
        const monthlySalary12 = pdsform.getField('monthlySalary12');
        const monthlySalary13 = pdsform.getField('monthlySalary13');
        const monthlySalary14 = pdsform.getField('monthlySalary14');
        const monthlySalary15 = pdsform.getField('monthlySalary15');
        const monthlySalary16 = pdsform.getField('monthlySalary16');
        const monthlySalary17 = pdsform.getField('monthlySalary17');
        const monthlySalary18 = pdsform.getField('monthlySalary18');
        const monthlySalary19 = pdsform.getField('monthlySalary19');
        const monthlySalary20 = pdsform.getField('monthlySalary20');
        const monthlySalary21 = pdsform.getField('monthlySalary21');
        const monthlySalary22 = pdsform.getField('monthlySalary22');
        const monthlySalary23 = pdsform.getField('monthlySalary23');
        const monthlySalary24 = pdsform.getField('monthlySalary24');
        const monthlySalary25 = pdsform.getField('monthlySalary25');
        const monthlySalary26 = pdsform.getField('monthlySalary26');
        const monthlySalary27 = pdsform.getField('monthlySalary27');
        const monthlySalary28 = pdsform.getField('monthlySalary28');
        
        const salaryJobPayGrade1 = pdsform.getField('salaryJobPayGrade1');
        const salaryJobPayGrade2 = pdsform.getField('salaryJobPayGrade2');
        const salaryJobPayGrade3 = pdsform.getField('salaryJobPayGrade3');
        const salaryJobPayGrade4 = pdsform.getField('salaryJobPayGrade4');
        const salaryJobPayGrade5 = pdsform.getField('salaryJobPayGrade5');
        const salaryJobPayGrade6 = pdsform.getField('salaryJobPayGrade6');
        const salaryJobPayGrade7 = pdsform.getField('salaryJobPayGrade7');
        const salaryJobPayGrade8 = pdsform.getField('salaryJobPayGrade8');
        const salaryJobPayGrade9 = pdsform.getField('salaryJobPayGrade9');
        const salaryJobPayGrade10 = pdsform.getField('salaryJobPayGrade10');
        const salaryJobPayGrade11 = pdsform.getField('salaryJobPayGrade11');
        const salaryJobPayGrade12 = pdsform.getField('salaryJobPayGrade12');
        const salaryJobPayGrade13 = pdsform.getField('salaryJobPayGrade13');
        const salaryJobPayGrade14 = pdsform.getField('salaryJobPayGrade14');
        const salaryJobPayGrade15 = pdsform.getField('salaryJobPayGrade15');
        const salaryJobPayGrade16 = pdsform.getField('salaryJobPayGrade16');
        const salaryJobPayGrade17 = pdsform.getField('salaryJobPayGrade17');
        const salaryJobPayGrade18 = pdsform.getField('salaryJobPayGrade18');
        const salaryJobPayGrade19 = pdsform.getField('salaryJobPayGrade19');
        const salaryJobPayGrade20 = pdsform.getField('salaryJobPayGrade20');
        const salaryJobPayGrade21 = pdsform.getField('salaryJobPayGrade21');
        const salaryJobPayGrade22 = pdsform.getField('salaryJobPayGrade22');
        const salaryJobPayGrade23 = pdsform.getField('salaryJobPayGrade23');
        const salaryJobPayGrade24 = pdsform.getField('salaryJobPayGrade24');
        const salaryJobPayGrade25 = pdsform.getField('salaryJobPayGrade25');
        const salaryJobPayGrade26 = pdsform.getField('salaryJobPayGrade26');
        const salaryJobPayGrade27 = pdsform.getField('salaryJobPayGrade27');
        const salaryJobPayGrade28 = pdsform.getField('salaryJobPayGrade28');
        
        const statusOfAppointment1 = pdsform.getField('statusOfAppointment1');
        const statusOfAppointment2 = pdsform.getField('statusOfAppointment2');
        const statusOfAppointment3 = pdsform.getField('statusOfAppointment3');
        const statusOfAppointment4 = pdsform.getField('statusOfAppointment4');
        const statusOfAppointment5 = pdsform.getField('statusOfAppointment5');
        const statusOfAppointment6 = pdsform.getField('statusOfAppointment6');
        const statusOfAppointment7 = pdsform.getField('statusOfAppointment7');
        const statusOfAppointment8 = pdsform.getField('statusOfAppointment8');
        const statusOfAppointment9 = pdsform.getField('statusOfAppointment9');
        const statusOfAppointment10 = pdsform.getField('statusOfAppointment10');
        const statusOfAppointment11 = pdsform.getField('statusOfAppointment11');
        const statusOfAppointment12 = pdsform.getField('statusOfAppointment12');
        const statusOfAppointment13 = pdsform.getField('statusOfAppointment13');
        const statusOfAppointment14 = pdsform.getField('statusOfAppointment14');
        const statusOfAppointment15 = pdsform.getField('statusOfAppointment15');
        const statusOfAppointment16 = pdsform.getField('statusOfAppointment16');
        const statusOfAppointment17 = pdsform.getField('statusOfAppointment17');
        const statusOfAppointment18 = pdsform.getField('statusOfAppointment18');
        const statusOfAppointment19 = pdsform.getField('statusOfAppointment19');
        const statusOfAppointment20 = pdsform.getField('statusOfAppointment20');
        const statusOfAppointment21 = pdsform.getField('statusOfAppointment21');
        const statusOfAppointment22 = pdsform.getField('statusOfAppointment22');
        const statusOfAppointment23 = pdsform.getField('statusOfAppointment23');
        const statusOfAppointment24 = pdsform.getField('statusOfAppointment24');
        const statusOfAppointment25 = pdsform.getField('statusOfAppointment25');
        const statusOfAppointment26 = pdsform.getField('statusOfAppointment26');
        const statusOfAppointment27 = pdsform.getField('statusOfAppointment27');
        const statusOfAppointment28 = pdsform.getField('statusOfAppointment28');
        
        const govtService1 = pdsform.getField('govtService1');
        const govtService2 = pdsform.getField('govtService2');
        const govtService3 = pdsform.getField('govtService3');
        const govtService4 = pdsform.getField('govtService4');
        const govtService5 = pdsform.getField('govtService5');
        const govtService6 = pdsform.getField('govtService6');
        const govtService7 = pdsform.getField('govtService7');
        const govtService8 = pdsform.getField('govtService8');
        const govtService9 = pdsform.getField('govtService9');
        const govtService10 = pdsform.getField('govtService10');
        const govtService11 = pdsform.getField('govtService11');
        const govtService12 = pdsform.getField('govtService12');
        const govtService13 = pdsform.getField('govtService13');
        const govtService14 = pdsform.getField('govtService14');
        const govtService15 = pdsform.getField('govtService15');
        const govtService16 = pdsform.getField('govtService16');
        const govtService17 = pdsform.getField('govtService17');
        const govtService18 = pdsform.getField('govtService18');
        const govtService19 = pdsform.getField('govtService19');
        const govtService20 = pdsform.getField('govtService20');
        const govtService21 = pdsform.getField('govtService21');
        const govtService22 = pdsform.getField('govtService22');
        const govtService23 = pdsform.getField('govtService23');
        const govtService24 = pdsform.getField('govtService24');
        const govtService25 = pdsform.getField('govtService25');
        const govtService26 = pdsform.getField('govtService26');
        const govtService27 = pdsform.getField('govtService27');
        const govtService28 = pdsform.getField('govtService28');

        //Voluntary Work
        const nameAddressOfOrganization1 = pdsform.getField('nameAddressOfOrganization1');
        const nameAddressOfOrganization2 = pdsform.getField('nameAddressOfOrganization2');
        const nameAddressOfOrganization3 = pdsform.getField('nameAddressOfOrganization3');
        const nameAddressOfOrganization4 = pdsform.getField('nameAddressOfOrganization4');
        const nameAddressOfOrganization5 = pdsform.getField('nameAddressOfOrganization5');
        const nameAddressOfOrganization6 = pdsform.getField('nameAddressOfOrganization6');
        const nameAddressOfOrganization7 = pdsform.getField('nameAddressOfOrganization7');
        
        const volunteeredFrom1 = pdsform.getField('volunteeredFrom1');
        const volunteeredFrom2 = pdsform.getField('volunteeredFrom2');
        const volunteeredFrom3 = pdsform.getField('volunteeredFrom3');
        const volunteeredFrom4 = pdsform.getField('volunteeredFrom4');
        const volunteeredFrom5 = pdsform.getField('volunteeredFrom5');
        const volunteeredFrom6 = pdsform.getField('volunteeredFrom6');
        const volunteeredFrom7 = pdsform.getField('volunteeredFrom7');

        const volunteeredTo1 = pdsform.getField('volunteeredTo1');
        const volunteeredTo2 = pdsform.getField('volunteeredTo2');
        const volunteeredTo3 = pdsform.getField('volunteeredTo3');
        const volunteeredTo4 = pdsform.getField('volunteeredTo4');
        const volunteeredTo5 = pdsform.getField('volunteeredTo5');
        const volunteeredTo6 = pdsform.getField('volunteeredTo6');
        const volunteeredTo7 = pdsform.getField('volunteeredTo7');

        const volunteernumberOfHours1 = pdsform.getField('volunteernumberOfHours1');
        const volunteernumberOfHours2 = pdsform.getField('volunteernumberOfHours2');
        const volunteernumberOfHours3 = pdsform.getField('volunteernumberOfHours3');
        const volunteernumberOfHours4 = pdsform.getField('volunteernumberOfHours4');
        const volunteernumberOfHours5 = pdsform.getField('volunteernumberOfHours5');
        const volunteernumberOfHours6 = pdsform.getField('volunteernumberOfHours6');
        const volunteernumberOfHours7 = pdsform.getField('volunteernumberOfHours7');

        const positionNature1 = pdsform.getField('positionNature1');
        const positionNature2 = pdsform.getField('positionNature2');
        const positionNature3 = pdsform.getField('positionNature3');
        const positionNature4 = pdsform.getField('positionNature4');
        const positionNature5 = pdsform.getField('positionNature5');
        const positionNature6 = pdsform.getField('positionNature6');
        const positionNature7 = pdsform.getField('positionNature7');

        //Learning Development
        const lditPrograms1 = pdsform.getField('lditPrograms1');
        const lditPrograms2 = pdsform.getField('lditPrograms2');
        const lditPrograms3 = pdsform.getField('lditPrograms3');
        const lditPrograms4 = pdsform.getField('lditPrograms4');
        const lditPrograms5 = pdsform.getField('lditPrograms5');
        const lditPrograms6 = pdsform.getField('lditPrograms6');
        const lditPrograms7 = pdsform.getField('lditPrograms7');
        const lditPrograms8 = pdsform.getField('lditPrograms8');
        const lditPrograms9 = pdsform.getField('lditPrograms9');
        const lditPrograms10 = pdsform.getField('lditPrograms10');
        const lditPrograms11 = pdsform.getField('lditPrograms11');
        const lditPrograms12 = pdsform.getField('lditPrograms12');
        const lditPrograms13 = pdsform.getField('lditPrograms13');
        const lditPrograms14 = pdsform.getField('lditPrograms14');
        const lditPrograms15 = pdsform.getField('lditPrograms15');
        const lditPrograms16 = pdsform.getField('lditPrograms16');
        const lditPrograms17 = pdsform.getField('lditPrograms17');
        const lditPrograms18 = pdsform.getField('lditPrograms18');
        const lditPrograms19 = pdsform.getField('lditPrograms19');
        const lditPrograms20 = pdsform.getField('lditPrograms20');
        const lditPrograms21 = pdsform.getField('lditPrograms21');
        
        const trainedFrom1 = pdsform.getField('trainedFrom1');
        const trainedFrom2 = pdsform.getField('trainedFrom2');
        const trainedFrom3 = pdsform.getField('trainedFrom3');
        const trainedFrom4 = pdsform.getField('trainedFrom4');
        const trainedFrom5 = pdsform.getField('trainedFrom5');
        const trainedFrom6 = pdsform.getField('trainedFrom6');
        const trainedFrom7 = pdsform.getField('trainedFrom7');
        const trainedFrom8 = pdsform.getField('trainedFrom8');
        const trainedFrom9 = pdsform.getField('trainedFrom9');
        const trainedFrom10 = pdsform.getField('trainedFrom10');
        const trainedFrom11 = pdsform.getField('trainedFrom11');
        const trainedFrom12 = pdsform.getField('trainedFrom12');
        const trainedFrom13 = pdsform.getField('trainedFrom13');
        const trainedFrom14 = pdsform.getField('trainedFrom14');
        const trainedFrom15 = pdsform.getField('trainedFrom15');
        const trainedFrom16 = pdsform.getField('trainedFrom16');
        const trainedFrom17 = pdsform.getField('trainedFrom17');
        const trainedFrom18 = pdsform.getField('trainedFrom18');
        const trainedFrom19 = pdsform.getField('trainedFrom19');
        const trainedFrom20 = pdsform.getField('trainedFrom20');
        const trainedFrom21 = pdsform.getField('trainedFrom21');
        
        const trainedTo1 = pdsform.getField('trainedTo1');
        const trainedTo2 = pdsform.getField('trainedTo2');
        const trainedTo3 = pdsform.getField('trainedTo3');
        const trainedTo4 = pdsform.getField('trainedTo4');
        const trainedTo5 = pdsform.getField('trainedTo5');
        const trainedTo6 = pdsform.getField('trainedTo6');
        const trainedTo7 = pdsform.getField('trainedTo7');
        const trainedTo8 = pdsform.getField('trainedTo8');
        const trainedTo9 = pdsform.getField('trainedTo9');
        const trainedTo10 = pdsform.getField('trainedTo10');
        const trainedTo11 = pdsform.getField('trainedTo11');
        const trainedTo12 = pdsform.getField('trainedTo12');
        const trainedTo13 = pdsform.getField('trainedTo13');
        const trainedTo14 = pdsform.getField('trainedTo14');
        const trainedTo15 = pdsform.getField('trainedTo15');
        const trainedTo16 = pdsform.getField('trainedTo16');
        const trainedTo17 = pdsform.getField('trainedTo17');
        const trainedTo18 = pdsform.getField('trainedTo18');
        const trainedTo19 = pdsform.getField('trainedTo19');
        const trainedTo20 = pdsform.getField('trainedTo20');
        const trainedTo21 = pdsform.getField('trainedTo21');
        
        const trainingnumberOfHours1 = pdsform.getField('trainingnumberOfHours1');
        const trainingnumberOfHours2 = pdsform.getField('trainingnumberOfHours2');
        const trainingnumberOfHours3 = pdsform.getField('trainingnumberOfHours3');
        const trainingnumberOfHours4 = pdsform.getField('trainingnumberOfHours4');
        const trainingnumberOfHours5 = pdsform.getField('trainingnumberOfHours5');
        const trainingnumberOfHours6 = pdsform.getField('trainingnumberOfHours6');
        const trainingnumberOfHours7 = pdsform.getField('trainingnumberOfHours7');
        const trainingnumberOfHours8 = pdsform.getField('trainingnumberOfHours8');
        const trainingnumberOfHours9 = pdsform.getField('trainingnumberOfHours9');
        const trainingnumberOfHours10 = pdsform.getField('trainingnumberOfHours10');
        const trainingnumberOfHours11 = pdsform.getField('trainingnumberOfHours11');
        const trainingnumberOfHours12 = pdsform.getField('trainingnumberOfHours12');
        const trainingnumberOfHours13 = pdsform.getField('trainingnumberOfHours13');
        const trainingnumberOfHours14 = pdsform.getField('trainingnumberOfHours14');
        const trainingnumberOfHours15 = pdsform.getField('trainingnumberOfHours15');
        const trainingnumberOfHours16 = pdsform.getField('trainingnumberOfHours16');
        const trainingnumberOfHours17 = pdsform.getField('trainingnumberOfHours17');
        const trainingnumberOfHours18 = pdsform.getField('trainingnumberOfHours18');
        const trainingnumberOfHours19 = pdsform.getField('trainingnumberOfHours19');
        const trainingnumberOfHours20 = pdsform.getField('trainingnumberOfHours20');
        const trainingnumberOfHours21 = pdsform.getField('trainingnumberOfHours21');
        
        const typeOfLD1 = pdsform.getField('typeOfLD1');
        const typeOfLD2 = pdsform.getField('typeOfLD2');
        const typeOfLD3 = pdsform.getField('typeOfLD3');
        const typeOfLD4 = pdsform.getField('typeOfLD4');
        const typeOfLD5 = pdsform.getField('typeOfLD5');
        const typeOfLD6 = pdsform.getField('typeOfLD6');
        const typeOfLD7 = pdsform.getField('typeOfLD7');
        const typeOfLD8 = pdsform.getField('typeOfLD8');
        const typeOfLD9 = pdsform.getField('typeOfLD9');
        const typeOfLD10 = pdsform.getField('typeOfLD10');
        const typeOfLD11 = pdsform.getField('typeOfLD11');
        const typeOfLD12 = pdsform.getField('typeOfLD12');
        const typeOfLD13 = pdsform.getField('typeOfLD13');
        const typeOfLD14 = pdsform.getField('typeOfLD14');
        const typeOfLD15 = pdsform.getField('typeOfLD15');
        const typeOfLD16 = pdsform.getField('typeOfLD16');
        const typeOfLD17 = pdsform.getField('typeOfLD17');
        const typeOfLD18 = pdsform.getField('typeOfLD18');
        const typeOfLD19 = pdsform.getField('typeOfLD19');
        const typeOfLD20 = pdsform.getField('typeOfLD20');
        const typeOfLD21 = pdsform.getField('typeOfLD21');
        
        const conductedSponsoredBy1 = pdsform.getField('conductedSponsoredBy1');
        const conductedSponsoredBy2 = pdsform.getField('conductedSponsoredBy2');
        const conductedSponsoredBy3 = pdsform.getField('conductedSponsoredBy3');
        const conductedSponsoredBy4 = pdsform.getField('conductedSponsoredBy4');
        const conductedSponsoredBy5 = pdsform.getField('conductedSponsoredBy5');
        const conductedSponsoredBy6 = pdsform.getField('conductedSponsoredBy6');
        const conductedSponsoredBy7 = pdsform.getField('conductedSponsoredBy7');
        const conductedSponsoredBy8 = pdsform.getField('conductedSponsoredBy8');
        const conductedSponsoredBy9 = pdsform.getField('conductedSponsoredBy9');
        const conductedSponsoredBy10 = pdsform.getField('conductedSponsoredBy10');
        const conductedSponsoredBy11 = pdsform.getField('conductedSponsoredBy11');
        const conductedSponsoredBy12 = pdsform.getField('conductedSponsoredBy12');
        const conductedSponsoredBy13 = pdsform.getField('conductedSponsoredBy13');
        const conductedSponsoredBy14 = pdsform.getField('conductedSponsoredBy14');
        const conductedSponsoredBy15 = pdsform.getField('conductedSponsoredBy15');
        const conductedSponsoredBy16 = pdsform.getField('conductedSponsoredBy16');
        const conductedSponsoredBy17 = pdsform.getField('conductedSponsoredBy17');
        const conductedSponsoredBy18 = pdsform.getField('conductedSponsoredBy18');
        const conductedSponsoredBy19 = pdsform.getField('conductedSponsoredBy19');
        const conductedSponsoredBy20 = pdsform.getField('conductedSponsoredBy20');
        const conductedSponsoredBy21 = pdsform.getField('conductedSponsoredBy21');

        //Other Information
        const specialSkillsHobbies1 = pdsform.getField('specialSkillsHobbies1');
        const specialSkillsHobbies2 = pdsform.getField('specialSkillsHobbies2');
        const specialSkillsHobbies3 = pdsform.getField('specialSkillsHobbies3');
        const specialSkillsHobbies4 = pdsform.getField('specialSkillsHobbies4');
        const specialSkillsHobbies5 = pdsform.getField('specialSkillsHobbies5');
        const specialSkillsHobbies6 = pdsform.getField('specialSkillsHobbies6');
        const specialSkillsHobbies7 = pdsform.getField('specialSkillsHobbies7');
        
        const nonAcadDistRecog1 = pdsform.getField('nonAcadDistRecog1');
        const nonAcadDistRecog2 = pdsform.getField('nonAcadDistRecog2');
        const nonAcadDistRecog3 = pdsform.getField('nonAcadDistRecog3');
        const nonAcadDistRecog4 = pdsform.getField('nonAcadDistRecog4');
        const nonAcadDistRecog5 = pdsform.getField('nonAcadDistRecog5');
        const nonAcadDistRecog6 = pdsform.getField('nonAcadDistRecog6');
        const nonAcadDistRecog7 = pdsform.getField('nonAcadDistRecog7');

        const membershipAssocOrg1 = pdsform.getField('membershipAssocOrg1');
        const membershipAssocOrg2 = pdsform.getField('membershipAssocOrg2');
        const membershipAssocOrg3 = pdsform.getField('membershipAssocOrg3');
        const membershipAssocOrg4 = pdsform.getField('membershipAssocOrg4');
        const membershipAssocOrg5 = pdsform.getField('membershipAssocOrg5');
        const membershipAssocOrg6 = pdsform.getField('membershipAssocOrg6');
        const membershipAssocOrg7 = pdsform.getField('membershipAssocOrg7');

        //questions
        const q1ayes = pdsform.getField('q1ayes');
        const q1ano = pdsform.getField('q1ano');
        const q1bno = pdsform.getField('q1bno');
        const q1byes = pdsform.getField('q1byes');
        const q1bYesDetails = pdsform.getField('q1bYesDetails');

        const q2ayes = pdsform.getField('q2ayes');
        const q2ano = pdsform.getField('q2ano');
        const q2aYesDetails = pdsform.getField('q2aYesDetails');
        const q2byes = pdsform.getField('q2byes');
        const q2bno = pdsform.getField('q2bno');
        const q2bDateFiled = pdsform.getField('q2bDateFiled');
        const q2bStatusofCase = pdsform.getField('q2bStatusofCase');
        
        const q3ayes = pdsform.getField('q3ayes');
        const q3ano = pdsform.getField('q3ano');
        const q3aYesDetails = pdsform.getField('q3aYesDetails');

        const q4ayes = pdsform.getField('q4ayes');
        const q4ano = pdsform.getField('q4ano');
        const q4aYesDetails = pdsform.getField('q4aYesDetails');

        const q5ayes = pdsform.getField('q5ayes');
        const q5ano = pdsform.getField('q5ano');
        const q5aYesDetails = pdsform.getField('q5aYesDetails');
        const q5byes = pdsform.getField('q5byes');
        const q5bno = pdsform.getField('q5bno');
        const q5bYesDetails = pdsform.getField('q5bYesDetails');

        const q6ayes = pdsform.getField('q6ayes');
        const q6ano = pdsform.getField('q6ano');
        const q6aYesDetails = pdsform.getField('q6aYesDetails');

        const q7ayes = pdsform.getField('q7ayes');
        const q7ano = pdsform.getField('q7ano');
        const q7aYesDetails = pdsform.getField('q7aYesDetails');
        const q7byes = pdsform.getField('q7byes');
        const q7bno = pdsform.getField('q7bno');
        const q7bYesDetails = pdsform.getField('q7bYesDetails');
        const q7cyes = pdsform.getField('q7cyes');
        const q7cno = pdsform.getField('q7cno');
        const q7cYesDetails = pdsform.getField('q7cYesDetails');

        //References
        const refName1 = pdsform.getField('refName1');
        const refName2 = pdsform.getField('refName2');
        const refName3 = pdsform.getField('refName3');

        const refAddress1 = pdsform.getField('refAddress1');
        const refAddress2 = pdsform.getField('refAddress2');
        const refAddress3 = pdsform.getField('refAddress3');

        const refTelNo1 = pdsform.getField('refTelNo1');
        const refTelNo2 = pdsform.getField('refTelNo2');
        const refTelNo3 = pdsform.getField('refTelNo3');

        //Service Records
        const govIssuedIdType = pdsform.getField('govIssuedIdType');
        const govIssuedIdNumber = pdsform.getField('govIssuedIdNumber');
        const datePlaceIssued = pdsform.getField('DatePlaceIssued');


        //fill PDF

        //personal 
        if(piData != null){
         
            lastname.setText(userdata.lastname != null ? userdata.lastname : "");
            firstname.setText(userdata.firstname != null ? userdata.firstname : "");
            middleName.setText(piData.middleName != null ? piData.middleName : "");
            nameExtension.setText(piData.nameExtension != null ? piData.nameExtension : "");
            birthDate.setText(piData.birthDate != null ? moment(piData.birthDate).format('YYYY-MM-DD') : "");
            placeOfBirth.setText(piData.placeOfBirth != null ? piData.placeOfBirth : "");
            if (piData.sex === 'male') {
                male.check();
            } else if (piData.sex === 'female') {
                female.check();
            }
            
            switch (piData.civilStatus) {
                case 'single':
                    single.check();
                    break;
                case 'married':
                    married.check();
                    break;
                case 'widowed':
                    widowed.check();
                    break;
                case 'separated':
                    separated.check();
                    break;
                case 'other':
                    others.check();
                    break;
                default:
                    break;
            }
            
            height.setText(piData.height != null ? JSON.stringify(piData.height) : "");
            weight.setText(piData.height != null ? JSON.stringify(piData.weight) : "");
            bloodType.setText(piData.bloodType != null ? piData.bloodType : "");
            gsisId.setText(piData.gsisId != null ? piData.gsisId : "");
            pagibigId.setText(piData.pagibigId != null ? piData.pagibigId : "");
            philhealthId.setText(piData.philhealthId != null ? piData.philhealthId : "");
            sssId.setText(piData.sssId != null ? piData.sssId : "");
            tinId.setText(piData.tinId != null ? piData.tinId : "");
            agencyEmployeeId.setText(piData.agencyEmployeeId != null ? piData.agencyEmployeeId : "");
            
            if (piData.citizenship === 'filipino') {
                filipino.check();
                console.log(piData.dualCitizenship.dcType);
            } else if (piData.citizenship === 'dual citizenship') {
                dualCitizenship.check();
                if (piData.dualCitizenship.dcType === 'By Birth') {
                    byBirth.check();
                } else if (piData.dualCitizenship.dcType === 'By Naturalization') {
                    byNaturalization.check();
                }
                dcCountry.setText(piData.dualCitizenship.dcCountry != null ? piData.dualCitizenship.dcCountry : "");
            }
            raHBLN.setText(piData.residentialAddress.raHBLN != null ? piData.residentialAddress.raHBLN : "");
            raStrt.setText(piData.residentialAddress.raStrt != null ? piData.residentialAddress.raStrt : "");
            raSubVil.setText(piData.residentialAddress.raSubVil != null ? piData.residentialAddress.raSubVil : "");
            raBarangay.setText(piData.residentialAddress.raBarangay != null ? piData.residentialAddress.raBarangay : "");
            raCity.setText(piData.residentialAddress.raCity != null ? piData.residentialAddress.raCity : "");
            raProvince.setText(piData.residentialAddress.raProvince != null ? piData.residentialAddress.raProvince : "");
            raZipCode.setText(piData.residentialAddress.raZipCode != null ? piData.residentialAddress.raZipCode : "");
            
            paHBLN.setText(piData.permanentAddress.paHBLN != null ? piData.permanentAddress.paHBLN : "");
            paStrt.setText(piData.permanentAddress.paStrt != null ? piData.permanentAddress.paStrt : "");
            paSubVil.setText(piData.permanentAddress.paSubVil != null ? piData.permanentAddress.paSubVil : "");
            paBarangay.setText(piData.permanentAddress.paBarangay != null ? piData.permanentAddress.paBarangay : "");
            paCity.setText(piData.permanentAddress.paCity != null ? piData.permanentAddress.paCity : "");
            paProvince.setText(piData.permanentAddress.paProvince != null ? piData.permanentAddress.paProvince : "");
            paZipCode.setText(piData.permanentAddress.paZipCode != null ? piData.permanentAddress.paZipCode : "");
            
            telNo.setText(piData.telNo != null ? piData.telNo : "");
            celNo.setText(piData.celNo != null ? piData.celNo : "");
            institutionalEmail.setText(userdata.institutionalEmail != null ? userdata.institutionalEmail : "");

   
    }
        //family background
        if(fbData != null){
            sLastName.setText(fbData.spouse.sLastName ? fbData.spouse.sLastName : '');
            sFirstName.setText(fbData.spouse.sFirstName ? fbData.spouse.sFirstName : '');
            sNameExtension.setText(fbData.spouse.sNameExtension ? fbData.spouse.sNameExtension : '');
            sMiddleName.setText(fbData.spouse.sMiddleName ? fbData.spouse.sMiddleName : '');
            sOccupation.setText(fbData.spouse.sOccupation ? fbData.spouse.sOccupation : '');
            sEmployerBusinessName.setText(fbData.spouse.sEmployerBusinessName ? fbData.spouse.sEmployerBusinessName : '');
            sBusinessAdress.setText(fbData.spouse.sBusinessAddress ? fbData.spouse.sBusinessAddress : '');
            sTelNo.setText(fbData.spouse.sTelNo ? fbData.spouse.sTelNo : '');
            
            fLastName.setText(fbData.father.fLastName ? fbData.father.fLastName : '');
            fFirstName.setText(fbData.father.fFirstName ? fbData.father.fFirstName : '');
            fMiddleName.setText(fbData.father.fMiddleName ? fbData.father.fMiddleName : '');
            fNameExtension.setText(fbData.father.fNameExtension ? fbData.father.fNameExtension : '');
            
            mLastName.setText(fbData.mother.mLastName ? fbData.mother.mLastName : '');
            mFirstName.setText(fbData.mother.mFirstName ? fbData.mother.mFirstName : '');
            mMiddleName.setText(fbData.mother.mMiddleName ? fbData.mother.mMiddleName : '');
            
            fbData.children.forEach((child, index) => {
                const fieldName = `cFullName${index + 1}`;
                if (child.cFullName !== undefined && child.cFullName !== null) {
                    pdsform.getField(fieldName).setText(child.cFullName);
                }
            });
            
            fbData.children.forEach((child, index) => {
                const fieldName = `cBirthDate${index + 1}`;
                if (child.cBirthDate !== undefined && child.cBirthDate !== null) {
                    pdsform.getField(fieldName).setText(moment(child.cBirthDate).format('YYYY-MM-DD'));
                }
            });
    }
        //education
        
        if(edData != null){
        const mappings = [
            { level: 'Elementary', schoolName: schoolName1, basicEduDegCor: basicEduDegCor1, attendanceFrom: attendanceFrom1, attendanceTo: attendanceTo1, highestLevel: highestLevel1, yearGraduated: yearGraduated1, honorsRecieved: honorsRecieved1 },
            { level: 'Secondary', schoolName: schoolName2, basicEduDegCor: basicEduDegCor2, attendanceFrom: attendanceFrom2, attendanceTo: attendanceTo2, highestLevel: highestLevel2, yearGraduated: yearGraduated2, honorsRecieved: honorsRecieved2 },
            { level: 'Vocational/Trade Course', schoolName: schoolName3, basicEduDegCor: basicEduDegCor3, attendanceFrom: attendanceFrom3, attendanceTo: attendanceTo3, highestLevel: highestLevel3, yearGraduated: yearGraduated3, honorsRecieved: honorsRecieved3 },
            { level: 'College', schoolName: schoolName4, basicEduDegCor: basicEduDegCor4, attendanceFrom: attendanceFrom4, attendanceTo: attendanceTo4, highestLevel: highestLevel4, yearGraduated: yearGraduated4, honorsRecieved: honorsRecieved4 },
            { level: 'Graduate Studies', schoolName: schoolName5, basicEduDegCor: basicEduDegCor5, attendanceFrom: attendanceFrom5, attendanceTo: attendanceTo5, highestLevel: highestLevel5, yearGraduated: yearGraduated5, honorsRecieved: honorsRecieved5 }
        ];
        
        mappings.forEach(mapping => {
            edData.ed.some((education, index) => {
                if (education.schooLevel === mapping.level) {
                    mapping.schoolName.setFontSize(6);
                    mapping.schoolName.setText(education.schoolName ? education.schoolName : '');
                    mapping.basicEduDegCor.setFontSize(6);
                    mapping.basicEduDegCor.setText(education.basicEduDegCor ? education.basicEduDegCor : '');
                    mapping.attendanceFrom.setFontSize(4.5);
                    mapping.attendanceFrom.setText(education.attendanceFrom ? education.attendanceFrom : '');
                    mapping.attendanceTo.setFontSize(4.5);
                    mapping.attendanceTo.setText(education.attendanceTo ? education.attendanceTo : '');
                    mapping.highestLevel.setText(education.highestLevel ? education.highestLevel : '');
                    mapping.yearGraduated.setText(education.yearGraduated ? education.yearGraduated : '');
                    mapping.honorsRecieved.setFontSize(5);
                    mapping.honorsRecieved.setText(education.honorsRecieved ? education.honorsRecieved : '');
                    return true; // Stop iteration once found
                }
            });
        });

        const elementaryData = edData.ed.filter(edItem => edItem.schooLevel === 'Elementary');
        const secondaryData = edData.ed.filter(edItem => edItem.schooLevel === 'Secondary');
        const vocationalData = edData.ed.filter(edItem => edItem.schooLevel === 'Vocational/Trade Course');
        const collegeData = edData.ed.filter(edItem => edItem.schooLevel === 'College');
        const graduateData = edData.ed.filter(edItem => edItem.schooLevel === 'Graduate Studies');
        if (
            elementaryData.length >= 2 ||
            secondaryData.length >= 2 ||
            vocationalData.length >= 2 ||
            collegeData.length >= 2 ||
            graduateData.length >= 2
          ) {
            
  // Add a new page
  const page = unfilledPDS.addPage([612, 792]);

  // Define the table data
  const tableData = [
    ['Level', 'Name of School', 'Basic Education/Degree/Course','Attendance From', 'Attendance To', 'Highest Level/Units earned','Year Graduated', 'Scholarships/Academic Honors Recieved'],

  ];
  elementaryData.slice(1).forEach(edItem => {
    const rowData = [
      edItem.schooLevel,
      edItem.schoolName,
      edItem.basicEduDegCor,
      edItem.attendanceFrom,
      edItem.attendanceTo,
      edItem.highestLevel,
      edItem.yearGraduated,
      edItem.honorsRecieved 
    ];
    tableData.push(rowData);
  });
  secondaryData.slice(1).forEach(edItem => {
    const rowData = [
      edItem.schooLevel,
      edItem.schoolName,
      edItem.basicEduDegCor,
      edItem.attendanceFrom,
      edItem.attendanceTo,
      edItem.highestLevel,
      edItem.yearGraduated,
      edItem.honorsRecieved 
    ];
    tableData.push(rowData);
  });
  vocationalData.slice(1).forEach(edItem => {
    const rowData = [
      edItem.schooLevel,
      edItem.schoolName,
      edItem.basicEduDegCor,
      edItem.attendanceFrom,
      edItem.attendanceTo,
      edItem.highestLevel,
      edItem.yearGraduated,
      edItem.honorsRecieved 
    ];
    tableData.push(rowData);
  });
  const collegeData = edData.ed.filter(edItem => edItem.schooLevel === 'College');
collegeData.slice(1).forEach(edItem => {
  const rowData = [
    edItem.schooLevel,
    edItem.schoolName,
    edItem.basicEduDegCor,
    edItem.attendanceFrom,
    edItem.attendanceTo,
    edItem.highestLevel,
    edItem.yearGraduated,
    edItem.honorsRecieved 
  ];
  tableData.push(rowData);
});
const graduateData = edData.ed.filter(edItem => edItem.schooLevel === 'Graduate Studies');
graduateData.slice(1).forEach(edItem => {
  const rowData = [
    edItem.schooLevel,
    edItem.schoolName,
    edItem.basicEduDegCor,
    edItem.attendanceFrom,
    edItem.attendanceTo,
    edItem.highestLevel,
    edItem.yearGraduated,
    edItem.honorsRecieved 
  ];
  tableData.push(rowData);
});


  console.log(tableData)
  // Set the starting X and Y coordinates for the table
  const startX = 50;
  const startY = 750;

  // Set the table options
  const options = {
    header: {
      hasHeaderRow: true,
      textSize: 6,
      backgroundColor: pdflib.rgb(0.9, 0.9, 0.9),
    },
    textSize: 6
  };
  page.drawText('Educational Background', {
    x: 50,
    y: 770,
    size: 12,
    color: pdflib.rgb(0, 0, 0) // Black color
});
  try {
    // Draw the table
    const tableDimensions = await drawTable(unfilledPDS, page, tableData, startX, startY, options);

    console.log('Table dimensions:', tableDimensions);

  } catch (error) {
    console.error('Error drawing table:', error);
  }
        }


    }
        //civil service
        if(ebData != null){
        const eligibilityMappings = [
            { 
                license: license1, 
                rating: rating1, 
                dateOfExamination: dateOfExamination1, 
                placeOfExamination: placeOfExamination1, 
                licenseNumber: licenseNumber1, 
                dateOfValidity: dateOfValidity1 
            },
            { 
                license: license2, 
                rating: rating2, 
                dateOfExamination: dateOfExamination2, 
                placeOfExamination: placeOfExamination2, 
                licenseNumber: licenseNumber2, 
                dateOfValidity: dateOfValidity2 
            },
            { 
                license: license3, 
                rating: rating3, 
                dateOfExamination: dateOfExamination3, 
                placeOfExamination: placeOfExamination3, 
                licenseNumber: licenseNumber3, 
                dateOfValidity: dateOfValidity3 
            },
            { 
                license: license4, 
                rating: rating4, 
                dateOfExamination: dateOfExamination4, 
                placeOfExamination: placeOfExamination4, 
                licenseNumber: licenseNumber4, 
                dateOfValidity: dateOfValidity4 
            },
            { 
                license: license5, 
                rating: rating5, 
                dateOfExamination: dateOfExamination5, 
                placeOfExamination: placeOfExamination5, 
                licenseNumber: licenseNumber5, 
                dateOfValidity: dateOfValidity5 
            },
            { 
                license: license6, 
                rating: rating6, 
                dateOfExamination: dateOfExamination6, 
                placeOfExamination: placeOfExamination6, 
                licenseNumber: licenseNumber6, 
                dateOfValidity: dateOfValidity6 
            },
            { 
                license: license7, 
                rating: rating7, 
                dateOfExamination: dateOfExamination7, 
                placeOfExamination: placeOfExamination7, 
                licenseNumber: licenseNumber7, 
                dateOfValidity: dateOfValidity7 
            }
        ];
        

        for (let i = 0; i < eligibilityMappings.length; i++) {
            const eligibility = ebData.cse[i];
            const mapping = eligibilityMappings[i];
            if (mapping && eligibility) {
                mapping.license.setText(eligibility.license ? eligibility.license : '');
                mapping.rating.setText(eligibility.rating ? eligibility.rating : '');
                mapping.dateOfExamination.setText(eligibility.dateOfExamination ? moment(eligibility.dateOfExamination).format('YYYY-MM-DD') : '');
                mapping.placeOfExamination.setFontSize(8);
                mapping.placeOfExamination.setText(eligibility.placeOfExamination ? eligibility.placeOfExamination : '');
                mapping.licenseNumber.setFontSize(5);
                mapping.licenseNumber.setText(eligibility.licenseNumber ? eligibility.licenseNumber : '');
                mapping.dateOfValidity.setFontSize(5);
                mapping.dateOfValidity.setText(eligibility.dateOfValidity ? moment(eligibility.dateOfValidity).format('YYYY-MM-DD') : '');
            }
        }

        
        if (
            ebData.cse.length >= 8
          ) {
            
  // Add a new page
  const page = unfilledPDS.addPage([612, 792]);

  // Define the table data
  const tableData = [
    ['License', 'Rating', 'Date of Examination', 'Place of Examination', 'License Number', 'Date of Validity']
  ];

  ebData.cse.slice(7).forEach(edItem => {
    const rowData = [
      edItem.license,
      edItem.rating,
      edItem.dateOfExamination,
      edItem.placeOfExamination,
      edItem.licenseNumber,
      edItem.dateOfValidity
    ];
    tableData.push(rowData);
  });
  


  console.log(tableData)
  // Set the starting X and Y coordinates for the table
  const startX = 50;
  const startY = 750;

  // Set the table options
  const options = {
    header: {
      hasHeaderRow: true,
      textSize: 6,
      backgroundColor: pdflib.rgb(0.9, 0.9, 0.9),
    },
    textSize: 6
  };
  page.drawText('Civil Service and Eligibility', {
    x: 50,
    y: 770,
    size: 12,
    color: pdflib.rgb(0, 0, 0) // Black color
});
  try {
    // Draw the table
    const tableDimensions = await drawTable(unfilledPDS, page, tableData, startX, startY, options);

    console.log('Table dimensions:', tableDimensions);

  } catch (error) {
    console.error('Error drawing table:', error);
  }
        }




    }
        //work experience
        if(weData != null){
        const workExperienceMappings = [
            { workedFrom: workedFrom1, workedTo: workedTo1, positionTitle: positionTitle1, daoc: daoc1, monthlySalary: monthlySalary1, salaryJobPayGrade: salaryJobPayGrade1, statusOfAppointment: statusOfAppointment1, govtService: govtService1 },
            { workedFrom: workedFrom2, workedTo: workedTo2, positionTitle: positionTitle2, daoc: daoc2, monthlySalary: monthlySalary2, salaryJobPayGrade: salaryJobPayGrade2, statusOfAppointment: statusOfAppointment2, govtService: govtService2 },
            { workedFrom: workedFrom3, workedTo: workedTo3, positionTitle: positionTitle3, daoc: daoc3, monthlySalary: monthlySalary3, salaryJobPayGrade: salaryJobPayGrade3, statusOfAppointment: statusOfAppointment3, govtService: govtService3 },
            { workedFrom: workedFrom4, workedTo: workedTo4, positionTitle: positionTitle4, daoc: daoc4, monthlySalary: monthlySalary4, salaryJobPayGrade: salaryJobPayGrade4, statusOfAppointment: statusOfAppointment4, govtService: govtService4 },
            { workedFrom: workedFrom5, workedTo: workedTo5, positionTitle: positionTitle5, daoc: daoc5, monthlySalary: monthlySalary5, salaryJobPayGrade: salaryJobPayGrade5, statusOfAppointment: statusOfAppointment5, govtService: govtService5 },
            { workedFrom: workedFrom6, workedTo: workedTo6, positionTitle: positionTitle6, daoc: daoc6, monthlySalary: monthlySalary6, salaryJobPayGrade: salaryJobPayGrade6, statusOfAppointment: statusOfAppointment6, govtService: govtService6 },
            { workedFrom: workedFrom7, workedTo: workedTo7, positionTitle: positionTitle7, daoc: daoc7, monthlySalary: monthlySalary7, salaryJobPayGrade: salaryJobPayGrade7, statusOfAppointment: statusOfAppointment7, govtService: govtService7 },
            { workedFrom: workedFrom8, workedTo: workedTo8, positionTitle: positionTitle8, daoc: daoc8, monthlySalary: monthlySalary8, salaryJobPayGrade: salaryJobPayGrade8, statusOfAppointment: statusOfAppointment8, govtService: govtService8 },
            { workedFrom: workedFrom9, workedTo: workedTo9, positionTitle: positionTitle9, daoc: daoc9, monthlySalary: monthlySalary9, salaryJobPayGrade: salaryJobPayGrade9, statusOfAppointment: statusOfAppointment9, govtService: govtService9 },
            { workedFrom: workedFrom10, workedTo: workedTo10, positionTitle: positionTitle10, daoc: daoc10, monthlySalary: monthlySalary10, salaryJobPayGrade: salaryJobPayGrade10, statusOfAppointment: statusOfAppointment10, govtService: govtService10 },
            { workedFrom: workedFrom11, workedTo: workedTo11, positionTitle: positionTitle11, daoc: daoc11, monthlySalary: monthlySalary11, salaryJobPayGrade: salaryJobPayGrade11, statusOfAppointment: statusOfAppointment11, govtService: govtService11 },
            { workedFrom: workedFrom12, workedTo: workedTo12, positionTitle: positionTitle12, daoc: daoc12, monthlySalary: monthlySalary12, salaryJobPayGrade: salaryJobPayGrade12, statusOfAppointment: statusOfAppointment12, govtService: govtService12 },
            { workedFrom: workedFrom13, workedTo: workedTo13, positionTitle: positionTitle13, daoc: daoc13, monthlySalary: monthlySalary13, salaryJobPayGrade: salaryJobPayGrade13, statusOfAppointment: statusOfAppointment13, govtService: govtService13 },
            { workedFrom: workedFrom14, workedTo: workedTo14, positionTitle: positionTitle14, daoc: daoc14, monthlySalary: monthlySalary14, salaryJobPayGrade: salaryJobPayGrade14, statusOfAppointment: statusOfAppointment14, govtService: govtService14 },
            { workedFrom: workedFrom15, workedTo: workedTo15, positionTitle: positionTitle15, daoc: daoc15, monthlySalary: monthlySalary15, salaryJobPayGrade: salaryJobPayGrade15, statusOfAppointment: statusOfAppointment15, govtService: govtService15 },
            { workedFrom: workedFrom16, workedTo: workedTo16, positionTitle: positionTitle16, daoc: daoc16, monthlySalary: monthlySalary16, salaryJobPayGrade: salaryJobPayGrade16, statusOfAppointment: statusOfAppointment16, govtService: govtService16 },
            { workedFrom: workedFrom17, workedTo: workedTo17, positionTitle: positionTitle17, daoc: daoc17, monthlySalary: monthlySalary17, salaryJobPayGrade: salaryJobPayGrade17, statusOfAppointment: statusOfAppointment17, govtService: govtService17 },
            { workedFrom: workedFrom18, workedTo: workedTo18, positionTitle: positionTitle18, daoc: daoc18, monthlySalary: monthlySalary18, salaryJobPayGrade: salaryJobPayGrade18, statusOfAppointment: statusOfAppointment18, govtService: govtService18 },
            { workedFrom: workedFrom19, workedTo: workedTo19, positionTitle: positionTitle19, daoc: daoc19, monthlySalary: monthlySalary19, salaryJobPayGrade: salaryJobPayGrade19, statusOfAppointment: statusOfAppointment19, govtService: govtService19 },
            { workedFrom: workedFrom20, workedTo: workedTo20, positionTitle: positionTitle20, daoc: daoc20, monthlySalary: monthlySalary20, salaryJobPayGrade: salaryJobPayGrade20, statusOfAppointment: statusOfAppointment20, govtService: govtService20 },
            { workedFrom: workedFrom21, workedTo: workedTo21, positionTitle: positionTitle21, daoc: daoc21, monthlySalary: monthlySalary21, salaryJobPayGrade: salaryJobPayGrade21, statusOfAppointment: statusOfAppointment21, govtService: govtService21 },
            { workedFrom: workedFrom22, workedTo: workedTo22, positionTitle: positionTitle22, daoc: daoc22, monthlySalary: monthlySalary22, salaryJobPayGrade: salaryJobPayGrade22, statusOfAppointment: statusOfAppointment22, govtService: govtService22 },
            { workedFrom: workedFrom23, workedTo: workedTo23, positionTitle: positionTitle23, daoc: daoc23, monthlySalary: monthlySalary23, salaryJobPayGrade: salaryJobPayGrade23, statusOfAppointment: statusOfAppointment23, govtService: govtService23 },
            { workedFrom: workedFrom24, workedTo: workedTo24, positionTitle: positionTitle24, daoc: daoc24, monthlySalary: monthlySalary24, salaryJobPayGrade: salaryJobPayGrade24, statusOfAppointment: statusOfAppointment24, govtService: govtService24 },
            { workedFrom: workedFrom25, workedTo: workedTo25, positionTitle: positionTitle25, daoc: daoc25, monthlySalary: monthlySalary25, salaryJobPayGrade: salaryJobPayGrade25, statusOfAppointment: statusOfAppointment25, govtService: govtService25 },
            { workedFrom: workedFrom26, workedTo: workedTo26, positionTitle: positionTitle26, daoc: daoc26, monthlySalary: monthlySalary26, salaryJobPayGrade: salaryJobPayGrade26, statusOfAppointment: statusOfAppointment26, govtService: govtService26 },
            { workedFrom: workedFrom27, workedTo: workedTo27, positionTitle: positionTitle27, daoc: daoc27, monthlySalary: monthlySalary27, salaryJobPayGrade: salaryJobPayGrade27, statusOfAppointment: statusOfAppointment27, govtService: govtService27 },
            { workedFrom: workedFrom28, workedTo: workedTo28, positionTitle: positionTitle28, daoc: daoc28, monthlySalary: monthlySalary28, salaryJobPayGrade: salaryJobPayGrade28, statusOfAppointment: statusOfAppointment28, govtService: govtService28 }
        ];
        
        for (let i = 0; i < workExperienceMappings.length; i++) {
            const workExperience = weData.we[i];
            const mapping = workExperienceMappings[i];
            if (mapping && workExperience) {
                mapping.workedFrom.setFontSize(5);
                mapping.workedFrom.setText(workExperience.workedFrom ? moment(workExperience.workedFrom).format('YYYY-MM-DD') : '');
                mapping.workedTo.setFontSize(5);
                mapping.workedTo.setText(workExperience.workedTo ? moment(workExperience.workedTo).format('YYYY-MM-DD') : '');
                mapping.positionTitle.setText(workExperience.positionTitle ? workExperience.positionTitle : '');
                mapping.daoc.setFontSize(7);
                mapping.daoc.setText(workExperience.daoc ? workExperience.daoc : '');
                mapping.monthlySalary.setFontSize(6);
                mapping.monthlySalary.setText(workExperience.monthlySalary ? JSON.stringify(workExperience.monthlySalary) : '');
                mapping.salaryJobPayGrade.setFontSize(6);
                mapping.salaryJobPayGrade.setText(workExperience.salaryJobPayGrade ? workExperience.salaryJobPayGrade : '');
                mapping.statusOfAppointment.setText(workExperience.statusOfAppointment ? workExperience.statusOfAppointment : '');
                if (workExperience.govtService === true) {
                    mapping.govtService.setText('Y');
                } else if (workExperience.govtService === false) {
                    mapping.govtService.setText('N');
                }
            }
        }

        // Separate if block for weData
if (weData.we.length >= 29) {
    // Add a new page for weData
    const Page = unfilledPDS.addPage([612, 792]);
  
    // Define the table data for weData
    const tableData = [
      ['Worked From', 'Worked To', 'Position Title', 'DAOC', 'Monthly Salary', 'Salary/Job Pay Grade', 'Status of Appointment', 'Govt Service']
    ];
  
    weData.we.slice(28).forEach(weItem => {
      const rowData = [
        moment(weItem.workedFrom).format('YYYY-MM-DD'),
        moment(weItem.workedTo).format('YYYY-MM-DD'),
        weItem.positionTitle,
        weItem.daoc,
        String(weItem.monthlySalary),
        weItem.salaryJobPayGrade,
        weItem.statusOfAppointment,
        weItem.govtService ? 'Yes' : 'No'
      ];
      tableData.push(rowData);
    });
  
    
  // Set the starting X and Y coordinates for the table
  const startX = 50;
  const startY = 750;

  // Set the table options
  const options = {
    header: {
      hasHeaderRow: true,
      textSize: 6,
      backgroundColor: pdflib.rgb(0.9, 0.9, 0.9),
    },
    textSize: 6
  };

  Page.drawText('Work Experiences', {
    x: 50,
    y: 770,
    size: 12,
    color: pdflib.rgb(0, 0, 0) // Black color
});
    // Draw the table for weData
    try {
      const weTableDimensions = await drawTable(unfilledPDS, Page, tableData, startX, startY, options);
      console.log('We Table dimensions:', weTableDimensions);
    } catch (error) {
      console.error('Error drawing weData table:', error);
    }
  }
    }


        //volunteer work
        if(vwData != null){
        const volunteerWorkMappings = [
            { nameAddressOfOrganization: nameAddressOfOrganization1, volunteeredFrom: volunteeredFrom1, volunteeredTo: volunteeredTo1, volunteernumberOfHours: volunteernumberOfHours1, positionNature: positionNature1 },
            { nameAddressOfOrganization: nameAddressOfOrganization2, volunteeredFrom: volunteeredFrom2, volunteeredTo: volunteeredTo2, volunteernumberOfHours: volunteernumberOfHours2, positionNature: positionNature2 },
            { nameAddressOfOrganization: nameAddressOfOrganization3, volunteeredFrom: volunteeredFrom3, volunteeredTo: volunteeredTo3, volunteernumberOfHours: volunteernumberOfHours3, positionNature: positionNature3 },
            { nameAddressOfOrganization: nameAddressOfOrganization4, volunteeredFrom: volunteeredFrom4, volunteeredTo: volunteeredTo4, volunteernumberOfHours: volunteernumberOfHours4, positionNature: positionNature4 },
            { nameAddressOfOrganization: nameAddressOfOrganization5, volunteeredFrom: volunteeredFrom5, volunteeredTo: volunteeredTo5, volunteernumberOfHours: volunteernumberOfHours5, positionNature: positionNature5 },
            { nameAddressOfOrganization: nameAddressOfOrganization6, volunteeredFrom: volunteeredFrom6, volunteeredTo: volunteeredTo6, volunteernumberOfHours: volunteernumberOfHours6, positionNature: positionNature6 },
            { nameAddressOfOrganization: nameAddressOfOrganization7, volunteeredFrom: volunteeredFrom7, volunteeredTo: volunteeredTo7, volunteernumberOfHours: volunteernumberOfHours7, positionNature: positionNature7 }
        ];

        for (let i = 0; i < volunteerWorkMappings.length; i++) {
            const volunteerWork = vwData.vw[i];
            const mapping = volunteerWorkMappings[i];
            if (mapping && volunteerWork) {
                mapping.nameAddressOfOrganization.setText(volunteerWork.nameAddressOfOrganization ? volunteerWork.nameAddressOfOrganization : '');
                mapping.volunteeredFrom.setFontSize(6);
                mapping.volunteeredFrom.setText(volunteerWork.volunteeredFrom ? moment(volunteerWork.volunteeredFrom).format('YYYY-MM-DD') : '');
                mapping.volunteeredTo.setFontSize(6);
                mapping.volunteeredTo.setText(volunteerWork.volunteeredTo ? moment(volunteerWork.volunteeredTo).format('YYYY-MM-DD') : '');
                mapping.volunteernumberOfHours.setText(volunteerWork.volunteernumberOfHours ? JSON.stringify(volunteerWork.volunteernumberOfHours) : '');
                mapping.positionNature.setText(volunteerWork.positionNature ? volunteerWork.positionNature : '');
            }
        }
        // Separate if block for vwData
if (vwData.vw.length >= 8) {
    // Add a new page for vwData
    const vwPage = unfilledPDS.addPage([612, 792]);

    // Define the table data for vwData
    const vwTableData = [
        ['Name/Address of Organization', 'Volunteered From', 'Volunteered To', 'Number of Hours', 'Position/Nature']
    ];

    vwData.vw.slice(7).forEach(vwItem => {
        const vwRowData = [
            vwItem.nameAddressOfOrganization,
            moment(vwItem.volunteeredFrom).format('YYYY-MM-DD'),
            moment(vwItem.volunteeredTo).format('YYYY-MM-DD'),
            String(vwItem.volunteernumberOfHours),
            vwItem.positionNature
        ];
        vwTableData.push(vwRowData);
    });

    // Set the starting X and Y coordinates for the table
    const vwStartX = 50;
    const vwStartY = 750;

    // Set the table options
    const vwOptions = {
        header: {
            hasHeaderRow: true,
            textSize: 6,
            backgroundColor: pdflib.rgb(0.9, 0.9, 0.9),
        },
        textSize: 6
    };
    vwPage.drawText('Volunteer Works', {
        x: 50,
        y: 770,
        size: 12,
        color: pdflib.rgb(0, 0, 0) // Black color
    });
    // Draw the table for vwData
    try {
        const vwTableDimensions = await drawTable(unfilledPDS, vwPage, vwTableData, vwStartX, vwStartY, vwOptions);
        console.log('VW Table dimensions:', vwTableDimensions);
    } catch (error) {
        console.error('Error drawing vwData table:', error);
    }
}
    }

        //trainings
        if(trData != null){
        const lditTrainingMappings = [
            { lditPrograms: lditPrograms1, trainedFrom: trainedFrom1, trainedTo: trainedTo1, trainingnumberOfHours: trainingnumberOfHours1, typeOfLD: typeOfLD1, conductedSponsoredBy: conductedSponsoredBy1 },
            { lditPrograms: lditPrograms2, trainedFrom: trainedFrom2, trainedTo: trainedTo2, trainingnumberOfHours: trainingnumberOfHours2, typeOfLD: typeOfLD2, conductedSponsoredBy: conductedSponsoredBy2 },
            { lditPrograms: lditPrograms3, trainedFrom: trainedFrom3, trainedTo: trainedTo3, trainingnumberOfHours: trainingnumberOfHours3, typeOfLD: typeOfLD3, conductedSponsoredBy: conductedSponsoredBy3 },
            { lditPrograms: lditPrograms4, trainedFrom: trainedFrom4, trainedTo: trainedTo4, trainingnumberOfHours: trainingnumberOfHours4, typeOfLD: typeOfLD4, conductedSponsoredBy: conductedSponsoredBy4 },
            { lditPrograms: lditPrograms5, trainedFrom: trainedFrom5, trainedTo: trainedTo5, trainingnumberOfHours: trainingnumberOfHours5, typeOfLD: typeOfLD5, conductedSponsoredBy: conductedSponsoredBy5 },
            { lditPrograms: lditPrograms6, trainedFrom: trainedFrom6, trainedTo: trainedTo6, trainingnumberOfHours: trainingnumberOfHours6, typeOfLD: typeOfLD6, conductedSponsoredBy: conductedSponsoredBy6 },
            { lditPrograms: lditPrograms7, trainedFrom: trainedFrom7, trainedTo: trainedTo7, trainingnumberOfHours: trainingnumberOfHours7, typeOfLD: typeOfLD7, conductedSponsoredBy: conductedSponsoredBy7 },
            { lditPrograms: lditPrograms8, trainedFrom: trainedFrom8, trainedTo: trainedTo8, trainingnumberOfHours: trainingnumberOfHours8, typeOfLD: typeOfLD8, conductedSponsoredBy: conductedSponsoredBy8 },
            { lditPrograms: lditPrograms9, trainedFrom: trainedFrom9, trainedTo: trainedTo9, trainingnumberOfHours: trainingnumberOfHours9, typeOfLD: typeOfLD9, conductedSponsoredBy: conductedSponsoredBy9 },
            { lditPrograms: lditPrograms10, trainedFrom: trainedFrom10, trainedTo: trainedTo10, trainingnumberOfHours: trainingnumberOfHours10, typeOfLD: typeOfLD10, conductedSponsoredBy: conductedSponsoredBy10 },
            { lditPrograms: lditPrograms11, trainedFrom: trainedFrom11, trainedTo: trainedTo11, trainingnumberOfHours: trainingnumberOfHours11, typeOfLD: typeOfLD11, conductedSponsoredBy: conductedSponsoredBy11 },
            { lditPrograms: lditPrograms12, trainedFrom: trainedFrom12, trainedTo: trainedTo12, trainingnumberOfHours: trainingnumberOfHours12, typeOfLD: typeOfLD12, conductedSponsoredBy: conductedSponsoredBy12 },
            { lditPrograms: lditPrograms13, trainedFrom: trainedFrom13, trainedTo: trainedTo13, trainingnumberOfHours: trainingnumberOfHours13, typeOfLD: typeOfLD13, conductedSponsoredBy: conductedSponsoredBy13 },
            { lditPrograms: lditPrograms14, trainedFrom: trainedFrom14, trainedTo: trainedTo14, trainingnumberOfHours: trainingnumberOfHours14, typeOfLD: typeOfLD14, conductedSponsoredBy: conductedSponsoredBy14 },
            { lditPrograms: lditPrograms15, trainedFrom: trainedFrom15, trainedTo: trainedTo15, trainingnumberOfHours: trainingnumberOfHours15, typeOfLD: typeOfLD15, conductedSponsoredBy: conductedSponsoredBy15 },
            { lditPrograms: lditPrograms16, trainedFrom: trainedFrom16, trainedTo: trainedTo16, trainingnumberOfHours: trainingnumberOfHours16, typeOfLD: typeOfLD16, conductedSponsoredBy: conductedSponsoredBy16 },
            { lditPrograms: lditPrograms17, trainedFrom: trainedFrom17, trainedTo: trainedTo17, trainingnumberOfHours: trainingnumberOfHours17, typeOfLD: typeOfLD17, conductedSponsoredBy: conductedSponsoredBy17 },
            { lditPrograms: lditPrograms18, trainedFrom: trainedFrom18, trainedTo: trainedTo18, trainingnumberOfHours: trainingnumberOfHours18, typeOfLD: typeOfLD18, conductedSponsoredBy: conductedSponsoredBy18 },
            { lditPrograms: lditPrograms19, trainedFrom: trainedFrom19, trainedTo: trainedTo19, trainingnumberOfHours: trainingnumberOfHours19, typeOfLD: typeOfLD19, conductedSponsoredBy: conductedSponsoredBy19 },
            { lditPrograms: lditPrograms20, trainedFrom: trainedFrom20, trainedTo: trainedTo20, trainingnumberOfHours: trainingnumberOfHours20, typeOfLD: typeOfLD20, conductedSponsoredBy: conductedSponsoredBy20 },
            { lditPrograms: lditPrograms21, trainedFrom: trainedFrom21, trainedTo: trainedTo21, trainingnumberOfHours: trainingnumberOfHours21, typeOfLD: typeOfLD21, conductedSponsoredBy: conductedSponsoredBy21 }
        ];

        for (let i = 0; i < lditTrainingMappings.length; i++) {
            const training = trData.ldit[i];
            const mapping = lditTrainingMappings[i];
            if (mapping && training) {
                mapping.lditPrograms.setText(training.lditPrograms ? training.lditPrograms : '');
                mapping.trainedFrom.setText(training.trainedFrom ? moment(training.trainedFrom).format('YYYY-MM-DD') : '');
                mapping.trainedFrom.setFontSize(6);
                mapping.trainedTo.setText(training.trainedTo ? moment(training.trainedTo).format('YYYY-MM-DD') : '');
                mapping.trainedTo.setFontSize(6);
                mapping.trainingnumberOfHours.setText(training.trainingnumberOfHours ? JSON.stringify(training.trainingnumberOfHours) : '');
                mapping.typeOfLD.setText(training.typeOfLD ? training.typeOfLD : '');
                mapping.conductedSponsoredBy.setText(training.conductedSponsoredBy ? training.conductedSponsoredBy : '');
            }
        }
        // Separate if block for trData
if (trData.ldit.length >= 22) {
    // Add a new page for trData
    const trPage = unfilledPDS.addPage([612, 792]);

    // Define the table data for trData
    const trTableData = [
        ['LD/IT Programs', 'Trained From', 'Trained To', 'Number of Hours', 'Type of LD', 'Conducted/Sponsored By']
    ];

    trData.ldit.slice(21).forEach(trItem => {
        const trRowData = [
            trItem.lditPrograms,
            moment(trItem.trainedFrom).format('YYYY-MM-DD'),
            moment(trItem.trainedTo).format('YYYY-MM-DD'),
            String(trItem.trainingnumberOfHours),
            String(trItem.typeOfLD),
            trItem.conductedSponsoredBy
        ];
        trTableData.push(trRowData);
    });
    // Set the starting X and Y coordinates for the table
    const trStartX = 50;
    const trStartY = 750;

    // Set the table options
    const trOptions = {
        header: {
            hasHeaderRow: true,
            textSize: 6,
            backgroundColor: pdflib.rgb(0.9, 0.9, 0.9),
        },
        textSize: 6
    };

    trPage.drawText('Trainings', {
        x: 50,
        y: 770,
        size: 12,
        color: pdflib.rgb(0, 0, 0) // Black color
    });
    // Draw the table for trData
    try {
        const trTableDimensions = await drawTable(unfilledPDS, trPage, trTableData, trStartX, trStartY, trOptions);
        console.log('TR Table dimensions:', trTableDimensions);
    } catch (error) {
        console.error('Error drawing trData table:', error);
    }
}
    }
        //other information
        if(oiData != null){
        const specialSkillsHobbiesMappings = [
            { specialSkillsHobbies: specialSkillsHobbies1 },
            { specialSkillsHobbies: specialSkillsHobbies2 },
            { specialSkillsHobbies: specialSkillsHobbies3 },
            { specialSkillsHobbies: specialSkillsHobbies4 },
            { specialSkillsHobbies: specialSkillsHobbies5 },
            { specialSkillsHobbies: specialSkillsHobbies6 },
            { specialSkillsHobbies: specialSkillsHobbies7 }
        ];
        for (let i = 0; i < specialSkillsHobbiesMappings.length; i++) {
            const mapping = specialSkillsHobbiesMappings[i];
            const specialSkillsHobbiesData = oiData.specialSkillsHobbies[i];
            if (mapping && specialSkillsHobbiesData) {
                mapping.specialSkillsHobbies.setText(specialSkillsHobbiesData ? specialSkillsHobbiesData : '');
            }
        }
        const nonAcadDistRecogMappings = [
            { nonAcadDistRecog: nonAcadDistRecog1 },
            { nonAcadDistRecog: nonAcadDistRecog2 },
            { nonAcadDistRecog: nonAcadDistRecog3 },
            { nonAcadDistRecog: nonAcadDistRecog4 },
            { nonAcadDistRecog: nonAcadDistRecog5 },
            { nonAcadDistRecog: nonAcadDistRecog6 },
            { nonAcadDistRecog: nonAcadDistRecog7 }
        ];
        for (let i = 0; i < nonAcadDistRecogMappings.length; i++) {
            const mapping = nonAcadDistRecogMappings[i];
            const nonAcadDistRecogData = oiData.nonAcadDistRecog[i];
            if (mapping && nonAcadDistRecogData) {
                mapping.nonAcadDistRecog.setText(nonAcadDistRecogData ? nonAcadDistRecogData : '');
            }
        }

        const membershipAssocOrgMappings = [
            { membershipAssocOrg: membershipAssocOrg1 },
            { membershipAssocOrg: membershipAssocOrg2 },
            { membershipAssocOrg: membershipAssocOrg3 },
            { membershipAssocOrg: membershipAssocOrg4 },
            { membershipAssocOrg: membershipAssocOrg5 },
            { membershipAssocOrg: membershipAssocOrg6 },
            { membershipAssocOrg: membershipAssocOrg7 }
        ];
        for (let i = 0; i < membershipAssocOrgMappings.length; i++) {
            const mapping = membershipAssocOrgMappings[i];
            const membershipAssocOrgData = oiData.membershipAssocOrg[i];
            if (mapping && membershipAssocOrgData) {
                mapping.membershipAssocOrg.setText(membershipAssocOrgData ? membershipAssocOrgData : '');
            }
        }
    }
        //questions
        if(qtData != null){
        if (qtData.q1.q1a === true) {
            q1ayes.check();
        } else if (qtData.q1.q1a === false) {
            q1ano.check();
        }
        
        if (qtData.q1.q1b === true) {
            q1byes.check();
            q1bYesDetails.setText(qtData.q1.q1bYesDetails || '');
        } else if (qtData.q1.q1b === false) {
            q1bno.check();
        }
        
        if (qtData.q2.q2a === true) {
            q2ayes.check();
            q2aYesDetails.setText(qtData.q2.q2aYesDetails || '');
        } else if (qtData.q2.q2a === false) {
            q2ano.check();
        }
        if (qtData.q2.q2b === true) {
            q2byes.check();
            q2bDateFiled.setText(moment(qtData.q2.q2bDateFiled).format('YYYY-MM-DD') || '');
            q2bStatusofCase.setText(qtData.q2.q2bStatusofCase || '');
        } else if (qtData.q2.q2b === false) {
            q2bno.check();
        }
        
        if (qtData.q3.q3a === true) {
            q3ayes.check();
            q3aYesDetails.setText(qtData.q3.q3aYesDetails || '');
        } else if (qtData.q3.q3a === false) {
            q3ano.check();
        }
        
        if (qtData.q4.q4a === true) {
            q4ayes.check();
            q4aYesDetails.setText(qtData.q4.q4aYesDetails || '');
        } else if (qtData.q4.q4a === false) {
            q4ano.check();
        }
        
        if (qtData.q5.q5a === true) {
            q5ayes.check();
            q5aYesDetails.setText(qtData.q5.q5aYesDetails || '');
        } else if (qtData.q5.q5a === false) {
            q5ano.check();
        }
        if (qtData.q5.q5b === true) {
            q5byes.check();
            q5bYesDetails.setText(qtData.q5.q5bYesDetails || '');
        } else if (qtData.q5.q5b === false) {
            q5bno.check();
        }
        
        if (qtData.q6.q6a === true) {
            q6ayes.check();
            q6aYesDetails.setText(qtData.q6.q6aYesDetails || '');
        } else if (qtData.q6.q6a === false) {
            q6ano.check();
        }
        
        if (qtData.q7.q7a === true) {
            q7ayes.check();
            q7aYesDetails.setText(qtData.q7.q7aYesDetails || '');
        } else if (qtData.q7.q7a === false) {
            q7ano.check();
        }
        if (qtData.q7.q7b === true) {
            q7byes.check();
            q7bYesDetails.setText(qtData.q7.q7bYesDetails || '');
        } else if (qtData.q7.q7b === false) {
            q7bno.check();
        }
        if (qtData.q7.q7c === true) {
            q7cyes.check();
            q7cYesDetails.setText(qtData.q7.q7cYesDetails || '');
        } else if (qtData.q7.q7c === false) {
            q7cno.check();
        }
    }
        
        
        //references
        if(rrData != null){
        const referenceMappings = [
            { refName: refName1, refAddress: refAddress1, refTelNo: refTelNo1 },
            { refName: refName2, refAddress: refAddress2, refTelNo: refTelNo2 },
            { refName: refName3, refAddress: refAddress3, refTelNo: refTelNo3 }
        ];
        
        for (let i = 0; i < referenceMappings.length; i++) {
            const reference = rrData.ref[i];
            const mapping = referenceMappings[i];
            if (mapping && reference) {
                mapping.refName.setText(reference.refName || '');
                mapping.refAddress.setText(reference.refAddress || '');
                mapping.refTelNo.setText(reference.refTelNo || '');
            }
        }
    }

        //service records
        if(srData != null){
        govIssuedIdType.setText(srData.govIssuedIdType || '');
        govIssuedIdNumber.setText(srData.govIssuedIdNumber || '' );
        datePlaceIssued.setText(srData.DatePlaceIssued || '');
        }




        //if some data are more than one table
        
        // Create a new page




        const filledPDS = await unfilledPDS.save()
        const filledPDSBuffer = Buffer.from(filledPDS);

        const userpdf = await PDF.exists({userId: userid});
        if (userpdf === null) {
            //create new entry
            try {
                const pdfcreate = await PDF.create({userId: userid, pdf_data: filledPDSBuffer});
                console.log(pdfcreate);
            }
            catch (err) {
                console.log(err)
            }
        } else {
            //update existing entry
            try {
                const pdfupdate = await PDF.updateOne({userId: userid}, {pdf_data: filledPDSBuffer});
                    console.log(pdfupdate)
            }
            catch (error){
                console.log(error)
            }
        }
        // writeFile(filename, filledPDS, (err) => {
        //     if (err) {
        //         console.error('Error saving PDF:', err);
        //         return;
        //     }
        //     console.log('PDF saved successfully!');
        // });
    } catch(err) {
        console.log(err)
    }
}

module.exports.submitPDS_post = async (req, res) => {
    const userId = req.body.userId;
    const filePath = './PDF/'+userId+'.pdf'; // Specify the file path here

    
    const pdssubmission = await pdsS.exists({userId: userId});
    if (pdssubmission === null) {
        //create new entry
        try {
            const pdsScreate = await pdsS.create({userId, status: 'Generated', comment: ''});
            await fillPDF(filePath, userId);
            // console.log(pdsScreate);
            res.status(200).json({status: 'Submit Success'});
        }
        catch (err) {
            res.status(400).json({status: 'Submit Failed'});
            console.log(err)
        }
    } else {
        //update existing entry
            const pdsSupdate = await pdsS.updateOne({userId}, {status: 'Generated', comment: ''});
            const pdfData = await pdsS.findOne({userId: userId});
            console.log(pdfData)
            await fillPDF(filePath, userId);
            res.status(200).json({status: 'Submit Failed'});
    }
}

module.exports.printPDS_get = async (req, res) => {
    const userId = req.params.id;
    const pdssubmission = await pdsS.exists({userId: userId});
    if (pdssubmission === null) {
        //create new entry
        try {
            const pdsScreate = await pdsS.create({userId, status: 'Submitted', comment: ''});
            const user = await User.findById(userId)
            const userlog = await userlogs.create({userId: user._id, firstname: user.firstname, lastname: user.lastname, action: 'Submit PDS'});
            const pdfData = await PDF.findOne({userId: userId});
            res.setHeader('Content-disposition', 'attachment; filename=Personal_Data_Sheet.pdf');
            res.setHeader('Content-type', 'application/pdf');
            res.status(200).send(pdfData.pdf_data)
            
        }
        catch (err) {
            res.status(400).json({status: 'Submit Failed 2'});
            console.log(err)
        }
    } else {
        //update existing entry
            const pdsSupdate = await pdsS.updateOne({userId}, {status: 'Submitted', comment: ''});
            console.log('gumagana ba to')
            const pdfData = await PDF.findOne({userId: userId});
            res.setHeader('Content-disposition', 'attachment; filename=Personal_Data_Sheet.pdf');
            res.setHeader('Content-type', 'application/pdf');
            res.send(pdfData.pdf_data);
    }
}

module.exports.printonlyPDS_get = async (req, res) => {
    const userId = req.params.id;
    const pdfData = await PDF.findOne({userId: userId});
    res.setHeader('Content-disposition', 'attachment; filename=Personal_Data_Sheet.pdf');
    res.setHeader('Content-type', 'application/pdf');
    res.send(pdfData.pdf_data);
    
}

module.exports.preview_get = async (req, res) => {
    const userId = req.params.id;
    const pdssubmission = await pdsS.exists({userId: userId});
    if (pdssubmission !== null) {
        //create new entry
        try {
            const pdfData = await PDF.findOne({userId: userId});
            res.setHeader('Content-disposition', 'inline; filename=Personal_Data_Sheet.pdf');
            res.setHeader('Content-type', 'application/pdf');
            res.send(pdfData.pdf_data);
        }
        catch (err) {
            res.status(400).json({status: 'Submit Failed 2'});
            console.log(err)
        }
    } else {
        res.status(400).json({status: 'Preview Not Available'});
    }
}

module.exports.uploadApprovedPDS_post = async (req, res) => {
    const selectedFile = req.files.fileUpload;
    const userId = req.body.userId

    const pdssubmission = await pdsS.exists({userId: userId});
    if (pdssubmission === null) {
        //create new entry
        try {
            const pdsScreate = await pdsS.create({userId, status: 'Approved', comment: '', pdf_data: selectedFile});
            const pdfData = await PDF.findOne({userId: userId});
            res.redirect('/'+userId);
            
        }
        catch (err) {
            res.status(400).json({status: 'Submit Failed'});
            console.log(err)
        }
    } else {
        //update existing entry
            const pdsSupdate = await pdsS.updateOne({userId}, {status: 'Approved', comment: '', pdf_data: selectedFile});
            console.log('gumagana ba to')
            const pdfData = await PDF.findOne({userId: userId});
            res.redirect('/'+userId);
    }
    const fileBuffer = Buffer.from(selectedFile.data, 'base64');
    console.log(fileBuffer);


//     const options = {
//         density: 100,
//         saveFilename: "untitled",
        
//         format: "png"
//       };

//     const convert = pdf2pic.fromBuffer(fileBuffer, options);
//     const pageToConvertAsImage = 1;

// convert(pageToConvertAsImage, { responseType: "image" })
//   .then((resolve) => {
//     console.log("Page 1 is now converted as image");

//     return resolve;
//   });
//     console.log(convert); // Number of converted images
    
    
}