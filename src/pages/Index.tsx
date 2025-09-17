import { useState } from "react";
import AuthPages from "@/components/AuthPages";
import Dashboard from "@/components/Dashboard";
import InterviewSetup, { InterviewConfig } from "@/components/InterviewSetup";
import InterviewInterface, { InterviewResults as IInterviewResults } from "@/components/InterviewInterface";
import InterviewResults from "@/components/InterviewResults";
import ResumeBuilder from "@/components/ResumeBuilder";

type AppState = "auth" | "dashboard" | "setup" | "interview" | "results" | "resume";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("auth");
  const [interviewConfig, setInterviewConfig] = useState<InterviewConfig | null>(null);
  const [interviewResults, setInterviewResults] = useState<IInterviewResults | null>(null);

  const handleAuthSuccess = () => {
    setAppState("dashboard");
  };

  const handleStartInterview = (config: InterviewConfig) => {
    setInterviewConfig(config);
    setAppState("interview");
  };

  const handleInterviewComplete = (results: IInterviewResults) => {
    setInterviewResults(results);
    setAppState("results");
  };

  const handleRetryInterview = () => {
    setAppState("setup");
    setInterviewResults(null);
  };

  const handleBackToHome = () => {
    setAppState("dashboard");
    setInterviewConfig(null);
    setInterviewResults(null);
  };

  const handleExitInterview = () => {
    setAppState("setup");
  };

  const handleSelectInterview = () => {
    setAppState("setup");
  };

  const handleSelectResume = () => {
    setAppState("resume");
  };

  const handleBackToDashboard = () => {
    setAppState("dashboard");
  };

  const handleLogout = () => {
    setAppState("auth");
    setInterviewConfig(null);
    setInterviewResults(null);
  };

  return (
    <div className="min-h-screen">
      {appState === "auth" && (
        <AuthPages onAuthSuccess={handleAuthSuccess} />
      )}
      
      {appState === "dashboard" && (
        <Dashboard 
          onSelectInterview={handleSelectInterview}
          onSelectResume={handleSelectResume}
          onLogout={handleLogout}
        />
      )}
      
      {appState === "setup" && (
        <InterviewSetup onStartInterview={handleStartInterview} onLogout={handleBackToDashboard} />
      )}
      
      {appState === "interview" && interviewConfig && (
        <InterviewInterface 
          config={interviewConfig}
          onComplete={handleInterviewComplete}
          onExit={handleExitInterview}
        />
      )}
      
      {appState === "results" && interviewResults && interviewConfig && (
        <InterviewResults 
          results={interviewResults}
          config={interviewConfig}
          onRetry={handleRetryInterview}
          onHome={handleBackToHome}
        />
      )}
      
      {appState === "resume" && (
        <ResumeBuilder onBack={handleBackToDashboard} />
      )}
    </div>
  );
};

export default Index;