'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { FormattedQuestion, UserAnswer } from '@/types/quiz';

interface QuestionDisplayProps {
  question: FormattedQuestion;
  questionNumber: number;
  totalQuestions: number;
  currentAnswer?: UserAnswer;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function QuestionDisplay({
  question,
  questionNumber,
  totalQuestions,
  currentAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}: QuestionDisplayProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>(
    currentAnswer?.selectedAnswer || ''
  );

  useEffect(() => {
    setSelectedAnswer(currentAnswer?.selectedAnswer || '');
  }, [question.id, currentAnswer?.selectedAnswer]);

  const handleAnswerChange = (answer: string) => {
    setSelectedAnswer(answer);
    onAnswerSelect(answer);

    // Add subtle success feedback
    const element = document.querySelector(`[data-choice="${answer}"]`);
    if (element) {
      element.classList.add('animate-pulse');
      setTimeout(() => {
        element.classList.remove('animate-pulse');
      }, 300);
    }
  };

  return (
    <Card className="border border-slate-200 shadow-sm bg-white rounded-lg">
      <CardHeader className="pb-6 border-b border-slate-200">
        {/* Clean header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
              {questionNumber}
            </div>
            <div className="text-lg font-semibold text-slate-900">
              Question {questionNumber} of {totalQuestions}
            </div>
          </div>
          <Badge variant="secondary" className="text-xs px-3 py-1">
            {question.category}
          </Badge>
        </div>
        
        {/* Question text */}
        <CardTitle className="text-xl leading-relaxed font-medium text-slate-900">
          {question.question}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6 p-6">
        <RadioGroup
          value={selectedAnswer}
          onValueChange={handleAnswerChange}
          className="space-y-3"
          aria-label="Answer choices"
        >
          {question.choices.map((choice: string, index: number) => {
            const isSelected = selectedAnswer === choice;
            const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
            
            return (
              <div
                key={choice}
                className={`
                  border rounded-lg p-4 cursor-pointer transition-all duration-200
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }
                `}
                onClick={() => handleAnswerChange(choice)}
              >
                <div className="flex items-center space-x-3">
                  {/* Option indicator */}
                  <div className={`
                    w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold
                    ${isSelected 
                      ? 'border-blue-500 bg-blue-500 text-white' 
                      : 'border-slate-300 text-slate-600'
                    }
                  `}>
                    {optionLetter}
                  </div>
                  
                  {/* Hidden radio for accessibility */}
                  <RadioGroupItem 
                    value={choice} 
                    id={`choice-${index}`}
                    className="sr-only"
                  />
                  
                  {/* Answer text */}
                  <Label 
                    htmlFor={`choice-${index}`}
                    className="flex-1 cursor-pointer text-base leading-relaxed text-slate-700"
                  >
                    {choice}
                  </Label>
                  
                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </RadioGroup>
        
        {/* Action area */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
          <Button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            variant="outline"
            className="px-6"
          >
            Previous
          </Button>
          
          <div className={`text-sm font-medium ${selectedAnswer ? 'text-green-600' : 'text-slate-500'}`}>
            {selectedAnswer ? '✓ Answer selected' : 'Select an answer'}
          </div>
          
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="px-6 bg-blue-600 hover:bg-blue-700"
          >
            {questionNumber === totalQuestions ? 'Review' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
