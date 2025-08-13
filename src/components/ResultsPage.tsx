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
    if (percentage >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-emerald-50 border-emerald-200';
    if (percentage >= 60) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className={`p-4 rounded-full ${getScoreBgColor(percentage)}`}>
                <Trophy className={`h-12 w-12 ${getScoreColor(percentage)}`} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">
              Assessment Complete
            </h1>
            <p className="text-lg text-slate-600">
              {getScoreMessage(percentage)}
            </p>
          </div>

          {/* Main Score Card */}
          <Card className={`border-2 shadow-lg ${getScoreBgColor(percentage)}`}>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-slate-900">Your Final Score</CardTitle>
              <CardDescription className="text-slate-600">
                Performance Level: <span className="font-semibold">{getPerformanceLevel(percentage)}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className={`text-6xl font-bold ${getScoreColor(percentage)}`}>
                  {percentage.toFixed(0)}%
                </div>
                <div className="text-xl text-slate-700">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="font-semibold text-slate-700">Correct</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">{correctAnswers}</div>
                </div>
                
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="font-semibold text-slate-700">Incorrect</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600">{totalQuestions - correctAnswers}</div>
                </div>
                
                <div className="text-center p-4 bg-white/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-slate-700">Time Used</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{formatTime(timeSpent)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setShowDetailedReview(!showDetailedReview)}
              variant="outline"
              className="h-12 text-base px-6 bg-white border-slate-300 hover:bg-slate-50"
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
              className="h-12 text-base px-6 bg-blue-600 hover:bg-blue-700"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Take Assessment Again
            </Button>
          </div>

          {/* Detailed Review Section */}
          {showDetailedReview && (
            <Card className="border shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Question-by-Question Review</CardTitle>
                <CardDescription className="text-slate-600">
                  Review your answers and see the correct solutions for each question
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6 border-blue-200 bg-blue-50">
                  <AlertDescription className="text-slate-700">
                    <strong>Review Guide:</strong> Green indicates correct answers, red indicates incorrect answers. 
                    The correct answer is shown for any questions you got wrong.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-6">
                  {questions.map((question, index) => {
                    const userAnswer = answers.find(a => a.questionId === question.id);
                    const isCorrect = userAnswer?.selectedAnswer === question.correctAnswer;
                    
                    return (
                      <div
                        key={question.id}
                        className={`border rounded-lg p-6 ${
                          isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {isCorrect ? (
                              <CheckCircle2 className="h-6 w-6 text-emerald-600" aria-label="Correct answer" />
                            ) : (
                              <XCircle className="h-6 w-6 text-red-600" aria-label="Incorrect answer" />
                            )}
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="text-sm font-medium">
                                Question {index + 1}
                              </Badge>
                              <Badge 
                                variant={isCorrect ? "default" : "destructive"}
                                className="text-sm"
                              >
                                {isCorrect ? "Correct" : "Incorrect"}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {question.category}
                              </Badge>
                            </div>
                            
                            <h4 className="font-semibold text-slate-900 leading-relaxed">
                              {question.question}
                            </h4>
                            
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-sm font-medium text-slate-600 min-w-[100px]">Your answer:</span>
                                <span className={`text-sm font-medium ${
                                  isCorrect ? "text-emerald-700" : "text-red-700"
                                }`}>
                                  {userAnswer?.selectedAnswer || "No answer provided"}
                                </span>
                              </div>
                              
                              {!isCorrect && (
                                <div className="flex items-start gap-2">
                                  <span className="text-sm font-medium text-slate-600 min-w-[100px]">Correct answer:</span>
                                  <span className="text-sm font-medium text-emerald-700">
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
