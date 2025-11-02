import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider (the component that will "provide" the data)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 3. Check if user is already logged in (from a previous session)
  useEffect(() => {
    // We'll use localStorage to "remember" the user between page reloads
    const storedUser = localStorage.getItem('svyamUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 4. Login Function
  const login = (userData) => {
    // Save user to localStorage
    localStorage.setItem('svyamUser', JSON.stringify(userData));
    // Save user to state
    setUser(userData);
  };

  // 5. Logout Function
  const logout = async () => {
    try {
      // Tell the backend to clear the httpOnly cookie
      await axios.post('/api/users/logout');
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      // Clear user from localStorage
      localStorage.removeItem('svyamUser');
      // Clear user from state
      setUser(null);
    }
  };

  // 6. The "value" that all child components can access
  const value = {
    user,    // The user object (or null)
    login,   // The login function
    logout,  // The logout function
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 7. A "custom hook" to make it easy to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};