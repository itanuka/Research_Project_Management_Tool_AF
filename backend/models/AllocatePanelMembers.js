const mongoose = require('mongoose');

const allocatePanelMembersSchema = mongoose.Schema(
  {
    allocatepnl_title: {
      type: String,
      required: true,
      trim: true
    },
    allocatepnl_description: {
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

const AllocatePanelMembers = mongoose.model('AllocatePanelMembers', allocatePanelMembersSchema);

module.exports = AllocatePanelMembers;
