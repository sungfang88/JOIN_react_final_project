import React, { useState } from 'react'
import ProductCard from './ProductCard'

function Index() {
  const [likedProducts, setLikedProducts] = useState([])

  const handleLike = (productId) => {
    if (likedProducts.includes(productId)) {
      setLikedProducts(likedProducts.filter((id) => id !== productId))
      localStorage.removeItem(productId)
    } else {
      setLikedProducts([...likedProducts, productId])
      localStorage.setItem(productId, true)
    }
  }
  return (
    <>
      {/* <!-- Sec-navbar 要用nav-space 空出上面的距離 --> */}
      <div className="container-fluid d-none d-md-block nav-space pb-5">
        <div className="container">
          <div className="row sec-navbar">
            <div className="col-auto">
              <a href="#" className="me-1">
                商品
              </a>
              /{' '}
              <a href="#" className="me-1">
                威士忌
              </a>
              /{' '}
              <a href="#" className="me-1">
                威士忌
              </a>
              /{' '}
              <a href="#" className="me-1">
                威士忌
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- 有側邊欄的大區塊 --> */}
      <div className="container-fluid nav-space pt-md-0">
        <div className="container d-flex flex-column flex-md-row">
          {/* <!-- section-left --> */}
          <div className="sec-left d-none d-md-flex">
            <button className="g-line-btn h3">威士忌</button>
            <button className="g-line-btn h3">白蘭地</button>
            <button className="g-line-btn h3">琴酒</button>
            <button className="g-line-btn h3">伏特加</button>
            <button className="g-line-btn h3">龍舌蘭</button>
            <button className="g-line-btn h3">萊姆酒</button>
          </div>
          <div className="j-input d-block d-md-none pb-3">
            <div>
              <label htmlFor="period">商品種類</label>
            </div>
            <select name="period" className="j-select">
              <option value="1">經營理念</option>
              <option value="2">菜單</option>
              <option value="3">營業據點</option>
              <option value="4">共同創辦人</option>
            </select>
          </div>

          {/* <!-- section-right --> */}
          <div className="sec-right ps-7 mb-5">
            <div className="row row-cols-2  row-cols-xl-3 g-4 g-lg-5 g-xl-5">
              <ProductCard
                productId="001"
                isLiked={likedProducts.includes('001')}
                onLike={handleLike}
              />
              <ProductCard
                productId="002"
                isLiked={likedProducts.includes('002')}
                onLike={handleLike}
              />
              <ProductCard
                productId="003"
                isLiked={likedProducts.includes('003')}
                onLike={handleLike}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
