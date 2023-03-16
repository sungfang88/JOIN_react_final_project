import React, { useState } from 'react'
const cards = [
  {
    id: 1,
    name: '柯夢波丹',
    description: '帶有柑橘橙香、微甜略帶酸澀，富含香甜水果香氣的調酒。',
    image: './img/index-5.jpeg',
    color: 1,
  },
  {
    id: 2,
    name: '柯夢波丹',
    description: '帶有柑橘橙香、微甜略帶酸澀，富含香甜水果香氣的調酒。',
    image: './img/index-5.jpeg',
    color: 2,
  },
  {
    id: 3,
    name: '柯夢波丹',
    description: '帶有柑橘橙香、微甜略帶酸澀，富含香甜水果香氣的調酒。',
    image: './img/index-5.jpeg',
    color: 3,
  },
  {
    id: 4,
    name: '柯夢波丹',
    description: '帶有柑橘橙香、微甜略帶酸澀，富含香甜水果香氣的調酒。',
    image: './img/index-5.jpeg',
    color: 4,
  },
]
const Carousel = () => {
  const [currentCard, setCurrentCard] = useState(0)

  const nextSlide = () => {
    setCurrentCard(currentCard === cards.length - 1 ? 0 : currentCard + 1)
  }

  const prevSlide = () => {
    setCurrentCard(currentCard === 0 ? cards.length - 1 : currentCard - 1)
  }
  return (
    <>
      <div className="carousel d-flex d-lg-none">
        <button className="carousel__prev" onClick={prevSlide}>
          Prev
        </button>
        {cards.map((card, index) => {
          ;<div
            key={card.id}
            className={`cardc-${index === currentCard ? 'active' : ''}`}
          >
            <div className={`cardc-${card.color}-img mb-3`}>
              <img src={card[currentCard].image} alt="" />
            </div>
          </div>
        })}
        <div className={`cardc-1`}>
          <div className={`cardc-${cards.color}-img mb-3`}>
            <img src={cards[currentCard].image} alt="" />
          </div>
          <div className="cardc-info j-white">
            <h4 className="mb-3">{cards.name}</h4>
            <h5>{cards.description}</h5>
          </div>
        </div>

        <button className="carousel__next" onClick={nextSlide}>
          Next
        </button>
      </div>
    </>
  )
}

export default Carousel
