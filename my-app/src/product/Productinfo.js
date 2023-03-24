import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import LikeButton from '../Public/Likebutton'
import Counter from './Counter'
import ShareLink from './ShareLink'
import AuthContext from '../Context/AuthContext'

function Productinfo(props) {
  console.log('propsinfoisLiked', props.isLiked)
  const [isLiked, setIsLiked] = useState(props.isLiked)

  const [Memberlike, setMemberlike] = useState('[]')
  // 登入判斷設定愛心
  const { myAuth } = useContext(AuthContext)

  useEffect(() => {
    setIsLiked(props.isLiked)
  }, [props.productId])

  console.log('props.isLiked', props.isLiked)
  let likedProducts = {}
  const addTolike = (event) => {
    event.preventDefault()

    // if (prev) {
    //   fetch(
    //     `http://localhost:3008/product/api/productlikedelete/${myAuth.sid}/${props.productId}`,
    //     {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   ).then(
    //     console.log('刪除', props.productId),
    //     setIsLiked(false),
    //     props.likeData()
    //   )
    // } else {
    //   fetch(`http://localhost:3008/product/api/productlikeadd`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       member: myAuth.sid,
    //       productmanage: props.productId,
    //     }),
    //   }).then(
    //     console.log('新增', props.productId),
    //     setIsLiked(true),
    //     props.likeData()
    //   )
    // }
    // return !prev

    setIsLiked((prev) => {
      if (myAuth.authorized) {
        // console.log('Memberlike', Memberlike)
        fetch(
          `http://localhost:3008/product/api/getproductlike/${myAuth.sid}`
        ).then(() => {
          if (prev) {
            fetch(
              `http://localhost:3008/product/api/productlikedelete/${myAuth.sid}/${props.productId}`,
              {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            ).then(
              console.log('刪除', props.productId),
              setIsLiked(false),
              props.likeData()
            )
          } else {
            fetch(`http://localhost:3008/product/api/productlikeadd`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                member: myAuth.sid,
                productmanage: props.productId,
              }),
            }).then(
              console.log('新增', props.productId),
              setIsLiked(true),
              props.likeData()
            )
          }
          return !prev
        })
      } else {
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
      }
    })

    // const likedProducts = JSON.parse(localStorage.getItem('likedProducts'))
  }
  // console.log('Memberlike', Memberlike)
  // useEffect(() => {
  //   if (likedProducts[props.productId]) {
  //     setIsLiked(true)
  //   }
  // }, [props.productId, likedProducts])

  // const handleClick = (event) => {
  //   event.preventDefault()
  //   const newLikedProducts = { ...likedProducts }
  //   if (isLiked) {
  //     delete newLikedProducts[props.productId]
  //     setIsLiked(false)
  //   } else {
  //     newLikedProducts[props.productId] = true
  //     setIsLiked(true)
  //   }
  //   setLikedProducts(newLikedProducts)
  //   localStorage.setItem('likedProducts', JSON.stringify(newLikedProducts))
  // }

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
    <>
      <div className="container-fluid d-none d-md-block nav-space pb-5 product-nav">
        <div className="container">
          <div className="row sec-navbar">
            <div className="col-auto">
              <Link to="/" className="me-1">
                主頁
              </Link>
              /{' '}
              <Link to="/product" className="me-1">
                商品
              </Link>
              /{' '}
              <Link
                to="/product/productdetail"
                state={{
                  productId: `${props.productId}`,
                  isLiked: isLiked,
                }}
              >
                {props.product_ch}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid nav-space pe-0 ps-0 ps-lg-auto nav-space">
        <div className="container d-md-flex flex-column flex-md-row">
          {/* <!-- section-left --> */}
          <div className="row">
            <div className="col-12 col-xl-6">
              <div className="prodctde-l  d-md-flex">
                <div className="prodctde-box">
                  <img
                    src={`http://localhost:3008/product_img/${props.product_img}`}
                    className="productde-img"
                    alt="..."
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6 mt-3 mt-lg-0">
              <div className="prodctde-r ps-auto ps-md-0 ps-lg-5  mb-5">
                <div className="row text-start">
                  <div className="col-12 ">
                    <div className="div">
                      <div className="row">
                        <div className="col-auto">
                          <h1 className="j-deepSec">{props.product_ch}</h1>
                        </div>
                        <div className="col-auto ps-0">
                          <div className="prodctde-like">
                            <button
                              type="button"
                              className="no-line-btn h1 icon-button like-btn productinfo-like"
                            >
                              <LikeButton
                                productId={props.productId}
                                onClick={addTolike}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                isLiked={isLiked}
                              />
                              <ShareLink productId={props.productId} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h2 className="pt-2">{props.product_eg}</h2>
                    <div className="row row-cols-1 row-cols-xl-2 mt-0 mt-lg-2">
                      <div className="col mt-2">
                        <div className="row">
                          <div className="col-3">
                            <h3 className="productbox-line-r">品牌</h3>
                          </div>
                          <div className="col">
                            <h3 className="prodctde-content">
                              {props.product_winery}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col mt-2">
                        <div className="row">
                          <div className="col-3">
                            <h3 className="productbox-line-r">產地</h3>
                          </div>
                          <div className="col">
                            <h3 className="prodctde-content">
                              {props.product_country_ch}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col mt-2">
                        <div className="row">
                          <div className="col-3">
                            <h3 className="productbox-line-r">容量</h3>
                          </div>
                          <div className="col">
                            <h3 className="prodctde-content">
                              {props.product_capacity}ml
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col mt-2">
                        <div className="row">
                          <div className="col-3">
                            <h3 className="productbox-line-r">濃度</h3>
                          </div>
                          <div className="col">
                            <h3 className="prodctde-content">
                              {`${props.product_alcohol * 100}%`}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4 textstart discrip-box">
                      <h4
                        className="product-discrip"
                        dangerouslySetInnerHTML={{
                          __html: props.product_description
                            .replace(/<br>/g, '\n')
                            .replace(/<\/?[^>]+>/gi, ''),
                        }}
                      ></h4>
                    </div>

                    <div className="row">
                      <div className="row mt-4">
                        <h1 className="price  text-start">
                          TWD {props.product_price}
                        </h1>
                      </div>
                    </div>

                    <Counter
                      productId={props.productId}
                      productCh={props.product_ch}
                      productCount={1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- section-right --> */}
        </div>
      </div>
    </>
  )
}

export default Productinfo
