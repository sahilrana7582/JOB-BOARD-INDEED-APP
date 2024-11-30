const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Please Provide Email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  skills: [String],
  tech: [String],
  onBoard: {
    type: Boolean,
    default: false,
  },
  recurtingFor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],
  toApplied: [
    {
      job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
      },
      status: {
        type: String,
        default: 'Pending',
      },
    },
  ],
  imgUrl: String,
  professionalExp: [
    {
      companyName: String,
      previousRole: String,
      joinAt: String,
      leftAt: String,
      location: String,
    },
  ],
  education: [
    {
      level: String,
      percentage: String,
      completeIn: String,
    },
  ],
  certificates: [
    {
      name: String,
      issuedBy: String,
      whatFor: String,
    },
  ],
  age: String,
  phnNumber: String,
  generalDescription: String,
  codingRole: String,
  currentCTC: String,
  location: String,
  exp: String,
  currentRole: String,
  generalDescription: String,
  role: {
    type: String,
    lowercase: true,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const hashedPass = await bcrypt.hash(this.password, 12);
  this.password = hashedPass;
});

const User = mongoose.model('User', userSchema);
module.exports = User;
