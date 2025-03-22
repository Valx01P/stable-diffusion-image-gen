const ImageDisplay = ({ imageUrl, isLoading, error }) => {
  return (
    <div className="image-display">
      {isLoading && (
        <div className="loading">
          <p>Generating image... This may take a moment.</p>
          <div className="spinner"></div>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
      
      {imageUrl && !isLoading && !error && (
        <div className="result">
          <img src={imageUrl} alt="Generated" />
          <div className="actions">
            <a 
              href={imageUrl} 
              download="generated-image.png"
              className="download-btn"
            >
              Download Image
            </a>
          </div>
        </div>
      )}
      
      {!imageUrl && !isLoading && !error && (
        <div className="placeholder">
          <p>Your generated image will appear here</p>
        </div>
      )}
    </div>
  )
}

export default ImageDisplay