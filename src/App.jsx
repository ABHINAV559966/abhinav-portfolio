import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense } from "react";
import ErrorBoundary from "./components/common/ErrorBoundary";
import LoadingScreen from "./components/common/LoadingScreen";
import Navbar from "./components/layout/Navbar";

import Home from "./pages/public/Home";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import SkillsManager from "./pages/admin/SkillsManager";
import ProjectsManager from "./pages/admin/ProjectsManager";
import CertificatesManager from "./pages/admin/CertificatesManager";
import ProfileManager from "./pages/admin/ProfileManager";
import ResumeManager from "./pages/admin/ResumeManager";
import MessagesManager from "./pages/admin/MessagesManager";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/skills"
            element={
              <ProtectedRoute>
                <SkillsManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <ProjectsManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/certificates"
            element={
              <ProtectedRoute>
                <CertificatesManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <ProfileManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/resume"
            element={
              <ProtectedRoute>
                <ResumeManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute>
                <MessagesManager />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;