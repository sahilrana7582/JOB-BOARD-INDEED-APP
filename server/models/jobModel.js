const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  jobRole: {
    type: String,
    required: true,
    trim: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  jobSkill: [String],
  techStack: [String],
  experience: {
    type: String,
    required: true,
    trim: true,
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  applications: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: {
        type: String,
        default: 'Pending',
      },
      appliedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  position: {
    type: String,
    required: true,
    trim: true,
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  fullAddress: {
    type: String,
    trim: true,
  },
  expectedSalary: {
    type: String,
    trim: true,
  },
  logoUrl: {
    type: String,
    trim: true,
  },

  latlng: String,
  timePosted: {
    type: Date,
    default: () => Date.now(),
  },
  openings: {
    type: String,
    default: '1',
  },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
