<template>
  <div class="max-w-4xl mx-auto animate-fade-in">
    <h1 class="text-5xl font-display font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-3">
      Create New Quiz
    </h1>
    <p class="text-center text-gray-600 mb-4 text-lg">Transform your PDF into an interactive quiz in seconds! ⚡</p>
    <div class="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
      <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">AI-Powered</span>
      <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">PDF to Quiz</span>
      <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">Instant Results</span>
    </div>
    
    <!-- Steps Guide -->
    <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span class="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">✨</span>
        Create Your Quiz in 3 Simple Steps
      </h2>
      <div class="space-y-3">
        <div class="flex items-start">
          <span class="bg-white text-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-md flex-shrink-0">1</span>
          <p class="text-gray-700">Go to your favorite AI tool (ChatGPT, Claude, Gemini, etc.)</p>
        </div>
        <div class="flex items-start">
          <span class="bg-white text-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-md flex-shrink-0">2</span>
          <p class="text-gray-700">Upload your PDF file and paste our AI prompt (click below to copy)</p>
        </div>
        <div class="flex items-start">
          <span class="bg-white text-primary w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-md flex-shrink-0">3</span>
          <p class="text-gray-700">Copy the generated JSON and paste it here - your quiz is ready!</p>
        </div>
      </div>
      <div class="mt-4 text-center">
        <button
          type="button"
          @click="showPrompt = !showPrompt"
          class="inline-flex items-center gap-2 bg-white text-primary border-2 border-primary px-6 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-all duration-200 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
          {{ showPrompt ? 'Hide' : 'Get' }} AI Prompt
        </button>
      </div>
    </div>
    
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <form @submit.prevent="createQuiz">
        <div class="mb-8">
          <label class="block text-gray-700 font-medium mb-3">Quiz Title</label>
          <input 
            v-model="quizTitle"
            type="text"
            required
            class="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl
                   text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 
                   focus:ring-primary focus:border-transparent transition-all duration-200"
            placeholder="Enter your quiz title"
          />
        </div>
        
        <!-- AI Prompt Section (shown when clicked) -->
        <div v-if="showPrompt" class="mb-8 p-6 bg-gradient-to-r from-primary/10 to-purple-100 rounded-xl animate-fade-in">
          <h3 class="font-semibold text-gray-800 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2 text-primary">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
            AI Quiz Generation Prompt
          </h3>
          <p class="text-sm text-gray-600 mb-4">Copy this prompt and paste it in your AI tool along with your PDF content:</p>
          <div class="relative">
            <textarea 
              :value="aiPrompt"
              readonly
              class="w-full px-4 py-3 bg-white border border-primary/30 rounded-lg font-mono text-xs text-gray-700 resize-none max-h-64 overflow-y-auto"
              rows="8"
            />
            <button
              type="button"
              @click="copyPrompt"
              class="absolute top-2 right-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-md"
            >
              <span v-if="!promptCopied">Copy Prompt</span>
              <span v-else class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Copied!
              </span>
            </button>
          </div>
          <div class="mt-4 p-3 bg-white rounded-lg">
            <p class="text-sm font-medium text-gray-700 mb-2">💡 Quick Tips:</p>
            <ul class="text-xs text-gray-600 space-y-1">
              <li>• Upload your PDF to the AI tool first</li>
              <li>• Paste this prompt after your PDF content</li>
              <li>• The AI will generate JSON in the exact format needed</li>
              <li>• Copy the generated JSON and paste it below</li>
            </ul>
          </div>
        </div>
        
        <div class="mb-8">
          <label class="block text-gray-700 font-medium mb-3">Quiz Data (JSON Format)</label>
          
          <textarea 
            v-model="jsonData"
            required
            rows="12"
            class="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl
                   text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 
                   focus:ring-primary focus:border-transparent font-mono text-sm transition-all duration-200"
            placeholder='Paste your quiz JSON data here...

Example format:
{
  "mcqs": [
    {
      "questionNumber": 1,
      "question": "What is the capital of France?",
      "choices": [
        "A) London",
        "B) Berlin",
        "C) Paris",
        "D) Madrid"
      ],
      "correctAnswer": "C",
      "explanation": "Paris is the capital and largest city of France."
    }
  ]
}'
          />
        </div>
        
        <div v-if="error" class="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p class="text-red-600 font-medium flex items-center">
            <ExclamationTriangleIcon class="w-5 h-5 mr-2" />
            {{ error }}
          </p>
        </div>
        
        <button 
          type="submit"
          class="w-full bg-gradient-to-r from-primary to-primary-dark text-white 
                 px-8 py-4 rounded-xl font-medium text-lg
                 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Create Quiz
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo } from '#app'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const quizTitle = ref('')
const jsonData = ref('')
const error = ref('')
const showPrompt = ref(false)
const promptCopied = ref(false)

const aiPrompt = `You are an expert test question designer and educational content creator. Your task is to read the provided text content extracted from a PDF and generate a comprehensive set of realistic multiple-choice questions (MCQs) based on the material.

Follow these instructions meticulously:

Source Text: I will provide you with the complete text extracted from a PDF file.
Goal: Generate as many high-quality MCQs as possible, ensuring that you cover every significant idea, concept, definition, example, procedure, fact, or notable point mentioned in the text.

Question Quality:
- Each question must be realistic and directly relevant to the provided text.
- The questions should test understanding, recall, or application of the material presented.

Choices (Options):
- Each question must have exactly four choices (A, B, C, D).
- The choices must be meaningful distractors or the correct answer. Avoid generic options like "All of the above", "None of the above", "Both A and B", "A and C only", or similar combinations that rely on test-taking strategy rather than knowledge of the content. Distractors should be plausible but incorrect based on the source text.

Correct Answer: Clearly identify the single correct answer (A, B, C, or D) among the four choices.

Explanation: Provide a clear and concise explanation for why the correct answer is correct. Reference the specific concept or information from the text that supports the correct answer. The explanation should clarify the concept being tested.

Code Snippets: If any part of a question, choice, or explanation contains a code snippet (e.g., SQL, Python, Java, commands, syntax examples), wrap the code snippet exactly with the markers <<<CODE>>> at the beginning and <<<ENDCODE>>> at the end. This allows me to easily identify and format code later.
Example: The correct command is <<<CODE>>>SELECT * FROM users;<<<ENDCODE>>> which retrieves all data.

Output Format: Your output must be a single JSON object containing a single key, for example "mcqs", whose value is an array of MCQ objects. Each MCQ object in the array must have the following keys and value types:
- questionNumber: An integer, starting from 1 and incrementing sequentially for each question.
- question: A string containing the text of the question.
- choices: An array of exactly four strings, each starting with "A) ", "B) ", "C) ", or "D) ".
- correctAnswer: A string, which is either "A", "B", "C", or "D".
- explanation: A string providing the explanation.

Strict JSON Output: Output only the JSON object. Do not include any introductory or concluding text outside the JSON structure. Ensure the JSON is valid.`

const copyPrompt = async () => {
  try {
    await navigator.clipboard.writeText(aiPrompt)
    promptCopied.value = true
    setTimeout(() => {
      promptCopied.value = false
    }, 2000)
  } catch (err) {
    error.value = 'Failed to copy prompt to clipboard'
  }
}

const createQuiz = () => {
  error.value = ''
  
  try {
    // Parse and validate JSON
    const parsedData = JSON.parse(jsonData.value)
    
    // Validate structure
    if (!parsedData.mcqs || !Array.isArray(parsedData.mcqs)) {
      throw new Error('Invalid format: JSON must contain an "mcqs" array')
    }
    
    // Validate each MCQ
    parsedData.mcqs.forEach((mcq, index) => {
      if (!mcq.questionNumber || !mcq.question || !mcq.choices || 
          !mcq.correctAnswer || !mcq.explanation) {
        throw new Error(`Invalid MCQ at index ${index}: Missing required fields`)
      }
      
      if (mcq.choices.length !== 4) {
        throw new Error(`Invalid MCQ at index ${index}: Must have exactly 4 choices`)
      }
      
      if (!['A', 'B', 'C', 'D'].includes(mcq.correctAnswer)) {
        throw new Error(`Invalid MCQ at index ${index}: Correct answer must be A, B, C, or D`)
      }
    })
    
    // Generate unique ID
    const quizId = Date.now().toString()
    
    // Create quiz object
    const quiz = {
      id: quizId,
      title: quizTitle.value,
      data: parsedData,
      createdAt: new Date().toISOString()
    }
    
    // Get existing quizzes
    const existingQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]')
    
    // Add new quiz
    existingQuizzes.push(quiz)
    
    // Save to localStorage
    localStorage.setItem('quizzes', JSON.stringify(existingQuizzes))
    
    // Redirect to quiz list
    navigateTo('/quizzes')
  } catch (e) {
    error.value = e.message
  }
}
</script>