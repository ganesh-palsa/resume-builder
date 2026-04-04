const express = require('express');
const router = express.Router();
const {
  getResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  analyzeResume,
  downloadResume
} = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

// Route mapping
router.route('/')
  .get(protect, getResumes)
  .post(protect, createResume);

router.post('/analyze', protect, analyzeResume);
router.post('/download', protect, downloadResume);

router.route('/:id')
  .get(protect, getResume)
  .put(protect, updateResume)
  .delete(protect, deleteResume);

module.exports = router;
