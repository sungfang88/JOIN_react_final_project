import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LikeButton from '../Public/Likebutton'

function ProductCard(props) {
  const [isLiked, setIsLiked] = useState(props.isLiked)
  // const likedProducts = JSON.parse(localStorage.getItem('likedProducts'))
  // console.log('test', props)
  // useEffect(() => {
  //   if (likedProducts[props.productId] !== null) {
  //     setIsLiked(true)
  //   }
  // }, [props.productId])

  const addTolike = (event) => {
    event.preventDefault()
    setIsLiked((prev) => {
      let likedProducts = {}
      if (localStorage.getItem('likedProducts') !== null) {
        likedProducts = JSON.parse(localStorage.getItem('likedProducts'))
      }
      if (prev) {
        delete likedProducts[props.productId]
      } else {
        likedProducts[props.productId] = true
      }
      localStorage.setItem('likedProducts', JSON.stringify(likedProducts))

      return !prev
    })

    const likedProducts = JSON.parse(localStorage.getItem('likedProducts'))

    // if (isLiked) {
    //   localStorage.removeItem(likedProducts[props.productId])
    //   setIsLiked(false)
    // } else {
    //   localStorage.setItem(likedProducts[props.productId], true)
    //   setIsLiked(true)
  }

  const handleMouseEnter = (e) => {
    if (!isLiked) {
      e.target.classList.remove('fa-regular')
      e.target.classList.add('fa-solid')
    }
  }

  const handleMouseLeave = (e) => {
    if (!isLiked) {
      e.target.classList.remove('fa-solid')
      e.target.classList.add('fa-regular')
    }
  }

  return (
    <div className="col">
      <Link
        to="/product/productdetail"
        state={{
          productId: `${props.productId}`,
        }}
        //{{
        // pathname: '/product/producttry1',
        // state: { productId: '123456' },
        //}}
        // alt="Mythrill"
        // target="_blank"
      >
        <div className="mycard product">
          <div className="wrapper">
            <img
              src={`http://localhost:3008/product_img/${props.productimg}`}
              className="cover-image"
              alt="..."
            />
          </div>
          <div className="mycard-icon ">
            <button type="button" className="no-line-btn icon-button like-btn">
              <LikeButton
                productId={props.productId}
                onClick={addTolike}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                isLiked={isLiked}
              />
            </button>
          </div>
          <div className="origin-color"></div>
          <div className="mycard-title">
            <h2 className="mb-0">{props.productch}</h2>
            <p className="mb-0"> TWD {props.productprice}</p>
            <div className="d-grid gap-2 mt-0 mt-md-3">
              <button className="btn wo-line-btn" type="button">
                加入購物車
              </button>
            </div>
          </div>
          <img
            src={`http://localhost:3008/product_img/${props.productimg}`}
            className="character"
            alt=""
          />
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
