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
  };

  return (
    <div className="w-full">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full"
      >
        <Card className="border shadow-lg w-full">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="outline" className="text-sm">
                Question {questionNumber} of {totalQuestions}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {question.category}
              </Badge>
            </div>
            <CardTitle className="text-xl leading-relaxed text-left">
              {question.question}
            </CardTitle>
            <CardDescription className="text-left">
              Select the best answer from the options below
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <RadioGroup
              value={selectedAnswer}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              <AnimatePresence>
                {question.choices.map((choice: string, index: number) => {
                  const isSelected = selectedAnswer === choice;
                  return (
                    <motion.div
                      key={choice}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
                      className={`
                        relative border rounded-lg p-4 cursor-pointer transition-all duration-200
                        ${isSelected 
                          ? 'border-primary bg-primary/5 shadow-sm' 
                          : 'border-border hover:border-primary/50 hover:bg-accent/50'
                        }
                      `}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.995 }}
                      onClick={() => handleAnswerChange(choice)}
                    >
                      <div className="flex items-center space-x-4">
                        <RadioGroupItem 
                          value={choice} 
                          id={choice}
                          className="shrink-0"
                        />
                        <Label 
                          htmlFor={choice} 
                          className="flex-1 cursor-pointer text-sm leading-relaxed font-medium"
                        >
                          {choice}
                        </Label>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <CheckCircle2 className="h-5 w-5 text-primary" />
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
