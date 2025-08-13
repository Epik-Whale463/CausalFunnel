'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { QuestionDisplay } from './QuestionDisplay';
import { Timer } from './Timer';

import { FormattedQuestion, UserAnswer } from '@/types/quiz';
import { CheckCircle } from 'lucide-react';

interface QuizInterfaceProps {
  questions: FormattedQuestion[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  timeRemaining: number;
  totalTime: number;
  onAnswerSelect: (answer: string) => void;
  onNavigateToQuestion: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmitQuiz: () => void;
  visitedQuestions: Set<number>;
  userEmail: string;
}

export function QuizInterface({
  questions,
  currentQuestionIndex,
  userAnswers,
  timeRemaining,
  totalTime,
  onAnswerSelect,
  onNavigateToQuestion,
  onNext,
  onPrevious,
  onSubmitQuiz,
  visitedQuestions,
  userEmail
}: QuizInterfaceProps) {
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers.find(a => a.questionId === currentQuestion?.id);
  const answeredQuestions = new Set(userAnswers.map(a =>
    questions.findIndex(q => q.id === a.questionId)
  ).filter(index => index !== -1));

  const canGoPrevious = currentQuestionIndex > 0;
  const canGoNext = currentQuestionIndex < questions.length - 1;
  const allQuestionsAnswered = userAnswers.length === questions.length;

  const handleAnswerSelect = (answer: string) => {
    onAnswerSelect(answer);
    // Remove the toast from here since QuestionDisplay already shows feedback
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Loading Quiz...</h2>
          <p className="text-muted-foreground">Please wait while we prepare your questions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="container mx-auto p-4 max-w-6xl">
        {/* Clean, professional header */}
        <div className="flex items-center justify-between mb-6 bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">Q</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Assessment</h1>
              <div className="text-sm text-slate-500">{userEmail}</div>
            </div>
          </div>

          {/* Simple submit button */}
          {allQuestionsAnswered && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit Assessment
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Ready to Submit?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You've completed all questions. Ready to submit your assessment?
                    <br />
                    <span className="text-sm text-slate-500 mt-2 block">
                      Once submitted, you cannot make changes.
                    </span>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Review Answers</AlertDialogCancel>
                  <AlertDialogAction onClick={onSubmitQuiz} className="bg-green-600 hover:bg-green-700">
                    Submit Now
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <QuestionDisplay
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              currentAnswer={currentAnswer}
              onAnswerSelect={handleAnswerSelect}
              onNext={onNext}
              onPrevious={onPrevious}
              canGoNext={canGoNext}
              canGoPrevious={canGoPrevious}
            />
          </div>

          {/* Clean Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Timer */}
            <Timer timeRemaining={timeRemaining} totalTime={totalTime} />

            {/* Simple Progress */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
              <div className="text-sm font-medium text-slate-700 mb-3">Progress</div>
              <div className="text-2xl font-bold text-slate-900 mb-2">
                {userAnswers.length}/{questions.length}
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(userAnswers.length / questions.length) * 100}%` }}
                />
              </div>
              <div className="text-xs text-slate-500 mt-2">
                {Math.round((userAnswers.length / questions.length) * 100)}% Complete
              </div>
            </div>

            {/* Navigation Grid */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
              <div className="text-sm font-medium text-slate-700 mb-3">Questions</div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {Array.from({ length: questions.length }, (_, index) => {
                  const isAnswered = answeredQuestions.has(index);
                  const isCurrent = index === currentQuestionIndex;

                  return (
                    <button
                      key={index}
                      onClick={() => onNavigateToQuestion(index)}
                      className={`
                        h-9 text-xs font-medium rounded-lg transition-colors relative
                        ${isCurrent
                          ? 'bg-blue-600 text-white'
                          : isAnswered
                            ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                        }
                      `}
                      aria-label={`Question ${index + 1}${isCurrent ? ' (current)' : ''}${isAnswered ? ' (answered)' : ''}`}
                    >
                      {index + 1}
                      {isAnswered && !isCurrent && (
                        <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={onPrevious}
                  disabled={!canGoPrevious}
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 text-xs"
                >
                  Previous
                </Button>
                <Button
                  onClick={onNext}
                  disabled={!canGoNext}
                  size="sm"
                  className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-700"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
