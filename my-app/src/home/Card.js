import React, { useState, useEffect } from 'react'
import './css/Index.css'

const Card = ({ id, frontImgUrl, backImgUrl, size, onHover, isPaused }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  const handleMouseEnter = () => {
    onHover(id)
    setIsHovered(true)
    console.log('mouseEnter:', id)
  }

  const handleMouseLeave = () => {
    onHover(null)
    setIsHovered(false)
    console.log('mouseLeave:', id)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFlipped(!isFlipped)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [isFlipped, id])

  useEffect(() => {
    if (isPaused) {
      setIsFlipped(true)
    } else {
      setIsFlipped(false)
    }
  }, [isPaused])

  return (
    <div
      className={`cardbox cardbox-${id} ${isFlipped ? 'flip' : ''} ${
        isHovered ? 'hover' : ''
      }`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`front-${size} cardf-${id}`}>
        {frontImgUrl && (
          <img src={frontImgUrl} alt={`front-${id}`} className="w-75" />
        )}
      </div>
      <div className={`back-${size} cardb-${id}`}>
        {backImgUrl && <img src={backImgUrl} alt={`back-${id}`} />}
      </div>
    </div>
  )
}

export default Card
