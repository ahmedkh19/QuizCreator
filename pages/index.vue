<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <section class="text-center mb-20 px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-6xl md:text-7xl font-display font-bold text-gray-800 mb-6">
          Create <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Amazing</span> Quizzes
        </h1>
        <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Build, share, and take interactive quizzes. Perfect for education, training, or just having fun!
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <NuxtLink 
            to="/create" 
            class="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Create Your First Quiz
          </NuxtLink>
          
          <NuxtLink 
            to="/quizzes" 
            class="bg-white text-primary border-2 border-primary px-8 py-4 rounded-full font-medium text-lg hover:bg-primary hover:text-white transition-all duration-200"
          >
            Browse Existing Quizzes
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="max-w-7xl mx-auto px-4">
      <h2 class="text-4xl font-display font-bold text-center text-gray-800 mb-12">
        Why Choose Quiz Creator?
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6">
            <DocumentTextIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-display font-semibold text-gray-800 mb-4">Easy Creation</h3>
          <p class="text-gray-600">
            Simply paste your JSON data to create professional quizzes in seconds. No coding required!
          </p>
        </div>
        
        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-6">
            <BookOpenIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-display font-semibold text-gray-800 mb-4">Interactive Learning</h3>
          <p class="text-gray-600">
            Engage with quizzes that provide instant feedback and detailed explanations for each answer.
          </p>
        </div>
        
        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-6">
            <ChartBarIcon class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-display font-semibold text-gray-800 mb-4">Track Progress</h3>
          <p class="text-gray-600">
            Monitor your performance with detailed results and analytics to improve your knowledge.
          </p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="mt-20 bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
        <div>
          <p class="text-5xl font-bold mb-2">100+</p>
          <p class="text-lg">Active Quizzes</p>
        </div>
        <div>
          <p class="text-5xl font-bold mb-2">500+</p>
          <p class="text-lg">Questions Created</p>
        </div>
        <div>
          <p class="text-5xl font-bold mb-2">95%</p>
          <p class="text-lg">User Satisfaction</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.shadow-gold-glow {
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
}
</style>

<script setup>
import { DocumentTextIcon, BookOpenIcon, ChartBarIcon } from '@heroicons/vue/24/outline'
</script>