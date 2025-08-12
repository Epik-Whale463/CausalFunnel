'use client';

import { useQuiz } from '@/hooks/useQuiz';
import { StartPage } from '@/components/StartPage';
import { QuizInterface } from '@/components/QuizInterface';
import { ResultsPage } from '@/components/ResultsPage';

export default function Home() {
  const quiz = useQuiz();

  // Show results page when quiz is completed
  if (quiz.isQuizCompleted && quiz.questions.length > 0) {
    return (
      <ResultsPage
        results={quiz.getResults()}
        questions={quiz.questions}
        onRestart={quiz.resetQuiz}
      />
    );
  }

  // Show quiz interface when quiz is started
  if (quiz.isQuizStarted && quiz.questions.length > 0) {
    return (
      <QuizInterface
        questions={quiz.questions}
        currentQuestionIndex={quiz.currentQuestionIndex}
        userAnswers={quiz.userAnswers}
        timeRemaining={quiz.timeRemaining}
        totalTime={30 * 60} // 30 minutes
        onAnswerSelect={quiz.submitAnswer}
        onNavigateToQuestion={quiz.goToQuestion}
        onNext={quiz.nextQuestion}
        onPrevious={quiz.previousQuestion}
        onSubmitQuiz={quiz.completeQuiz}
        visitedQuestions={quiz.visitedQuestions}
        userEmail={quiz.userEmail}
      />
    );
  }

  // Show start page by default
  return (
    <StartPage
      onStartQuiz={quiz.startQuiz}
      isLoading={quiz.isLoading}
      error={quiz.error}
    />
  );
}
