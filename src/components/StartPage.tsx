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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Knowledge Assessment
          </h1>
          <p className="text-xl text-slate-600 mb-6">
            Test your knowledge across various topics in a structured assessment
          </p>

          {/* Quiz Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center justify-center gap-2 text-slate-600">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="font-medium">15 Questions</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-600">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-medium">30 Minutes</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-600">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Multiple Choice</span>
            </div>
          </div>
        </div>

        {/* Instructions Card */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-slate-700">
            <strong>Assessment Guidelines:</strong>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• You have 30 minutes to complete all 15 questions</li>
              <li>• You can navigate between questions and change your answers</li>
              <li>• Unanswered questions will be marked as incorrect upon submission</li>
              <li>• Your progress is automatically saved as you work</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Form Card */}
        <Card className="border-slate-200 shadow-lg bg-white">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Begin Assessment
            </CardTitle>
            <CardDescription className="text-slate-600 text-base">
              Enter your email address to start the quiz. This will be used to identify your submission.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
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
                  className={`h-12 transition-colors ${emailError
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'
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
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200"
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
