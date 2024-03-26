const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const globalSettingSchema = new Schema({ 
    submissionDate: {
        type: Date
    },
    openSubmission: Boolean
});