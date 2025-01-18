import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export interface Project {
  type: string;
  url?: string;
  title: string;
  details: string[];
}

export interface Projects {
  heading: string;
  projectList: Project[];
}

interface ProjectInputProps {
  project: Project;
  updateProject: (p: Project) => void;
  removeProject: () => void;
}

const ProjectInput = ({
  project,
  updateProject,
  removeProject,
}: ProjectInputProps) => (
  <div className="grid gap-2 mb-4">
    <Input
      placeholder="Type"
      value={project.type}
      onChange={(e) => updateProject({ ...project, type: e.target.value })}
    />
    <Input
      placeholder="URL (optional)"
      value={project.url || ""}
      onChange={(e) => updateProject({ ...project, url: e.target.value })}
    />
    <Input
      placeholder="Title"
      value={project.title}
      onChange={(e) => updateProject({ ...project, title: e.target.value })}
    />
    <Textarea
      placeholder="Details (one per line)"
      value={project.details.join("\n")}
      onChange={(e) =>
        updateProject({
          ...project,
          details: e.target.value
            .split("\n")
            .filter((detail) => detail.trim() !== ""),
        })
      }
    />
    <Button onClick={removeProject} variant="destructive">
      Remove Project
    </Button>
  </div>
);

interface ProjectsInputProps {
  projects: Projects;
  setProjects: (projects: Projects) => void;
}

export default function ProjectsInput({
  projects,
  setProjects,
}: ProjectsInputProps) {
  const addProject = () => {
    setProjects({
      ...projects,
      projectList: [
        ...projects.projectList,
        {
          type: "",
          title: "",
          details: [],
        },
      ],
    });
  };

  const updateProject = (index: number, updatedProject: Project) => {
    const newProjectList = [...projects.projectList];
    newProjectList[index] = updatedProject;
    setProjects({ ...projects, projectList: newProjectList });
  };

  const removeProject = (index: number) => {
    const newProjectList = projects.projectList.filter((_, i) => i !== index);
    setProjects({ ...projects, projectList: newProjectList });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(projects, null, 2));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Projects Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="projects-heading">Projects Heading</Label>
              <Input
                id="projects-heading"
                value={projects.heading}
                onChange={(e) =>
                  setProjects({ ...projects, heading: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Entries</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.projectList.map((project, index) => (
            <ProjectInput
              key={index}
              project={project}
              updateProject={(updatedProject: Project) =>
                updateProject(index, updatedProject)
              }
              removeProject={() => removeProject(index)}
            />
          ))}
          <Button onClick={addProject}>Add Project</Button>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Save Projects
      </Button>
    </form>
  );
}
