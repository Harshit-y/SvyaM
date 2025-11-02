import { useState } from "react";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SubmitComplaintPage from "./pages/SubmitComplaintPage";
import StatusPage from "./pages/StatusPage";
import AdminPage from "./pages/AdminPage"; // <-- 1. Import

function App() {
  const [page, setPage] = useState("home");
  const { user } = useAuth();

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage setPage={setPage} />;

      case "login":
        return user ? (
          <HomePage setPage={setPage} />
        ) : (
          <LoginPage setPage={setPage} />
        );

      case "signup":
        return user ? (
          <HomePage setPage={setPage} />
        ) : (
          <SignupPage setPage={setPage} />
        );

      case "submit":
        return user ? <SubmitComplaintPage /> : <LoginPage setPage={setPage} />;

      case "status":
        return user ? <StatusPage /> : <LoginPage setPage={setPage} />;

      case "admin":
        // --- 2. Replace placeholder ---
        return user && user.role === "admin" ? (
          <AdminPage />
        ) : (
          <HomePage setPage={setPage} />
        );

      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-poppins">
      <Navbar setPage={setPage} />

      <main
        className={`flex-1 flex justify-center p-4 md:p-8 ${
          page === "home" ? "items-center" : "items-start"
        }`}
      >
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
