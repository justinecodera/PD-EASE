const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const globalSettingSchema = new Schema({ 
    anouncement: {
        type: String
    },
    submissionDate: {
        type: Date
    },
    openSubmission: Boolean
});
const globalsettings = mongoose.model('globalsettings', globalSettingSchema);
module.exports = globalsettings;