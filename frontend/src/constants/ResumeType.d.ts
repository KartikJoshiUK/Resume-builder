import { Certifications } from "../components/resumeComponents/CertificationsInput";
import { Education } from "../components/resumeComponents/EducationInput";
import { ExperienceSection } from "../components/resumeComponents/ExperienceInput";
import { Header } from "../components/resumeComponents/HeaderInput";
import { Projects } from "../components/resumeComponents/ProjectsInput";
import { Skills } from "../components/resumeComponents/SkillsInput";

declare interface ResumeType {
  header: Header;
  skills: Skills;
  work: ExperienceSection;
  freelance: ExperienceSection;
  education: Education;
  projects: Projects;
  certifications: Certifications;
}


// {
//   header: {
//     name: { type: '', text: '', url: '' },
//     designation: '',
//     bio: '',
//     socials: [],
//   },
//   skills: { heading: '', categoryList: [] },
//   work: { heading: '', experienceList: [] },
//   freelance: { heading: '', experienceList: [] },
//   education: { heading: '', educationList: [] },
//   projects: { heading: '', projectList: [] },
//   certifications: { heading: '', certificationList: [] },
// }