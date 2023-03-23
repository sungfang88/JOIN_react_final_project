import React from 'react'
import './css/cartanima.css'

function Cartanima(props) {
  console.log(props.productimg)
  return (
    <>
      <div className="cartbox">
        <img
          src={`http://localhost:3008/product_img/${props.productimg}`}
          className="cover-image"
          alt="..."
        />
      </div>
    </>
  )
}

export default Cartanima
