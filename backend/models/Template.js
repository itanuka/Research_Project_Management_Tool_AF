const mongoose = require('mongoose');

const templateSchema = mongoose.Schema(
  {
    template_title: {
      type: String,
      required: true,
      trim: true
    },
    template_description: {
      type: String,
      required: true,
      trim: true
    },
    template_deadline: {
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

const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
