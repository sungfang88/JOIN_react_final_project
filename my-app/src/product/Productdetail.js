import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ProductCard from './ProductCard'
import LikeButton from '../Public/Likebutton'
import Productinfo from './Productinfo'
import '../Public/style'
import './css/product.css'

function Productdetail() {
  const location = useLocation()
  const state = location.state
  console.log(state.productId)

  // console.log(props)
  const [productData, setProductData] = useState({})
  const [likedProducts, setLikedProducts] = useState([])
  const [bestProductData, setBestProductData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `http://localhost:3008/product/api/getProductId/${state.productId}`
      )
      const data = await res.json()
      console.log(data)
      setProductData(data.rows[0])
    }
    fetchData()
  }, [state.productId])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        'http://localhost:3008/product/api/getProductbest'
      )
      const data = await res.json()
      setBestProductData(data.rows)
    }
    fetchData()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productData])

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
      {productData.product_id ? (
        <Productinfo
          productId={productData.product_id}
          isLiked={likedProducts.includes(productData.product_id)}
          onLike={() => handleLike(productData.product_id)}
          product_ch={productData.product_ch}
          product_eg={productData.product_eg}
          product_capacity={productData.capacity}
          product_description={productData.description}
          product_img={productData.product_img}
          product_winery={productData.winery}
          product_price={productData.productprice}
          product_country_ch={productData.country_ch}
          product_alcohol={productData.alcohol}
        />
      ) : (
        <div>Loading...</div>
      )}

      <section className="container-fluid mt-4">
        <div className="container">
          <div className="box">
            <div className="inner-box">
              <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
                <span className="col-auto title j-deepSec"> 猜你喜歡</span>

                <div className="title-line d-block d-md-none"></div>
                <Link
                  to="/product"
                  className="o-line-btn j-h3 d-none  d-md-block"
                >
                  查看更多 <i className="fa-solid fa-angles-right"></i>
                </Link>
              </div>
              <div className="row row-cols-1 row-cols-md-2  row-cols-xl-4 g-4 g-lg-5 g-xl-5 mt-2">
                {bestProductData
                  .filter(
                    (product) => product.product_id !== productData.product_id
                  )
                  .slice(0, 4)
                  .map((product) => (
                    <ProductCard
                      key={product.product_id}
                      productId={product.product_id}
                      productch={product.product_ch}
                      productprice={product.productprice}
                      isLiked={likedProducts.includes(product.product_id)}
                      productimg={product.product_img}
                      onLike={handleLike}
                    />
                  ))}
              </div>
            </div>
          </div>
          <button className="o-line-btn j-h3 d-block  d-md-none w-100 mt-5">
            查看更多 <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </section>
      {/* <h1>{productId}</h1> */}
    </>
  )
}

export default Productdetail
