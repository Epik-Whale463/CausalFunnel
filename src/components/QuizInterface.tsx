'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { QuestionDisplay } from './QuestionDisplay';
import { Timer } from './Timer';
import { NavigationPanel } from './NavigationPanel';
import { FormattedQuestion, UserAnswer } from '@/types/quiz';
import { toast } from 'sonner';
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
    <div className="min-h-screen bg-black">
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-3 order-2 xl:order-1">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-gray-900 rounded-lg border border-gray-700 p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Quiz in Progress
                </h1>
                <p className="text-gray-300">
                  Answer all questions to complete the quiz
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-400">Taking test as:</span>
                  <span className="text-sm font-medium bg-gray-800 text-gray-200 px-3 py-1 rounded-md">
                    {userEmail}
                  </span>
                </div>
              </div>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Submit Quiz
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="light-bg">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="premium-title">Submit Quiz?</AlertDialogTitle>
                    <AlertDialogDescription className="premium-body">
                      {allQuestionsAnswered 
                        ? "You have answered all questions. Are you ready to submit your quiz?"
                        : `You have answered ${userAnswers.length} out of ${questions.length} questions. Unanswered questions will be marked as incorrect. Are you sure you want to submit?`
                      }
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="premium-body">Continue Quiz</AlertDialogCancel>
                    <AlertDialogAction onClick={onSubmitQuiz} className="premium-body">
                      Submit Quiz
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </motion.div>

            {/* Question Display */}
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
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
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 order-1 xl:order-2 space-y-4">
            {/* Timer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Timer timeRemaining={timeRemaining} totalTime={totalTime} />
            </motion.div>

            {/* Navigation Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <NavigationPanel
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                answeredQuestions={answeredQuestions}
                onNavigateToQuestion={onNavigateToQuestion}
                onPrevious={onPrevious}
                onNext={onNext}
                canGoPrevious={canGoPrevious}
                canGoNext={canGoNext}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
