import { useState } from "react";
import BottomNav from "./components/layout/BottomNav";
import LoginScreen from "./components/auth/LoginScreen";
import Home from "./pages/Home";
import History from "./pages/History";
import Settings from "./pages/Settings";
import { useAuth } from "./hooks/useAuth";
import Purchases from "./pages/Purchases";

export default function App() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState("home");

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="flex-1 overflow-y-auto pb-16">
  {page === "home" && <Home />}
  {page === "history" && <History />}
  {page === "purchases" && <Purchases />}
  {page === "settings" && <Settings />}
</div>


      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}
