import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

export interface Skill {
  category: string;
  skillList: string[];
}

export interface Skills {
  heading: string;
  categoryList: Skill[];
}

interface SkillCategoryInputProps {
  skill: Skill;
  updateSkill: (s: Skill) => void;
  removeSkill: () => void;
}

const SkillCategoryInput = ({ skill, updateSkill, removeSkill }: SkillCategoryInputProps) => (
  <div className="grid gap-2 mb-4">
    <Input
      placeholder="Category"
      value={skill.category}
      onChange={(e) => updateSkill({ ...skill, category: e.target.value })}
    />
    <Textarea
      placeholder="Skills (comma-separated)"
      value={skill.skillList.join(', ')}
      onChange={(e) => updateSkill({ ...skill, skillList: e.target.value.split(',').map(s => s.trim()) })}
    />
    <Button onClick={removeSkill} variant="destructive">Remove Skill Category</Button>
  </div>
)

interface SkillsInputProps {
  skills: Skills;
  setSkills: (skills: Skills) => void;
}

export default function SkillsInput({ skills, setSkills }: SkillsInputProps) {
  const addSkillCategory = () => {
    setSkills({
      ...skills,
      categoryList: [...skills.categoryList, { category: '', skillList: [] }]
    })
  }

  const updateSkillCategory = (index: number, updatedSkill: Skill) => {
    const newCategoryList = [...skills.categoryList]
    newCategoryList[index] = updatedSkill
    setSkills({ ...skills, categoryList: newCategoryList })
  }

  const removeSkillCategory = (index: number) => {
    const newCategoryList = skills.categoryList.filter((_, i) => i !== index)
    setSkills({ ...skills, categoryList: newCategoryList })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(JSON.stringify(skills, null, 2))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Skills Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="skills-heading">Skills Heading</Label>
              <Input
                id="skills-heading"
                value={skills.heading}
                onChange={(e) => setSkills({ ...skills, heading: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skill Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {skills.categoryList.map((skill, index) => (
            <SkillCategoryInput
              key={index}
              skill={skill}
              updateSkill={(updatedSkill: Skill) => updateSkillCategory(index, updatedSkill)}
              removeSkill={() => removeSkillCategory(index)}
            />
          ))}
          <Button onClick={addSkillCategory}>Add Skill Category</Button>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Save Skills</Button>
    </form>
  )
}