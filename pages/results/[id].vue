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
              <CheckCircleIcon v-if="answer.isCorrect" class="w-6 h-6 text-green-500 ml-2" />
              <XCircleIcon v-else class="w-6 h-6 text-red-500 ml-2" />
            </div>
            
            <div class="text-sm">
              <p class="text-gray-600">
                Your answer: <span :class="answer.isCorrect ? 'text-green-700 font-medium' : 'text-red-700 font-medium'">
                  {{ answer.selected }}
                </span>
              </p>
              <p v-if="!answer.isCorrect" class="text-gray-600">
                Correct answer: <span class="text-green-700 font-medium">{{ answer.correct }}</span>
              </p>
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from '#app'
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import FormattedText from '~/components/FormattedText.vue'

const route = useRoute()
const result = ref(null)

const loadResult = () => {
  const results = JSON.parse(localStorage.getItem('quizResults') || '[]')
  const resultIndex = parseInt(route.params.id)
  if (resultIndex >= 0 && resultIndex < results.length) {
    result.value = results[resultIndex]
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

onMounted(() => {
  loadResult()
})
</script>