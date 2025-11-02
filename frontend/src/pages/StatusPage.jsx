import { useState, useEffect } from 'react';
import axios from 'axios';
import ComplaintCard from '../components/ComplaintCard';

function StatusPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This useEffect hook runs once when the component mounts
  useEffect(() => {
    const fetchMyComplaints = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch data from our protected 'my-complaints' route
        const res = await axios.get('/api/complaints/my-complaints');

        setComplaints(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch complaints.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyComplaints();
  }, []); // The empty array [] means this effect runs only once

  // 1. Show loading state
  if (loading) {
    return <div className="text-center text-lg">Loading your complaints...</div>;
  }

  // 2. Show error state
  if (error) {
    return <div className="text-center text-red-500 text-lg">{error}</div>;
  }

  // 3. Show main content
  return (
    <div className="w-full max-w-4xl text-center">
      <h2 className="text-3xl font-bold mb-8">My Complaint Status</h2>

      {complaints.length === 0 ? (
        // 3a. Show if no complaints are found
        <p className="text-gray-600">You have not submitted any complaints yet.</p>
      ) : (
        // 3b. List all complaints
        <div className="flex flex-col items-center">
          {complaints.map((complaint) => (
            <ComplaintCard key={complaint._id} complaint={complaint} />
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusPage;