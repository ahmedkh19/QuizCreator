<template>
  <div class="animate-fade-in">
    <h1 class="text-5xl font-display font-bold text-center text-gray-800 mb-2">
      Browse Quizzes
    </h1>
    <p class="text-center text-gray-600 mb-6">Choose a quiz to test your knowledge</p>
    
    <!-- Practice Incorrect Questions Button -->
    <div class="flex justify-center mb-12">
      <button 
        v-if="incorrectQuestionsCount > 0"
        @click="createIncorrectQuiz"
        class="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white 
               px-6 py-3 rounded-full font-medium
               hover:shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        <ExclamationTriangleIcon class="w-5 h-5" />
        Practice Incorrect Questions ({{ incorrectQuestionsCount }})
      </button>
      <div 
        v-else
        class="text-gray-500 text-sm"
      >
        Answer questions incorrectly to build your practice quiz
      </div>
    </div>
    
    <div v-if="quizzes.length === 0" class="text-center py-16">
      <div class="mb-8">
        <div class="w-32 h-32 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
          <BookOpenIcon class="w-16 h-16 text-blue-400" />
        </div>
      </div>
      <p class="text-gray-600 text-xl mb-8">No quizzes available yet</p>
      <NuxtLink 
        to="/create" 
        class="inline-block bg-gradient-to-r from-primary to-primary-dark text-white 
               px-8 py-4 rounded-full font-medium text-lg
               hover:shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        Create Your First Quiz
      </NuxtLink>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="quiz in quizzes" 
        :key="quiz.id"
        class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
        :class="{ 'border-2 border-orange-400': quiz.isIncorrectQuestionsQuiz }"
      >
        <div 
          class="h-2"
          :class="quiz.isIncorrectQuestionsQuiz ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-primary to-secondary'"
        ></div>
        <div class="p-6">
          <h3 class="text-2xl font-display font-semibold text-gray-800 mb-4">{{ quiz.title }}</h3>
          <div class="flex items-center space-x-4 text-gray-600 mb-6">
            <span class="flex items-center">
              <DocumentTextIcon class="w-4 h-4 mr-1" />
              {{ quiz.data?.mcqs?.length || 0 }} questions
            </span>
            <span class="text-gray-400">•</span>
            <span class="text-sm">{{ formatDate(quiz.createdAt) }}</span>
          </div>
          
          <div class="flex gap-3">
            <NuxtLink 
              :to="`/quiz/${quiz.id}`"
              class="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-medium text-center
                     hover:bg-primary-dark transition-colors duration-200"
            >
              Take Quiz
            </NuxtLink>
            <button 
              @click="deleteQuiz(quiz.id)"
              class="bg-red-500 text-white px-4 py-2 rounded-lg
                     hover:bg-red-600 transition-colors duration-200"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.shadow-gold-glow {
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuizzes } from '~/composables/useQuizzes'
import { useIncorrectQuestions } from '~/composables/useIncorrectQuestions'
import { TrashIcon, BookOpenIcon, DocumentTextIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const quizzes = ref([])
const incorrectQuestionsCount = ref(0)
const { loadPremadeQuizzes } = useQuizzes()
const { getIncorrectQuestions, createIncorrectQuestionsQuiz } = useIncorrectQuestions()

const loadQuizzes = async () => {
  await loadPremadeQuizzes()
  const storedQuizzes = localStorage.getItem('quizzes')
  if (storedQuizzes) {
    quizzes.value = JSON.parse(storedQuizzes)
  }
  
  // Get incorrect questions count
  incorrectQuestionsCount.value = getIncorrectQuestions().length
}

const deleteQuiz = (quizId) => {
  if (confirm('Are you sure you want to delete this quiz?')) {
    quizzes.value = quizzes.value.filter(q => q.id !== quizId)
    localStorage.setItem('quizzes', JSON.stringify(quizzes.value))
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const createIncorrectQuiz = () => {
  const quiz = createIncorrectQuestionsQuiz()
  if (quiz) {
    loadQuizzes() // Refresh quiz list
  }
}

onMounted(() => {
  loadQuizzes()
})
</script>