export interface TriviaQuestion {
  id: number
  category: string;
  question: string;
  answer: string;
  isEnabled: boolean;
  createdDate: Date
  updatedDate: Date
}