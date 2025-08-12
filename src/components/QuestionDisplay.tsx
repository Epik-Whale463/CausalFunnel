'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FormattedQuestion, UserAnswer } from '@/types/quiz';
import { CheckCircle2, Circle } from 'lucide-react';

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
    <div className="w-full">
      <motion.div
        key={question.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-full"
      >
        <Card className="border border-gray-700 shadow-lg bg-gray-900 w-full overflow-hidden">
          <CardHeader className="pb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-sm font-semibold px-3 py-1 bg-gray-800 border-gray-600 text-gray-200">
                Question {questionNumber} of {totalQuestions}
              </Badge>
              <Badge variant="secondary" className="text-xs font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded-full">
                {question.category}
              </Badge>
            </div>
            <CardTitle className="text-xl leading-relaxed text-left text-white font-semibold">
              {question.question}
            </CardTitle>
            <CardDescription className="text-left text-gray-300 mt-2">
              Select the best answer from the options below
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6 bg-gray-900">
            <RadioGroup
              value={selectedAnswer}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              <AnimatePresence>
                {question.choices.map((choice: string, index: number) => {
                  const isSelected = selectedAnswer === choice;
                  return (
                    <motion.div
                      key={choice}
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className={`
                        relative border-2 rounded-xl p-5 cursor-pointer transition-all duration-200 group backdrop-blur-sm
                        ${isSelected 
                          ? 'border-gray-600 bg-gray-800 shadow-sm' 
                          : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800 hover:shadow-sm bg-gray-900'
                        }
                      `}
                      onClick={() => handleAnswerChange(choice)}
                      data-choice={choice}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.995 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <RadioGroupItem 
                            value={choice} 
                            id={choice}
                            className={`shrink-0 w-5 h-5 ${isSelected ? 'border-gray-500 text-gray-300' : 'border-gray-600'}`}
                          />
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute inset-0 bg-gray-600 rounded-full flex items-center justify-center"
                            >
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </motion.div>
                          )}
                        </div>
                        <Label 
                          htmlFor={choice} 
                          className="flex-1 cursor-pointer text-sm leading-relaxed font-medium text-gray-200 group-hover:text-white"
                        >
                          {choice}
                        </Label>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="flex items-center"
                          >
                            <div className="bg-gray-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                              Selected
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </RadioGroup>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
