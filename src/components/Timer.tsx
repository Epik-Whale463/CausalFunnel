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
    <Card className={`border transition-all duration-300 ${
      isCritical ? 'border-destructive shadow-lg' : 
      isLowTime ? 'border-orange-400' : 'border-border'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={isCritical ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Clock className={`h-5 w-5 ${
              isCritical ? 'text-destructive' : 
              isLowTime ? 'text-orange-500' : 'text-muted-foreground'
            }`} />
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Time Remaining</span>
              <motion.span
                className={`font-mono text-lg font-bold ${
                  isCritical ? 'text-destructive' : 
                  isLowTime ? 'text-orange-600' : 'text-foreground'
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
                isCritical ? '[&>div]:bg-destructive' : 
                isLowTime ? '[&>div]:bg-orange-500' : ''
              }`}
            />
          </div>
        </div>
        
        {isLowTime && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-2 text-xs ${
              isCritical ? 'text-destructive' : 'text-orange-600'
            }`}
          >
            {isCritical ? '⚠️ Time is running out!' : '⏰ Less than 5 minutes remaining'}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
