/**
 * Utility to process a Resume structure and yield a score, star rating,
 * status, and an array of text suggestions depending on the userType.
 */

const calculateResumeScore = (resume) => {
  let score = 0;
  const suggestions = [];
  const { userType } = resume;

  // 1. Personal Details (Max 15%)
  let personalScore = 0;
  if (resume.fullName) personalScore += 5;
  else suggestions.push("Add your full name.");
  
  if (resume.email) personalScore += 5;
  else suggestions.push("Add your email address.");
  
  if (resume.phone) personalScore += 2;
  else suggestions.push("Add a contact phone number.");
  
  if (resume.linkedin || resume.github || resume.portfolio) personalScore += 3;
  else suggestions.push("Including social links (LinkedIn/GitHub) increases visibility.");
  
  score += personalScore;

  // 2. Summary/Objective (Max 10%)
  if (resume.summary || resume.objective) {
    // Check length for quality
    const sumLen = (resume.summary || resume.objective).length;
    if (sumLen > 50) score += 10;
    else {
      score += 5;
      suggestions.push("Make your summary or objective more detailed (at least 50 characters).");
    }
  } else {
    suggestions.push(`Add a professional ${userType === 'student' ? 'objective' : 'summary'} statement.`);
  }

  // 3. Education (Max 15%)
  if (resume.education && resume.education.length > 0) {
    score += 15;
  } else {
    suggestions.push("Add your educational background.");
  }

  // 4. Skills (Max 15%)
  if (resume.skills && resume.skills.length > 0) {
    if (resume.skills.length >= 5) score += 15;
    else {
      score += 10;
      suggestions.push("Add at least 5 key skills relevant to your target role.");
    }
  } else {
    suggestions.push("List your core skills and technologies.");
  }

  // 5. Experience / Internships & Projects (Dynamic allocation: 45%)
  const hasExperience = resume.experience && resume.experience.length > 0;
  const hasProjects = resume.projects && resume.projects.length > 0;

  if (userType === 'student') {
    // Rely heavily on Projects (30%) and Extracurricular/Experience (15%)
    if (hasProjects) {
      if (resume.projects.length > 1) score += 30;
      else {
        score += 20;
        suggestions.push("Having multiple projects shows a strong portfolio. Add more if possible.");
      }
    } else {
      suggestions.push("As a student, academic or personal projects are crucial. Add projects to showcase ability.");
    }
    
    if (hasExperience) score += 15;
    else suggestions.push("Adding internships or part-time roles will give you a major edge.");

  } else if (userType === 'fresher') {
    // Balance Experience/Internships (25%) and Projects (20%)
    if (hasExperience) score += 25;
    else suggestions.push("Freshers with internships or volunteer experience get hired faster. Add them if you have any.");
    
    if (hasProjects) score += 20;
    else suggestions.push("Include major academic projects to demonstrate practical knowledge.");

  } else if (userType === 'experienced') {
    // Rely heavily on Experience (35%) and slightly on Projects (10%)
    if (hasExperience) {
      if (resume.experience.length > 1) score += 35;
      else score += 25;
    } else {
      suggestions.push("As an experienced professional, work experience is mandatory. Please populate this section.");
    }

    if (hasProjects) score += 10;
  }

  // 6. Bonus metrics (Over 100% possible initially, capped at 100)
  if (resume.certifications && resume.certifications.length > 0) score += 5;
  if (resume.achievements && resume.achievements.length > 0) score += 5;
  
  // Cap at 100 max
  score = Math.min(score, 100);

  // Status computation
  let status = 'Needs Improvement';
  let starRating = 1;

  if (score >= 90) {
    status = 'Excellent';
    starRating = 5;
  } else if (score >= 75) {
    status = 'Good';
    starRating = 4;
  } else if (score >= 60) {
    status = 'Average';
    starRating = 3;
  } else if (score >= 40) {
    starRating = 2;
  }

  // General praise if no big suggestions
  if (suggestions.length === 0) {
    suggestions.push("Your resume looks comprehensive and well-structured! Ensure there are no typos.");
  }

  return {
    score,
    starRating,
    status,
    suggestions
  };
};

module.exports = {
  calculateResumeScore
};
