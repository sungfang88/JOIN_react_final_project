import React, { useState, useEffect } from 'react'
import '../Public/style'
// import { LikeButton, Dropdown } from '../Public/style'

function Test() {
  const [options, setOptions] = useState([])
  const [selectedValue1, setSelectedValue1] = useState('請選擇...')
  const [selectedValue2, setSelectedValue2] = useState('請選擇...')
  const [isMenuOpen1, setIsMenuOpen1] = useState(false)
  const [isMenuOpen2, setIsMenuOpen2] = useState(false)

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        )
        const data = await response.json()
        setOptions(
          data.map((item) => ({ value: item.id.toString(), label: item.title }))
        )
      } catch (error) {
        console.log(error)
      }
    }
    fetchOptions()
  }, [])

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

      {/* <!-- 按鈕 --> */}
      <section className="container-fluid">
        <div className="container">
          <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span className="col-auto title j-deepSec"> 按鈕</span>
            <div className="title-line d-block d-md-none"></div>
          </div>
          <div className="row">
            <div className="col-auto">
              <button className="o-line-btn j-h3">登入</button>
              <button className="g-line-btn j-h3">登入</button>
              <button className="gray-line-btn j-h3">取消</button>
              <button className="wo-line-btn j-h3">背景深可用</button>
            </div>
            <div className="col-auto">
              <button className="o-long-btn j-h3">由此進入</button>
            </div>
            {/* <!-- <div className="col-auto">
                    <div className="title j-h1 j-deepSec"> 關於我們</div>
                </div> --> */}
            <div className="col-auto gray-btn j-h3">關於我們</div>
          </div>
        </div>
      </section>

      {/* <!-- 卡片A --> */}
      <section className="container-fluid">
        <div className="container ">
          <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span className="col-auto title j-deepSec"> 卡片Ａ</span>
            <div className="title-line d-block d-md-none"></div>
            <button className="o-line-btn j-h3 d-none  d-md-block">
              查看更多 <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
          <div className="row row-cols-1 row-cols-md-2  row-cols-xl-4  g-4 ">
            <div className="col">
              <div className="card card-a">
                <img src="./img/test.jpeg" className="card-img-top" alt="..." />
                <div className="info">
                  <h3>馬丁尼與夏夜時光特調</h3>
                  <div className="j-text j-deepSec">Wilbur</div>
                  <div className="j-text j-deepSec mb-3">3/18 16:00-18:00</div>
                  <div className="o-long-btn  h3">報名</div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card-a">
                <img src="./img/test.jpeg" className="card-img-top" alt="..." />
                <div className="info">
                  <h3>馬丁尼與夏夜時光特調</h3>
                  <div className="j-text j-deepSec">Wilbur</div>
                  <div className="j-text j-deepSec mb-3">3/18 16:00-18:00</div>
                  <div className="o-long-btn  h3   ">報名</div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card-a">
                <img src="./img/test.jpeg" className="card-img-top" alt="..." />
                <div className="info">
                  <h3>馬丁尼與夏夜時光特調</h3>
                  <div className="j-text j-deepSec">Wilbur</div>
                  <div className="j-text j-deepSec mb-3">3/18 16:00-18:00</div>
                  <div className="o-long-btn  h3   ">報名</div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card-a">
                <img src="./img/test.jpeg" className="card-img-top" alt="..." />
                <div className="info">
                  <h3>馬丁尼與夏夜時光特調</h3>
                  <div className="j-text j-deepSec">Wilbur</div>
                  <div className="j-text j-deepSec mb-3">3/18 16:00-18:00</div>
                  <div className="o-long-btn  h3">報名</div>
                </div>
              </div>
            </div>
          </div>
          <button className="o-line-btn j-h3 d-block  d-md-none w-100 mt-5">
            查看更多 <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </section>

      {/* <!-- 卡片B --> */}
      <section className="container-fluid">
        <div className="container">
          <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span className="col-auto title j-deepSec"> 卡片B</span>
            <div className="title-line d-block d-md-none"></div>
            <button className="o-line-btn j-h3 d-none  d-md-block">
              查看更多 <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
          <div className="row row-cols-2  row-cols-xl-3 row-cols-xxl-4 g-4 g-lg-5 g-xl-5 mt-4">
            <div className="col">
              <a href="#/" alt="Mythrill" target="_blank">
                <div className="mycard product">
                  <div className="wrapper">
                    <img
                      src="./img/001.webp"
                      className="cover-image"
                      alt="..."
                    />
                  </div>
                  <div className="mycard-icon">
                    <button className="icon-button btn like-btn">
                      <i
                        className="fa-regular fa-heart j-primary"
                        data-id="product-1"
                      ></i>
                    </button>
                  </div>
                  <div className="origin-color"></div>
                  <div className="mycard-title">
                    <h2 className="mb-0">商品名稱商品名稱商品名稱</h2>
                    <p className="mb-0"> $2000</p>
                    <div className="d-grid gap-2 mt-0 mt-md-3">
                      <button className="btn wo-line-btn" type="button">
                        加入購物車
                      </button>
                    </div>
                  </div>
                  <img src="./img/001.webp" className="character" alt="..." />
                </div>
              </a>
            </div>

            <div className="col">
              <a href="#/" alt="Mythrill" target="_blank">
                <div className="mycard product">
                  <div className="wrapper">
                    <img
                      src="./img/001.webp"
                      className="cover-image"
                      alt="..."
                    />
                  </div>
                  <div className="mycard-icon">
                    <button className="icon-button btn like-btn">
                      <i
                        className="fa-regular fa-heart j-primary"
                        data-id="product-2"
                      ></i>
                    </button>
                  </div>
                  <div className="origin-color"></div>
                  <div className="mycard-title">
                    <h2 className="mb-0">商品名稱商品名稱商品名稱</h2>
                    <p className="mb-0"> $2000</p>
                    <div className="d-grid gap-2 mt-0 mt-md-3">
                      <button className="btn wo-line-btn" type="button">
                        加入購物車
                      </button>
                    </div>
                  </div>
                  <img src="./img/001.webp" className="character" />
                </div>
              </a>
            </div>
            <div className="col">
              <a href="#/" alt="Mythrill" target="_blank">
                <div className="mycard product">
                  <div className="wrapper">
                    <img src="./img/001.webp" className="cover-image" />
                  </div>
                  <div className="mycard-icon">
                    <button className="icon-button btn like-btn">
                      <i
                        className="fa-regular fa-heart j-primary"
                        data-id="product-3"
                      ></i>
                    </button>
                  </div>
                  <div className="origin-color"></div>
                  <div className="mycard-title">
                    <h2 className="mb-0">商品名稱商品名稱商品名稱</h2>
                    <p className="mb-0"> $2000</p>
                    <div className="d-grid gap-2 mt-0 mt-md-3">
                      <button className="btn wo-line-btn" type="button">
                        加入購物車
                      </button>
                    </div>
                  </div>
                  <img src="./img/001.webp" className="character" />
                </div>
              </a>
            </div>
            <div className="col">
              <a href="#/" alt="Mythrill" target="_blank">
                <div className="mycard product">
                  <div className="wrapper">
                    <img src="./img/001.webp" className="cover-image" />
                  </div>
                  <div className="mycard-icon">
                    <button className="icon-button btn like-btn">
                      <i
                        className="fa-regular fa-heart j-primary"
                        data-id="product-4"
                      ></i>
                    </button>
                  </div>
                  <div className="origin-color"></div>
                  <div className="mycard-title">
                    <h2 className="mb-0">商品名稱商品名稱商品名稱</h2>
                    <p className="mb-0"> $2000</p>
                    <div className="d-grid gap-2 mt-0 mt-md-3">
                      <button className="btn wo-line-btn" type="button">
                        加入購物車
                      </button>
                    </div>
                  </div>
                  <img src="./img/001.webp" className="character" />
                </div>
              </a>
            </div>
            <div className="col">
              <a href="#/" alt="Mythrill" target="_blank">
                <div className="mycard product">
                  <div className="wrapper">
                    <img src="./img/001.webp" className="cover-image" />
                  </div>
                  <div className="mycard-icon">
                    <button className="icon-button btn like-btn">
                      <i
                        className="fa-regular fa-heart j-primary"
                        data-id="product-5"
                      ></i>
                    </button>
                  </div>
                  <div className="origin-color"></div>
                  <div className="mycard-title">
                    <h2 className="mb-0">商品名稱商品名稱商品名稱</h2>
                    <p className="mb-0"> $2000</p>
                    <div className="d-grid gap-2 mt-0 mt-md-3">
                      <button className="btn wo-line-btn" type="button">
                        加入購物車
                      </button>
                    </div>
                  </div>
                  <img src="./img/001.webp" className="character" />
                </div>
              </a>
            </div>
          </div>
          <button className="o-line-btn j-h3 d-block  d-md-none w-100">
            查看更多 <i className="fa-solid fa-angles-right"></i>
          </button>
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
                      {options.map((option) => (
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
                      {options.map((option) => (
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

      {/* <!-- 表格 --> */}
      <section className="container-fluid">
        <div className="container">
          <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span className="col-auto title j-deepSec"> 表格</span>
            <div className="title-line d-block d-md-none"></div>
          </div>
          <table>
            <thead className="j-deepPri d-none d-md-table-header-group">
              <tr>
                <td>check</td>
                <td>姓名</td>
                <td>數量</td>
                <td>編輯</td>
                <td>刪除</td>
              </tr>
            </thead>
            <tbody className="j-deepGray">
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="food"
                    value="1"
                    className="j-checkbox"
                  />
                </td>
                <td>王小明</td>
                <td>
                  <i className="fa-solid fa-square-minus"></i>
                  <span className="px-4">2</span>
                  <i className="fa-solid fa-square-plus"></i>
                </td>
                <td>
                  <i className="fa-solid fa-pen"></i>
                </td>
                <td>
                  <i className="fa-solid fa-trash-can"></i>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    name="food"
                    value="1"
                    className="j-checkbox"
                  />
                </td>
                <td>王小明</td>
                <td>
                  <i className="fa-solid fa-square-minus"></i>
                  <span className="px-4">1</span>
                  <i className="fa-solid fa-square-plus"></i>
                </td>
                <td>
                  <i className="fa-solid fa-pen"></i>
                </td>
                <td>
                  <i className="fa-solid fa-trash-can"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* <!-- 換頁 --> */}
      <section className="container-fluid">
        <div className="container">
          <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span className="col-auto title j-deepSec"> 換頁</span>
            <div className="title-line d-block d-md-none"></div>
          </div>
          <div className="change-page">
            <div className="change-option active h3">商品訂單</div>
            <div className="change-option h3">課程訂單</div>
          </div>
        </div>
      </section>

      {/* <!-- 購物流程 --> */}
      <section className="container-fluid">
        <div className="container">
          <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span className="col-auto title j-deepSec"> 購物流程</span>
            <div className="title-line d-block d-md-none"></div>
          </div>
          <div className="step-process">
            <div className="step complete">
              <h1>1</h1>
              <h3>步驟1</h3>
            </div>

            <div className="step active">
              <h1>2</h1>
              <h3>步驟2步驟2</h3>
            </div>
            <div className="step">
              <h1>3</h1>
              <h3>步驟3步驟3</h3>
            </div>
            <div className="step">
              <h1>4</h1>
              <h3>步驟4</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Test
