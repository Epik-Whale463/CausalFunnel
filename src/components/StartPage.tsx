'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PlayCircle, Clock, FileText, CheckCircle, Info } from 'lucide-react';

interface StartPageProps {
  onStartQuiz: (email: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function StartPage({ onStartQuiz, isLoading, error }: StartPageProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setEmailError('Email address is required');
      return;
    }

    if (!validateEmail(email.trim())) {
      setEmailError('Please enter a valid email address');
      return;
    }

    onStartQuiz(email.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50/80 to-amber-50/60 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        {/* Compact Header Section */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2 sm:mb-3">
            Knowledge Assessment
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 mb-3 sm:mb-4 px-2 leading-relaxed">
            Test your knowledge across various topics
          </p>

          {/* Compact Quiz Information */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-sm">
            <div className="flex items-center gap-1.5 text-slate-600 bg-white/40 px-2 py-1 rounded-full">
              <FileText className="h-4 w-4 text-orange-600" />
              <span className="font-medium">15 Questions</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 bg-white/40 px-2 py-1 rounded-full">
              <Clock className="h-4 w-4 text-orange-600" />
              <span className="font-medium">30 Minutes</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 bg-white/40 px-2 py-1 rounded-full">
              <CheckCircle className="h-4 w-4 text-orange-600" />
              <span className="font-medium">Multiple Choice</span>
            </div>
          </div>
        </div>

        {/* Compact Instructions Card */}
        <Alert className="mb-3 sm:mb-4 border-white/60 bg-white/50 backdrop-blur-md shadow-lg">
          <Info className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-slate-700">
            <strong className="text-sm sm:text-base">Guidelines:</strong>
            <ul className="mt-1.5 space-y-0.5 text-xs sm:text-sm leading-relaxed">
              <li>• 30 minutes for 15 questions</li>
              <li>• Navigate freely, change answers anytime</li>
              <li>• Early submission available after 8 questions</li>
              <li>• Unanswered = incorrect</li>
              <li>• Progress auto-saved</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Compact Form Card */}
        <Card className="border-white/60 shadow-lg bg-white/60 backdrop-blur-md">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900">
              Begin Assessment
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-slate-600">
              Enter your email to start the quiz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  required
                  aria-describedby={emailError ? "email-error" : undefined}
                  className={`h-11 sm:h-12 text-base transition-colors ${emailError
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-300 focus:border-orange-500 focus:ring-orange-200'
                    }`}
                  disabled={isLoading}
                />
                {emailError && (
                  <p id="email-error" className="text-sm text-red-600" role="alert">
                    {emailError}
                  </p>
                )}
              </div>

              {error && (
                <Alert className="border-red-300/60 bg-red-50/70 backdrop-blur-sm">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-12 sm:h-14 text-base sm:text-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
                disabled={!email.trim() || isLoading || !!emailError}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Preparing Assessment...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5" />
                    Start Assessment
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
