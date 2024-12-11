import React from 'react';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import StudentLogin from './components/StudentLogin';  // Import StudentLogin component
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard'; // Import UserDashboard component
import Home from './components/Home';
import UploadForm from './components/UploadForm';
import ViewStudents from './components/ViewStudents';
import ConfirmationPage from './components/ConfirmationPage';
import ErrorPage from './components/ErrorPage';
import AddMenuItem from './components/AddMenuItem';
import ViewMenu from './components/ViewMenu';
import EventCreate from './components/EventCreate';
import ViewEvent from './components/ViewEvent';
import StudentViewEvent from './components/StudentViewEvent';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard/></ProtectedRoute>} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/view-students" element={<ViewStudents />} />  {/* New Route */}
          <Route path="/confirmation" element={<ConfirmationPage/>} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/add-menu-item" element={<AddMenuItem />} />
          <Route path="/view-menu" element={<ViewMenu />} />
          <Route path="/createEvent" element={<EventCreate />} />
          <Route path='/ViewEvent' element={<ViewEvent/>}/>
            <Route path="/StudentViewEvent" element={<ProtectedRoute><StudentViewEvent /></ProtectedRoute>} />
          <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
