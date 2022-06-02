const mongoose = require("mongoose")

/**
 * StudentRequestSchema is used for managing students' requests to supervisors and co-supervisors
 * Each group's requests to supervisor(s) and co-supervisor(s) must be accessible through this schema
 */
 const ChatMessageSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema)

module.exports = ChatMessage