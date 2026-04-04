const Resume = require('../models/Resume');
const { calculateResumeScore } = require('../utils/resumeScorer');

// @desc    Get all resumes for logged in user
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort('-updatedAt');
    res.status(200).json(resumes);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
const getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      res.status(404);
      throw new Error('Resume not found');
    }

    // Make sure the logged in user matches the resume user
    if (resume.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    res.status(200).json(resume);
  } catch (error) {
    next(error);
  }
};

// @desc    Create resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res, next) => {
  try {
    if (!req.body.userType || !req.body.fullName || !req.body.email) {
      res.status(400);
      throw new Error('Please include userType, fullName, and email');
    }

    const resumeData = { ...req.body, user: req.user.id };
    const resume = await Resume.create(resumeData);

    res.status(201).json(resume);
  } catch (error) {
    next(error);
  }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      res.status(404);
      throw new Error('Resume not found');
    }

    // Make sure the logged in user matches the resume user
    if (resume.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedResume);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      res.status(404);
      throw new Error('Resume not found');
    }

    // Make sure the logged in user matches the resume user
    if (resume.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await resume.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

// @desc    Analyze and score resume
// @route   POST /api/resumes/analyze
// @access  Private
const analyzeResume = async (req, res, next) => {
  try {
    const resumeData = req.body;
    
    if (!resumeData || !resumeData.userType) {
      res.status(400);
      throw new Error('Provide resume data containing userType');
    }

    const analysis = calculateResumeScore(resumeData);
    
    res.status(200).json(analysis);
  } catch (error) {
    next(error);
  }
};

// @desc    Download PDF (Placeholder)
// @route   POST /api/resumes/download
// @access  Private
const downloadResume = async (req, res, next) => {
  try {
    // In a real application, you might use Puppeteer or pdfkit here to generate a file stream
    // For now, we return a structural success for the frontend to stub
    res.status(200).json({
      message: "Ready for PDF Generation placeholder. Frontend can use HTML-to-PDF libraries.",
      resumeId: req.body.resumeId
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  analyzeResume,
  downloadResume
};
