'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TimerProps {
  timeRemaining: number;
  totalTime: number;
}

export function Timer({ timeRemaining, totalTime }: TimerProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };



  const percentage = (timeRemaining / totalTime) * 100;
  const isLowTime = timeRemaining <= 300; // 5 minutes
  const isCritical = timeRemaining <= 60; // 1 minute



  if (isMinimized) {
    return (
      <Card className="border border-white/60 bg-white/50 backdrop-blur-md rounded-lg shadow-lg">
        <CardContent className="p-2 sm:p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-600 rounded flex items-center justify-center">
                <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
              </div>
              <span className="font-mono text-xs sm:text-sm font-semibold text-gray-900">
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(false)}
              className="h-4 w-4 sm:h-5 sm:w-5 p-0 hover:bg-orange-50 rounded"
              aria-label="Show full timer"
            >
              <Eye className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-white/60 bg-white/50 backdrop-blur-md rounded-lg shadow-lg">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-600 rounded flex items-center justify-center">
              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Time
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm sm:text-base font-semibold text-gray-900">
              {formatTime(timeRemaining)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="h-5 w-5 sm:h-6 sm:w-6 p-0 hover:bg-orange-50 rounded"
              aria-label="Minimize timer"
            >
              <EyeOff className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </Button>
          </div>
        </div>
        
        {/* Compact progress bar */}
        <div className="mt-2 sm:mt-3">
          <div className="w-full bg-orange-100 rounded-full h-1.5 sm:h-2">
            <div 
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                isCritical 
                  ? 'bg-red-500' 
                  : isLowTime 
                    ? 'bg-amber-500' 
                    : 'bg-orange-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0:00</span>
            <span className="hidden sm:inline">{Math.round(percentage)}% left</span>
            <span>30:00</span>
          </div>
        </div>
        
        {/* Compact warning */}
        {isCritical && (
          <div className="mt-2 text-xs text-red-700 bg-red-50 px-2 py-1 rounded border border-red-200">
            <span>⚠️ Final minute</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
