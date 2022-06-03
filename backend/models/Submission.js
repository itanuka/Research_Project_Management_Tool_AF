const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema(
    {
        templateId: {
            type: String,
            required: true,
            trim: true
        },
        templateName: {
            type: String,
            required: true,
            trim: true
        },
        deadline: {
            type: String,
            required: true,
            trim: true
        },
        groupName: {
            type: String,
            required: true,
            trim: true
        },
        submittedBy: {
            type: String,
            required: true,
            trim: true
        },
        groupID: {
            type: String,
            required: true,
            trim: true
        },
        file_path: {
            type: String,
            required: true
        },
        file_mimetype: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
