import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// Helper function to format the date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

function AdminPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filtering
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');

  // 1. Fetch all complaints when the component mounts
  useEffect(() => {
    const fetchAllComplaints = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get('/api/complaints/all');
        setComplaints(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch complaints.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllComplaints();
  }, []); // Empty array ensures this runs only once

  // 2. Memoized-derived state for filtering and sorting
  // This recalculates only when complaints or filters change
  const filteredAndSortedComplaints = useMemo(() => {
    let filtered = [...complaints];

    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortOrder === 'Newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    return filtered;
  }, [complaints, statusFilter, sortOrder]);

  // 3. Function to handle status updates
  const handleStatusChange = async (id, newStatus) => {
    try {
      // Make API call to update the status
      const res = await axios.put(`/api/complaints/status/${id}`, {
        status: newStatus,
      });

      // Update the state locally to avoid a re-fetch
      // This makes the UI update instantly
      setComplaints(prevComplaints =>
        prevComplaints.map(c =>
          c._id === id ? { ...c, status: res.data.status } : c
        )
      );
    } catch (err) {
      // The backend sends a 400 error if the status move is invalid
      alert(err.response?.data?.message || 'Failed to update status.');
    }
  };

  // --- Render Logic ---
  if (loading) return <div className="text-center text-lg">Loading all complaints...</div>;
  if (error) return <div className="text-center text-red-500 text-lg">{error}</div>;

  return (
    <div className="w-full max-w-7xl mx-auto text-left">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

      {/* --- Filter and Sort Controls --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex-1">
          <label htmlFor="statusFilter" className="block text-sm font-semibold text-gray-700 mb-1">
            Filter by Status
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Registered By Concerned Authority/Department">Registered</option>
            <option value="Started Working">Started Working</option>
            <option value="Complain Resolved">Resolved</option>
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="sortOrder" className="block text-sm font-semibold text-gray-700 mb-1">
            Sort by Date
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* --- Complaints Table --- */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Submitted By</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Authority</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Photo</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Update Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedComplaints.map(complaint => (
              <tr key={complaint._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{complaint.submittedBy.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{complaint.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{complaint.concernedAuthority}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(complaint.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <a href={complaint.photoUrl} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
                    View
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{complaint.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <select
                    value={complaint.status}
                    onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="Submitted">Submitted</option>
                    <option value="Registered By Concerned Authority/Department">Registered</option>
                    <option value="Started Working">Started Working</option>
                    <option value="Complain Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;