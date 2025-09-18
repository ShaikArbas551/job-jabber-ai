import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Eye, Download } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  objective: string;
  education: string;
  experience: string;
  skills: string;
  certifications: string;
  projects: string;
}

interface ResumeBuilderProps {
  onBack: () => void;
}

const ResumeBuilder = ({ onBack }: ResumeBuilderProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    objective: "",
    education: "",
    experience: "",
    skills: "",
    certifications: "",
    projects: "",
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePDF = () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    }).then((canvas) => {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${formData.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-elegant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/b798171e-6379-4e47-9f86-f07dcaeecad5.png" 
                alt="SkillUp Logo" 
                className="h-10 w-10"
              />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SkillUp - Resume Builder
              </h1>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              {!showPreview && (
                <Button onClick={() => setShowPreview(true)} className="bg-gradient-primary">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Resume
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-8">
        {!showPreview ? (
          <Card className="shadow-elegant border-0">
            <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
              <CardTitle className="text-2xl">Build Your Professional Resume</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-semibold text-foreground mb-2 block">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="h-12"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold text-foreground mb-2 block">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="h-12"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-foreground mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-12"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-sm font-semibold text-foreground mb-2 block">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="h-12"
                    placeholder="City, State"
                  />
                </div>
              </div>

              {/* Career Objective */}
              <div>
                <Label htmlFor="objective" className="text-sm font-semibold text-foreground mb-2 block">
                  Career Objective
                </Label>
                <Textarea
                  id="objective"
                  value={formData.objective}
                  onChange={(e) => handleInputChange('objective', e.target.value)}
                  className="min-h-[100px]"
                  placeholder="Write a brief career objective that describes your professional goals and what you bring to the organization..."
                />
              </div>

              {/* Education */}
              <div>
                <Label htmlFor="education" className="text-sm font-semibold text-foreground mb-2 block">
                  Education
                </Label>
                <Textarea
                  id="education"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className="min-h-[120px]"
                  placeholder="Bachelor of Engineering, Computer Science | 2022 to 2026&#10;Institution Name, Location | CGPA: 8.5&#10;&#10;Intermediate: Board of Intermediate | 2020 to 2022&#10;Institution Name | Percentage: 85%"
                />
              </div>

              {/* Experience/Internships */}
              <div>
                <Label htmlFor="experience" className="text-sm font-semibold text-foreground mb-2 block">
                  Professional Experience / Internships
                </Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="min-h-[120px]"
                  placeholder="Job Title - Company Name | Duration&#10;• Key responsibility or achievement&#10;• Another key responsibility&#10;&#10;Internship Title - Company Name | Duration&#10;• Project or responsibility description"
                />
              </div>

              {/* Projects */}
              <div>
                <Label htmlFor="projects" className="text-sm font-semibold text-foreground mb-2 block">
                  Projects
                </Label>
                <Textarea
                  id="projects"
                  value={formData.projects}
                  onChange={(e) => handleInputChange('projects', e.target.value)}
                  className="min-h-[100px]"
                  placeholder="Developed a real-time e-commerce website using React and Node.js&#10;Created a student portal for college with user authentication&#10;Designed a responsive website for college culturals"
                />
              </div>

              {/* Technical Skills */}
              <div>
                <Label htmlFor="skills" className="text-sm font-semibold text-foreground mb-2 block">
                  Technical Skills
                </Label>
                <Textarea
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  className="min-h-[80px]"
                  placeholder="Programming: C, Python, Java, JavaScript&#10;Web Technologies: HTML, CSS, React, Node.js&#10;Tools: Microsoft Office, VS Code, Git"
                />
              </div>

              {/* Certifications */}
              <div>
                <Label htmlFor="certifications" className="text-sm font-semibold text-foreground mb-2 block">
                  Certifications
                </Label>
                <Textarea
                  id="certifications"
                  value={formData.certifications}
                  onChange={(e) => handleInputChange('certifications', e.target.value)}
                  className="min-h-[100px]"
                  placeholder="HTML - INFOSYS SPRINGBOARD - Feb 2024&#10;CSS - INFOSYS SPRINGBOARD - Feb 2024&#10;WEB-DEVELOPMENT/JAVASCRIPT - EXCELR - Oct 2024"
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-elegant">
            <div id="resume-preview" className="max-w-4xl mx-auto bg-white p-8 text-black min-h-[11in]">
              {/* Header Section */}
              <div className="text-center mb-8 border-b-4 border-primary pb-6">
                <h1 className="text-4xl font-bold text-primary mb-3 tracking-wide">{formData.fullName.toUpperCase()}</h1>
                <div className="flex justify-center space-x-8 text-base font-medium">
                  <span>📞 {formData.phone}</span>
                  <span>✉️ {formData.email}</span>
                  {formData.location && <span>📍 {formData.location}</span>}
                </div>
              </div>

              {/* Career Objective */}
              {formData.objective && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4 border-b-2 border-gray-300 pb-2">CAREER OBJECTIVE</h2>
                  <p className="text-base leading-relaxed text-justify">{formData.objective}</p>
                </div>
              )}

              {/* Education */}
              {formData.education && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4 border-b-2 border-gray-300 pb-2">EDUCATION</h2>
                  <div className="space-y-3">
                    {formData.education.split('\n').filter(edu => edu.trim()).map((edu, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <p className="text-base font-medium">{edu}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {formData.experience && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4 border-b-2 border-gray-300 pb-2">PROFESSIONAL EXPERIENCE</h2>
                  <div className="space-y-3">
                    {formData.experience.split('\n').filter(exp => exp.trim()).map((exp, index) => (
                      <div key={index} className="border-l-4 border-secondary pl-4">
                        <p className="text-base">{exp.startsWith('•') ? exp : `• ${exp}`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {formData.projects && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4 border-b-2 border-gray-300 pb-2">PROJECTS</h2>
                  <div className="space-y-3">
                    {formData.projects.split('\n').filter(project => project.trim()).map((project, index) => (
                      <div key={index} className="border-l-4 border-accent pl-4">
                        <p className="text-base">{project.startsWith('•') ? project : `• ${project}`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Skills */}
              {formData.skills && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4 border-b-2 border-gray-300 pb-2">TECHNICAL SKILLS</h2>
                  <div className="grid grid-cols-1 gap-2">
                    {formData.skills.split('\n').filter(skill => skill.trim()).map((skill, index) => (
                      <p key={index} className="text-base font-medium bg-gray-50 p-2 rounded">{skill}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {formData.certifications && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-primary mb-4 border-b-2 border-gray-300 pb-2">CERTIFICATIONS</h2>
                  <div className="space-y-2">
                    {formData.certifications.split('\n').filter(cert => cert.trim()).map((cert, index) => (
                      <p key={index} className="text-base">{cert.startsWith('•') ? cert : `• ${cert}`}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Declaration */}
              <div className="mt-12 pt-8 border-t-2 border-gray-300">
                <h2 className="text-2xl font-bold text-primary mb-4">DECLARATION</h2>
                <p className="text-base mb-6 text-justify">
                  I hereby declare that the above-mentioned information is true, correct, and complete to the best of my knowledge.
                </p>
                <div className="flex justify-between items-end mt-8">
                  <div className="text-base">
                    <p><strong>Place:</strong> {formData.location || '________________'}</p>
                    <p><strong>Date:</strong> {new Date().toLocaleDateString('en-GB')}</p>
                  </div>
                  <div className="text-right">
                    <div className="border-b-2 border-black w-48 mb-2"></div>
                    <p className="font-bold text-lg">{formData.fullName}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mt-6">
              <Button onClick={() => setShowPreview(false)} variant="outline" size="lg">
                ← Edit Resume
              </Button>
              <Button onClick={generatePDF} className="bg-primary hover:bg-primary/90" size="lg">
                📄 Download PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;