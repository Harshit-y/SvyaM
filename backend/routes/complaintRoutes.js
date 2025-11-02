import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import Complaint from '../models/complaint.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// --- USER ROUTES ---

// @desc    Create a new complaint
// @route   POST /api/complaints/submit
// @access  Private (User)
router.post('/submit', protect, upload.single('photo'), async (req, res) => {
  try {
    const { title, description, location, concernedAuthority } = req.body;

    const photoUrl = req.file ? `/${req.file.path.replace(/\\/g, '/')}` : null;

    const complaint = new Complaint({
      title,
      description,
      location,
      concernedAuthority,
      photoUrl: photoUrl,
      submittedBy: req.user._id, // <-- Link to the logged-in user
      // 'status' will default to 'Submitted'
    });

    const createdComplaint = await complaint.save();
    res.status(201).json(createdComplaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all complaints for the logged-in user
// @route   GET /api/complaints/my-complaints
// @access  Private (User)
router.get('/my-complaints', protect, async (req, res) => {
  try {
    const complaints = await Complaint.find({ submittedBy: req.user._id })
                                      .sort({ createdAt: -1 }); // Show newest first
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- ADMIN ROUTES ---

// @desc    Get all complaints from all users
// @route   GET /api/complaints/all
// @access  Private (Admin)
router.get('/all', protect, adminOnly, async (req, res) => {
  try {
    // We use .populate() to get the user's email from the 'submittedBy' ID
    const complaints = await Complaint.find({})
                                      .populate('submittedBy', 'email') // <-- Gets related user's email
                                      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update a complaint's status
// @route   PUT /api/complaints/status/:id
// @access  Private (Admin)
router.put('/status/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status: newStatus } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Your required business logic: Status can only move forward
    const statuses = [
      'Submitted',
      'Registered By Concerned Authority/Department',
      'Started Working',
      'Complaint Resolved'
    ];

    const currentIndex = statuses.indexOf(complaint.status);
    const newIndex = statuses.indexOf(newStatus);

    if (newIndex > currentIndex) {
      complaint.status = newStatus;
      const updatedComplaint = await complaint.save();
      res.json(updatedComplaint);
    } else {
      res.status(400).json({ 
        message: 'Invalid status update. Status can only move to a higher level.' 
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;