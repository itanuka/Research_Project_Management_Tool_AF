const mongoose = require("mongoose")

/**
 * StudentRequestSchema is used for managing students' requests to supervisors and co-supervisors
 * Each group's requests to supervisor(s) and co-supervisor(s) must be accessible through this schema
 */
const StudentRequestSchema = new mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    staffMember: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: true
    }
})

const StudentRequest = mongoose.model("StudentRequest", StudentRequestSchema)

module.exports = StudentRequest