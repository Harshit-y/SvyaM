import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function LoginPage({ setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Get the login function from our context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Make API call to the backend login route
      const res = await axios.post('/api/users/login', { email, password });

      // 'res.data' is the user object { _id, email, role }
      login(res.data); // <-- This saves the user in our context/localStorage

      // Check if admin and redirect to admin panel
      if (res.data.role === 'admin') {
        setPage('admin');
      } else {
        setPage('home'); // Redirect regular users to home
      }

    } catch (err) {
      // Handle login errors
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2 text-left" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2 text-left" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Login
        </button>
      </form>

      <p className="text-center text-gray-600 mt-6">
        Don't have an account?{' '}
        <a 
          href="#_" 
          onClick={() => setPage('signup')} 
          className="text-black font-semibold hover:underline"
        >
          Sign Up
        </a>
      </p>
    </div>
  );
}

export default LoginPage;