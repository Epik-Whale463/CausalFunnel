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
    <Card className="border shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Progress</CardTitle>
        <CardDescription>
          {answeredQuestions.size} of {totalQuestions} questions answered
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completion</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Grid */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Questions</h4>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: totalQuestions }, (_, index) => {
              const questionNumber = index + 1;
              const isAnswered = answeredQuestions.has(index);
              const isCurrent = index === currentQuestionIndex;
              
              return (
                <motion.button
                  key={index}
                  onClick={() => onNavigateToQuestion(index)}
                  className={`
                    relative h-10 w-10 rounded-md text-sm font-medium transition-all duration-200
                    ${isCurrent 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : isAnswered 
                        ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200' 
                        : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {questionNumber}
                  {isAnswered && !isCurrent && (
                    <CheckCircle2 className="absolute -top-1 -right-1 h-3 w-3 text-green-600" />
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
            className="flex-1 h-10"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="flex-1 h-10"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Circle className="h-3 w-3" />
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
        </div>
      </CardContent>
    </Card>
  );
}
