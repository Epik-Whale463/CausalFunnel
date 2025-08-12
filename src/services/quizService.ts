import axios from 'axios';
import { ApiResponse, FormattedQuestion, QuizQuestion } from '@/types/quiz';

const API_BASE_URL = 'https://opentdb.com/api.php';

export const quizService = {
  /**
   * Fetch quiz questions from the Open Trivia Database API
   * @param amount Number of questions to fetch (default: 15)
   * @returns Promise<FormattedQuestion[]>
   */
  async fetchQuestions(amount: number = 15): Promise<FormattedQuestion[]> {
    try {
      const response = await axios.get<ApiResponse>(`${API_BASE_URL}?amount=${amount}`);
      
      if (response.data.response_code !== 0) {
        throw new Error('Failed to fetch questions from API');
      }

      return this.formatQuestions(response.data.results);
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw new Error('Unable to load quiz questions. Please try again.');
    }
  },

  /**
   * Format raw API questions into our internal format
   * @param questions Raw questions from API
   * @returns FormattedQuestion[]
   */
  formatQuestions(questions: QuizQuestion[]): FormattedQuestion[] {
    return questions.map((question, index) => {
      // Combine correct and incorrect answers, then shuffle
      const allChoices = [...question.incorrect_answers, question.correct_answer];
      const shuffledChoices = this.shuffleArray(allChoices);

      return {
        id: index + 1,
        category: this.decodeHtml(question.category),
        difficulty: question.difficulty,
        question: this.decodeHtml(question.question),
        choices: shuffledChoices.map(choice => this.decodeHtml(choice)),
        correctAnswer: this.decodeHtml(question.correct_answer),
      };
    });
  },

  /**
   * Shuffle array using Fisher-Yates algorithm
   * @param array Array to shuffle
   * @returns Shuffled array
   */
  shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  /**
   * Decode HTML entities in strings
   * @param str String with HTML entities
   * @returns Decoded string
   */
  decodeHtml(str: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
  },

  /**
   * Calculate quiz score
   * @param totalQuestions Total number of questions
   * @param correctAnswers Number of correct answers
   * @returns Score percentage
   */
  calculateScore(totalQuestions: number, correctAnswers: number): number {
    return Math.round((correctAnswers / totalQuestions) * 100);
  },

  /**
   * Format time in MM:SS format
   * @param seconds Time in seconds
   * @returns Formatted time string
   */
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  },

  /**
   * Validate email format
   * @param email Email string to validate
   * @returns Boolean indicating if email is valid
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
};
