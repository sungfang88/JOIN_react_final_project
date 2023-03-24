import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LikeButton from '../Public/Likebutton'
import { useContext } from 'react'
import AuthContext from '../Context/AuthContext'
import NavbarContext from '../Context/NavbarContext'
import Cartanima from '../Public/Cartanima'

function ProductCard(props) {
  // 購物車動畫
  const [cartAni, setCartani] = useState(false)
  // console.log('props',props)
  const navigate = useNavigate()
  const [count, setCount] = useState(1)
  const [isLiked, setIsLiked] = useState(props.isLiked)

  const { getcartlistnumber } = useContext(NavbarContext)

  const [Memberlike, setMemberlike] = useState([])
  // 登入判斷設定愛心
  const { myAuth } = useContext(AuthContext)
  let likedProducts = {}

  const addTolike = (event) => {
    event.preventDefault()

    setIsLiked((prev) => {
      if (myAuth.authorized) {
        // console.log('Memberlike', Memberlike)
        if (prev) {
          fetch(
            `http://localhost:3008/product/api/productlikedelete/${myAuth.sid}/${props.productId}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          ).then(setIsLiked(false), props.likeData(), console.log('刪除'))
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
          }).then(setIsLiked(true), props.likeData(), console.log('新增'))
        }
        return !prev
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

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setCartani(null)
  //   }, 3000)
  //   return () => clearTimeout(timer)
  // }, cartAni)

  function settomember() {
    // const cartItem = {
    //   productId: props.productId,
    //   amount: count,
    // }
    fetch(`http://localhost:3008/member/logincart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: props.productId,
        amount: count,
        mid: myAuth.sid,
      }),
    })
    console.log('加入資料庫')
    getcartlistnumber()
    setCartani(true)
  }
  function nologin() {
    const cartItem = {
      productId: props.productId,
      amount: count,
    }

    localStorage.setItem('cart', JSON.stringify(cartItem))
    localStorage.setItem(
      'presentURL',
      'http://localhost:3002/product/productdetail'
    )
    navigate('/member/login', {
      state: {
        productId: props.productId,
      },
    })
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setCartani(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [cartAni])
  return (
    <div className="col">
      <Link
        to="/product/productdetail"
        state={{
          productId: `${props.productId}`,
          amount: 1,
          isLiked: isLiked,
        }}
      >
        {cartAni ? <Cartanima productimg={props.productimg} /> : ''}
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
              <button
                className="btn wo-line-btn"
                onClick={(event) => {
                  event.preventDefault()
                  if (myAuth.authorized) {
                    settomember()
                    getcartlistnumber()
                  } else {
                    nologin()
                  }
                }}
              >
                加入購物車
              </button>
            </div>
          </div>
          <img
            src={`http://localhost:3008/product_img/${props.productimg}`}
            className="character"
          />
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
