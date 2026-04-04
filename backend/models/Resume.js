const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true
    },
    userType: {
      type: String,
      required: [true, 'Please specify user type'],
      enum: ['student', 'fresher', 'experienced'],
      index: true
    },
    templateName: {
      type: String,
      default: 'simple'
    },
    title: {
      type: String, // Optional resume title purely for dashboard display
      trim: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    phone: String,
    address: String,
    linkedin: String,
    github: String,
    portfolio: String,
    summary: String,

    education: [
      {
        degree: String,
        institution: String,
        year: String,
        cgpa: String
      }
    ],

    skills: [String],

    experience: [
      {
        company: String,
        role: String,
        duration: String,
        description: String
      }
    ],

    internships: [
      {
        company: String,
        role: String,
        duration: String,
        description: String
      }
    ],

    projects: [
      {
        title: String,
        description: String,
        technologies: [String],
        link: String
      }
    ],

    certifications: [String],
    achievements: [String],
    languages: [String],

    // Analytics from processing
    score: {
      type: Number,
      default: 0
    },
    starRating: {
      type: Number,
      default: 0
    },
    suggestions: [String]
  },
  {
    timestamps: true
  }
);

// Compound index for getting highly relevant, most recent resumes by a user quickly
resumeSchema.index({ user: 1, updatedAt: -1 });

module.exports = mongoose.model('Resume', resumeSchema);
