import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

export interface Experience {
  type: string;
  url?: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  details: string[];
}

export interface ExperienceSection {
  heading: string;
  experienceList: Experience[];
}

interface ExperienceListInputProps {
  experience: Experience;
  updateExperience: (e: Experience) => void;
  removeExperience: () => void;
}

const ExperienceListInput = ({ experience, updateExperience, removeExperience }: ExperienceListInputProps) => (
  <div className="grid gap-2 mb-4">
    <Input
      placeholder="Type"
      value={experience.type}
      onChange={(e) => updateExperience({ ...experience, type: e.target.value })}
    />
    <Input
      placeholder="URL (optional)"
      value={experience.url || ''}
      onChange={(e) => updateExperience({ ...experience, url: e.target.value })}
    />
    <Input
      placeholder="Company"
      value={experience.company}
      onChange={(e) => updateExperience({ ...experience, company: e.target.value })}
    />
    <Input
      placeholder="Role"
      value={experience.role}
      onChange={(e) => updateExperience({ ...experience, role: e.target.value })}
    />
    <Input
      placeholder="Duration"
      value={experience.duration}
      onChange={(e) => updateExperience({ ...experience, duration: e.target.value })}
    />
    <Input
      placeholder="Location"
      value={experience.location}
      onChange={(e) => updateExperience({ ...experience, location: e.target.value })}
    />
    <Textarea
      placeholder="Details (one per line)"
      value={experience.details.join('\n')}
      onChange={(e) => updateExperience({ ...experience, details: e.target.value.split('\n').filter(detail => detail.trim() !== '') })}
    />
    <Button onClick={removeExperience} variant="destructive">Remove Experience</Button>
  </div>
)

interface ExperienceInputProps {
  sectionName: string;
  experienceSection: ExperienceSection;
  setExperienceSection: (section: ExperienceSection) => void;
}

export default function ExperienceInput({ sectionName, experienceSection, setExperienceSection }: ExperienceInputProps) {
  const addExperience = () => {
    setExperienceSection({
      ...experienceSection,
      experienceList: [...experienceSection.experienceList, {
        type: '',
        company: '',
        role: '',
        duration: '',
        location: '',
        details: []
      }]
    })
  }

  const updateExperience = (index: number, updatedExperience: Experience) => {
    const newExperienceList = [...experienceSection.experienceList]
    newExperienceList[index] = updatedExperience
    setExperienceSection({ ...experienceSection, experienceList: newExperienceList })
  }

  const removeExperience = (index: number) => {
    const newExperienceList = experienceSection.experienceList.filter((_, i) => i !== index)
    setExperienceSection({ ...experienceSection, experienceList: newExperienceList })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(JSON.stringify(experienceSection, null, 2))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{sectionName} Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor={`${sectionName.toLowerCase()}-heading`}>{sectionName} Heading</Label>
              <Input
                id={`${sectionName.toLowerCase()}-heading`}
                value={experienceSection.heading}
                onChange={(e) => setExperienceSection({ ...experienceSection, heading: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{sectionName} Entries</CardTitle>
        </CardHeader>
        <CardContent>
          {experienceSection.experienceList.map((experience, index) => (
            <ExperienceListInput
              key={index}
              experience={experience}
              updateExperience={(updatedExperience: Experience) => updateExperience(index, updatedExperience)}
              removeExperience={() => removeExperience(index)}
            />
          ))}
          <Button onClick={addExperience}>Add {sectionName} Experience</Button>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Save {sectionName}</Button>
    </form>
  )
}