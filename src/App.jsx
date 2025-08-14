import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import WhatsAppFloat from '@/components/WhatsAppFloat.jsx';
import Home from '@/pages/Home.jsx';
import Gallery from '@/pages/Gallery.jsx';
import Breeders from '@/pages/Breeders.jsx';
import About from '@/pages/About.jsx';
import Contact from '@/pages/Contact.jsx';
import AdminLogin from '@/pages/AdminLogin.jsx';
import Dashboard from '@/pages/Dashboard.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import ManageDogs from '@/pages/ManageDogs.jsx';
import ManageAccess from '@/pages/ManageAccess.jsx';
import ManageBreeders from '@/pages/ManageBreeders.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/padreadores" element={<Breeders />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
             <Route 
              path="/dashboard/manage-dogs" 
              element={
                <ProtectedRoute>
                  <ManageDogs />
                </ProtectedRoute>
              } 
            />
             <Route 
              path="/dashboard/manage-breeders" 
              element={
                <ProtectedRoute>
                  <ManageBreeders />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/manage-access" 
              element={
                <ProtectedRoute>
                  <ManageAccess />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloat />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;