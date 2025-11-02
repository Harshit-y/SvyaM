import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Navbar({ setPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleNavClick = (pageName) => {
    setPage(pageName);
    setIsOpen(false);
  };
  const handleLogout = () => {
    logout(); // <-- 3. Call logout function
    handleNavClick('home');
  };

  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* ... (Logo and Hamburger menu are the same) ... */}
        <div 
          className="text-2xl font-semibold tracking-wider font-poppins cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
          SvyaM
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {/* ... (SVG icon) ... */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* --- 4. CONDITIONAL DESKTOP LINKS --- */}
        <ul className="hidden md:flex space-x-6 font-poppins">
          <li><a href="#_" onClick={() => handleNavClick('home')} className="hover:text-gray-300">Home</a></li>

          {user ? (
            // --- If LOGGED IN ---
            <>
              <li><a href="#_" onClick={() => handleNavClick('submit')} className="hover:text-gray-300">Submit Complain</a></li>
              <li><a href="#_" onClick={() => handleNavClick('status')} className="hover:text-gray-300">Check Status</a></li>

              {user.role === 'admin' && ( // <-- Show for admins only
                <li><a href="#_" onClick={() => handleNavClick('admin')} className="hover:text-gray-300">Admin Panel</a></li>
              )}

              <li><a href="#_" onClick={handleLogout} className="hover:text-gray-300">Logout</a></li>
            </>
          ) : (
            // --- If LOGGED OUT ---
            <>
              <li><a href="#_" onClick={() => handleNavClick('login')} className="hover:text-gray-300">Login</a></li>
              <li><a href="#_" onClick={() => handleNavClick('signup')} className="hover:text-gray-300">Signup</a></li>
            </>
          )}
        </ul>
      </div>

      {/* --- 5. CONDITIONAL MOBILE LINKS --- */}
      {isOpen && (
        <ul className="md:hidden mt-4 flex flex-col space-y-2 font-poppins">
          <li><a href="#_" onClick={() => handleNavClick('home')} className="block p-2 hover:bg-gray-800 rounded">Home</a></li>

          {user ? (
            <>
              <li><a href="#_" onClick={() => handleNavClick('submit')} className="block p-2 hover:bg-gray-800 rounded">Submit Complain</a></li>
              <li><a href="#_" onClick={() => handleNavClick('status')} className="block p-2 hover:bg-gray-800 rounded">Check Status</a></li>

              {user.role === 'admin' && (
                <li><a href="#_" onClick={() => handleNavClick('admin')} className="block p-2 hover:bg-gray-800 rounded">Admin Panel</a></li>
              )}

              <li><a href="#_" onClick={handleLogout} className="block p-2 hover:bg-gray-800 rounded">Logout</a></li>
            </>
          ) : (
            <>
              <li><a href="#_" onClick={() => handleNavClick('login')} className="block p-2 hover:bg-gray-800 rounded">Login</a></li>
              <li><a href="#_" onClick={() => handleNavClick('signup')} className="block p-2 hover:bg-gray-800 rounded">Signup</a></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;