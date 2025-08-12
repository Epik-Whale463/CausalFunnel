'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { PlayCircle, User, Clock, Brain, Trophy, ChevronRight } from 'lucide-react';
import LightRays from './LightRays';

interface StartPageProps {
  onStartQuiz: (email: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function StartPage({ onStartQuiz, isLoading, error }: StartPageProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onStartQuiz(email.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Light Rays Background */}
      <div className="absolute inset-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.6}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.03}
          distortion={0.01}
          fadeDistance={0.9}
          saturation={0.7}
          pulsating={false}
        />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <motion.h1 
            className="text-5xl font-bold tracking-tight text-white mb-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          >
            Knowledge Quiz
          </motion.h1>
          <motion.p 
            className="text-gray-300 text-xl"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          >
            Test your knowledge across various topics
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        >
          <Card className="border border-white/20 shadow-2xl bg-white/5 backdrop-blur-xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-semibold flex items-center gap-3 text-white">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <User className="h-6 w-6 text-gray-300" />
                </motion.div>
                Get Started
              </CardTitle>
              <CardDescription className="text-gray-400 text-base">
                Enter your email address to begin the quiz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                >
                  <Label htmlFor="email" className="text-sm font-medium text-white">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-white/5 border-white/30 text-white placeholder:text-gray-500 focus:border-white/50 focus:ring-white/20 transition-all duration-200"
                    disabled={isLoading}
                  />
                </motion.div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-md p-3"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                >
                  <Button
                    type="submit"
                    className="w-full h-12 text-lg bg-white text-black hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border-0 group"
                    disabled={!email.trim() || isLoading}
                  >
                    {isLoading ? (
                      <motion.div 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div 
                          className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Preparing Quiz...
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="flex items-center gap-2"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <PlayCircle className="h-5 w-5" />
                        Start Quiz
                        <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
