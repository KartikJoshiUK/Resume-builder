import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export interface Name {
    type: string;
    text: string;
    url: string;
  }
export interface Social {
    type: string;
    icon: string;
    text: string;
    url: string;
  }
export interface Header {
    name: Name;
    designation: string;
    bio: string;
    socials: Social[];
  }


  interface SocialInputProps {
    social : Social,
    updateSocial : (s : Social) => void;
    removeSocial : () => void;
  }
const SocialInput = ({ social, updateSocial, removeSocial } : SocialInputProps) => (
  <div className="grid gap-2 mb-4">
    <Input
      placeholder="Type"
      value={social.type}
      onChange={(e) => updateSocial({ ...social, type: e.target.value })}
    />
    <Select
      value={social.icon}
      onValueChange={(value) => updateSocial({ ...social, icon: value })}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select an icon" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="linkedIn">LinkedIn</SelectItem>
        <SelectItem value="github">GitHub</SelectItem>
        <SelectItem value="portfolio">Portfolio</SelectItem>
        <SelectItem value="mail">Mail</SelectItem>
        <SelectItem value="mobile">Mobile</SelectItem>
      </SelectContent>
    </Select>
    <Input
      placeholder="Text"
      value={social.text}
      onChange={(e) => updateSocial({ ...social, text: e.target.value })}
    />
    <Input
      placeholder="URL"
      value={social.url}
      onChange={(e) => updateSocial({ ...social, url: e.target.value })}
    />
    <Button onClick={removeSocial} variant="destructive">Remove Social</Button>
  </div>
)
// const emptyHeader : Readonly<Header> =  {
//   name: { type: '', text: '', url: '' },
//   designation: '',
//   bio: '',
//   socials: [],
// }

interface HeaderInputProps {
  header : Header;
  setHeader : (header : Header)=> void;
}

export default function HeaderInput({header, setHeader} : HeaderInputProps) {

  const addSocial = () => {
    setHeader({
      ...header,
      socials: [...header.socials, { type: '', icon: '', text: '', url: '' }]
    })
  }

  const updateSocial = (index: number, updatedSocial: Header['socials'][0]) => {
    const newSocials = [...header.socials]
    newSocials[index] = updatedSocial
    setHeader({ ...header, socials: newSocials })
  }

  const removeSocial = (index: number) => {
    const newSocials = header.socials.filter((_, i) => i !== index)
    setHeader({ ...header, socials: newSocials })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(JSON.stringify(header, null, 2))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Header Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name-type">Name Type</Label>
              <Input
                id="name-type"
                value={header.name.type}
                onChange={(e) => setHeader({ ...header, name: { ...header.name, type: e.target.value } })}
              />
            </div>
            <div>
              <Label htmlFor="name-text">Name</Label>
              <Input
                id="name-text"
                value={header.name.text}
                onChange={(e) => setHeader({ ...header, name: { ...header.name, text: e.target.value } })}
              />
            </div>
            <div>
              <Label htmlFor="name-url">Name URL</Label>
              <Input
                id="name-url"
                value={header.name.url}
                onChange={(e) => setHeader({ ...header, name: { ...header.name, url: e.target.value } })}
              />
            </div>
            <div>
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                value={header.designation}
                onChange={(e) => setHeader({ ...header, designation: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={header.bio}
                onChange={(e) => setHeader({ ...header, bio: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Socials</CardTitle>
        </CardHeader>
        <CardContent>
          {header.socials.map((social, index) => (
            <SocialInput
              key={index}
              social={social}
              updateSocial={(updatedSocial : Social) => updateSocial(index, updatedSocial)}
              removeSocial={() => removeSocial(index)}
            />
          ))}
          <Button onClick={addSocial}>Add Social</Button>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Save Header</Button>
    </form>
  )
}