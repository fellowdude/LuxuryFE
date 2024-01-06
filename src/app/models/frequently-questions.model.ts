export interface IQuestionAnswer {
  answer: string;
  question: string;
}

export interface IFrequentlyQuestionsPage {
  bannerImage: string;
  questionsAnswers: IQuestionAnswer[];
  titleBanner: string;
}
