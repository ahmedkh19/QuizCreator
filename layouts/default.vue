<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
    <!-- Modern animated background -->
    <div class="absolute inset-0">
      <div class="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      <div class="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style="animation-delay: 2s;"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style="animation-delay: 4s;"></div>
    </div>
    
    <!-- Header -->
    <header class="relative z-50 bg-white/80 backdrop-blur-lg shadow-lg">
      <div class="container mx-auto px-4 py-5">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <SparklesIcon class="text-white w-7 h-7" />
            </div>
            <div>
              <h1 class="text-2xl font-display font-bold text-gray-800">
                Quiz Creator
              </h1>
              <p class="text-xs text-gray-500">Test your knowledge</p>
            </div>
          </NuxtLink>
          
          <nav class="hidden md:flex items-center space-x-8">
            <NuxtLink 
              to="/" 
              class="text-gray-600 hover:text-primary font-medium transition-colors duration-200"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/create" 
              class="text-gray-600 hover:text-primary font-medium transition-colors duration-200"
            >
              Create Quiz
            </NuxtLink>
            <NuxtLink 
              to="/quizzes" 
              class="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-primary-dark transition-colors duration-200 shadow-md"
            >
              Browse Quizzes
            </NuxtLink>
          </nav>

          <!-- Mobile menu button -->
          <button class="md:hidden p-2">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 container mx-auto px-4 py-12">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="relative z-10 bg-white/80 backdrop-blur-lg mt-20 py-8 border-t border-gray-200">
      <div class="container mx-auto px-4 text-center">
        <p class="text-gray-600">
          &copy; 2025 Quiz Creator. Made with 💙
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');

/* Custom gold glow animation */
.animate-glow {
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  0% {
    filter: drop-shadow(0 0 5px #D4AF37) drop-shadow(0 0 10px #D4AF37);
  }
  100% {
    filter: drop-shadow(0 0 10px #D4AF37) drop-shadow(0 0 20px #D4AF37);
  }
}
</style>

<script setup>
import { SparklesIcon } from '@heroicons/vue/24/outline'
</script>