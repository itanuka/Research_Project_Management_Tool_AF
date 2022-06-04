const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema(
    {
        template: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Template',
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
        group: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Group',
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
