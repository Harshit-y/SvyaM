import { useState } from 'react';
import axios from 'axios';

function SubmitComplaintPage() {
  // State for text fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [concernedAuthority, setConcernedAuthority] = useState('');

  // State for the file
  const [photo, setPhoto] = useState(null);

  // State for messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]); // Get the first file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!photo) {
      setError('Please upload a photo of the issue.');
      return;
    }

    setLoading(true);

    // 1. Create FormData object
    // We MUST use FormData because we are sending a file
    const formData = new FormData();

    // 2. Append all the fields
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('concernedAuthority', concernedAuthority);
    formData.append('photo', photo); // 'photo' MUST match the backend upload.single('photo')

    try {
      // 3. Send the request
      // Axios automatically sets 'Content-Type: multipart/form-data'
      // when you send a FormData object.
      // The 'withCredentials: true' is not needed if you're using the vite proxy
      // and the cookie is on the same domain (localhost).
      await axios.post('/api/complaints/submit', formData);

      setSuccess('Complaint submitted successfully! You can view its status on the "Check Status" page.');

      // Clear the form
      setTitle('');
      setDescription('');
      setLocation('');
      setConcernedAuthority('');
      setPhoto(null);
      e.target.reset(); // Resets the file input

    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md border border-gray-200 text-left">
      <h2 className="text-3xl font-bold text-center mb-6">Submit a New Complaint</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title" type="text" value={title}
            onChange={(e) => setTitle(e.target.value)} required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g., Large pothole on Main St."
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description" value={description}
            onChange={(e) => setDescription(e.target.value)} required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            rows="4"
            placeholder="Describe the issue in detail..."
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="location">
            Location
          </label>
          <input
            id="location" type="text" value={location}
            onChange={(e) => setLocation(e.target.value)} required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g., Near City Park, 123 Main St."
          />
        </div>

        {/* Concerned Authority */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="authority">
            Concerned Authority/Department
          </label>
          <input
            id="authority" type="text" value={concernedAuthority}
            onChange={(e) => setConcernedAuthority(e.target.value)} required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="e.g., Municipal Corporation, NHAI, Railways"
          />
        </div>

        {/* Photo Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="photo">
            Upload Photo (Required)
          </label>
          <input
            id="photo" type="file"
            onChange={handleFileChange} required accept="image/*"
            className="w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-black file:text-white
              hover:file:bg-gray-800"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition duration-300 disabled:bg-gray-400"
        >
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </button>
      </form>
    </div>
  );
}

export default SubmitComplaintPage;