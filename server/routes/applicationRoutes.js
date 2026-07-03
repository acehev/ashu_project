const express = require("express");
const router = express.Router();

const {
  protect,
  isStudent,
  isRecruiter,
} = require("../middleware/authMiddleware");

const {
  applyJob,
  getMyApplications,
  getApplicantsByJob,
} = require("../controllers/applicationController");

// Student Routes
router.post("/apply/:jobId", protect, isStudent, applyJob);
router.get("/my-applications", protect, isStudent, getMyApplications);

// Recruiter Route
router.get("/job/:jobId", protect, isRecruiter, getApplicantsByJob);

module.exports = router;