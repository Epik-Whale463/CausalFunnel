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
    <Card className="border border-gray-200 shadow-sm bg-white">
      <CardHeader className="pb-4 border-b border-gray-100">
        <CardTitle className="text-lg text-gray-900 font-medium">Progress Overview</CardTitle>
        <CardDescription className="text-gray-600">
          {answeredQuestions.size} of {totalQuestions} questions completed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-3 p-4">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">Completion</span>
            <motion.span 
              className="font-semibold text-blue-600"
              key={progress}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
          <div className="relative">
            <Progress value={progress} className="h-2 bg-gray-200" />
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
        <div className="space-y-4 p-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700">
            Question Navigation
          </h4>
          <div className="grid grid-cols-5 gap-2" role="grid" aria-label="Question navigation grid">
            {Array.from({ length: totalQuestions }, (_, index) => {
              const questionNumber = index + 1;
              const isAnswered = answeredQuestions.has(index);
              const isCurrent = index === currentQuestionIndex;
              
              const getAriaLabel = () => {
                let label = `Question ${questionNumber}`;
                if (isCurrent) label += ', current question';
                if (isAnswered) label += ', answered';
                else label += ', not answered';
                return label;
              };
              
              return (
                <button
                  key={index}
                  onClick={() => onNavigateToQuestion(index)}
                  className={`
                    relative h-10 rounded text-sm font-medium transition-all duration-150 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                    ${isCurrent 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : isAnswered 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200' 
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }
                  `}
                  aria-label={getAriaLabel()}
                  aria-current={isCurrent ? 'true' : 'false'}
                >
                  {questionNumber}
                  {isAnswered && !isCurrent && (
                    <div 
                      className="absolute -top-1 -right-1"
                      aria-hidden="true"
                    >
                      <div className="bg-emerald-500 text-white rounded-full p-0.5">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-4 text-xs text-gray-600 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-emerald-100 border border-emerald-200 rounded"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded"></div>
              <span>Not answered</span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 p-4 border-t border-gray-100">
          <Button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="flex-1 h-10 font-medium bg-blue-600 hover:bg-blue-700 text-white border-0"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="flex-1 h-10 font-medium bg-blue-600 hover:bg-blue-700 text-white border-0"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}