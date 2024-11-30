const User = require('../models/userModel.js');
const AppError = require('../utils/AppError.js');
const catchAsync = require('../utils/catchAsync.js');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');
const {
  uploadMedia,
  deleteMediaFromCloudinary,
} = require('../utils/cloudinary.js');
const Application = require('../models/applicationModel.js');
const mongoose = require('mongoose');

exports.createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  console.log(req.body);

  res.status(200).json({
    success: true,
  });
});

exports.getAllUser = catchAsync(async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const userID = req.params.id;
  const user = await User.findByIdAndDelete(userID);
  if (!user) {
    return next(new AppError('User Not Found', 404));
  }
  res.status(200).json({
    success: true,
    message: 'User Deleted Successfully',
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const userID = req.params.id;

  console.log(req.body);

  let user = await User.findOne({ _id: userID });

  if (!user) {
    return next(new AppError('User Not Found', 404));
  }

  const { skills, tech } = req.body;

  if (skills) {
    const newSkills = skills
      .trim()
      .split(' ')
      .join(',')
      .split(',')
      .filter((skill) => skill !== '')
      .filter((skill) => !user.skills.includes(skill));

    user.skills.push(...newSkills);
  }

  if (tech) {
    const newTech = tech
      .trim()
      .split(' ')
      .join(',')
      .split(',')
      .filter((skill) => skill !== '')
      .filter((skill) => !user.tech.includes(skill));

    user.tech.push(...newTech);
  }

  await user.save();
  delete req.body.skills;
  delete req.body.tech;

  const updatedUser = await User.findByIdAndUpdate(userID, req.body, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!updatedUser) {
    return next(new AppError('User Update Failed', 400));
  }

  res.status(200).json({
    success: true,
    message: 'User Updated Successfully',
    user: updatedUser,
  });
});
exports.updateExp = catchAsync(async (req, res) => {
  const userID = req.params.id;
  let user = await User.findById(userID);

  if (!user) {
    return next(new AppError('User Not Found', 404));
  }

  const {
    companyName,
    previousRole,
    joinAt,
    leftAt,
    location,
    level,
    percentage,
    completeIn,
  } = req.body;

  if (companyName && previousRole && joinAt && leftAt && location) {
    const newExperience = {
      companyName,
      previousRole,
      joinAt,
      leftAt,
      location,
    };
    user.professionalExp.push(newExperience);
  }

  if (level && percentage && completeIn) {
    const newEducation = {
      level,
      percentage,
      completeIn,
    };
    user.education.push(newEducation);
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: 'User Updated Successfully',
    user,
  });
});
exports.getOneUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req?.id }).select('-password');

  if (!user) {
    return next(new AppError('Not User Found', 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

exports.withdrawApplication = catchAsync(async (req, res) => {
  const { id, jobId } = req.params;
  const user = await User.findByIdAndUpdate(
    id, // User ID
    {
      $pull: {
        // Use $pull to remove the job from toApplied
        toApplied: {
          job: new mongoose.Types.ObjectId(jobId), // Match jobId to remove
        },
      },
    },
    { new: true } // Return the updated document after the operation
  );

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }
  console.log(user);
  res.status(200).json({
    success: true,
  });
});

exports.getUserAllJobs = catchAsync(async (req, res) => {
  const user = await User.findOne({ _id: req.id })
    .select('toApplied')
    .populate({
      path: 'toApplied',
      populate: {
        path: 'job',
        model: 'Job',
      },
    });

  console.log(user);

  const jobIds = user?.toApplied?.map((job) => job?.job?._id);
  console.log(jobIds);
  const pendingJobs = await Application.find({ job: { $in: jobIds } });
  console.log(pendingJobs);

  res.status(200).json({
    success: true,
    job: user?.toApplied,
    totalApplied: pendingJobs,
  });
});

exports.logout = async (_, res) => {
  try {
    return res.status(200).cookie('token', '', { maxAge: 0 }).json({
      message: 'Logged out successfully.',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to logout',
    });
  }
};

exports.getUserProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).select('-password');

  if (!user) {
    return next(new AppError('Not User Found', 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const { email, password } = req.body;
  const userFromDB = await User.findOne({ email });

  if (!userFromDB) {
    return next(new AppError('User Not Found With This ID', 404));
  }

  const validPass = await bcrypt.compare(password, userFromDB.password);
  if (!validPass) {
    return next(new AppError('Password is Not Correct', 404));
  }

  userFromDB.password = undefined;

  generateToken(userFromDB, res);
});
exports.onBoard = catchAsync(async (req, res, next) => {
  const path = req?.file?.path;
  const id = req.id;
  const body = req.body;
  console.log(req.body);
  const user = await User.findOne({ _id: id });

  if (!user) {
    return next(new AppError('You Are Not Logged In Try Again', 401));
  }

  if (user?.imgUrl && path) {
    const publicID = user?.imgUrl.split('/').pop().split('.')[0];
    deleteMediaFromCloudinary(publicID);
  }

  let imgRes;
  if (path) {
    imgRes = await uploadMedia(path);
  }
  console.log(imgRes);

  body.imgUrl = imgRes.secure_url;
  body.onBoard = true;
  const updatedUser = await User.findByIdAndUpdate(id, body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    user: updatedUser,
  });
});
