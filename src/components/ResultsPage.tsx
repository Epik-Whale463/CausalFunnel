'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { QuizResults, FormattedQuestion } from '@/types/quiz';
import { Trophy, Target, Clock, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface ResultsPageProps {
  results: QuizResults;
  questions: FormattedQuestion[];
  onRestart: () => void;
}

export function ResultsPage({ results, questions, onRestart }: ResultsPageProps) {
  const { totalQuestions, correctAnswers, score, timeSpent, answers } = results;
  const percentage = (correctAnswers / totalQuestions) * 100;
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Outstanding performance! 🎉";
    if (percentage >= 80) return "Great job! Well done! 👏";
    if (percentage >= 70) return "Good work! Keep it up! 👍";
    if (percentage >= 60) return "Not bad! Room for improvement. 📚";
    return "Keep practicing! You'll get better! 💪";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Header Section */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
            >
              <Trophy className="h-12 w-12 mx-auto text-yellow-500" />
            </motion.div>
            <h1 className="text-3xl font-bold tracking-tight">
              Quiz Results Dashboard
            </h1>
            <p className="text-muted-foreground">
              {getScoreMessage(percentage)}
            </p>
          </div>

          {/* Main Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Score Overview */}
            <div className="lg:col-span-1 space-y-4">
              {/* Score Card */}
              <Card className="border shadow-lg">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">Your Score</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-2">
                    <div className={`text-4xl font-bold ${getScoreColor(percentage)}`}>
                      {correctAnswers}/{totalQuestions}
                    </div>
                    <div className={`text-xl font-semibold ${getScoreColor(percentage)}`}>
                      {percentage.toFixed(1)}%
                    </div>
                    <Progress value={percentage} className="h-3 mt-3" />
                  </div>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 gap-3">
                <Card className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Target className="h-6 w-6 text-green-500" />
                      <div>
                        <div className="text-lg font-bold">{correctAnswers}</div>
                        <div className="text-sm text-muted-foreground">Correct</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-6 w-6 text-red-500" />
                      <div>
                        <div className="text-lg font-bold">{totalQuestions - correctAnswers}</div>
                        <div className="text-sm text-muted-foreground">Incorrect</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-6 w-6 text-blue-500" />
                      <div>
                        <div className="text-lg font-bold">{formatTime(timeSpent)}</div>
                        <div className="text-sm text-muted-foreground">Time Taken</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Button */}
              <Button 
                onClick={onRestart} 
                className="w-full h-12 text-base"
                size="lg"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Take Quiz Again
              </Button>
            </div>

            {/* Right Column - Question Review */}
            <div className="lg:col-span-2">
              <Card className="border shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Question Review</CardTitle>
                  <CardDescription>
                    Review your answers and see the correct solutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[600px] overflow-y-auto space-y-4 pr-2">
                    {questions.map((question, index) => {
                      const userAnswer = answers.find(a => a.questionId === question.id);
                      const isCorrect = userAnswer?.selectedAnswer === question.correctAnswer;
                      
                      return (
                        <motion.div
                          key={question.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.3 }}
                          className="border rounded-lg p-4 space-y-3"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              {isCorrect ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-500 mt-1" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  Question {index + 1}
                                </Badge>
                                <Badge 
                                  variant={isCorrect ? "default" : "destructive"}
                                  className="text-xs"
                                >
                                  {isCorrect ? "Correct" : "Incorrect"}
                                </Badge>
                              </div>
                              <h4 className="font-medium text-sm mb-2 leading-relaxed">
                                {question.question}
                              </h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground">Your answer:</span>
                                  <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                                    {userAnswer?.selectedAnswer || "No answer"}
                                  </span>
                                </div>
                                {!isCorrect && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">Correct answer:</span>
                                    <span className="text-green-600">{question.correctAnswer}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
