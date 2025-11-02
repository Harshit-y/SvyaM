import { useAuth } from '../context/AuthContext';

function HomePage({ setPage }) {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center text-center max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Welcome to SvyaM
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8">
        Your platform for reporting and resolving civic issues.
        Report potholes, noise, littering, and more, directly to the concerned authorities.
      </p>
      {user ? (
        // User is logged in
        <button 
          onClick={() => setPage('submit')}
          className="bg-black text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition duration-300 text-lg"
        >
          Submit a New Complaint
        </button>
      ) : (
        // User is logged out
        <div className="flex gap-4">
          <button 
            onClick={() => setPage('login')}
            className="bg-black text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition duration-300 text-lg"
          >
            Login
          </button>
          <button 
            onClick={() => setPage('signup')}
            className="bg-gray-200 text-black font-semibold py-3 px-8 rounded-lg hover:bg-gray-300 transition duration-300 text-lg"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;