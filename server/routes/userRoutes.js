const {
  createUser,
  getAllUser,
  deleteUser,
  updateUser,
  loginUser,
  useLess,
  getOneUser,
  onBoard,
  updateExp,
  getUserProfile,
  logout,
  getUserAllJobs,
  withdrawApplication,
} = require('../controllers/userController');
const isAuth = require('../middlewares/isAuth');
const User = require('../models/userModel');
const express = require('express');
const upload = require('../utils/multer');
const userRouter = express.Router();

userRouter.route('/').get(getAllUser).post(createUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').get(logout);

userRouter.route('/profile').get(isAuth, getOneUser);
userRouter.route('/profile/:id').get(isAuth, getUserProfile);

userRouter
  .route('/:id')
  .all(isAuth)
  .get(getUserAllJobs)
  .delete(deleteUser)
  .put(upload.single('profilePic'), updateUser);

userRouter.route('/:id/job/:jobId').put(isAuth, withdrawApplication);

userRouter
  .route('/:id/exp')
  .put(isAuth, upload.single('profilePic'), updateExp);
userRouter
  .route('/onBoard/:id')
  .put(isAuth, upload.single('profilePic'), onBoard);
module.exports = userRouter;
