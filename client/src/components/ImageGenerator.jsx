import { useState, useEffect } from 'react'
import { getAvailableModels, generateImage } from '../services/api'

const ImageGenerator = ({ setImageUrl, setIsLoading, setError }) => {
  const [prompt, setPrompt] = useState('')
  const [modelId, setModelId] = useState('runwayml/stable-diffusion-v1-5')
  const [models, setModels] = useState([])
  
  useEffect(() => {
    // Fetch available models when component mounts
    async function fetchModels() {
      try {
        const data = await getAvailableModels()
        setModels(data.models)
      } catch (err) {
        console.error('Failed to fetch models:', err)
        setError('Failed to load available models')
      }
    }
    
    fetchModels()
  }, [setError])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }
    
    setIsLoading(true)
    setError(null)
    setImageUrl(null)
    
    try {
      const imageBlob = await generateImage(prompt, modelId)
      setImageUrl(URL.createObjectURL(imageBlob))
    } catch (err) {
      console.error('Image generation failed:', err)
      setError('Failed to generate image. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="image-generator">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="model-select">Select Model:</label>
          <select 
            id="model-select"
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
          >
            {models.map(model => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="prompt-input">Enter Prompt:</label>
          <textarea
            id="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A futuristic city with flying cars..."
            rows={4}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={!prompt.trim() || !modelId}
        >
          Generate Image
        </button>
      </form>
    </div>
  )
}

export default ImageGenerator