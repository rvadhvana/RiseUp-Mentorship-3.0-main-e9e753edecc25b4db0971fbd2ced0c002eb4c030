import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
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
import { PremiumContentPage } from './pages/PremiumContentPage';
import { AuthCallbackPage } from './pages/auth/AuthCallbackPage';
import { AuthGuard } from './components/auth/AuthGuard';
import { ProfileSettings } from './components/profile/ProfileSettings';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MentorDashboardPage } from './pages/mentor/MentorDashboardPage';
import AdminDashboard from './components/admin/AdminDashboard';
import { ProfileView } from './pages/profile/ProfileView';
import { OrganizationDashboard } from './pages/organization/OrganizationDashboard';
import { Global } from '@emotion/react';
import { globalStyles } from './styles/globalStyles';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';

const App: React.FC = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <ErrorBoundary>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route
                path="/login"
                element={
                  <AuthGuard>
                    <SignInPage />
                  </AuthGuard>
                }
              />
              <Route
                path="/register"
                element={
                  <AuthGuard>
                    <SignUpPage />
                  </AuthGuard>
                }
              />
              <Route path="join" element={<JoinPage />} />
              <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route
                path="/mentors"
                element={
                  <ProtectedRoute>
                    <MentorsPage />
                  </ProtectedRoute>
                }
              />
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
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/premium-content"
                element={
                  <ProtectedRoute>
                    <PremiumContentPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />
              <Route
                path="/settings/profile"
                element={
                  <ProtectedRoute>
                    <ProfileSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mentor/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['mentor']}>
                    <MentorDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile/view" element={<ProfileView />} />
              <Route
                path="/organization/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['organization']}>
                    <OrganizationDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/organization/signin" element={<OrganizationSignInPage />} />
              <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
};

export default App;