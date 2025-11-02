import { useState } from 'react';
import Navbar from './components/Navbar';

// We'll create these components in the next steps
// For now, they are just placeholders

const HomePage = () => <div className="text-3xl font-semibold">Welcome to SvyaM</div>;
const LoginPage = () => <div>Login Page Content</div>;
const SignupPage = () => <div>Signup Page Content</div>;
const SubmitPage = () => <div>Submit Complain Page Content</div>;
const StatusPage = () => <div>Check Status Page Content</div>;
const AdminPage = () => <div>Admin Dashboard Content</div>;

function App() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'submit':
        return <SubmitPage />;
      case 'status':
        return <StatusPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    // This outer div sets the global theme: white bg, black text, Poppins font
    <div className="flex flex-col min-h-screen bg-white text-black font-poppins">
      <Navbar setPage={setPage} />

      {/* This main content area fills the remaining space and centers content */}
      <main className="flex-1 flex items-center justify-center text-center p-4">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;