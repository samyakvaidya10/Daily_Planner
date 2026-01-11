import { useState } from "react";
import BottomNav from "./components/layout/BottomNav";
import LoginScreen from "./components/auth/LoginScreen";
import Home from "./pages/Home";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Purchases from "./pages/Purchases";
import Calendar from "./pages/Calendar";
import Projects from "./pages/Projects";
import ProjectDetail from "./components/projects/ProjectDetail";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user, loading } = useAuth();

  const [page, setPage] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto pb-16">
        {page === "home" && <Home />}

        {page === "history" && <History />}

        {page === "calendar" && (
          <Calendar setPage={setPage} />
        )}

        {page === "purchases" && <Purchases />}

        {page === "projects" && (
          <Projects
            onSelectProject={(project) => {
              setSelectedProject(project);
              setPage("project-detail");
            }}
          />
        )}

        {page === "project-detail" && selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onBack={() => {
              setSelectedProject(null);
              setPage("projects");
            }}
          />
        )}

        {page === "settings" && <Settings />}
      </div>

      {/* Bottom navigation */}
      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}
