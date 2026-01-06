import { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { quizQuestions } from "@/data/mockData";

const QuizModule = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return { message: "Excellent! You're well prepared!", badge: "Fire Safety Expert", color: "text-success" };
    if (percentage >= 60) return { message: "Good job! Keep learning!", badge: "Safety Trainee", color: "text-primary" };
    return { message: "Keep practicing! Safety is important.", badge: "Safety Beginner", color: "text-warning" };
  };

  if (quizCompleted) {
    const result = getScoreMessage();
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b shadow-sm px-4 py-3">
          <div className="flex items-center space-x-3 max-w-4xl mx-auto">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-lg font-semibold">Quiz Completed!</h1>
          </div>
        </header>

        <div className="max-w-2xl mx-auto p-4">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  {score} / {quizQuestions.length}
                </div>
                <div className={`text-lg ${result.color}`}>
                  {result.message}
                </div>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-semibold text-primary">Badge Earned!</div>
                <div className="text-sm text-muted-foreground">{result.badge}</div>
              </div>

              <div className="space-y-2">
                <Button onClick={resetQuiz} className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Take Quiz Again
                </Button>
                <Button variant="outline" onClick={() => navigate(-1)} className="w-full">
                  Return to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b shadow-sm px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-lg font-semibold">Emergency Preparedness Quiz</h1>
          </div>
          <Badge variant="outline">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </Badge>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4">
        <div className="space-y-6">
          {/* Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>

          {/* Question */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 h-auto text-left justify-start ${
                    showResult
                      ? index === question.correctAnswer
                        ? 'border-success bg-success/10 text-success'
                        : index === selectedAnswer && index !== question.correctAnswer
                        ? 'border-destructive bg-destructive/10 text-destructive'
                        : ''
                      : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      showResult && index === question.correctAnswer
                        ? 'border-success bg-success'
                        : showResult && index === selectedAnswer && index !== question.correctAnswer
                        ? 'border-destructive bg-destructive'
                        : 'border-muted-foreground'
                    }`}>
                      {showResult && index === question.correctAnswer && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                      {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                        <XCircle className="w-4 h-4 text-white" />
                      )}
                      {!showResult && <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Explanation */}
          {showResult && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Explanation</h4>
                    <p className="text-sm text-muted-foreground">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Button */}
          {showResult && (
            <Button onClick={handleNext} size="lg" className="w-full">
              {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Complete Quiz'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModule;