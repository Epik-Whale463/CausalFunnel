# Knowledge Assessment Quiz Application

A modern, responsive quiz application built with Next.js 15, featuring real-time progress tracking, text-to-speech capabilities, and a sophisticated glassmorphism UI design.

##  Live Demo

**Production URL**: [https://quiz-app-three-ruby-69.vercel.app/](https://quiz-app-three-ruby-69.vercel.app/)

##  Overview

This application provides an interactive quiz experience with 15 questions fetched from the Open Trivia Database API. Users can navigate freely between questions, track their progress in real-time, and receive comprehensive results with detailed review capabilities.

### Key Features

- ✅ **30-minute timed assessment** with auto-submission
- ✅ **Real-time progress tracking** and question navigation
- ✅ **Text-to-speech integration** using Sarvam AI API
- ✅ **Responsive design** optimized for mobile, tablet, and desktop
- ✅ **Glassmorphism UI** with professional orange theme
- ✅ **Accessibility compliant** with ARIA labels and keyboard navigation
- ✅ **Early submission** available after answering 50% of questions
- ✅ **Detailed results page** with question-by-question review

##  Architecture & Approach

### Design Philosophy
I approached this project with a focus on **user psychology** and **professional aesthetics**. The design reduces test anxiety through:
- Clean, uncluttered interface
- Minimizable timer to reduce pressure
- Progressive disclosure of information
- Subtle animations that enhance rather than distract

### Technical Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **Animations**: Framer Motion for smooth transitions
- **UI Components**: Custom component library with shadcn/ui base
- **API Integration**: Axios for HTTP requests
- **Text-to-Speech**: Sarvam AI API integration

## 🧩 Component Architecture

### Core Components

#### `StartPage.tsx`
- **Purpose**: User onboarding and email collection
- **Features**: Real-time email validation, assessment guidelines, responsive design
- **UX Focus**: Clear value proposition with minimal friction to start

#### `QuizInterface.tsx`
- **Purpose**: Main quiz container and layout management
- **Features**: Progress tracking, timer integration, smart submit button logic
- **Design**: 75/25 split layout (questions/sidebar) with mobile-first responsive design

#### `QuestionDisplay.tsx`
- **Purpose**: Individual question presentation and answer collection
- **Features**: A/B/C/D answer format, text-to-speech integration, accessibility support
- **UX Focus**: Clean typography hierarchy, touch-friendly interactions

#### `Timer.tsx`
- **Purpose**: Countdown timer with anxiety-reducing features
- **Features**: Minimizable design, visual progress indicator, critical time warnings
- **Psychology**: Reduces test anxiety while maintaining time awareness

#### `NavigationPanel.tsx`
- **Purpose**: Question overview and navigation
- **Features**: Visual progress indicators, direct question navigation, completion status
- **Design**: Compact grid layout with clear visual states

#### `ResultsPage.tsx`
- **Purpose**: Comprehensive results display and review
- **Features**: Progressive disclosure, detailed question review, performance analytics
- **UX Focus**: Score-first presentation with optional detailed breakdown

### Custom Hooks

#### `useQuiz.ts`
- **Purpose**: Centralized quiz state management
- **Features**: Timer management, answer tracking, progress calculation
- **Benefits**: Clean separation of concerns, reusable logic

### Services

#### `quizService.ts`
- **Purpose**: API integration and data transformation
- **Features**: Question fetching, HTML decoding, seeded shuffling for SSR compatibility
- **Reliability**: Error handling, data validation, consistent formatting

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Sarvam AI API key (for text-to-speech feature)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/quiz-app.git](https://github.com/Epik-Whale463/CausalFunnel.git
   cd quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   Create a `.env.local` file in the root directory:
   ```env
   SARVAM_AI_API_KEY=your_sarvam_ai_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables
- `SARVAM_AI_API_KEY`: Required for text-to-speech functionality
  - Get your API key from [Sarvam AI Dashboard](https://platform.sarvam.ai)
  - Used for converting question text to speech in Indian English

### API Endpoints
- **Quiz Questions**: `https://opentdb.com/api.php?amount=15`
- **Text-to-Speech**: `/api/text-to-speech` (internal Next.js API route)

## 💭 Assumptions Made

1. **Internet Connectivity**: Users have stable internet for API calls
2. **Modern Browsers**: Support for ES6+, CSS Grid, and Web Audio API
3. **Email Requirement**: Users are comfortable providing email for identification
4. **English Language**: Primary language is English (though TTS supports Indian languages)
5. **30-minute Duration**: Sufficient time for most users to complete 15 questions
6. **Device Capabilities**: Users have devices capable of audio playback for TTS feature

##  Challenges Faced & Solutions

### Challenge 1: User Experience Psychology
**Problem**: Traditional quiz interfaces create anxiety and cognitive overload
**Solution**: 
- Implemented minimizable timer to reduce pressure
- Used progressive disclosure for information
- Applied color psychology (orange for warmth, green for success)
- Created clean visual hierarchy focusing on the question content

### Challenge 2: Mobile Responsiveness
**Problem**: Complex layouts don't translate well to mobile devices
**Solution**: 
- Implemented mobile-first design approach
- Created ultra-compact sidebar components
- Used flexible grid systems (5-column mobile, 3-column desktop)
- Optimized touch targets and spacing

### Challenge 3: Accessibility Compliance
**Problem**: Interactive elements needed to be accessible to all users
**Solution**:
- Added comprehensive ARIA labels
- Implemented keyboard navigation
- Used semantic HTML structure
- Provided text alternatives for visual indicators

### Challenge 4: Performance Optimization
**Problem**: Heavy animations and effects could impact performance
**Solution**:
- Used CSS transforms instead of layout-triggering properties
- Implemented efficient re-rendering with React.memo patterns
- Optimized bundle size by removing unused dependencies
- Used Next.js built-in optimizations

### Challenge 5: Professional vs. Engaging Design
**Problem**: Balancing professional appearance with user engagement
**Solution**:
- Chose subtle glassmorphism over flashy effects
- Used consistent orange theme for brand identity
- Implemented micro-interactions for delight without distraction
- Created clean, corporate-appropriate aesthetics

## 🎨 Design Decisions

### Color Psychology
- **Orange Primary**: Conveys warmth, energy, and approachability
- **Green Success**: Universal indicator for correct answers and completion
- **Red Warnings**: Clear indication of errors or time pressure
- **Neutral Grays**: Professional, readable text hierarchy

### Typography Hierarchy
- **Questions**: Largest, most prominent text (text-lg)
- **Navigation**: Secondary importance (text-sm)
- **Status/Meta**: Smallest, supportive text (text-xs)

### Animation Philosophy
- **Purposeful**: Every animation serves a functional purpose
- **Subtle**: Enhances without distracting from content
- **Performance**: Uses CSS transforms for smooth 60fps animations
- **Accessibility**: Respects user motion preferences

##  Responsive Design Strategy

### Breakpoint System
- **Mobile**: < 640px (sm) - Single column, compact components
- **Tablet**: 640px - 1024px - Hybrid layout with optimized spacing
- **Desktop**: > 1024px (lg) - Full sidebar layout with maximum information density

### Mobile Optimizations
- **Touch Targets**: Minimum 44px for comfortable tapping
- **Content Priority**: Most important content appears first
- **Reduced Cognitive Load**: Simplified navigation and progress indicators
- **Thumb-Friendly**: Navigation elements positioned for easy reach

##  Future Enhancements

- **Question Categories**: Filter questions by subject area
- **Difficulty Levels**: Adaptive difficulty based on performance
- **Multiplayer Mode**: Compete with other users in real-time
- **Analytics Dashboard**: Detailed performance insights and trends
- **Offline Support**: PWA capabilities for offline quiz taking
- **Custom Branding**: White-label solution for organizations

**Built with ❤️ by Rama Charan** | **Deployed on Vercel** | **Powered by Next.js**
