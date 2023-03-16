import React, { useState, useEffect } from 'react'
import '../Public/style'
import { Link } from 'react-router-dom'

// import { LikeButton, Dropdown } from '../Public/style'
const options1 = [
  { value: 'highToLow', label: '由高到低' },
  { value: 'lowToHigh', label: '由低到高' },
]

const options2 = [
  { value: 'type1', label: '類型一' },
  { value: 'type2', label: '類型二' },
]

function Test() {
  const [selectedValue1, setSelectedValue1] = useState('請選擇...')
  const [selectedValue2, setSelectedValue2] = useState('請選擇...')
  const [isMenuOpen1, setIsMenuOpen1] = useState(false)
  const [isMenuOpen2, setIsMenuOpen2] = useState(false)

  const handleToggleDropdown1 = () => {
    setIsMenuOpen1(!isMenuOpen1)
  }

  const handleSelectOption1 = (option) => {
    setSelectedValue1(option.label)
    setIsMenuOpen1(false)
  }

  const handleToggleDropdown2 = () => {
    setIsMenuOpen2(!isMenuOpen2)
  }

  const handleSelectOption2 = (option) => {
    setSelectedValue2(option.label)
    setIsMenuOpen2(false)
  }
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
      <div className="container">
        <div className="row">
          <div className="col-2">
            <Link
              to="/product/productdetail"
              state={{
                productId: `BD0012FR`,
                step: `詳細資訊`,
              }}
            >
              {/*  productId: `BD0012FR` 可以任意改你的id*/}
              <div
                style={{
                  backgroundColor: '#25858B',
                  height: '100px',
                  width: '100px',
                }}
              >
                詳細資訊
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <Link
              to="/product/productdetail"
              state={{
                productId: `BD0012FR`,
                step: `聯絡人`,
              }}
            >
              {/*  productId: `BD0012FR` 可以任意改你的id*/}
              <div
                style={{
                  backgroundColor: '#25858B',
                  height: '100px',
                  width: '100px',
                }}
              >
                聯絡人
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* <!--內容 第一個section要加nav-space pt-md-0---> */}
      <section className="container-fluid nav-space pt-md-0">
        <div className="container">
          <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span className="col-auto title j-deepSec"> 顏色＆字體</span>
            <div className="title-line d-block d-md-none"></div>
          </div>
          <div className="row d-flex">
            {/* <!-- 顏色 --> */}
            <div className="col-auto d-flex">
              <div className="col-auto">
                <div className="circle j-bg-white"></div>
                <div className="circle j-bg-lightGray"></div>
                <div className="circle j-bg-deepGray"></div>
                <div className="circle j-bg-black"></div>
              </div>
              <div className="col-auto">
                <div className="circle j-bg-primary"></div>
                <div className="circle j-bg-deepPri"></div>
                <div className="circle j-bg-lightPri"></div>
              </div>
              <div className="col-auto">
                <div className="circle j-bg-secondary"></div>
                <div className="circle j-bg-deepSec"></div>
                <div className="circle j-bg-lightSec"></div>
              </div>
              <div className="col-auto">
                <div className="circle j-bg-o-grad"></div>
                <div className="circle j-bg-p-grad"></div>
                <div className="circle j-bg-g-grad"></div>
              </div>
            </div>

            {/* <!-- 字體 --> */}
            <div className="col-auto">
              <h1>我是H1</h1>
              <h2>我是H2</h2>
              <h3>我是H3</h3>
              <h4>我是H4</h4>
              <h5>我是H5</h5>
              <div className="j-text">文字文字文字文字</div>
            </div>
            <div className="col-auto j-h5">
              <div className="icon j-primary j-h2">
                <i className="fa-solid fa-plus"></i>
                <i className="fa-solid fa-minus"></i>
                <i className="fa-solid fa-cart-shopping"></i>
                <i className="fa-solid fa-heart"></i>
                <i className="fa-solid fa-chevron-down"></i>
                <i className="fa-solid fa-angles-right"></i>
                <i className="fa-solid fa-trash-can"></i>
                <i className="fa-solid fa-pen"></i>
                <i className="fa-solid fa-magnifying-glass"></i>
                <i className="fa-solid fa-newspaper"></i>
                <i className="fa-solid fa-wine-bottle"></i>
                <i className="fa-solid fa-champagne-glasses"></i>
                <i className="fa-solid fa-chalkboard"></i>
                <i className="fa-solid fa-user"></i>
              </div>
              如果要用click效果的 可以一開始灰色點了變橘色
            </div>
          </div>
        </div>
      </section>

      {/* <!-- 表單 --> */}

      <section className="container-fluid">
        <div className="container">
          <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span className="col-auto title j-deepSec"> 表單</span>
            <div className="title-line d-block d-md-none"></div>
          </div>
          <div className="row">
            <form className="col-auto">
              {/* <!-- 純文字 --> */}
              <div className="j-input">
                <div>
                  <label htmlFor="name">姓名</label>
                </div>
                <input
                  type="text"
                  className="input-text"
                  required
                  placeholder="ex.王小明"
                />
              </div>
              <div className="j-input">
                <div>
                  <label htmlFor="email">信箱</label>
                </div>
                <input
                  type="email"
                  id="email"
                  className="input-text"
                  required
                />
              </div>

              {/* <!-- 下拉式選單 --> */}
              <div className="j-input">
                <div>
                  <label htmlFor="period">下拉式選單的寬度要自己設定</label>
                </div>
                <div className="dropdown">
                  <div
                    className="dropdown-toggle"
                    onClick={handleToggleDropdown1}
                  >
                    <span className="dropdown-label">
                      {selectedValue1 || '請選擇...'}
                    </span>
                    <i className="fas fa-caret-down"></i>
                  </div>
                  {isMenuOpen1 && (
                    <ul className="dropdown-menu mt-2">
                      {options1.map((option) => (
                        <li
                          key={option.value}
                          onClick={() => handleSelectOption1(option)}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}
                  <input
                    type="hidden"
                    id="selected"
                    name="selected"
                    value={selectedValue1}
                  />
                </div>
              </div>

              {/* <!-- 下拉式選單 --> */}
              <div className="j-input">
                <div>
                  <label htmlFor="period">
                    注意多字的時候要避免選單的寬度不同
                  </label>
                </div>
                <div className="dropdown">
                  <div
                    className="dropdown-toggle"
                    onClick={handleToggleDropdown2}
                  >
                    <span className="dropdown-label">
                      {selectedValue2 || '請選擇...'}
                    </span>
                    <i className="fas fa-caret-down"></i>
                  </div>
                  {isMenuOpen2 && (
                    <ul className="dropdown-menu mt-2">
                      {options2.map((option) => (
                        <li
                          key={option.value}
                          onClick={() => handleSelectOption2(option)}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}
                  <input
                    type="hidden"
                    id="selected"
                    name="selected"
                    value={selectedValue2}
                  />
                </div>
              </div>

              <div className="j-input d-flex flex-row">
                <label className="d-flex align-items-center">
                  <input
                    type="radio"
                    name="table"
                    value="1"
                    className="j-radio"
                  />{' '}
                  吧台
                </label>
                <label className="d-flex align-items-center">
                  <input
                    type="radio"
                    name="table"
                    value="2"
                    className="j-radio"
                  />{' '}
                  方桌
                </label>
                <label className="d-flex align-items-center">
                  <input
                    type="radio"
                    name="table"
                    value="3"
                    className="j-radio"
                  />{' '}
                  包廂
                </label>
              </div>
              <div className="j-input d-flex flex-row">
                <label className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    name="food"
                    value="1"
                    className="j-checkbox"
                  />
                  泰式
                </label>
                <label className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    name="food"
                    value="2"
                    className="j-checkbox"
                  />
                  美式
                </label>
                <label className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    name="food"
                    value="3"
                    className="j-checkbox"
                  />
                  法式
                </label>
              </div>
              <div className="j-input">
                <textarea name="" cols="30" rows="10"></textarea>
              </div>
              <input type="submit" className="g-line-btn j-h3 j-white" />
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Test
