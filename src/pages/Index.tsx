import { useState } from "react";
import AuthPages from "@/components/AuthPages";
import InterviewSetup, { InterviewConfig } from "@/components/InterviewSetup";
import InterviewInterface, { InterviewResults as IInterviewResults } from "@/components/InterviewInterface";
import InterviewResults from "@/components/InterviewResults";

type AppState = "auth" | "setup" | "interview" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("auth");
  const [interviewConfig, setInterviewConfig] = useState<InterviewConfig | null>(null);
  const [interviewResults, setInterviewResults] = useState<IInterviewResults | null>(null);

  const handleAuthSuccess = () => {
    setAppState("setup");
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
    setAppState("setup");
    setInterviewConfig(null);
    setInterviewResults(null);
  };

  const handleExitInterview = () => {
    setAppState("setup");
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
      
      {appState === "setup" && (
        <InterviewSetup onStartInterview={handleStartInterview} onLogout={handleLogout} />
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
    </div>
  );
};

export default Index;
