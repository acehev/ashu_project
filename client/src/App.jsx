import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Background from "./components/common/Background";
import MouseGlow from "./components/common/MouseGlow";
import ViewApplicants from "./pages/ViewApplicants";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/Register";
import Jobs from "./pages/jobs";
import JobDetails from "./pages/JobDetails";
import StudentDashboard from "./pages/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";


function App() {
  return (
  
    <>
      <MouseGlow />
      <Background/>
      <Navbar />

      <Routes>
        <Route
  path="/edit-job/:id"
  element={
    <ProtectedRoute role="recruiter">
      <EditJob />
    </ProtectedRoute>
  }/>
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/jobs/:id" element={<JobDetails />} />

        <Route path="/student-dashboard" element={<ProtectedRoute role="student">
        <StudentDashboard />
        </ProtectedRoute>
        }
        />
        <Route
path="/applicants/:jobId"
element={
<ProtectedRoute role="recruiter">
<ViewApplicants/>
</ProtectedRoute>
}
/>
        <Route
          path="/recruiter-dashboard"
          element={<ProtectedRoute role="recruiter"> <RecruiterDashboard /></ProtectedRoute>}/>

        <Route
          path="/create-job"
          element={<ProtectedRoute role="recruiter"> <CreateJob /></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

export default App;