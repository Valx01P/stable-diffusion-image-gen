import axios from 'axios'

const API_BASE_URL = '/api'

// Get list of available models
export const getAvailableModels = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/available-models`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch models:', error)
    throw error
  }
}

// Generate an image from a prompt
export const generateImage = async (prompt, modelId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/generate-image`,
      { prompt, model_id: modelId },
      { responseType: 'blob' }  // Important for handling image data
    )
    return response.data
  } catch (error) {
    console.error('Image generation failed:', error)
    throw error
  }
}