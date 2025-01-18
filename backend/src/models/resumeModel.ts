import mongoose, { Schema, Document } from "mongoose";

export interface ResumeType {
  header: {
    name: {
      type: string;
      text: string;
      url: string;
    };
    designation: string;
    bio: string;
    socials: {
      type: string;
      icon: string;
      text: string;
      url: string;
    }[];
  };
  skills: {
    heading: string;
    categoryList: {
      category: string;
      skillList: string[];
    }[];
  };
  work: {
    heading: string;
    experienceList: {
      type: string;
      url?: string;
      company: string;
      role: string;
      duration: string;
      location: string;
      details: string[];
    }[];
  };
  freelance: {
    heading: string;
    experienceList: {
      type: string;
      url?: string;
      company: string;
      role: string;
      duration: string;
      location: string;
      details: string[];
    }[];
  };
  education: {
    heading: string;
    educationList: {
      type: string;
      url?: string;
      institution: string;
      course: string;
      duration: string;
      location: string;
      details: string[];
    }[];
  };
  projects: {
    heading: string;
    projectList: {
      type: string;
      url?: string;
      company: string;
      role: string;
      duration: string;
      location: string;
      details: string[];
    }[];
  };
  certifications: {
    heading: string;
    certificationList: {
      type: string;
      url?: string;
      institution: string;
      title: string;
    }[];
  };
  userId: string; // Additional user ID field
}

const resumeSchema: Schema = new Schema({
  header: {
    name: {
      type: {
        type: String,
      },
      text: { type: String },
      url: { type: String },
    },
    designation: { type: String },
    bio: { type: String },
    socials: [
      {
        type: { type: String },
        icon: { type: String },
        text: { type: String },
        url: { type: String },
      },
    ],
  },
  skills: {
    heading: { type: String },
    categoryList: [
      {
        category: { type: String },
        skillList: [{ type: String }],
      },
    ],
  },
  work: {
    heading: { type: String },
    experienceList: [
      {
        type: { type: String },
        url: { type: String },
        company: { type: String },
        role: { type: String },
        duration: { type: String },
        location: { type: String },
        details: [{ type: String }],
      },
    ],
  },
  freelance: {
    heading: { type: String },
    experienceList: [
      {
        type: { type: String },
        url: { type: String },
        company: { type: String },
        role: { type: String },
        duration: { type: String },
        location: { type: String },
        details: [{ type: String }],
      },
    ],
  },
  education: {
    heading: { type: String },
    educationList: [
      {
        type: { type: String },
        institution: { type: String },
        course: { type: String },
        duration: { type: String },
        location: { type: String },
        details: [{ type: String }],
      },
    ],
  },
  projects: {
    heading: { type: String },
    projectList: [
      {
        type: { type: String },
        url: { type: String },
        title: { type: String },
        details: [{ type: String }],
      },
    ],
  },
  certifications: {
    heading: { type: String },
    certificationList: [
      {
        type: { type: String },
        url: { type: String },
        institution: { type: String },
        title: { type: String },
      },
    ],
  },
  userId: { type: String },
});

const Resume = mongoose.model<ResumeType & Document>("Resume", resumeSchema);
export default Resume;
