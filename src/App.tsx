import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { SignInPage } from './pages/SignInPage'
import { SignUpPage } from './pages/SignUpPage'
import { MentorsPage } from './pages/MentorsPage'
import { ProfilePage } from './pages/ProfilePage'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { OrganizationSignInPage } from './pages/organization/OrganizationSignInPage'
import { OrganizationRegisterPage } from './pages/organization/OrganizationRegisterPage'
import { UserSignInPage } from './pages/auth/UserSignInPage'
import { UserRegisterPage } from './pages/auth/UserRegisterPage'
import { DashboardPage } from './pages/DashboardPage'
import { RootLayout } from './components/layouts/RootLayout'
import { MentorApplyPage } from './pages/mentor/MentorApplyPage'
import { JoinPage } from './pages/JoinPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <SignInPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'join', element: <JoinPage /> },
      { path: 'dashboard', element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
      { path: 'mentors', element: <ProtectedRoute><MentorsPage /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: 'organization/login', element: <OrganizationSignInPage /> },
      { path: 'organization/register', element: <OrganizationRegisterPage /> },
      { path: 'mentor/login', element: <UserSignInPage /> },
      { path: 'mentee/login', element: <UserSignInPage /> },
      { path: 'mentor/register', element: <UserRegisterPage /> },
      { path: 'mentee/register', element: <UserRegisterPage /> },
      { path: 'mentor/apply', element: <ProtectedRoute><MentorApplyPage /></ProtectedRoute> },
    ],
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_normalizeFormMethod: true
  }
})

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App