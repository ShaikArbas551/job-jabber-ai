import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Trophy, 
  Target, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Home,
  Medal,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { InterviewResults as Results } from "./InterviewInterface";
import { InterviewConfig } from "./InterviewSetup";

interface InterviewResultsProps {
  results: Results;
  config: InterviewConfig;
  onRetry: () => void;
  onHome: () => void;
}

export default function InterviewResults({ results, config, onRetry, onHome }: InterviewResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Outstanding! You're ready for any interview!";
    if (score >= 80) return "Excellent performance! You're well-prepared!";
    if (score >= 70) return "Good job! A little more practice will perfect your skills!";
    if (score >= 60) return "Not bad! Focus on improving your weak areas!";
    return "Keep practicing! Every expert was once a beginner!";
  };

  const getPerformanceIcon = (score: number) => {
    if (score >= 80) return <Trophy className="w-12 h-12 text-success" />;
    if (score >= 60) return <Medal className="w-12 h-12 text-warning" />;
    return <Target className="w-12 h-12 text-destructive" />;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-hero rounded-2xl flex items-center justify-center mb-4">
            {getPerformanceIcon(results.score)}
          </div>
          <h1 className="text-3xl font-bold mb-2">Interview Complete!</h1>
          <p className="text-muted-foreground">Here's how you performed</p>
        </div>

        {/* Score Overview */}
        <Card className="shadow-elegant mb-8">
          <CardHeader className="text-center">
            <div className="space-y-4">
              <div className={`text-6xl font-bold ${getScoreColor(results.score)}`}>
                {results.score}%
              </div>
              <CardTitle className="text-xl">
                {getScoreMessage(results.score)}
              </CardTitle>
              <div className="flex justify-center gap-6 text-sm text-muted-foreground">
                <div className="text-center">
                  <div className="font-semibold text-foreground">{results.correctAnswers}</div>
                  <div>Correct</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground">{results.totalQuestions - results.correctAnswers}</div>
                  <div>Incorrect</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground">{results.totalQuestions}</div>
                  <div>Total</div>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Interview Details */}
            <div className="bg-gradient-subtle p-4 rounded-xl">
              <h3 className="font-semibold mb-3">Interview Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Role:</span>
                  <div className="font-medium">{config.role.replace(/([A-Z])/g, ' $1').trim()}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Difficulty:</span>
                  <div>
                    <Badge className={`
                      ${config.difficulty === 'easy' ? 'bg-success' : 
                        config.difficulty === 'intermediate' ? 'bg-warning' : 'bg-destructive'}
                    `}>
                      {config.difficulty.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Questions:</span>
                  <div className="font-medium">{results.totalQuestions}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card className="shadow-elegant mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Question-by-Question Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {results.answers.map((answer, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-start gap-3">
                  {answer.isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="font-semibold">Question {index + 1}</h4>
                      <p className="text-muted-foreground">{answer.question}</p>
                    </div>
                    
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <h5 className="text-sm font-medium mb-1">Your Answer:</h5>
                      <p className="text-sm italic">{answer.userAnswer}</p>
                    </div>
                    
                    {!answer.isCorrect && (
                      <div className="bg-success/10 border border-success/20 p-3 rounded-lg">
                        <h5 className="text-sm font-medium text-success mb-1">Correct Answer:</h5>
                        <p className="text-sm">{answer.correctAnswer}</p>
                      </div>
                    )}
                    
                    <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg">
                      <h5 className="text-sm font-medium text-primary mb-1">AI Feedback:</h5>
                      <p className="text-sm">{answer.feedback}</p>
                    </div>
                  </div>
                </div>
                {index < results.answers.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRetry}
            variant="hero"
            size="lg"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </Button>
          <Button
            onClick={onHome}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </div>

        {/* Improvement Tips */}
        <Card className="shadow-elegant mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Tips for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold">Practice Regularly</h4>
                <p className="text-muted-foreground">
                  Consistent practice with different difficulty levels will improve your confidence and performance.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Focus on Weak Areas</h4>
                <p className="text-muted-foreground">
                  Review the questions you got wrong and practice similar topics to strengthen your knowledge.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Time Management</h4>
                <p className="text-muted-foreground">
                  Practice answering questions within time limits to improve your response speed.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Clear Communication</h4>
                <p className="text-muted-foreground">
                  Practice speaking clearly and structuring your answers for better clarity.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}