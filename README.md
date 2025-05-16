# Quiz Creator

A quiz application built with Nuxt 3, Tailwind CSS, and Solar Icons.

## Features

- Create custom quizzes by pasting JSON data
- Take interactive quizzes with immediate feedback
- View detailed results with explanations
- Browse and manage quizzes
- Local storage for persistence
- Responsive UI with Solar Icons

## Tech Stack

- **Framework**: Nuxt 3
- **Styling**: Tailwind CSS
- **Icons**: Solar Icons (via unplugin-icons)
- **Storage**: Browser localStorage

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Quiz JSON Format

Create quizzes by pasting JSON in the following format:

```json
{
  "mcqs": [
    {
      "questionNumber": 1,
      "question": "Your question here",
      "choices": [
        "A) First choice",
        "B) Second choice",
        "C) Third choice",
        "D) Fourth choice"
      ],
      "correctAnswer": "A",
      "explanation": "Explanation for the answer"
    }
  ]
}
```

## Project Structure

```
QuizCreator/
├── components/        # Reusable Vue components
├── composables/       # Composition API utilities
├── layouts/          # Nuxt layouts
├── pages/            # Application pages
│   ├── index.vue     # Home page
│   ├── create.vue    # Quiz creation page
│   ├── quizzes.vue   # Quiz listing page
│   ├── quiz/[id].vue # Quiz taking page
│   └── results/[id].vue # Results display page
├── static/           # Static assets
│   └── quizzes/      # Premade quiz JSON files
├── nuxt.config.ts    # Nuxt configuration
├── tailwind.config.js # Tailwind configuration
└── README.md         # This file
```

## License

MIT