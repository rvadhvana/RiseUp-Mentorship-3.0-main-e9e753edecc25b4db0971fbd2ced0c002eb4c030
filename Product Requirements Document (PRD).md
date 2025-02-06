**Product Requirements Document (PRD)**

# Mentorship Platform - Version 1

## Overview
The mentorship platform facilitates connections between mentees, mentors, and organizations. This document outlines the key functionalities and necessary steps for implementation.

## Technologies Used
- **Frontend:** React, TypeScript, Tailwind CSS, Lucide Icons, React Router
- **Backend:** Supabase (Authentication, Database, Storage, Real-time subscriptions)

---

## Core Functionalities

### 1. Authentication & Authorization
- User roles: **Mentor, Mentee, Organization**
- Email/password authentication
- Role-based access control (RBAC)
- Email verification with confirmation
- Callback handling post-authentication
- Session management & protected routes

**Implementation Steps:**
1. Configure Supabase authentication with role-based access.
2. Implement sign-up, login, and email verification flows.
3. Ensure appropriate navigation and callback handling post-authentication.

### 2. Notifications & Popups
- Real-time notifications for actions (e.g., session booking, request approval)
- Contextual popups for errors, confirmations, and alerts
- Toast messages for success/error feedback

**Implementation Steps:**
1. Integrate a notification system with Supabase real-time subscriptions.
2. Implement toast and modal popups where needed.
3. Provide configurable settings for notification preferences.

### 3. Navigation System
- Intuitive navigation with role-based access
- Sidebar or top navigation depending on screen size
- Deep linking for dashboard sections

**Implementation Steps:**
1. Implement role-based conditional rendering of navigation links.
2. Set up React Router for protected routes.
3. Ensure smooth navigation between pages.

### 4. Dashboards (Mentor, Mentee, Organization)
#### Common Dashboard Pages:
1. **Portfolio:**
   - Mentors can update profiles (expertise, experience, availability).
   - Mentees can update their learning progress and interests.
   - Organizations manage mentor-mentee assignments.
2. **Requests:**
   - Mentors receive mentorship requests.
   - Mentees submit mentorship requests.
   - Organizations manage onboarding requests.
3. **Status:**
   - Tracks ongoing mentorship sessions.
   - Updates on progress and completion status.
   - Reflects real-time updates between mentors and mentees.

**Implementation Steps:**
1. Create dashboard layouts with protected routes.
2. Establish mentor-mentee real-time data sync.
3. Implement CRUD operations for portfolio, requests, and status updates.

### 5. Mentor-Mentee Data Synchronization
- Changes made by mentors should reflect instantly for mentees and vice-versa.
- Uses Supabase real-time subscriptions to update dashboards dynamically.

**Implementation Steps:**
1. Set up database relationships between mentor and mentee entities.
2. Implement real-time listeners on updates.
3. Ensure data consistency across all user roles.

---

## Database Structure & Supabase Configuration
- **Users Table:** Stores mentor, mentee, and organization details.
- **Mentor-Mentee Relationship Table:** Links mentors and mentees.
- **Requests Table:** Manages session requests and approvals.
- **Notifications Table:** Stores real-time notifications.
- **Sessions Table:** Tracks active and past mentorship sessions.

**Implementation Steps:**
1. Define necessary tables and relationships in Supabase.
2. Implement appropriate API calls for frontend integration.
3. Set up role-based access for data retrieval and updates.

---


