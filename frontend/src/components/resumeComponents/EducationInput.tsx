import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

export interface EducationItem {
  type: string;
  url?: string;
  institution: string;
  course: string;
  duration: string;
  location: string;
  details: string[];
}

export interface Education {
  heading: string;
  educationList: EducationItem[];
}

interface EducationItemInputProps {
  educationItem: EducationItem;
  updateEducationItem: (e: EducationItem) => void;
  removeEducationItem: () => void;
}

const EducationItemInput = ({ educationItem, updateEducationItem, removeEducationItem }: EducationItemInputProps) => (
  <div className="grid gap-2 mb-4">
    <Input
      placeholder="Type"
      value={educationItem.type}
      onChange={(e) => updateEducationItem({ ...educationItem, type: e.target.value })}
    />
    <Input
      placeholder="URL (optional)"
      value={educationItem.url || ''}
      onChange={(e) => updateEducationItem({ ...educationItem, url: e.target.value })}
    />
    <Input
      placeholder="Institution"
      value={educationItem.institution}
      onChange={(e) => updateEducationItem({ ...educationItem, institution: e.target.value })}
    />
    <Input
      placeholder="Course"
      value={educationItem.course}
      onChange={(e) => updateEducationItem({ ...educationItem, course: e.target.value })}
    />
    <Input
      placeholder="Duration"
      value={educationItem.duration}
      onChange={(e) => updateEducationItem({ ...educationItem, duration: e.target.value })}
    />
    <Input
      placeholder="Location"
      value={educationItem.location}
      onChange={(e) => updateEducationItem({ ...educationItem, location: e.target.value })}
    />
    <Textarea
      placeholder="Details (one per line)"
      value={educationItem.details.join('\n')}
      onChange={(e) => updateEducationItem({ ...educationItem, details: e.target.value.split('\n').filter(detail => detail.trim() !== '') })}
    />
    <Button onClick={removeEducationItem} variant="destructive">Remove Education Item</Button>
  </div>
)

interface EducationInputProps {
  education: Education;
  setEducation: (education: Education) => void;
}

export default function EducationInput({ education, setEducation }: EducationInputProps) {
  const addEducationItem = () => {
    setEducation({
      ...education,
      educationList: [...education.educationList, {
        type: '',
        institution: '',
        course: '',
        duration: '',
        location: '',
        details: []
      }]
    })
  }

  const updateEducationItem = (index: number, updatedEducationItem: EducationItem) => {
    const newEducationList = [...education.educationList]
    newEducationList[index] = updatedEducationItem
    setEducation({ ...education, educationList: newEducationList })
  }

  const removeEducationItem = (index: number) => {
    const newEducationList = education.educationList.filter((_, i) => i !== index)
    setEducation({ ...education, educationList: newEducationList })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(JSON.stringify(education, null, 2))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Education Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="education-heading">Education Heading</Label>
              <Input
                id="education-heading"
                value={education.heading}
                onChange={(e) => setEducation({ ...education, heading: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education Entries</CardTitle>
        </CardHeader>
        <CardContent>
          {education.educationList.map((educationItem, index) => (
            <EducationItemInput
              key={index}
              educationItem={educationItem}
              updateEducationItem={(updatedEducationItem: EducationItem) => updateEducationItem(index, updatedEducationItem)}
              removeEducationItem={() => removeEducationItem(index)}
            />
          ))}
          <Button onClick={addEducationItem}>Add Education Item</Button>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Save Education</Button>
    </form>
  )
}