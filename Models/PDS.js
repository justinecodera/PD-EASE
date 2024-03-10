const mongoose = require('mongoose');
const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

//personal information schema
const personalInfoSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    middleName: {
        type: String,
        required: true,
    },
    nameExtension: {
        type: String,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    placeOfBirth: {
        type: String,
        required: true,
        lowercase: true,
    },
    sex: {
        type: String,
        required: true,
        lowercase: true
    },
    civilStatus: {
        type: String,
        required: true,
        lowercase: true
    },
    height: {
        type: Number,
        required: true,
        lowercase: true
    },
    weight: {
        type: Number,
        required: true,
        lowercase: true
    },
    bloodType: {
        type: String,
        required: true,
        lowercase: true
    },
    gsisId: {
        type: String,
        required: true,
        lowercase: true
    },
    pagibigId: {
        type: String,
        required: true,
        lowercase: true
    },
    philhealthId: {
        type: String,
        required: true,
        lowercase: true
    },
    sssId: {
        type: String,
        required: true,
        lowercase: true
    },
    tinId: {
        type: String,
        required: true,
        lowercase: true
    },
    agencyEmployeeId: {
        type: String,
        required: true,
        lowercase: true
    },
    citizenship: {
        type: String,
        required: true,
        lowercase: true
    },
    dualCitizenship: {
        dcType: {
            type: String
        },
        dcCountry: {
            type: String
        }
    },

    residentialAddress: {
        raHBLN: {
            type: String,
            required: true,
            lowercase: true
        },
        raStrt: {
            type: String,
            required: true,
            lowercase: true
        },
        raSubVil: {
            type: String,
            required: true,
            lowercase: true
        },
        raBarangay: {
            type: String,
            required: true,
            lowercase: true
        },
        raCity: {
            type: String,
            required: true,
            lowercase: true
        },
        raProvince: {
            type: String,
            required: true,
            lowercase: true
        },
        raZipCode: {
            type: String,
            required: true,
            lowercase: true
        }
    },
    permanentAddress: {
        paHBLN: {
            type: String,
            required: true,
            lowercase: true
        },
        paStrt: {
            type: String,
            required: true,
            lowercase: true
        },
        paSubVil: {
            type: String,
            required: true,
            lowercase: true
        },
        paBarangay: {
            type: String,
            required: true,
            lowercase: true
        },
        paCity: {
            type: String,
            required: true,
            lowercase: true
        },
        paProvince: {
            type: String,
            required: true,
            lowercase: true
        },
        paZipCode: {
            type: String,
            required: true,
            lowercase: true
        }
    },
    
    telNo: {
        type: String,
        required: true,
        lowercase: true
    },
    celNo: {
        type: String,
        required: true,
        lowercase: true
    },
}, {timestamps: true});

//family background schema
const familyBackgroundSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    spouse: {
        sLastName: {
            type: String
        },
        sFirstName: {
            type: String
        },
        sMiddleName: {
            type: String
        },
        sNameExtension: {
            type: String
        },
        sOccupation: {
            type: String 
        },
        sEmployerBusinessName: {
            type: String
        },
        sBusinessAdress: {
            type: String
        },
        sTelNo: {
            type: String
        },
    },
    father: {
        fLastName: {
            type: String
        },
        fFirstName: {
            type: String
        },
        fMiddleName: {
            type: String
        },
        fNameExtension: {
            type: String
        }
    },
    mother: {
        mLastName: {
            type: String
        },
        mFirstName: {
            type: String
        },
        mMiddleName: {
            type: String
        }
    },
    children: [
        {
            cFullName: {
                type: String
            },
            cBirthDate: {
                type: Date 
            }
        }
    ]
});

//education schema
const educationSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    ed: [
        {
            schooLevel: {
                type: String
            },
            schoolName: {
                type: String
            },
            basicEduDegCor: {
                type: String
            },
            attendanceFrom: {
                type: String
            },
            attendanceTo: {
                type: String
            },
            highestLevel: {
                type: String
            },
            yearGraduated: {
                type: String
            },
            honorsRecieved: {
                type: String
            }
        }
    ]  
            
});

//eligibility Schema
const eligibilitySchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    cse: [
        {
            license: {
                type: String,
                unique: true
            },
            rating: {
                type: String
            },
            dateOfExamination: {
                type: Date
            },
            placeOfExamination: {
                type: String
            },
            licenseNumber: {
                type: String
            },
            dateOfValidity: {
                type: Date
            }
        }
    ]
});

// workExperienceSchema
const workExperienceSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    we: [
        {
            workedFrom: {
                type: Date
            },
            workedTo: {
                type: Date
            },
            positionTitle: {
                type: String
            },
            daoc: {
                type: String
            },
            monthlySalary: {
                type: Number
            },
            salaryJobPayGrade: {
                type: String
            },
            statusOfAppointment: {
                type: String
            },
            govtService: {
                type: Boolean
            }
        }
    ]
});

const voluntaryWorkSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    vw: [
        {
            nameAddressOfOrganization: {
                type: String
            },
            volunteeredFrom: {
                type: Date
            },
            volunteeredTo: {
                type: Date
            },
            volunteernumberOfHours: {
                type: Number
            },
            positionNature: {
                type: String
            }
        }
    ]
});

const trainingSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    ldit: [
        {
            lditPrograms: {
                type: String
            },
            trainedFrom: {
                type: Date
            },
            trainedTo: {
                type: Date
            },
            trainingnumberOfHours: {
                type: Number
            },
            typeOfLD: {
                type: String
            },
            conductedSponsoredBy: {
                type: String
            }
        }
    ]
});

const otherInfoSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    specialSkillsHobbies: [
        {
            type: String
        } 
    ],
    nonAcadDistRecog: [
        {
            type: String
        } 
    ],
    membershipAssocOrg: [
        {
            type: String
        } 
    ]
});

const questionsSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    q1: {
            q1a: {
                type: Boolean
            },
            q1b: {
                type: Boolean
            },
            q1bYesDetails: {
                type: String
            }
        },
    q2: {
            q2a: {
                type: Boolean
            },
            q2aYesDetails: {
                type: String
            },
            q2b: {
                type: Boolean
            },
            q2bDateFiled: {
                type: Date
            },
            q2bStatusofCase: {
                type: String
            }
        },
    q3: {
            q3a: {
                type: Boolean
            },
            q3aYesDetails: {
                type: String
            }
        },
    q4: {
            q4a: {
                type: Boolean
            },
            q4aYesDetails: {
                type: String
            }
        },
    q5: {
            q5a: {
                type: Boolean
            },
            q5aYesDetails: {
                type: String
            },
            q5b: {
                type: Boolean
            },
            q5bYesDetails: {
                type: String
            }
        },
    q6: {
            q6a: {
                type: Boolean
            },
            q6aYesDetails: {
                type: String
            }
        },
    q7: {
            q7a: {
                type: Boolean
            },
            q7aYesDetails: {
                type: String
            },
            q7b: {
                type: Boolean
            },
            q7bYesDetails: {
                type: String
            },
            q7c: {
                type: Boolean
            },
            q7cYesDetails: {
                type: String
            }
        }
});

const referencesSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    ref: [
        {
            refName: {
                type: String
            },
            refAddress: {
                type: String
            },
            refTelNo: {
                type: String
            }
        }
    ]
});

const serviceRecordsSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    govIssuedIdType: {
        type: String
    },
    govIssuedIdNumber: {
        type: String
    },
    DatePlaceIssued: {
        type: String
    }
});

const profileData = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    employmentStatus: {
        type: String
    },
    campus: {
        type: String
    }
})

const forumpostsSchema = new Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    post:[{
        text: {
            type: String
        }
    }]
})

const PI = mongoose.model('personalinfo', personalInfoSchema);
const FB = mongoose.model('familybackground', familyBackgroundSchema);
const ED = mongoose.model('education', educationSchema);
const EB = mongoose.model('eligibility', eligibilitySchema);
const WE = mongoose.model('workexperience', workExperienceSchema);
const VW = mongoose.model('voluntarywork', voluntaryWorkSchema);
const TR = mongoose.model('training', trainingSchema);
const OI = mongoose.model('otherinfo', otherInfoSchema);
const QT = mongoose.model('question', questionsSchema);
const RR = mongoose.model('reference', referencesSchema);
const SR = mongoose.model('servicerecord', serviceRecordsSchema);
const profile = mongoose.model('profile', profileData);
const forumposts = mongoose.model('forumposts', forumpostsSchema);
module.exports = {PI, FB, ED, EB, WE, VW, TR, OI, QT, RR, SR, profile, forumposts};