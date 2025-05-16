<template>
  <div class="max-w-4xl mx-auto animate-fade-in">
    <h1 class="text-5xl font-display font-bold text-center text-gray-800 mb-2">
      Create New Quiz
    </h1>
    <p class="text-center text-gray-600 mb-12">Build your quiz by pasting JSON data below</p>
    
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
        
        <div class="mb-8">
          <div class="flex justify-between items-center mb-3">
            <label class="block text-gray-700 font-medium">Quiz Data (JSON Format)</label>
            <button
              type="button"
              @click="showPrompt = !showPrompt"
              class="text-primary hover:text-primary-dark text-sm font-medium flex items-center gap-1"
            >
              <svg v-if="!showPrompt" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              {{ showPrompt ? 'Hide' : 'Show' }} AI Prompt Template
            </button>
          </div>
          
          <div v-if="showPrompt" class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl animate-fade-in">
            <h3 class="font-medium text-gray-800 mb-2">AI Quiz Generation Prompt</h3>
            <p class="text-sm text-gray-600 mb-3">Copy this prompt and use it with AI tools to generate quiz questions from your PDF content:</p>
            <div class="relative">
              <textarea 
                :value="aiPrompt"
                readonly
                class="w-full px-4 py-3 bg-white border border-blue-300 rounded-lg font-mono text-xs text-gray-700 resize-none"
                rows="8"
              />
              <button
                type="button"
                @click="copyPrompt"
                class="absolute top-2 right-2 px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary-dark transition-colors"
              >
                {{ promptCopied ? 'Copied!' : 'Copy' }}
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-2">💡 Tip: Paste your PDF text after this prompt to generate quiz questions</p>
          </div>
          
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