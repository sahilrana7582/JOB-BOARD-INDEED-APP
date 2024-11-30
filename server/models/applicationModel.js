const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'job',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    default: 'Pending',
  },
  appliedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Application = mongoose.model('Application', appSchema);
module.exports = Application;
