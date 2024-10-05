import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

export interface Certification {
  type: string;
  url?: string;
  institution: string;
  title: string;
}

export interface Certifications {
  heading: string;
  certificationList: Certification[];
}

interface CertificationInputProps {
  certification: Certification;
  updateCertification: (c: Certification) => void;
  removeCertification: () => void;
}

const CertificationInput = ({ certification, updateCertification, removeCertification }: CertificationInputProps) => (
  <div className="grid gap-2 mb-4">
    <Input
      placeholder="Type"
      value={certification.type}
      onChange={(e) => updateCertification({ ...certification, type: e.target.value })}
    />
    <Input
      placeholder="URL (optional)"
      value={certification.url || ''}
      onChange={(e) => updateCertification({ ...certification, url: e.target.value })}
    />
    <Input
      placeholder="Institution"
      value={certification.institution}
      onChange={(e) => updateCertification({ ...certification, institution: e.target.value })}
    />
    <Input
      placeholder="Title"
      value={certification.title}
      onChange={(e) => updateCertification({ ...certification, title: e.target.value })}
    />
    <Button onClick={removeCertification} variant="destructive">Remove Certification</Button>
  </div>
)

interface CertificationsInputProps {
  certifications: Certifications;
  setCertifications: (certifications: Certifications) => void;
}

export default function CertificationsInput({ certifications, setCertifications }: CertificationsInputProps) {
  const addCertification = () => {
    setCertifications({
      ...certifications,
      certificationList: [...certifications.certificationList, {
        type: '',
        institution: '',
        title: '',
      }]
    })
  }

  const updateCertification = (index: number, updatedCertification: Certification) => {
    const newCertificationList = [...certifications.certificationList]
    newCertificationList[index] = updatedCertification
    setCertifications({ ...certifications, certificationList: newCertificationList })
  }

  const removeCertification = (index: number) => {
    const newCertificationList = certifications.certificationList.filter((_, i) => i !== index)
    setCertifications({ ...certifications, certificationList: newCertificationList })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(JSON.stringify(certifications, null, 2))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Certifications Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="certifications-heading">Certifications Heading</Label>
              <Input
                id="certifications-heading"
                value={certifications.heading}
                onChange={(e) => setCertifications({ ...certifications, heading: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Certification Entries</CardTitle>
        </CardHeader>
        <CardContent>
          {certifications.certificationList.map((certification, index) => (
            <CertificationInput
              key={index}
              certification={certification}
              updateCertification={(updatedCertification: Certification) => updateCertification(index, updatedCertification)}
              removeCertification={() => removeCertification(index)}
            />
          ))}
          <Button onClick={addCertification}>Add Certification</Button>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Save Certifications</Button>
    </form>
  )
}