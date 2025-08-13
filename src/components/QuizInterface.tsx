'use client';


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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50/80 to-amber-50/60">
      <div className="container mx-auto p-3 sm:p-4 lg:p-6 max-w-7xl">
        {/* Professional header with glassmorphism */}
        <div className="bg-white/60 backdrop-blur-md rounded-lg border border-white/50 shadow-lg mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4 sm:gap-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-semibold text-base sm:text-lg">Q</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">Knowledge Assessment</h1>
                <div className="text-xs sm:text-sm text-gray-600 mt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span>Candidate:</span>
                  <span className="font-medium text-gray-800 break-all">{userEmail}</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced submit button - show when 50% complete or all answered */}
            {(userAnswers.length >= Math.ceil(questions.length * 0.5) || allQuestionsAnswered) && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className={`
                    px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl border-0 text-white
                    ${allQuestionsAnswered 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
                      : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700'
                    }
                  `}>
                    <CheckCircle className="w-5 h-5 mr-3" />
                    {allQuestionsAnswered ? 'Submit Assessment' : 'Submit Early'}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-semibold text-gray-900">
                      Submit Assessment
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600 space-y-3">
                      {allQuestionsAnswered ? (
                        <p>You have completed all questions. Are you ready to submit your assessment?</p>
                      ) : (
                        <>
                          <p>You have answered {userAnswers.length} out of {questions.length} questions.</p>
                          <div className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                            <strong>Warning:</strong> Unanswered questions will be marked as incorrect.
                          </div>
                        </>
                      )}
                      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <strong>Important:</strong> Once submitted, you cannot make changes to your answers.
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="gap-3">
                    <AlertDialogCancel className="px-4">Continue Working</AlertDialogCancel>
                    <AlertDialogAction onClick={onSubmitQuiz} className={`px-6 ${
                      allQuestionsAnswered 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-orange-600 hover:bg-orange-700'
                    }`}>
                      {allQuestionsAnswered ? 'Submit Now' : 'Submit Early'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
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
          <div className="lg:col-span-1 space-y-3 lg:space-y-4 order-first lg:order-last">
            {/* Timer */}
            <Timer timeRemaining={timeRemaining} totalTime={totalTime} />

            {/* Compact Progress Card */}
            <div className="bg-white/50 backdrop-blur-md rounded-lg border border-white/60 p-3 sm:p-4 shadow-lg">
              <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Progress</div>
              <div className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {userAnswers.length}/{questions.length}
              </div>
              <div className="w-full bg-orange-100 rounded-full h-1.5 sm:h-2">
                <div
                  className="bg-orange-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(userAnswers.length / questions.length) * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1.5">
                {Math.round((userAnswers.length / questions.length) * 100)}% Done
              </div>
            </div>

            {/* Compact Navigation Grid */}
            <div className="bg-white/50 backdrop-blur-md rounded-lg border border-white/60 p-3 sm:p-4 shadow-lg">
              <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Questions</div>
              <div className="grid grid-cols-5 sm:grid-cols-3 gap-1 sm:gap-1.5 mb-3">
                {Array.from({ length: questions.length }, (_, index) => {
                  const isAnswered = answeredQuestions.has(index);
                  const isCurrent = index === currentQuestionIndex;

                  return (
                    <button
                      key={index}
                      onClick={() => onNavigateToQuestion(index)}
                      className={`
                        h-6 sm:h-8 text-xs font-medium transition-colors relative border rounded
                        ${isCurrent
                          ? 'bg-orange-600 text-white border-orange-600'
                          : isAnswered
                            ? 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200'
                        }
                      `}
                      aria-label={`Question ${index + 1}${isCurrent ? ' (current)' : ''}${isAnswered ? ' (answered)' : ''}`}
                    >
                      {index + 1}
                      {isAnswered && !isCurrent && (
                        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Compact Navigation Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={onPrevious}
                  disabled={!canGoPrevious}
                  variant="outline"
                  size="sm"
                  className="flex-1 h-7 sm:h-8 text-xs border-orange-200 hover:bg-orange-50"
                >
                  Prev
                </Button>
                <Button
                  onClick={onNext}
                  disabled={!canGoNext}
                  size="sm"
                  className="flex-1 h-7 sm:h-8 text-xs bg-orange-600 hover:bg-orange-700 text-white"
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
