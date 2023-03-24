import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import ProductCard from './ProductCard'
import AuthContext from '../Context/AuthContext'
import NavbarContext from '../Context/NavbarContext'

import Loading from '../Public/Loading'

import LikeButton from '../Public/Likebutton'
import Productinfo from './Productinfo'
import '../Public/style'
import './css/product.css'

function Productdetail(props) {
  const location = useLocation()

  let state = location.state

  const params = useParams()

  // const { productId } = useParams()

  const prouctId =
    (params && params.productId) || (state && state.productId) || 'BD0002FR'

  // console.log('prouctId', prouctId)

  // 如果沒有state就走BD0002FR

  // if (prouctId === null) {
  //   state = {
  //     productId: 'BD0002FR',
  //   }
  // }
  // console.log('state.productId', state.productId)
  // console.log('isLiked', state.isLiked)
  // console.log(props)
  const [productData, setProductData] = useState({})
  // const [likedProducts, setLikedProducts] = useState([])
  const [bestProductData, setBestProductData] = useState([])

  const { getcartlistnumber } = useContext(NavbarContext)

  const [Memberlike, setMemberlike] = useState([])
  const { myAuth } = useContext(AuthContext)
  let likedProducts = {}
  if (myAuth.authorized) {
    getcartlistnumber()
  }

  if (myAuth.authorized) {
    const Array = Memberlike.map((v, i) => {
      return v.productmanage
    }).map((v, i) => {
      return { [v]: true }
    })
    let obj = {}
    Array.map((v, i) => {
      obj = { ...obj, ...v }
    })
    likedProducts = obj
    // console.log('MemberlikedProducts', likedProducts)
    //{BD0002FR: true, BD0003FR: true, BD0004FR: true}
  } else {
    if (localStorage.getItem('likedProducts') !== null) {
      likedProducts = JSON.parse(localStorage.getItem('likedProducts'))
      // console.log('localStoragelikedProducts', likedProducts)
      //{BD0002FR: true, BD0003FR: true, BD0004FR: true}
    }
  }
  const likeData = async () => {
    const res = await fetch(
      `http://localhost:3008/product/api/getproductlike/${myAuth.sid} `
    )
    const data = await res.json()
    // console.log(data.rows)
    setMemberlike(data.rows)
  }
  useEffect(() => {
    likeData()
  }, [prouctId])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `http://localhost:3008/product/api/getProductId/${prouctId}`
      )
      const data = await res.json()
      console.log(data)
      setProductData(data.rows[0])
    }
    fetchData()
  }, [prouctId])

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
  }, [prouctId])

  // console.log(likedProducts)
  // console.log('BD0004FR', likedProducts['BD0004FR'])
  // const handleLike = (productId) => {
  //   if (likedProducts.includes(productId)) {
  //     setLikedProducts(likedProducts.filter((id) => id !== productId))
  //     localStorage.removeItem(productId)
  //   } else {
  //     setLikedProducts([...likedProducts, productId])
  //     localStorage.setItem(productId, true)
  //   }
  // }

  return (
    <>
      {productData.product_id ? (
        <Productinfo
          productId={productData.product_id}
          isLiked={likedProducts[productData.product_id]}
          // onLike={() => handleLike(productData.product_id)}
          product_ch={productData.product_ch}
          product_eg={productData.product_eg}
          product_capacity={productData.capacity}
          product_description={productData.description}
          product_img={productData.product_img}
          product_winery={productData.winery}
          product_price={productData.productprice}
          product_country_ch={productData.country_ch}
          product_alcohol={productData.alcohol}
          likeData={likeData}
          amount={1}
        />
      ) : (
        <Loading />
      )}

      <section className="container-fluid mt-4">
        <div className="container productdetail">
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
                      producteg={product.product_eg}
                      productprice={product.productprice}
                      isLiked={likedProducts[product.product_id]}
                      productimg={product.product_img}
                      likeData={likeData}
                    />
                  ))}
              </div>
            </div>
          </div>
          <Link
            to="/product"
            className="o-line-btn j-h3 d-block  d-md-none w-100 mt-5 text-center"
          >
            查看更多 <i className="fa-solid fa-angles-right"></i>
          </Link>
        </div>
      </section>
      {/* <h1>{productId}</h1> */}
    </>
  )
}

export default Productdetail
