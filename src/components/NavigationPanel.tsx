'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';

interface NavigationPanelProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  answeredQuestions: Set<number>;
  onNavigateToQuestion: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function NavigationPanel({
  currentQuestionIndex,
  totalQuestions,
  answeredQuestions,
  onNavigateToQuestion,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext
}: NavigationPanelProps) {
  const progress = (answeredQuestions.size / totalQuestions) * 100;

  return (
    <Card className="border border-gray-700 shadow-lg bg-gray-900 overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
        <CardTitle className="text-lg text-white font-semibold">Progress Tracker</CardTitle>
        <CardDescription className="text-gray-300 font-medium">
          {answeredQuestions.size} of {totalQuestions} questions completed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-3 bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex justify-between text-sm text-gray-200">
            <span className="font-medium">Completion</span>
            <motion.span 
              className="font-bold text-emerald-400"
              key={progress}
              initial={{ scale: 1.2, color: "#34d399" }}
              animate={{ scale: 1, color: "#34d399" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
          <div className="relative">
            <Progress value={progress} className="h-3 bg-gray-700" />
            {progress > 0 && (
              <motion.div
                className="absolute top-0 left-0 h-3 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 rounded-full shadow-sm"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            )}
            {progress >= 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-1"
              >
                <CheckCircle2 className="h-3 w-3" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Question Grid */}
        <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            Question Navigator
          </h4>
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: totalQuestions }, (_, index) => {
              const questionNumber = index + 1;
              const isAnswered = answeredQuestions.has(index);
              const isCurrent = index === currentQuestionIndex;
              
              return (
                <motion.button
                  key={index}
                  onClick={() => onNavigateToQuestion(index)}
                  className={`
                    relative h-11 w-11 rounded-xl text-sm font-bold transition-all duration-200 border-2 shadow-sm
                    ${isCurrent 
                      ? 'bg-gray-700 text-white shadow-lg border-gray-600' 
                      : isAnswered 
                        ? 'bg-gradient-to-br from-emerald-800 to-green-800 text-emerald-100 border-emerald-700 hover:from-emerald-700 hover:to-green-700 shadow-md' 
                        : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:border-gray-600 hover:shadow-md'
                    }
                  `}
                  whileHover={{ scale: isCurrent ? 1.1 : 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  layout
                >
                  {questionNumber}
                  {isAnswered && !isCurrent && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}
                      className="absolute -top-1 -right-1"
                    >
                      <div className="bg-emerald-500 text-white rounded-full p-0.5">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-3">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="flex-1 h-11 font-semibold border-2 border-gray-600 hover:border-gray-500 hover:bg-gray-700 bg-gray-800 text-gray-200"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="flex-1 h-11 font-semibold bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border-0 shadow-md text-white"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-300 bg-gray-800 p-3 rounded-lg">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
        </div>
      </CardContent>
    </Card>
  );
}