import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Improvements from './pages/Improvements';
import CreateReport from './pages/CreateReport';
import Reports from './pages/Reports';
import ReportDetail from './pages/ReportDetail';
import AdminPanel from './pages/AdminPanel';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/improvements" element={<Improvements />} />
        <Route path="/create-report" element={user ? <CreateReport /> : <Navigate to="/login" />} />
        <Route path="/reports" element={user ? <Reports /> : <Navigate to="/login" />} />
        <Route path="/reports/:id" element={user ? <ReportDetail /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user?.isAdmin ? <AdminPanel /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;