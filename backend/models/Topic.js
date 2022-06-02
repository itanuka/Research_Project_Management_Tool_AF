const mongoose = require('mongoose');

const topicSchema = mongoose.Schema(
  {
    title: {
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
      ref: 'Group'
    },
    status: {
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

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
