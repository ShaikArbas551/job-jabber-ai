import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Mic, 
  MicOff, 
  RotateCcw, 
  ChevronRight, 
  Volume2, 
  Clock,
  Target,
  CheckCircle,
  XCircle
} from "lucide-react";
import { InterviewConfig } from "./InterviewSetup";
import { generateQuestion, evaluateAnswer } from "@/lib/questionEngine";

interface InterviewInterfaceProps {
  config: InterviewConfig;
  onComplete: (results: InterviewResults) => void;
  onExit: () => void;
}

export interface InterviewResults {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  answers: AnswerResult[];
}

interface AnswerResult {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  feedback: string;
}

export default function InterviewInterface({ config, onComplete, onExit }: InterviewInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        setTranscript(finalTranscript + interimTranscript);
      };
    }
    
    // Generate first question
    loadQuestion();
    
    // Start timer
    intervalRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const loadQuestion = () => {
    const question = generateQuestion(config.role, config.difficulty);
    setCurrentQuestion(question);
    setTranscript("");
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    setIsRecording(false);
  };

  const handleSubmitAnswer = async () => {
    if (!transcript.trim()) return;
    
    setIsProcessing(true);
    
    // Evaluate the answer using AI
    const evaluation = await evaluateAnswer(currentQuestion, transcript, config.role, config.difficulty);
    
    const answerResult: AnswerResult = {
      question: currentQuestion,
      userAnswer: transcript,
      correctAnswer: evaluation.correctAnswer,
      isCorrect: evaluation.isCorrect,
      feedback: evaluation.feedback
    };
    
    setAnswers(prev => [...prev, answerResult]);
    setIsProcessing(false);
    
    // Move to next question or complete interview
    if (currentQuestionIndex + 1 < config.questionCount) {
      setCurrentQuestionIndex(prev => prev + 1);
      loadQuestion();
    } else {
      completeInterview([...answers, answerResult]);
    }
  };

  const completeInterview = (allAnswers: AnswerResult[]) => {
    const correctAnswers = allAnswers.filter(answer => answer.isCorrect).length;
    const score = Math.round((correctAnswers / config.questionCount) * 100);
    
    const results: InterviewResults = {
      totalQuestions: config.questionCount,
      correctAnswers,
      score,
      answers: allAnswers
    };
    
    onComplete(results);
  };

  const progress = ((currentQuestionIndex + 1) / config.questionCount) * 100;
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onExit}>
              Exit Interview
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm">
            Question {currentQuestionIndex + 1} of {config.questionCount}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-elegant">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Target className="w-6 h-6 text-primary" />
              <CardTitle className="text-2xl">{config.role.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
            </div>
            <Badge className={`
              ${config.difficulty === 'easy' ? 'bg-success' : 
                config.difficulty === 'intermediate' ? 'bg-warning' : 'bg-destructive'}
            `}>
              {config.difficulty.toUpperCase()} LEVEL
            </Badge>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Question */}
            <div className="bg-gradient-subtle p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-primary">Question:</h3>
              <p className="text-xl leading-relaxed">{currentQuestion}</p>
            </div>

            {/* Recording Interface */}
            <div className="text-center space-y-6">
              {/* Recording Button */}
              <div className="flex justify-center">
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  variant={isRecording ? "destructive" : "hero"}
                  size="lg"
                  className={`w-24 h-24 rounded-full ${isRecording ? 'animate-pulse' : ''}`}
                  disabled={isProcessing}
                >
                  {isRecording ? (
                    <MicOff className="w-8 h-8" />
                  ) : (
                    <Mic className="w-8 h-8" />
                  )}
                </Button>
              </div>

              <p className="text-muted-foreground">
                {isRecording ? "Recording... Speak your answer" : "Click to start recording your answer"}
              </p>

              {/* Live Transcript */}
              {transcript && (
                <Card className="bg-secondary/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Volume2 className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Live Transcript:</span>
                    </div>
                    <p className="text-left italic">{transcript}</p>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                {transcript && !isRecording && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setTranscript("");
                        startRecording();
                      }}
                      className="flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Re-record
                    </Button>
                    <Button
                      onClick={handleSubmitAnswer}
                      variant="hero"
                      className="flex items-center gap-2"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Answer
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Previous Answers Summary */}
            {answers.length > 0 && (
              <div className="pt-6 border-t">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  Progress Summary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="text-center p-4">
                    <div className="text-2xl font-bold text-primary">
                      {answers.filter(a => a.isCorrect).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </Card>
                  <Card className="text-center p-4">
                    <div className="text-2xl font-bold text-destructive">
                      {answers.filter(a => !a.isCorrect).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Incorrect</div>
                  </Card>
                  <Card className="text-center p-4">
                    <div className="text-2xl font-bold text-warning">
                      {Math.round((answers.filter(a => a.isCorrect).length / answers.length) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}