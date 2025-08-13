'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { QuizResults, FormattedQuestion } from '@/types/quiz';
import { Trophy, Target, Clock, CheckCircle2, XCircle, RotateCcw, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';

interface ResultsPageProps {
  results: QuizResults;
  questions: FormattedQuestion[];
  onRestart: () => void;
}

export function ResultsPage({ results, questions, onRestart }: ResultsPageProps) {
  const [showDetailedReview, setShowDetailedReview] = useState(false);
  const { totalQuestions, correctAnswers, score, timeSpent, answers } = results;
  const percentage = (correctAnswers / totalQuestions) * 100;
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-emerald-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-emerald-100/60 border-emerald-300/60';
    if (percentage >= 60) return 'bg-orange-100/60 border-orange-300/60';
    return 'bg-red-100/60 border-red-300/60';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Outstanding performance!";
    if (percentage >= 80) return "Great job! Well done!";
    if (percentage >= 70) return "Good work! Keep it up!";
    if (percentage >= 60) return "Not bad! Room for improvement.";
    return "Keep practicing! You'll get better!";
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return "Excellent";
    if (percentage >= 80) return "Very Good";
    if (percentage >= 70) return "Good";
    if (percentage >= 60) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50/80 to-amber-50/60">
      <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
        <div className="space-y-6 sm:space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className={`p-4 rounded-full ${getScoreBgColor(percentage)}`}>
                <Trophy className={`h-12 w-12 ${getScoreColor(percentage)}`} />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Assessment Complete
            </h1>
            <p className="text-base sm:text-lg text-slate-600 px-4 sm:px-0">
              {getScoreMessage(percentage)}
            </p>
          </div>

          {/* Main Score Card */}
          <Card className={`border-2 shadow-lg bg-white/70 backdrop-blur-md ${getScoreBgColor(percentage)}`}>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-slate-900">Your Final Score</CardTitle>
              <CardDescription className="text-slate-600">
                Performance Level: <span className="font-semibold">{getPerformanceLevel(percentage)}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${getScoreColor(percentage)}`}>
                  {percentage.toFixed(0)}%
                </div>
                <div className="text-lg sm:text-xl text-slate-700">
                  {correctAnswers} out of {totalQuestions} questions correct
                </div>
                <div className="max-w-md mx-auto">
                  <Progress 
                    value={percentage} 
                    className="h-4 bg-white/50"
                    aria-label={`Score: ${percentage.toFixed(1)}%`}
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4">
                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/40">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="font-semibold text-slate-700">Correct</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-600">{correctAnswers}</div>
                </div>
                
                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/40">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="font-semibold text-slate-700">Incorrect</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-red-600">{totalQuestions - correctAnswers}</div>
                </div>
                
                <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/40">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold text-slate-700">Time Used</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-orange-600">{formatTime(timeSpent)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setShowDetailedReview(!showDetailedReview)}
              variant="outline"
              className="h-12 text-base px-6 bg-white/70 backdrop-blur-sm border-white/60 hover:bg-white/90"
            >
              {showDetailedReview ? (
                <>
                  <EyeOff className="h-5 w-5 mr-2" />
                  Hide Detailed Review
                  <ChevronUp className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  <Eye className="h-5 w-5 mr-2" />
                  View Detailed Review
                  <ChevronDown className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
            
            <Button 
              onClick={onRestart} 
              className="h-12 text-base px-6 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Take Assessment Again
            </Button>
          </div>

          {/* Detailed Review Section */}
          {showDetailedReview && (
            <Card className="border border-white/60 shadow-lg bg-white/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Question-by-Question Review</CardTitle>
                <CardDescription className="text-slate-600">
                  Review your answers and see the correct solutions for each question
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4 sm:mb-6 border-orange-200/60 bg-orange-50/70 backdrop-blur-sm">
                  <AlertDescription className="text-slate-700 text-sm">
                    <strong>Review Guide:</strong> Green = correct, red = incorrect. 
                    Correct answers shown for wrong questions.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4 sm:space-y-6">
                  {questions.map((question, index) => {
                    const userAnswer = answers.find(a => a.questionId === question.id);
                    const isCorrect = userAnswer?.selectedAnswer === question.correctAnswer;
                    
                    return (
                      <div
                        key={question.id}
                        className={`border rounded-lg p-3 sm:p-4 lg:p-6 ${
                          isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
                        }`}
                      >
                        <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                          <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                            {isCorrect ? (
                              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-emerald-600" aria-label="Correct answer" />
                            ) : (
                              <XCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-red-600" aria-label="Incorrect answer" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 lg:gap-3">
                              <Badge variant="outline" className="text-xs sm:text-sm font-medium">
                                Q{index + 1}
                              </Badge>
                              <Badge 
                                variant={isCorrect ? "default" : "destructive"}
                                className="text-xs sm:text-sm"
                              >
                                {isCorrect ? "Correct" : "Incorrect"}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {question.category}
                              </Badge>
                            </div>
                            
                            <h4 className="font-semibold text-sm sm:text-base text-slate-900 leading-relaxed break-words">
                              {question.question}
                            </h4>
                            
                            <div className="space-y-1.5 sm:space-y-2">
                              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                                <span className="text-xs sm:text-sm font-medium text-slate-600 sm:min-w-[100px] flex-shrink-0">Your answer:</span>
                                <span className={`text-xs sm:text-sm font-medium break-words ${
                                  isCorrect ? "text-emerald-700" : "text-red-700"
                                }`}>
                                  {userAnswer?.selectedAnswer || "No answer provided"}
                                </span>
                              </div>
                              
                              {!isCorrect && (
                                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                                  <span className="text-xs sm:text-sm font-medium text-slate-600 sm:min-w-[100px] flex-shrink-0">Correct answer:</span>
                                  <span className="text-xs sm:text-sm font-medium text-emerald-700 break-words">
                                    {question.correctAnswer}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
