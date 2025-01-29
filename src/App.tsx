import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { MentorsPage } from './pages/MentorsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { OrganizationSignInPage } from './pages/organization/OrganizationSignInPage';
import { OrganizationRegisterPage } from './pages/organization/OrganizationRegisterPage';
import { UserSignInPage } from './pages/auth/UserSignInPage';
import { UserRegisterPage } from './pages/auth/UserRegisterPage';
import { RootLayout } from './components/layouts/RootLayout';
import { MentorApplyPage } from './pages/mentor/MentorApplyPage';
import { JoinPage } from './pages/JoinPage';
import { MenteeDashboardPage } from './pages/mentee/MenteeDashboardPage';
import { SuperAdminDashboard } from './pages/admin/SuperAdminDashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="join" element={<JoinPage />} />
          <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="mentors" element={<ProtectedRoute><MentorsPage /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="organization/login" element={<OrganizationSignInPage />} />
          <Route path="organization/register" element={<OrganizationRegisterPage />} />
          <Route path="mentor/login" element={<UserSignInPage />} />
          <Route path="mentee/login" element={<UserSignInPage />} />
          <Route path="mentor/register" element={<UserRegisterPage />} />
          <Route path="mentee/register" element={<UserRegisterPage />} />
          <Route path="mentor/apply" element={<ProtectedRoute><MentorApplyPage /></ProtectedRoute>} />
          <Route path="mentee/dashboard" element={<ProtectedRoute><MenteeDashboardPage /></ProtectedRoute>} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute adminOnly>
                <SuperAdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;