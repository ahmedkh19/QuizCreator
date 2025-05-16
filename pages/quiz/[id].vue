<template>
  <div class="max-w-4xl mx-auto animate-fade-in">
    <div v-if="!quiz" class="text-center py-16">
      <div class="mb-8">
        <div class="w-32 h-32 bg-red-100 rounded-full mx-auto flex items-center justify-center">
          <ExclamationTriangleIcon class="w-16 h-16 text-red-400" />
        </div>
      </div>
      <p class="text-gray-600 text-xl mb-8">Quiz not found</p>
      <NuxtLink 
        to="/quizzes" 
        class="inline-block text-primary hover:text-primary-dark transition-colors font-medium"
      >
        ← Back to Quizzes
      </NuxtLink>
    </div>
    
    <div v-else>
      <h1 class="text-4xl font-display font-bold text-center text-gray-800 mb-8">
        {{ quiz.title }}
      </h1>
      
      <!-- Progress Bar -->
      <div class="mb-12">
        <div class="bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
            :style="{ width: `${(currentQuestionIndex + 1) / quiz.data.mcqs.length * 100}%` }"
          />
        </div>
        <div class="flex justify-between mt-2 text-sm text-gray-600">
          <span>Question {{ currentQuestionIndex + 1 }} of {{ quiz.data.mcqs.length }}</span>
          <span>{{ Math.round((currentQuestionIndex + 1) / quiz.data.mcqs.length * 100) }}% Complete</span>
        </div>
      </div>
      
      <!-- Question Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="mb-8">
          <h2 class="text-2xl font-display font-semibold text-gray-800 mb-4">
            Question {{ currentQuestion.questionNumber }}
          </h2>
          <div class="text-gray-700 text-lg">
            <FormattedText :text="currentQuestion.question" />
          </div>
        </div>
        
        <!-- Answer Choices -->
        <div class="space-y-4">
          <button
            v-for="(choice, index) in currentQuestion.choices"
            :key="index"
            @click="selectAnswer(choice.charAt(0))"
            :class="getChoiceClass(choice.charAt(0))"
            :disabled="showExplanation"
            class="w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200"
          >
            <div class="flex items-center">
              <span :class="getCircleClass(choice.charAt(0))" class="w-8 h-8 rounded-full flex items-center justify-center font-medium mr-3">
                {{ choice.charAt(0) }}
              </span>
              <FormattedText :text="choice" :remove-prefix="true" />
            </div>
          </button>
        </div>
        
        <!-- Explanation -->
        <div v-if="showExplanation" class="mt-8 p-6 rounded-xl"
             :class="isCorrect ? 'bg-green-50 border border-green-200' : 
                     'bg-red-50 border border-red-200'">
          <div class="flex items-center mb-3">
            <CheckCircleIcon v-if="isCorrect" class="w-6 h-6 text-green-500 mr-3" />
            <XCircleIcon v-else class="w-6 h-6 text-red-500 mr-3" />
            <p class="text-xl font-semibold" :class="isCorrect ? 'text-green-700' : 'text-red-700'">
              {{ isCorrect ? 'Correct!' : 'Incorrect!' }}
            </p>
          </div>
          <div class="text-gray-700">
            <FormattedText :text="currentQuestion.explanation" />
          </div>
        </div>
      </div>
      
      <!-- Controls -->
      <div class="flex justify-between items-center mt-8">
        <button 
          @click="previousQuestion"
          :disabled="currentQuestionIndex === 0"
          class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium
                 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div class="flex gap-4">
          <button 
            v-if="!showExplanation"
            @click="checkAnswer"
            :disabled="!selectedAnswer"
            class="px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-medium
                   transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                   hover:bg-primary hover:text-white disabled:hover:bg-white disabled:hover:text-primary"
          >
            Check Answer
          </button>
          
          <button 
            v-if="currentQuestionIndex < quiz.data.mcqs.length - 1"
            @click="nextQuestion"
            :disabled="!selectedAnswer"
            class="px-6 py-3 bg-primary text-white rounded-lg font-medium
                   transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                   hover:bg-primary-dark disabled:hover:bg-primary"
          >
            Next Question
          </button>
          
          <button 
            v-if="currentQuestionIndex === quiz.data.mcqs.length - 1"
            @click="finishQuiz"
            :disabled="!selectedAnswer"
            class="px-8 py-3 bg-gradient-to-r from-secondary to-secondary-dark text-white rounded-lg font-medium
                   transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                   hover:shadow-lg transform hover:scale-105 disabled:hover:shadow-none disabled:transform-none"
          >
            Finish Quiz
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, navigateTo } from '#app'
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import FormattedText from '~/components/FormattedText.vue'

const route = useRoute()
const quiz = ref(null)
const currentQuestionIndex = ref(0)
const selectedAnswer = ref(null)
const showExplanation = ref(false)
const userAnswers = ref([])

const currentQuestion = computed(() => {
  return quiz.value?.data.mcqs[currentQuestionIndex.value]
})

const isCorrect = computed(() => {
  return selectedAnswer.value === currentQuestion.value?.correctAnswer
})

// Save progress to localStorage
const saveProgress = () => {
  if (!quiz.value) return
  
  const progressKey = `quiz_progress_${quiz.value.id}`
  const progress = {
    currentQuestionIndex: currentQuestionIndex.value,
    selectedAnswer: selectedAnswer.value,
    showExplanation: showExplanation.value,
    userAnswers: userAnswers.value,
    lastUpdated: new Date().toISOString()
  }
  
  localStorage.setItem(progressKey, JSON.stringify(progress))
}

// Load progress from localStorage
const loadProgress = () => {
  if (!quiz.value) return
  
  const progressKey = `quiz_progress_${quiz.value.id}`
  const savedProgress = localStorage.getItem(progressKey)
  
  if (savedProgress) {
    const progress = JSON.parse(savedProgress)
    currentQuestionIndex.value = progress.currentQuestionIndex || 0
    selectedAnswer.value = progress.selectedAnswer
    showExplanation.value = progress.showExplanation || false
    userAnswers.value = progress.userAnswers || []
  }
}

// Clear progress when quiz is completed
const clearProgress = () => {
  if (!quiz.value) return
  const progressKey = `quiz_progress_${quiz.value.id}`
  localStorage.removeItem(progressKey)
}

const loadQuiz = () => {
  const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]')
  quiz.value = quizzes.find(q => q.id === route.params.id)
  
  if (quiz.value) {
    loadProgress()
  }
}

const selectAnswer = (answer) => {
  if (!showExplanation.value) {
    selectedAnswer.value = answer
    saveProgress()
  }
}

const checkAnswer = () => {
  showExplanation.value = true
  userAnswers.value[currentQuestionIndex.value] = {
    question: currentQuestion.value.question,
    selected: selectedAnswer.value,
    correct: currentQuestion.value.correctAnswer,
    isCorrect: isCorrect.value
  }
  saveProgress()
}

const nextQuestion = () => {
  // Save answer if not already saved and answer is selected
  if (!userAnswers.value[currentQuestionIndex.value] && selectedAnswer.value) {
    userAnswers.value[currentQuestionIndex.value] = {
      question: currentQuestion.value.question,
      selected: selectedAnswer.value,
      correct: currentQuestion.value.correctAnswer,
      isCorrect: selectedAnswer.value === currentQuestion.value.correctAnswer,
      skipped: !showExplanation.value // Mark if they skipped checking
    }
  }
  
  currentQuestionIndex.value++
  selectedAnswer.value = null
  showExplanation.value = false
  saveProgress()
}

const previousQuestion = () => {
  currentQuestionIndex.value--
  const previousAnswer = userAnswers.value[currentQuestionIndex.value]
  selectedAnswer.value = previousAnswer?.selected || null
  showExplanation.value = previousAnswer && !previousAnswer.skipped
  saveProgress()
}

const finishQuiz = () => {
  // Save answer if not already saved and answer is selected
  if (!userAnswers.value[currentQuestionIndex.value] && selectedAnswer.value) {
    userAnswers.value[currentQuestionIndex.value] = {
      question: currentQuestion.value.question,
      selected: selectedAnswer.value,
      correct: currentQuestion.value.correctAnswer,
      isCorrect: selectedAnswer.value === currentQuestion.value.correctAnswer,
      skipped: !showExplanation.value
    }
  }
  
  // Calculate results
  const correctAnswers = userAnswers.value.filter(a => a.isCorrect).length
  const totalQuestions = quiz.value.data.mcqs.length
  const percentage = Math.round((correctAnswers / totalQuestions) * 100)
  
  // Save results
  const results = {
    quizId: quiz.value.id,
    quizTitle: quiz.value.title,
    correctAnswers,
    totalQuestions,
    percentage,
    userAnswers: userAnswers.value,
    completedAt: new Date().toISOString()
  }
  
  const existingResults = JSON.parse(localStorage.getItem('quizResults') || '[]')
  existingResults.push(results)
  localStorage.setItem('quizResults', JSON.stringify(existingResults))
  
  // Clear progress
  clearProgress()
  
  // Navigate to results page
  navigateTo(`/results/${existingResults.length - 1}`)
}

const getChoiceClass = (answer) => {
  if (!showExplanation.value) {
    return selectedAnswer.value === answer 
      ? 'border-primary bg-blue-50 text-primary' 
      : 'border-gray-300 hover:border-primary text-gray-700 hover:bg-gray-50'
  }
  
  if (answer === currentQuestion.value.correctAnswer) {
    return 'border-green-500 bg-green-50 text-green-700'
  }
  
  if (answer === selectedAnswer.value && !isCorrect.value) {
    return 'border-red-500 bg-red-50 text-red-700'
  }
  
  return 'border-gray-300 text-gray-500 opacity-50'
}

const getCircleClass = (answer) => {
  if (!showExplanation.value) {
    return selectedAnswer.value === answer 
      ? 'bg-primary text-white' 
      : 'bg-gray-100 text-gray-600'
  }
  
  if (answer === currentQuestion.value.correctAnswer) {
    return 'bg-green-500 text-white'
  }
  
  if (answer === selectedAnswer.value && !isCorrect.value) {
    return 'bg-red-500 text-white'
  }
  
  return 'bg-gray-100 text-gray-400'
}

onMounted(() => {
  loadQuiz()
})
</script>