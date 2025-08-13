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

  const getTimeStatus = () => {
    if (isCritical) return { color: 'text-red-600', bg: 'border-red-200 bg-red-50', message: 'Final minute' };
    if (isLowTime) return { color: 'text-amber-600', bg: 'border-amber-200 bg-amber-50', message: 'Time running low' };
    return { color: 'text-slate-600', bg: 'border-slate-200 bg-white', message: 'On track' };
  };

  const status = getTimeStatus();

  if (isMinimized) {
    return (
      <Card className="border border-slate-200 shadow-sm bg-white rounded-lg">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                <Clock className="h-3 w-3 text-white" />
              </div>
              <span className="font-mono text-sm font-semibold text-slate-900">
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(false)}
              className="h-6 w-6 p-0 hover:bg-slate-100 rounded"
              aria-label="Show full timer"
            >
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-slate-200 shadow-sm bg-white rounded-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <Clock className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700">
              Time Remaining
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-semibold text-slate-900">
              {formatTime(timeRemaining)}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="h-6 w-6 p-0 hover:bg-slate-100 rounded"
              aria-label="Minimize timer"
            >
              <EyeOff className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {/* Simple progress bar */}
        <div className="mt-3">
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isCritical 
                  ? 'bg-red-500' 
                  : isLowTime 
                    ? 'bg-amber-500' 
                    : 'bg-blue-600'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>0:00</span>
            <span>{Math.round(percentage)}% left</span>
            <span>30:00</span>
          </div>
        </div>
        
        {/* Simple warning */}
        {isCritical && (
          <div className="mt-3 text-xs text-red-700 bg-red-50 px-3 py-2 rounded border border-red-200">
            <div className="flex items-center gap-2">
              <span>⚠️</span>
              <span className="font-medium">Final minute - consider submitting</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
