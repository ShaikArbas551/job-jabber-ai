import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Eye, Download, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedIn: string;
    website: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    jobTitle: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    year: string;
  }>;
  skills: string[];
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string;
  }>;
}

interface ResumeBuilderProps {
  onBack: () => void;
}

const ResumeBuilder = ({ onBack }: ResumeBuilderProps) => {
  const [currentStep, setCurrentStep] = useState<"form" | "preview">("form");
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      linkedIn: "",
      website: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now().toString(),
        jobTitle: "",
        company: "",
        duration: "",
        description: "",
      }]
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now().toString(),
        degree: "",
        institution: "",
        year: "",
      }]
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        id: Date.now().toString(),
        title: "",
        description: "",
        technologies: "",
      }]
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  const handleSkillsChange = (value: string) => {
    const skills = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setResumeData(prev => ({ ...prev, skills }));
  };

  const downloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${resumeData.personalInfo.fullName || 'resume'}.pdf`);
      toast("Resume downloaded successfully!");
    } catch (error) {
      toast("Error generating PDF. Please try again.");
    }
  };

  if (currentStep === "preview") {
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
                  SkillUp - Resume Preview
                </h1>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setCurrentStep("form")}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button onClick={downloadPDF} className="bg-gradient-primary">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Resume Preview */}
        <div className="max-w-4xl mx-auto p-8">
          <div id="resume-preview" className="bg-white shadow-elegant rounded-lg p-8 text-black">
            {/* Header */}
            <div className="text-center border-b-2 border-gray-200 pb-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {resumeData.personalInfo.fullName || "Your Name"}
              </h1>
              <div className="text-gray-600 space-y-1">
                <p>{resumeData.personalInfo.email}</p>
                <p>{resumeData.personalInfo.phone}</p>
                <p>{resumeData.personalInfo.address}</p>
                {resumeData.personalInfo.linkedIn && <p>LinkedIn: {resumeData.personalInfo.linkedIn}</p>}
                {resumeData.personalInfo.website && <p>Website: {resumeData.personalInfo.website}</p>}
              </div>
            </div>

            {/* Summary */}
            {resumeData.summary && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
              </div>
            )}

            {/* Experience */}
            {resumeData.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                  Professional Experience
                </h2>
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-800">{exp.jobTitle}</h3>
                      <span className="text-gray-600 text-sm">{exp.duration}</span>
                    </div>
                    <p className="font-medium text-gray-700 mb-2">{exp.company}</p>
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                  Education
                </h2>
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                        <p className="text-gray-700">{edu.institution}</p>
                      </div>
                      <span className="text-gray-600">{edu.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {resumeData.projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                  Projects
                </h2>
                {resumeData.projects.map((project) => (
                  <div key={project.id} className="mb-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{project.title}</h3>
                    <p className="text-gray-600 mb-2">{project.description}</p>
                    {project.technologies && (
                      <p className="text-sm text-gray-500">Technologies: {project.technologies}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

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
              <Button onClick={() => setCurrentStep("preview")} className="bg-gradient-coral">
                <Eye className="h-4 w-4 mr-2" />
                Preview Resume
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, email: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, phone: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={resumeData.personalInfo.address}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, address: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedIn">LinkedIn</Label>
                  <Input
                    id="linkedIn"
                    value={resumeData.personalInfo.linkedIn}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, linkedIn: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={resumeData.personalInfo.website}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, website: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                placeholder="Write a brief professional summary..."
                value={resumeData.summary}
                onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Professional Experience</CardTitle>
              <Button onClick={addExperience} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Experience {index + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeExperience(exp.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Job Title</Label>
                      <Input
                        value={exp.jobTitle}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          experience: prev.experience.map(item =>
                            item.id === exp.id ? { ...item, jobTitle: e.target.value } : item
                          )
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          experience: prev.experience.map(item =>
                            item.id === exp.id ? { ...item, company: e.target.value } : item
                          )
                        }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <Input
                      placeholder="e.g., Jan 2020 - Present"
                      value={exp.duration}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        experience: prev.experience.map(item =>
                          item.id === exp.id ? { ...item, duration: e.target.value } : item
                        )
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Job Description</Label>
                    <Textarea
                      placeholder="Describe your responsibilities and achievements..."
                      value={exp.description}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        experience: prev.experience.map(item =>
                          item.id === exp.id ? { ...item, description: e.target.value } : item
                        )
                      }))}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button onClick={addEducation} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Education {index + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          education: prev.education.map(item =>
                            item.id === edu.id ? { ...item, degree: e.target.value } : item
                          )
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          education: prev.education.map(item =>
                            item.id === edu.id ? { ...item, institution: e.target.value } : item
                          )
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Year</Label>
                      <Input
                        value={edu.year}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          education: prev.education.map(item =>
                            item.id === edu.id ? { ...item, year: e.target.value } : item
                          )
                        }))}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input
                id="skills"
                placeholder="e.g., JavaScript, React, Node.js, Python"
                value={resumeData.skills.join(', ')}
                onChange={(e) => handleSkillsChange(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Projects</CardTitle>
              <Button onClick={addProject} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {resumeData.projects.map((project, index) => (
                <div key={project.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Project {index + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <Label>Project Title</Label>
                    <Input
                      value={project.title}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        projects: prev.projects.map(item =>
                          item.id === project.id ? { ...item, title: e.target.value } : item
                        )
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        projects: prev.projects.map(item =>
                          item.id === project.id ? { ...item, description: e.target.value } : item
                        )
                      }))}
                    />
                  </div>
                  <div>
                    <Label>Technologies Used</Label>
                    <Input
                      placeholder="e.g., React, TypeScript, Tailwind CSS"
                      value={project.technologies}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        projects: prev.projects.map(item =>
                          item.id === project.id ? { ...item, technologies: e.target.value } : item
                        )
                      }))}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;