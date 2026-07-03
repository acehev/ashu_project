const jwt = require("jsonwebtoken");

// Check Login
const protect = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No Token Provided",
      });
    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

// Recruiter Only
const isRecruiter = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({
      success: false,
      message: "Only Recruiters can access this route",
    });
  }

  next();
};

// Student Only
const isStudent = (req, res, next) => {
  if (req.user.role !== "student") {
    return res.status(403).json({
      success: false,
      message: "Only Students can access this route",
    });
  }

  next();
};

module.exports = {
  protect,
  isRecruiter,
  isStudent,
};