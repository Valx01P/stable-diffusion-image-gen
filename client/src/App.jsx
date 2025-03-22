import { useState } from 'react'
import ImageGenerator from './components/ImageGenerator'
import ImageDisplay from './components/ImageDisplay'
import './styles/App.css'

const App = () => {
  const [imageUrl, setImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  
  return (
    <div className="app">
      <header>
        <h1>AI Image Generator</h1>
        <p>Create images from text using Hugging Face models</p>
      </header>
      
      <main>
        <ImageGenerator 
          setImageUrl={setImageUrl} 
          setIsLoading={setIsLoading}
          setError={setError}
        />
        
        <ImageDisplay 
          imageUrl={imageUrl} 
          isLoading={isLoading}
          error={error}
        />
      </main>
      
      <footer>
        <p>Powered by Hugging Face Inference API</p>
      </footer>
    </div>
  )
}

export default App
