const Job = require("../models/job");

// ==============================
// Create Job
// ==============================
const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      description,
      requirements,
      jobType,
      experienceLevel,
    } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      requirements,
      jobType,
      experienceLevel,
      postedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job Created Successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get All Jobs (Search + Filters)
// ==============================
const getAllJobs = async (req, res) => {
  try {
    const {
      keyword,
      location,
      jobType,
      salary,
    } = req.query;

    let filter = {};

    // Search by Title
    if (keyword) {
      filter.title = {
        $regex: keyword,
        $options: "i",
      };
    }

    // Search by Location
    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    // Filter by Job Type
    if (jobType) {
      filter.jobType = jobType;
    }

    // Filter by Salary
    if (salary) {
      filter.salary = {
        $regex: salary,
        $options: "i",
      };
    }

    const jobs = await Job.find(filter)
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Job By ID
// ==============================
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("postedBy", "name email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Job
// ==============================
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Job Updated Successfully",
      job: updatedJob,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete Job
// ==============================
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Export
// ==============================
module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};