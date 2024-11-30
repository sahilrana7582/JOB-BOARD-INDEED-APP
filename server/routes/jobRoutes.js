const express = require('express');
const {
  createJob,
  getAllJobs,
  applyJob,
  getJobById,
  getUserAllJobs,
  rejectApplication,
  editJob,
  deleteJob,
  selectApplication,
} = require('../controllers/jobController');
const upload = require('../utils/multer');
const isAuth = require('../middlewares/isAuth');
const jobRouter = express.Router();

jobRouter.route('/:recId').get(getAllJobs);

jobRouter
  .route('/')
  .get(getAllJobs)
  .post(isAuth, upload.single('logo'), createJob);
jobRouter
  .route('/:id')
  .put(isAuth, upload.single('logo'), editJob)
  .delete(isAuth, deleteJob);
jobRouter
  .route('/:id/apply/:userId')
  .put(isAuth, applyJob)
  .patch(isAuth, selectApplication)
  .delete(isAuth, rejectApplication);
jobRouter.route('/applications/:jobId').get(isAuth, getJobById);

module.exports = jobRouter;
