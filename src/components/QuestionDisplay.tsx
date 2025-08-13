'use client';

import { useEffect, useState } from 'react';

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
  const [isPlaying, setIsPlaying] = useState(false);

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

  const handleSpeakQuestion = async (text: string) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    
    try {
      // Call Sarvam AI TTS API
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          model: "bulbul:v2",
          target_language_code: "en-IN",
          speaker: "anushka"
        }),
      });

      if (!response.ok) {
        throw new Error('TTS API failed');
      }

      const data = await response.json();
      
      // Convert base64 to audio blob
      const audioData = atob(data.audio);
      const audioArray = new Uint8Array(audioData.length);
      for (let i = 0; i < audioData.length; i++) {
        audioArray[i] = audioData.charCodeAt(i);
      }
      
      const audioBlob = new Blob([audioArray], { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Play audio
      const audio = new Audio(audioUrl);
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      audio.onerror = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
      
    } catch (error) {
      console.error('TTS Error:', error);
      setIsPlaying(false);
      // Fallback to browser's speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <Card className="border border-white/60 bg-white/60 backdrop-blur-md rounded-lg shadow-lg">
      <CardHeader className="pb-3 sm:pb-4 border-b border-orange-200/50 bg-orange-50/40 backdrop-blur-sm">
        {/* Compact header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-orange-600 rounded flex items-center justify-center text-white text-xs font-semibold">
              {questionNumber}
            </div>
            <div className="text-xs sm:text-sm font-medium text-gray-700">
              Question {questionNumber} of {totalQuestions}
            </div>
          </div>
          <Badge variant="secondary" className="text-xs px-2 py-1 bg-orange-100 text-orange-700 border-orange-200 self-start sm:self-center">
            {question.category}
          </Badge>
        </div>
        
        {/* Question text with speaker */}
        <div className="flex items-start gap-2 sm:gap-3">
          <CardTitle className="text-base sm:text-lg font-medium text-gray-900 leading-relaxed flex-1">
            {question.question}
          </CardTitle>
          <button
            onClick={() => handleSpeakQuestion(question.question)}
            disabled={isPlaying}
            className={`
              flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200
              ${isPlaying 
                ? 'bg-orange-200 text-orange-700' 
                : 'bg-orange-100 hover:bg-orange-200 text-orange-600 hover:text-orange-700'
              }
            `}
            title="Listen to question"
            aria-label="Play question audio"
          >
            {isPlaying ? (
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border border-orange-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.846 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.846l3.537-3.816a1 1 0 011.617.816zM16 8a2 2 0 11-4 0 2 2 0 014 0zM14 5a5 5 0 010 10V5z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-3 sm:pt-4 p-4 sm:p-5">
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
                  border rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-200
                  ${isSelected 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                  }
                `}
                onClick={() => handleAnswerChange(choice)}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* Compact option indicator */}
                  <div className={`
                    w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center text-xs font-semibold flex-shrink-0
                    ${isSelected 
                      ? 'border-orange-500 bg-orange-500 text-white' 
                      : 'border-gray-300 text-gray-600'
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
                  
                  {/* Answer text - proper size */}
                  <Label 
                    htmlFor={`choice-${index}`}
                    className="flex-1 cursor-pointer text-sm sm:text-base leading-normal text-gray-700"
                  >
                    {choice}
                  </Label>
                  
                  {/* Compact selection indicator */}
                  {isSelected && (
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </RadioGroup>
        
        {/* Compact action area */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-orange-200 gap-3 sm:gap-0">
          <Button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            variant="outline"
            size="sm"
            className="w-full sm:w-auto px-4 py-2 text-sm border-orange-200 hover:bg-orange-50 order-2 sm:order-1"
          >
            Previous
          </Button>
          
          <div className={`text-xs font-medium order-1 sm:order-2 ${selectedAnswer ? 'text-green-600' : 'text-gray-500'}`}>
            {selectedAnswer ? '✓ Selected' : 'Select answer'}
          </div>
          
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            size="sm"
            className="w-full sm:w-auto px-4 py-2 text-sm bg-orange-600 hover:bg-orange-700 text-white order-3"
          >
            {questionNumber === totalQuestions ? 'Review' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
