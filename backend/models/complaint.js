import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  // Link to the user who submitted it
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId, // This is a special type for IDs
    required: true,
    ref: 'User' // This tells Mongoose it references the 'User' model
  },
  
  title: {
    type: String,
    required: true,
    trim: true // Removes any extra whitespace
  },
  
  description: {
    type: String,
    required: true,
    trim: true
  },
  
  location: {
    type: String,
    required: true,
    trim: true
  },
  
  concernedAuthority: {
    type: String,
    required: true,
    trim: true
  },
  
  // We will store the URL/path to the photo, not the photo itself
  photoUrl: {
    type: String,
    required: false
  },
  
  status: {
    type: String,
    required: true,
    enum: [
      'Submitted',
      'Registered By Concerned Authority/Department',
      'Started Working',
      'Complaint Resolved'
    ],
    default: 'Submitted' // All new complaints start with this status
  }
}, {
  timestamps: true // Adds 'createdAt' and 'updatedAt' fields
});

export default mongoose.model('Complaint', complaintSchema);