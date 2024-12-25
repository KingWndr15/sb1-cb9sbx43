// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Header } from './components/layout/Header';
import { Hero } from './components/Hero';
import { LoginPage } from './pages/auth/Login';
import { RegisterPage } from './pages/auth/Register';
import { TemplateSelection } from './pages/templates/TemplateSelection';
import { EditorPage } from './pages/editor/EditorPage'; // Import the EditorPage component
import { TemplateProvider } from '@/contexts/TemplateContext';

export function App() {
  return (
    <AuthProvider>
      <TemplateProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/templates" element={<TemplateSelection />} />
              <Route path="/setup/subdomain" element={<EditorPage />} />
            </Routes>
          </div>
        </Router>
      </TemplateProvider>
    </AuthProvider>
  );
}