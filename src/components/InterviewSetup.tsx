import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Briefcase, Target, Clock, ChevronRight, MoreHorizontal, LogOut } from "lucide-react";

interface InterviewSetupProps {
  onStartInterview: (config: InterviewConfig) => void;
  onLogout: () => void;
}

export interface InterviewConfig {
  role: string;
  difficulty: string;
  questionCount: number;
}

const jobRoles = [
  { value: "frontend", label: "Frontend Developer", icon: "💻" },
  { value: "backend", label: "Backend Developer", icon: "⚡" },
  { value: "fullstack", label: "Full Stack Developer", icon: "🚀" },
  { value: "datascientist", label: "Data Scientist", icon: "📊" },
  { value: "devops", label: "DevOps Engineer", icon: "⚙️" },
  { value: "productmanager", label: "Product Manager", icon: "📋" },
  { value: "uiux", label: "UI/UX Designer", icon: "🎨" },
  { value: "mobile", label: "Mobile Developer", icon: "📱" },
];

const difficultyLevels = [
  { value: "easy", label: "Easy", description: "Basic concepts and fundamentals", color: "success" },
  { value: "intermediate", label: "Intermediate", description: "Practical experience questions", color: "warning" },
  { value: "hard", label: "Hard", description: "Advanced and complex scenarios", color: "destructive" },
];

export default function InterviewSetup({ onStartInterview, onLogout }: InterviewSetupProps) {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [questionCount, setQuestionCount] = useState<number>(5);

  const handleStartInterview = () => {
    if (selectedRole && selectedDifficulty) {
      onStartInterview({
        role: selectedRole,
        difficulty: selectedDifficulty,
        questionCount,
      });
    }
  };

  const isValid = selectedRole && selectedDifficulty;
  const selectedRoleData = jobRoles.find(role => role.value === selectedRole);
  const selectedDifficultyData = difficultyLevels.find(diff => diff.value === selectedDifficulty);

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      {/* Header with Logo and Menu */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12">
              <img 
                src="/lovable-uploads/b798171e-6379-4e47-9f86-f07dcaeecad5.png" 
                alt="Interview Up AI" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Interview Up AI</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Interview Practice</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={onLogout} className="text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-2xl shadow-elegant border-0">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Interview Setup
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Configure your AI-powered interview experience
              </p>
            </div>
          </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Job Role Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Select Job Role</h3>
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="h-14 text-lg">
                <SelectValue placeholder="Choose your target role" />
              </SelectTrigger>
              <SelectContent>
                {jobRoles.map((role) => (
                  <SelectItem key={role.value} value={role.value} className="h-12">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{role.icon}</span>
                      <span className="font-medium">{role.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Difficulty Level</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {difficultyLevels.map((level) => (
                <div
                  key={level.value}
                  onClick={() => setSelectedDifficulty(level.value)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedDifficulty === level.value
                      ? `border-${level.color} bg-${level.color}/5 shadow-md`
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="text-center space-y-2">
                    <Badge 
                      variant={selectedDifficulty === level.value ? "default" : "secondary"}
                      className={selectedDifficulty === level.value ? `bg-${level.color}` : ""}
                    >
                      {level.label}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Number of Questions</h3>
            </div>
            <Select value={questionCount.toString()} onValueChange={(value) => setQuestionCount(parseInt(value))}>
              <SelectTrigger className="h-14 text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} Question{num > 1 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Summary Card */}
          {isValid && (
            <Card className="bg-gradient-subtle border border-primary/20 animate-in slide-in-from-bottom-4 duration-500">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 text-primary">Interview Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Role:</span>
                    <div className="flex items-center gap-2">
                      <span>{selectedRoleData?.icon}</span>
                      <span className="font-medium">{selectedRoleData?.label}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <Badge className={`bg-${selectedDifficultyData?.color}`}>
                      {selectedDifficultyData?.label}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Questions:</span>
                    <span className="font-medium">{questionCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Start Button */}
          <Button
            onClick={handleStartInterview}
            disabled={!isValid}
            variant="hero"
            size="lg"
            className="w-full h-14 text-lg font-semibold group"
          >
            Start Interview
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}