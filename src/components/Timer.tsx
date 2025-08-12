'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface TimerProps {
  timeRemaining: number;
  totalTime: number;
}

export function Timer({ timeRemaining, totalTime }: TimerProps) {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const percentage = (timeRemaining / totalTime) * 100;
  const isLowTime = timeRemaining <= 300; // 5 minutes
  const isCritical = timeRemaining <= 60; // 1 minute

  return (
    <Card className={`border transition-all duration-300 bg-white shadow-sm hover:shadow-md ${
      isCritical ? 'border-red-300' : 
      isLowTime ? 'border-amber-300' : 'border-slate-200'
    }`}>
      <CardContent className="p-4">
        <motion.div 
          className="flex items-center gap-3"
          animate={!isLowTime ? { scale: [1, 1.01, 1] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            animate={isCritical ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Clock className={`h-5 w-5 ${
              isCritical ? 'text-red-600' : 
              isLowTime ? 'text-amber-600' : 'text-slate-600'
            }`} />
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Time Remaining</span>
              <motion.span
                className={`font-mono text-lg font-bold ${
                  isCritical ? 'text-red-700' : 
                  isLowTime ? 'text-amber-700' : 'text-slate-800'
                }`}
                animate={isCritical ? { opacity: [1, 0.8, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {formatTime(timeRemaining)}
              </motion.span>
            </div>
            
            <Progress 
              value={percentage} 
              className={`h-2 ${
                isCritical ? '[&>div]:bg-red-500' : 
                isLowTime ? '[&>div]:bg-amber-500' : ''
              }`}
            />
          </div>
        </motion.div>
        
        {isLowTime && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-2 text-xs ${
              isCritical ? 'text-red-700' : 'text-amber-700'
            }`}
          >
            {isCritical ? '⚠️ Time is running out!' : '⏰ Less than 5 minutes remaining'}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
