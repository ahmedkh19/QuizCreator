<template>
  <div class="max-w-4xl mx-auto animate-fade-in">
    <div v-if="!result" class="text-center py-16">
      <div class="mb-8">
        <div class="w-32 h-32 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
          <ExclamationTriangleIcon class="w-16 h-16 text-gray-400" />
        </div>
      </div>
      <p class="text-gray-600 text-xl mb-8">Results not found</p>
      <NuxtLink 
        to="/quizzes" 
        class="inline-block text-primary hover:text-primary-dark transition-colors font-medium"
      >
        ← Back to Quizzes
      </NuxtLink>
    </div>
    
    <div v-else>
      <h1 class="text-5xl font-display font-bold text-center text-gray-800 mb-2">
        Quiz Results
      </h1>
      <p class="text-center text-gray-600 mb-12">{{ result.quizTitle }}</p>
      
      <!-- Summary Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
        <div class="text-7xl font-bold mb-4"
             :class="result.percentage >= 70 ? 'text-green-500' : 
                     result.percentage >= 50 ? 'text-yellow-500' : 'text-red-500'">
          {{ result.percentage }}%
        </div>
        
        <p class="text-gray-600 text-lg mb-6">
          You got {{ result.correctAnswers }} out of {{ result.totalQuestions }} questions correct
        </p>
        
        <div class="inline-block px-6 py-3 rounded-full text-xl font-medium"
             :class="result.percentage >= 70 ? 'bg-green-100 text-green-700' : 
                     result.percentage >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'">
          {{ getGrade(result.percentage) }}
        </div>
      </div>
      
      <!-- Detailed Results -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <h3 class="text-2xl font-display font-semibold text-gray-800 mb-6">Question Breakdown</h3>
        
        <div class="space-y-4">
          <div v-for="(answer, index) in result.userAnswers" 
               :key="index"
               class="p-4 rounded-xl border"
               :class="answer.isCorrect ? 'border-green-200 bg-green-50' : 
                       'border-red-200 bg-red-50'">
            <div class="flex items-start justify-between mb-2">
              <div class="text-gray-700 flex-1 font-medium">
                <FormattedText :text="answer.question" />
              </div>
              <div class="flex items-center">
                <CheckCircleIcon v-if="answer.isCorrect" class="w-6 h-6 text-green-500 ml-2" />
                <XCircleIcon v-else class="w-6 h-6 text-red-500 ml-2" />
                <button 
                  v-if="isIncorrectQuestionsQuiz && !answer.isCorrect"
                  @click="removeQuestion(index)"
                  class="ml-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                  title="Remove from incorrect questions"
                >
                  <TrashIcon class="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div class="text-sm space-y-3 mt-3">
              <div class="p-3 border rounded-lg" :class="answer.isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'">
                <p class="text-gray-600 mb-1">
                  Your answer:
                </p>
                <div :class="answer.isCorrect ? 'text-green-700' : 'text-red-700'" class="font-medium">
                  <FormattedText :text="getChoiceText(answer.questionIndex, answer.selected)" />
                </div>
              </div>
              
              <div v-if="!answer.isCorrect" class="p-3 border border-green-300 bg-green-50 rounded-lg">
                <p class="text-gray-600 mb-1">
                  Correct answer:
                </p>
                <div class="text-green-700 font-medium">
                  <FormattedText :text="getChoiceText(answer.questionIndex, answer.correct)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex justify-center gap-4 mt-8">
        <NuxtLink 
          :to="`/quiz/${result.quizId}`"
          class="bg-white text-primary border-2 border-primary px-6 py-3 rounded-lg font-medium
                 hover:bg-primary hover:text-white transition-all duration-200"
        >
          Retake Quiz
        </NuxtLink>
        <NuxtLink 
          to="/quizzes"
          class="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-lg font-medium
                 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Browse More Quizzes
        </NuxtLink>
      </div>
      
      <!-- Extra info for incorrect questions quiz -->
      <div v-if="isIncorrectQuestionsQuiz" class="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-xl text-center">
        <p class="text-orange-700 font-medium mb-2">This is your Incorrect Questions Quiz</p>
        <p class="text-gray-600 text-sm">Click the <TrashIcon class="w-4 h-4 inline" /> icons next to questions to remove them from your practice list.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, navigateTo } from '#app'
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, TrashIcon } from '@heroicons/vue/24/outline'
import FormattedText from '~/components/FormattedText.vue'
import { useIncorrectQuestions } from '~/composables/useIncorrectQuestions'

const route = useRoute()
const result = ref(null)
const quiz = ref(null)
const isIncorrectQuestionsQuiz = computed(() => quiz.value?.isIncorrectQuestionsQuiz || false)
const { getIncorrectQuestions, removeIncorrectQuestion, createIncorrectQuestionsQuiz } = useIncorrectQuestions()

const loadResult = () => {
  const results = JSON.parse(localStorage.getItem('quizResults') || '[]')
  const resultIndex = parseInt(route.params.id)
  if (resultIndex >= 0 && resultIndex < results.length) {
    result.value = results[resultIndex]
    
    // Load quiz details to check if it's an incorrect questions quiz
    if (result.value) {
      const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]')
      quiz.value = quizzes.find(q => q.id === result.value.quizId)
    }
  }
}

const getGrade = (percentage) => {
  if (percentage >= 90) return 'Outstanding! 🏆'
  if (percentage >= 80) return 'Excellent! ⭐'
  if (percentage >= 70) return 'Good Job! 👍'
  if (percentage >= 60) return 'Not Bad! 🎯'
  if (percentage >= 50) return 'Keep Trying! 💪'
  return 'Need More Practice! 📚'
}

const getChoiceText = (questionIndex, letter) => {
  // If there's no question index or choices stored, return just the letter
  if (questionIndex === undefined || 
      !result.value?.userAnswers[questionIndex]?.choices) {
    return letter
  }
  
  const choices = result.value.userAnswers[questionIndex].choices
  
  // Find the choice that starts with the given letter
  const choiceIndex = choices.findIndex(choice => choice.charAt(0) === letter)
  if (choiceIndex !== -1) {
    return choices[choiceIndex]
  }
  
  return letter
}

const removeQuestion = (questionIndex) => {
  if (!isIncorrectQuestionsQuiz.value) return;
  
  const incorrectQuestions = getIncorrectQuestions();
  
  // Find the question in incorrect questions array by comparing content
  const targetQuestion = result.value.userAnswers[questionIndex];
  
  const indexToRemove = incorrectQuestions.findIndex(q => 
    q.question === targetQuestion.question
  );
  
  if (indexToRemove !== -1) {
    removeIncorrectQuestion(indexToRemove);
    
    // If there are still incorrect questions, create a new quiz
    if (getIncorrectQuestions().length > 0) {
      const updatedQuiz = createIncorrectQuestionsQuiz();
      if (updatedQuiz) {
        // Navigate to the new quiz
        navigateTo(`/quiz/${updatedQuiz.id}`);
      }
    } else {
      // If no more incorrect questions, go back to quizzes
      navigateTo('/quizzes');
    }
  }
}

onMounted(() => {
  loadResult()
})
</script>