import { useState } from 'react';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';

// --- 1. Import our new page components ---
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// --- Placeholders (we'll build these next) ---
const SubmitPage = () => <div>Submit Complain Page Content</div>;
const StatusPage = () => <div>Check Status Page Content</div>;
const AdminPage = () => <div>Admin Dashboard Content</div>;
// ---

function App() {
  const [page, setPage] = useState('home');
  const { user } = useAuth(); 

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage setPage={setPage} />; // <-- 2. Use component

      case 'login':
        return user ? <HomePage setPage={setPage} /> : <LoginPage setPage={setPage} />; // <-- 2. Use component

      case 'signup':
        return user ? <HomePage setPage={setPage} /> : <SignupPage setPage={setPage} />; // <-- 2. Use component

      case 'submit':
        return user ? <SubmitPage setPage={setPage} /> : <LoginPage setPage={setPage} />; 

      case 'status':
        return user ? <StatusPage setPage={setPage} /> : <LoginPage setPage={setPage} />;

      case 'admin':
        return user && user.role === 'admin' ? <AdminPage setPage={setPage} /> : <HomePage setPage={setPage} />;

      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-poppins">
      <Navbar setPage={setPage} />

      <main className="flex-1 flex items-center justify-center text-center p-4">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;