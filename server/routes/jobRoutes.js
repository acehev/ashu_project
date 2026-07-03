const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const {
  protect,
  isRecruiter,
} = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Recruiter Only Routes
router.post("/", protect, isRecruiter, createJob);
router.put("/:id", protect, isRecruiter, updateJob);
router.delete("/:id", protect, isRecruiter, deleteJob);

module.exports = router;