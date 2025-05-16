export const useQuizzes = () => {
  const loadPremadeQuizzes = async () => {
    const premadeQuizzes = [
      { file: 'sql-basics-quiz.json', title: 'SQL Basics Quiz' }
    ]
    
    const quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]')
    
    for (const premade of premadeQuizzes) {
      // Check if quiz already exists
      const exists = quizzes.some(q => q.title === premade.title)
      if (!exists) {
        try {
          const response = await fetch(`/quizzes/${premade.file}`)
          if (!response.ok) {
            throw new Error(`Failed to fetch ${premade.file}`)
          }
          const data = await response.json()
          
          // Validate data structure
          if (!data || !data.mcqs || !Array.isArray(data.mcqs)) {
            throw new Error(`Invalid quiz data structure in ${premade.file}`)
          }
          
          const quiz = {
            id: `premade-${Date.now()}-${Math.random()}`,
            title: premade.title,
            data: data,
            createdAt: new Date().toISOString(),
            isPremade: true
          }
          
          quizzes.push(quiz)
        } catch (error) {
          console.error(`Failed to load ${premade.file}:`, error)
        }
      }
    }
    
    localStorage.setItem('quizzes', JSON.stringify(quizzes))
  }
  
  return {
    loadPremadeQuizzes
  }
}