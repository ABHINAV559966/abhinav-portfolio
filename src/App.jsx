<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/admin/login" element={<Login />} />

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

  <Route
    path="/admin"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
</Routes>