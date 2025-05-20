export const useIncorrectQuestions = () => {
  const STORAGE_KEY = 'incorrectQuestions';

  const getIncorrectQuestions = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  };

  const addIncorrectQuestion = (question) => {
    const incorrectQuestions = getIncorrectQuestions();
    
    // Check if this question already exists in the incorrect questions
    const exists = incorrectQuestions.some(q => 
      q.question === question.question && q.quizId === question.quizId
    );
    
    if (!exists) {
      incorrectQuestions.push(question);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(incorrectQuestions));
    }
  };

  const removeIncorrectQuestion = (questionIndex) => {
    const incorrectQuestions = getIncorrectQuestions();
    incorrectQuestions.splice(questionIndex, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(incorrectQuestions));
  };

  const createIncorrectQuestionsQuiz = () => {
    const incorrectQuestions = getIncorrectQuestions();
    
    if (incorrectQuestions.length === 0) {
      return null;
    }

    // Prepare quiz data in the expected format
    const quizData = {
      mcqs: incorrectQuestions.map((q, index) => ({
        questionNumber: index + 1,
        question: q.question,
        choices: q.choices,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }))
    };

    // Create quiz object
    const quiz = {
      id: `incorrect-questions-${Date.now()}`,
      title: "Incorrect Questions Quiz",
      data: quizData,
      createdAt: new Date().toISOString(),
      isIncorrectQuestionsQuiz: true
    };

    // Get existing quizzes
    const existingQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    
    // Add new quiz
    existingQuizzes.push(quiz);
    
    // Save to localStorage
    localStorage.setItem('quizzes', JSON.stringify(existingQuizzes));
    
    return quiz;
  };

  return {
    getIncorrectQuestions,
    addIncorrectQuestion,
    removeIncorrectQuestion,
    createIncorrectQuestionsQuiz
  };
};