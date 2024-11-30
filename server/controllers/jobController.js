const { populate } = require('dotenv');
const Job = require('../models/jobModel.js');
const User = require('../models/userModel.js');
const AppError = require('../utils/AppError.js');
const catchAsync = require('../utils/catchAsync.js');
const {
  uploadMedia,
  deleteMediaFromCloudinary,
} = require('../utils/cloudinary.js');
const Application = require('../models/applicationModel.js');
const mongoose = require('mongoose');

exports.createJob = async (req, res) => {
  try {
    const newLogo = req.file;
    const formData = req.body;
    req.body.recruiter = req.id;

    const logoResponse = await uploadMedia(newLogo?.path);
    const logoUrl = logoResponse?.secure_url;
    const job = await Job.create({ ...formData, logoUrl: logoUrl });
    res.status(200).json({
      success: true,
      job,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
    });
  }
};
exports.deleteJob = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  const job = await Job.findByIdAndDelete({ _id: id });

  if (!job) {
    return next(new AppError('No Job Found For Delete', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Job Deleted Successfully',
  });
});
exports.editJob = catchAsync(async (req, res) => {
  const { id } = req.params;

  const path = req.file?.path;

  let job = await Job.findOne({ _id: id });

  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found',
    });
  }

  const body = req.body;

  if (job?.logoUrl) {
    const publicId = job?.logoUrl.split('/').pop().split('.')[0];
    await deleteMediaFromCloudinary(publicId);
  }

  let imgRes;
  if (path) {
    imgRes = await uploadMedia(path);
    body.logoUrl = imgRes.secure_url;
  }

  job = await Job.findOneAndUpdate({ _id: id }, { $set: body }, { new: true });

  res.status(200).json({
    success: true,
    message: 'Job edited successfully',
    job,
  });
});

exports.getAllJobs = catchAsync(async (req, res) => {
  const { recId } = req.params;
  let job = Job.find().populate('recruiter');

  if (recId) {
    job = job.find({
      recruiter: recId,
    });
  }

  job = await job;
  res.status(200).json({
    success: true,
    job,
  });
});

exports.getJobById = catchAsync(async (req, res, next) => {
  const jobId = req.params.jobId;
  const job = await Job.findOne({ _id: jobId })
    .populate('recruiter') // Populate the recruiter field
    .populate({
      path: 'applications', // Populate the applications array
      populate: {
        // Specify nested population
        path: 'user', // The field to populate within applications
        model: 'User', // The model to use for population
      },
    });

  if (!job) {
    return next(new AppError('No Job With This Id', 404));
  }
  res.status(200).json({
    success: true,
    job: job,
  });
});

exports.selectApplication = catchAsync(async (req, res) => {
  const { id, userId } = req.params;
  const application = await Application.findOneAndUpdate(
    { job: id, user: userId }, // Finding the application by job and user IDs
    {
      $set: {
        status: 'Selected', // Setting the status to "Selected"
      },
    },
    {
      new: true, // Return the updated document after the update
      runValidators: true, // Ensure validation rules are applied
    }
  );

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  console.log(application);

  res.status(200).json({
    success: true,
    message: 'Application status updated to Selected',
    application, // Optionally, you can return the updated application object
  });
});

exports.rejectApplication = catchAsync(async (req, res) => {
  const { id, userId } = req.params;

  const job = await Job.findByIdAndUpdate(
    id, // Pass the id directly, not as an object
    {
      $pull: {
        applications: {
          user: new mongoose.Types.ObjectId(userId),
          status: 'Pending',
        },
      },
    },
    { new: true }
  );
  const application = await Application.deleteOne({ job: id, user: userId });

  res.status(200).json({
    success: true,
    message: 'Application Rejected',
  });
});

exports.applyJob = catchAsync(async (req, res, next) => {
  const { id, userId } = req.params;
  const job = await Job.findOne({ _id: id });
  if (!job) {
    return next(new AppError('No Job Found With That iD', 404));
  }
  if (job.applications.includes(userId)) {
    return res.status(200).json({
      success: true,
      message: 'You Already Applied To This Job',
    });
  }

  let user = await User.findOne({ _id: userId });
  job.applications.push({ user: userId, status: 'Pending' });
  await job.save();
  user.toApplied.push({ job: id, status: 'Pending' });
  await user.save();
  const application = await Application.create({ job: id, user: userId });

  res.status(200).json({
    success: true,
    message: 'You Applied to this job',
    job,
    application,
  });
});
