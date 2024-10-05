import { useAuth } from "@clerk/clerk-react";
import HeaderInput, {
  Header,
} from "../components/resumeComponents/HeaderInput";
import { ResumeType } from "../constants/ResumeType";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import SkillsInput, {
  Skills,
} from "../components/resumeComponents/SkillsInput";
import ExperienceInput, {
  ExperienceSection,
} from "../components/resumeComponents/ExperienceInput";
import EducationInput, {
  Education,
} from "../components/resumeComponents/EducationInput";
import ProjectsInput, {
  Projects,
} from "../components/resumeComponents/ProjectsInput";
import CertificationsInput, {
  Certifications,
} from "../components/resumeComponents/CertificationsInput";
import { toast } from "sonner";

type Props = {
  data: ResumeType;
  setData: (data: ResumeType | ((prevData: ResumeType) => ResumeType)) => void;
};



export default function Edit({ data, setData }: Props) {
  const user = useAuth();

  const handleSave = async () => {
    const response = await fetch("http://localhost:3000/api/resume", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, userId: user.userId }),
    });
    const updatedData = (await response.json()).data as ResumeType;
    console.log("Data updated successfully:", updatedData);
    setData(updatedData);
    toast("Resume Updated successfully");
  };
  return (
    <div className="relative">
      <div className="sticky top-0 bg-white p-4 flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
      <div className="flex justify-center p-4">
        <Tabs defaultValue="headers" className="w-full md:w-4/5 max-w-5xl">
          <TabsList>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="work">Work Experience</TabsTrigger>
            <TabsTrigger value="freelance">FreeLance Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>
          <div className="w-full max-w-5xl">
            <TabsContent value="headers">
              <HeaderInput
                header={data.header}
                setHeader={(header: Header) =>
                  setData((prev: ResumeType) => ({ ...prev, header }))
                }
              />
            </TabsContent>
            <TabsContent value="skills">
              <SkillsInput
                skills={data.skills}
                setSkills={(skills: Skills) =>
                  setData((prev: ResumeType) => ({ ...prev, skills }))
                }
              />
            </TabsContent>
            <TabsContent value="work">
              <ExperienceInput
                experienceSection={data.work}
                setExperienceSection={(experience: ExperienceSection) =>
                  setData((prev: ResumeType) => ({ ...prev, work: experience }))
                }
                sectionName={"Work Experience"}
              />
            </TabsContent>
            <TabsContent value="freelance">
              <ExperienceInput
                experienceSection={data.freelance}
                setExperienceSection={(experience: ExperienceSection) =>
                  setData((prev: ResumeType) => ({
                    ...prev,
                    freelance: experience,
                  }))
                }
                sectionName={"Freelance Experience"}
              />
            </TabsContent>
            <TabsContent value="education">
              <EducationInput
                education={data.education}
                setEducation={(education: Education) =>
                  setData((prev: ResumeType) => ({
                    ...prev,
                    education,
                  }))
                }
              />
            </TabsContent>
            <TabsContent value="projects">
              <ProjectsInput
                projects={data.projects}
                setProjects={(projects: Projects) =>
                  setData((prev: ResumeType) => ({
                    ...prev,
                    projects,
                  }))
                }
              />
            </TabsContent>
            <TabsContent value="certifications">
              <CertificationsInput
                certifications={data.certifications}
                setCertifications={(certifications: Certifications) =>
                  setData((prev: ResumeType) => ({
                    ...prev,
                    certifications,
                  }))
                }
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
