import { useState, useEffect, useCallback } from 'react';
import { QuizState, UserAnswer, QuizResults } from '@/types/quiz';
import { quizService } from '@/services/quizService';

const QUIZ_DURATION = 30 * 60; // 30 minutes in seconds

export const useQuiz = () => {
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    timeRemaining: QUIZ_DURATION,
    isQuizStarted: false,
    isQuizCompleted: false,
    visitedQuestions: new Set(),
    userEmail: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.isQuizStarted && !state.isQuizCompleted && state.timeRemaining > 0) {
      interval = setInterval(() => {
        setState(prev => {
          const newTimeRemaining = prev.timeRemaining - 1;
          
          // Auto-submit when time runs out
          if (newTimeRemaining <= 0) {
            return {
              ...prev,
              timeRemaining: 0,
              isQuizCompleted: true,
            };
          }
          
          return {
            ...prev,
            timeRemaining: newTimeRemaining,
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.isQuizStarted, state.isQuizCompleted, state.timeRemaining]);

  // Start quiz
  const startQuiz = useCallback(async (email: string) => {
    if (!quizService.validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const questions = await quizService.fetchQuestions(15);
      setState(prev => ({
        ...prev,
        questions,
        userEmail: email,
        isQuizStarted: true,
        visitedQuestions: new Set([0]), // Mark first question as visited
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start quiz');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Navigate to specific question
  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < state.questions.length) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: index,
        visitedQuestions: new Set([...prev.visitedQuestions, index]),
      }));
    }
  }, [state.questions.length]);

  // Submit answer for current question
  const submitAnswer = useCallback((selectedAnswer: string) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    if (!currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
    };

    setState(prev => {
      // Remove existing answer for this question if it exists
      const filteredAnswers = prev.userAnswers.filter(
        answer => answer.questionId !== currentQuestion.id
      );

      return {
        ...prev,
        userAnswers: [...filteredAnswers, newAnswer],
      };
    });
  }, [state.currentQuestionIndex, state.questions]);

  // Navigate to next question
  const nextQuestion = useCallback(() => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      goToQuestion(state.currentQuestionIndex + 1);
    }
  }, [state.currentQuestionIndex, state.questions.length, goToQuestion]);

  // Navigate to previous question
  const previousQuestion = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      goToQuestion(state.currentQuestionIndex - 1);
    }
  }, [state.currentQuestionIndex, goToQuestion]);

  // Complete quiz manually
  const completeQuiz = useCallback(() => {
    setState(prev => ({
      ...prev,
      isQuizCompleted: true,
    }));
  }, []);

  // Reset quiz
  const resetQuiz = useCallback(() => {
    setState({
      questions: [],
      currentQuestionIndex: 0,
      userAnswers: [],
      timeRemaining: QUIZ_DURATION,
      isQuizStarted: false,
      isQuizCompleted: false,
      visitedQuestions: new Set(),
      userEmail: '',
    });
    setError(null);
  }, []);

  // Get current question
  const currentQuestion = state.questions[state.currentQuestionIndex];

  // Get user's answer for current question
  const currentAnswer = state.userAnswers.find(
    answer => answer.questionId === currentQuestion?.id
  );

  // Check if question has been attempted
  const isQuestionAttempted = useCallback((questionIndex: number) => {
    const question = state.questions[questionIndex];
    return question ? state.userAnswers.some(answer => answer.questionId === question.id) : false;
  }, [state.questions, state.userAnswers]);

  // Check if question has been visited
  const isQuestionVisited = useCallback((questionIndex: number) => {
    return state.visitedQuestions.has(questionIndex);
  }, [state.visitedQuestions]);

  // Calculate results
  const getResults = useCallback((): QuizResults => {
    const correctAnswers = state.userAnswers.filter(answer => answer.isCorrect).length;
    const timeSpent = QUIZ_DURATION - state.timeRemaining;
    
    return {
      totalQuestions: state.questions.length,
      correctAnswers,
      score: quizService.calculateScore(state.questions.length, correctAnswers),
      timeSpent,
      answers: state.userAnswers,
    };
  }, [state.userAnswers, state.questions.length, state.timeRemaining]);

  // Get progress statistics
  const getProgress = useCallback(() => {
    const totalQuestions = state.questions.length;
    const attemptedQuestions = new Set(state.userAnswers.map(answer => answer.questionId)).size;
    const visitedQuestions = state.visitedQuestions.size;

    return {
      totalQuestions,
      attemptedQuestions,
      visitedQuestions,
      completionPercentage: totalQuestions > 0 ? Math.round((attemptedQuestions / totalQuestions) * 100) : 0,
    };
  }, [state.questions.length, state.userAnswers, state.visitedQuestions]);

  return {
    // State
    ...state,
    isLoading,
    error,
    currentQuestion,
    currentAnswer,

    // Actions
    startQuiz,
    goToQuestion,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    resetQuiz,

    // Computed values
    isQuestionAttempted,
    isQuestionVisited,
    getResults,
    getProgress,
    
    // Utility
    formatTime: quizService.formatTime,
  };
};
