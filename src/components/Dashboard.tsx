import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical, LogOut, Brain, FileText, User } from "lucide-react";

interface DashboardProps {
  onSelectInterview: () => void;
  onSelectResume: () => void;
  onLogout: () => void;
}

const Dashboard = ({ onSelectInterview, onSelectResume, onLogout }: DashboardProps) => {
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
                SkillUp
              </h1>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Welcome to SkillUp
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enhance your professional skills with our AI-powered interview practice and professional resume builder
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Interview Card */}
          <Card className="group hover:shadow-primary transition-all duration-300 cursor-pointer border-2 hover:border-primary/20" onClick={onSelectInterview}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">AI Interview Practice</CardTitle>
              <CardDescription className="text-base">
                Practice with AI-generated interview questions tailored to your role and difficulty level
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Multiple job roles and difficulty levels
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Real-time speech recognition
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Instant AI-powered feedback
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-primary hover:opacity-90" size="lg">
                Start Interview Practice
              </Button>
            </CardContent>
          </Card>

          {/* Resume Builder Card */}
          <Card className="group hover:shadow-coral transition-all duration-300 cursor-pointer border-2 hover:border-coral/20" onClick={onSelectResume}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-coral rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">Resume Builder</CardTitle>
              <CardDescription className="text-base">
                Create professional resumes with our easy-to-use builder and download as PDF
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-coral rounded-full mr-3"></div>
                  Professional resume templates
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-coral rounded-full mr-3"></div>
                  Live preview as you build
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-coral rounded-full mr-3"></div>
                  Download as PDF instantly
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-coral hover:opacity-90" size="lg">
                Build Resume
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;