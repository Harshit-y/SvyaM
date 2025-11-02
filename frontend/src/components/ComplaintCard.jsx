import React from 'react';

// A helper function to format the date nicely
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// A helper function to get a color based on status
const getStatusColor = (status) => {
  switch (status) {
    case 'Submitted':
      return 'bg-blue-100 text-blue-800';
    case 'Registered By Concerned Authority/Department':
      return 'bg-yellow-100 text-yellow-800';
    case 'Started Working':
      return 'bg-indigo-100 text-indigo-800';
    case 'Complain Resolved':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

function ComplaintCard({ complaint }) {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md border border-gray-200 text-left mb-6">
      <div className="flex flex-col md:flex-row gap-6">

        {/* Image Section */}
        {complaint.photoUrl && (
          <div className="md:w-1/3">
            {/* We use the full path to the image on our server */}
            <img 
              src={complaint.photoUrl} 
              alt={complaint.title}
              className="w-full h-48 object-cover rounded-lg border border-gray-200" 
            />
          </div>
        )}

        {/* Details Section */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            {/* Title */}
            <h3 className="text-2xl font-bold">{complaint.title}</h3>
            {/* Status Badge */}
            <span 
              className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(complaint.status)}`}
            >
              {complaint.status}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4">{complaint.description}</p>

          {/* Meta Info */}
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Location:</strong> {complaint.location}
            </p>
            <p>
              <strong>Authority:</strong> {complaint.concernedAuthority}
            </p>
            <p>
              <strong>Submitted:</strong> {formatDate(complaint.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintCard;