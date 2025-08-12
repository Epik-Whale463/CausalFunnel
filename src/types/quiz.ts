export interface QuizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface ApiResponse {
  response_code: number;
  results: QuizQuestion[];
}

export interface FormattedQuestion {
  id: number;
  category: string;
  difficulty: string;
  question: string;
  choices: string[];
  correctAnswer: string;
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface QuizState {
  questions: FormattedQuestion[];
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  timeRemaining: number;
  isQuizStarted: boolean;
  isQuizCompleted: boolean;
  visitedQuestions: Set<number>;
  userEmail: string;
}

export interface QuizResults {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
  answers: UserAnswer[];
}
