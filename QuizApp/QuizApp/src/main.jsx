import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Quiz from './components/quiz/App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
  <Quiz />
</StrictMode>

)
