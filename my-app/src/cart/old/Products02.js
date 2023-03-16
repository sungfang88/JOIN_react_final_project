import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CART_DATA, COUPON_DATA, PRODUCTS_DATA } from '../api_comfig'

const options2 = [
  { value: 'type1', label: 'LINE PAY' },
  { value: 'type2', label: '到店付款' },
]
function Products02() {
  //取得購物車資料
  const [data, setData] = useState([{}])
  const getCartData = async () => {
    const r = await fetch(CART_DATA, {
      credentials: 'include',
    })
    const json = await r.json()
    // console.log(json)
    setData(json)
  }

  //取得會員資料
  const [memberData, setMember] = useState({})
  const getMemberData = async () => {
    const a = await fetch(PRODUCTS_DATA, {
      credentials: 'include',
    })
    const json = await a.json()
    console.log(json)
    setMember(json[0]) //取一筆
  }

  //同訂購人checkbox
  const [userName, setUserName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const handleAutoInput = () => {
    console.log(memberData.m_name, memberData.m_phone, memberData.m_address)
    userName ? setUserName('') : setUserName(memberData.m_name)
    phone ? setPhone('') : setPhone(memberData.m_phone)
    address ? setAddress('') : setAddress(memberData.m_address)
  }

  //coupon 資料
  const [coupons, setCoupon] = useState([])
  const getCouponData = async () => {
    const response = await fetch(COUPON_DATA, {
      credentials: 'include',
    })
    const coupons = await response.json()
    const filteredCoupon = coupons.filter(
      (item) => item.type === 2 && item.order_sid == null
    )
    setCoupon(filteredCoupon)
    console.log(filteredCoupon)
  }
  //優惠卷 下拉式選單收合
  const [isMenuOpen1, setIsMenuOpen1] = useState(false)
  //控制input
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const handleToggleDropdown1 = () => {
    setIsMenuOpen1(!isMenuOpen1)
  }
  const handleSelectOption1 = (coupon) => {
    setSelectedCoupon(coupon)
    console.log(coupon.code)
    setIsMenuOpen1(false)
  }
  const totalCount = data.reduce((acc, v, i) => acc + v.quantity, 0)
  //總金額
  let totalPrice = data.reduce((acc, v, i) => acc + v.price * v.quantity, 0)
  let discount
  // 根據選擇的優惠卷做折扣
  switch (selectedCoupon?.code) {
    case 'PROJ20':
      discount = totalPrice - totalPrice * 0.8
      break
    case 'WEEK20':
      discount = totalPrice - totalPrice * 0.8
      break
    case 'hanberg':
      if (totalPrice > 1000) {
        discount = totalPrice - 100
      }
      break
    case 'test':
      discount = totalPrice - totalPrice * 0.8
      break
    default:
      discount = 0
  }
  const discountedPrice = totalPrice - discount

  //付款方式 下拉式選單收合
  const [isMenuOpen2, setIsMenuOpen2] = useState(false)
  //控制input
  const [selectedValue2, setSelectedValue2] = useState('請選擇...')
  const handleToggleDropdown2 = () => {
    setIsMenuOpen2(!isMenuOpen2)
  }
  const handleSelectOption2 = (option) => {
    setSelectedValue2(option.label)
    setIsMenuOpen2(false)
  }

  //控制商品明細收合
  const [isOpen, setIsOpen] = useState(false)
  const toggleTable = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    getCartData()
    getMemberData()
    getCouponData()
    return () => {
      //解除功能
      console.log('unmount')
    }
  }, [])
  return (
    <>
      {/* 購物流程 */}
      <section className="container-fluid nav-space">
        <div className="container">
          <div className="step-process">
            <div className="step complete">
              <h1>1</h1>
              <h3>購物車</h3>
            </div>
            <div className="step active">
              <h1>2</h1>
              <h3>填寫資料</h3>
            </div>

            <div className="step ">
              <h1>3</h1>
              <h3>訂單確認</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="container-fluid orderTable">
        <div className="container">
          <div
            className="headTitle h3 j-deepSec mb-3 d-flex justify-content-between"
            onClick={toggleTable}
          >
            <p className="m-0">商品訂單明細</p>
            <img id="toggle-btn" src="../img/Icon/Dropdown.png" alt="" />
          </div>
          {/* isOpen 為一個布林值變數，當其為 true 時，代表要顯示該元素。所以當 isOpen 為 true 時，該元素會被渲染出來 */}
          {isOpen && (
            <ul id="order-list" className="g-0 m-auto mx-3 ">
              <div className="d-md-flex d-none tableTitle mb-3">
                <li className="col-2 h3"></li>
                <ul className="text-center d-md-flex d-grid col-md-10 col-6 g-0">
                  <li className="col">品項</li>
                  <li className="col">價錢</li>
                  <li className="col">數量</li>
                </ul>
              </div>
              {data.map((r) => {
                return (
                  <div className="d-flex tableTbody hide mb-2 orderBottomLine">
                    <li className="col-md-2 col-6 text-center" key={r.sid}>
                      <img
                        className="orderImg  ms-3"
                        src={r.product_img}
                        alt=""
                      />
                    </li>
                    <ul className="col-md-10 col-6 g-0 row d-grid d-md-flex text-center">
                      <li className="col fs-7">
                        <div>
                          {r.product_ch}
                          <br />
                          <span className="d-none d-md-grid">
                            {r.product_eg}
                          </span>
                        </div>
                      </li>
                      <li className="col">{r.price}</li>
                      <li className="col">{r.quantity}件</li>
                    </ul>
                  </div>
                )
              })}
            </ul>
          )}
        </div>
      </section>
      {/* 分隔線 */}
      <section className="container-fluid pb-5 d-none d-md-block">
        <div className="container">
          <div className="d-flex justify-content-center">
            <span className="line"></span>
            <div className="text-center h2 mx-5 j-deepSec">
              <p className="d-inline">填寫訂購與付款資料</p>
            </div>
            <span className="line"></span>
          </div>
        </div>
      </section>
      {/* 訂購人資訊 */}
      <section className="container-fluid ">
        {/* memberData有資料且也有memberData.m_id的話渲染此元素 */}
        {memberData && memberData.m_id && (
          <div className="container myWidth" key={memberData.m_id}>
            <div className="tableTitle h3 j-deepSec headTitle">訂購人</div>
            <table>
              <tbody className="j-deepGray">
                <tr className="row g-0">
                  <td className="col-2 j-deepPri h3">姓名</td>
                  <td className="col-10 j-deepGray text-start h3">
                    {memberData.m_name}
                  </td>
                </tr>
                <tr className="row g-0">
                  <td className="col-2 j-deepPri h3">手機</td>
                  <td className="col-10 j-deepGray text-start h3">
                    {memberData.m_phone}
                  </td>
                </tr>
                <tr className="row g-0">
                  <td className="col-2 j-deepPri h3">地址</td>
                  <td className="col-10 j-deepGray text-start h3">
                    {memberData.m_address}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 付款資訊 */}
      <section className="container-fluid ">
        <div className="container myWidth">
          <form action="" className=" m-0">
            <div className="headTitle h3 j-deepSec d-flex justify-content-between">
              <p className="mb-0">收件人資料</p>
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  name="food"
                  value="1"
                  className="j-checkbox me-3"
                  onClick={handleAutoInput}
                />
                <p className="mb-0">同訂購人</p>
              </div>
            </div>
            <div className="d-flex ">
              <div className="j-input w-75 mx-2">
                <div>
                  <label htmlFor="name">姓名</label>
                </div>
                <input
                  type="text"
                  id="name"
                  className="input-text"
                  required
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value)
                  }}
                />
              </div>
              <div className="j-input w-75 mx-2">
                <div>
                  <label htmlFor="phone">手機</label>
                </div>
                <input
                  type="number"
                  id="phone"
                  className="input-text"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className="d-flex ">
              <div className="j-input w-100 mx-2">
                <div>
                  <label htmlFor="address">地址</label>
                </div>
                <input
                  type="text"
                  id="address"
                  className="input-text"
                  required
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className="d-md-flex mx-2">
              <div className="j-input myWidth me-3 mb-3">
                <div>
                  <label htmlFor="period">我的優惠卷</label>
                </div>
                <div className="dropdown">
                  <div
                    className="dropdown-toggle"
                    onClick={handleToggleDropdown1}
                  >
                    <span className="dropdown-label">
                      {selectedCoupon ? selectedCoupon.code : '請選擇...'}
                    </span>
                    <i className="fas fa-caret-down"></i>
                  </div>

                  {isMenuOpen1 && (
                    <ul className="dropdown-menu mt-2">
                      {coupons.map((coupon) => (
                        <li
                          key={coupon.code}
                          onClick={() => handleSelectOption1(coupon)}
                        >
                          {coupon.code}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="j-input myWidth mb-3">
                <div>
                  <label htmlFor="period">付款方式</label>
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
            </div>

            {/* 金額總計  */}
            <div className="d-flex justify-content-end">
              <div className="col-md-5 col-12 py-5 ">
                <table>
                  <tbody className="j-deepGray">
                    <tr>
                      <td className="classTd text-start j-h3 j-deepPri">
                        商品訂單數
                      </td>
                      <td className="classTd text-end j-h3">
                        共 {totalCount} 件
                      </td>
                    </tr>
                    <tr>
                      <td className="classTd text-start h3 j-deepPri">小計</td>
                      <td className="classTd text-end h3">{totalPrice}</td>
                    </tr>
                    <tr>
                      <td className="classTd text-start h3 j-deepPri">
                        優惠券折扣
                      </td>
                      <td className="classTd text-end h3">{discount}</td>
                    </tr>
                    <tr>
                      <td className="classTd text-start h3 j-deepPri">
                        應付總金額
                      </td>
                      <td className="classTd text-end h2 j-deepSec">
                        NT {discountedPrice}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-center">
              <Link className="gray-line-btn j-h3 title-button" to="/cart">
                上一步
              </Link>
              <Link
                type="submit"
                className="g-line-btn j-h3 j-white"
                value="送出"
                to="/cart/cart03"
              />
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Products02
