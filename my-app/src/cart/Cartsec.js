import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Stepprocess from './components/Stepprocess'
import axios from 'axios'
import Listopen from './components/Listopen'
import Line from './components/Line'
import AuthContext from '../Context/AuthContext'
import {
  CART_DATA,
  COUPON_DATA,
  MEMBER_DATA,
  UPDATED_ORDER,
} from './api_comfig'

const options2 = [
  { value: 'type1', label: 'LINE PAY' },
  { value: 'type2', label: '到店付款' },
]
function Cartsec() {
  const { myAuth } = useContext(AuthContext)
  console.log('myAuth', myAuth)
  //取得勾選到得購物車資料
  const [data, setData] = useState([{}])
  const getCartData = async () => {
    try {
      const storedSids = JSON.parse(localStorage.getItem('selectedSids')) || []
      const response = await axios.get(`${CART_DATA}${storedSids.join('/')}`, {
        withCredentials: true,
      })
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  //取得會員資料
  const [memberData, setMember] = useState({})
  const getMemberData = async () => {
    try {
      const response = await axios.get(`${MEMBER_DATA}${myAuth.sid}`, {
        withCredentials: true,
      })
      console.log(response.data)
      setMember(response.data[0])
    } catch (error) {
      console.error(error)
    }
  }

  //同訂購人checkbox
  const [userName, setUserName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const handleAutoInput = () => {
    console.log(memberData.name, memberData.phone, memberData.address)
    userName ? setUserName('') : setUserName(memberData.name)
    phone ? setPhone('') : setPhone(memberData.phone)
    address ? setAddress('') : setAddress(memberData.address)
  }

  //優惠卷 下拉式選單收合
  const [isMenuOpen1, setIsMenuOpen1] = useState(false)
  //控制input
  const [selectedCoupon, setSelectedCoupon] = useState('')
  const handleToggleDropdown1 = () => {
    setIsMenuOpen1(!isMenuOpen1)
  }
  const handleSelectOption1 = (coupon) => {
    setSelectedCoupon(coupon)
    console.log(coupon.code)
    setIsMenuOpen1(false)
  }
  //總數量
  const totalCount = data.reduce((acc, v, i) => acc + v.quantity, 0)
  //總金額
  let totalPrice = data.reduce((acc, v, i) => acc + v.price * v.quantity, 0)
  console.log('v.price', data.price)
  // 根據選擇的優惠卷做折扣
  const discount = selectedCoupon ? selectedCoupon.discount : 0
  const discountedPrice = totalPrice - discount
  //coupon API資料(需要會員登入的m_id)
  const [coupons, setCoupon] = useState([])
  const getCouponData = async () => {
    try {
      const response = await axios.post(
        COUPON_DATA,
        {
          memberId: myAuth.sid,
          types: [1, 2],
        },
        { withCredentials: true }
      )
      console.log('coupons', response.data)
      const couponData = response.data.rows // 取得第二個物件
      console.log('couponData', couponData)
      const filteredCoupons = couponData.filter(
        (coupon) => coupon.type === 1 || coupon.type === 2
      )
      setCoupon(filteredCoupons) // 設置為 coupons 狀態的值
    } catch (error) {
      console.log(error)
    }
  }

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

  //將訂單資料送回資料庫
  const updateOrder = async (data) => {
    // if (data.payment === '到店付款') {
    //   try {
    //   const orderId = 'P' + Date.now() // 建立 orderId
    //   const response = await axios.post(`${UPDATED_ORDER}${data[0].m_id}`, {
    //     product_order: {
    //       addressee: userName,
    //       phone: phone,
    //       address: address,
    //       payment: selectedValue2,
    //       amount: discountedPrice,
    //       orderId: orderId, // 將 orderId 傳送到後端
    //       product_order_details: data.map(
    //         ({ product_ch, product_eg, price, quantity }) => ({
    //           product_ch,
    //           product_eg,
    //           price,
    //           quantity,
    //         })
    //       ),
    //     },
    //   })
    //   localStorage.setItem('orderId', orderId) // 儲存 orderId 到 localStorage
    //   console.log('result', response.data)
    // } catch (error) {
    //   console.log(error)
    //   console.log(error.response.data)
    //   // localStorage.removeItem('orderId')
    // }
    // } else {
    const orderId = 'P' + Date.now()
    const amount = totalPrice - discount
    const response = await axios.post(`${UPDATED_ORDER}${myAuth.sid}`, {
      amount: amount,
      addressee: userName,
      orderId: orderId,
      phone: phone,
      address: address,
      payment: 'LINE PAY',
      products: data.map(({ product_ch, price, quantity, product_id }) => ({
        id: product_id,
        name: product_ch,
        price: price,
        quantity: quantity,
        discount: discount,
      })),
    })
    console.log('discountedPrice', totalPrice)
    const resLINE = response.data
    console.log('resLINE.data.web', resLINE.web)
    const orderData = {
      orderId,
      amount: amount,
    }
    console.log('discountedPrice', discountedPrice)
    localStorage.setItem('orderData', JSON.stringify(orderData))
    console.log('result', response.data)
    window.location.href = resLINE.web
    // }
  }

  //無LINE PAY
  // const updateOrder = async (data) => {
  //   try {
  //     const orderId = 'P' + Date.now() // 建立 orderId
  //     const response = await axios.post(`${UPDATED_ORDER}${data[0].m_id}`, {
  //       product_order: {
  //         addressee: userName,
  //         phone: phone,
  //         address: address,
  //         payment: selectedValue2,
  //         amount: discountedPrice,
  //         orderId: orderId, // 將 orderId 傳送到後端
  //         product_order_details: data.map(
  //           ({ product_ch, product_eg, price, quantity }) => ({
  //             product_ch,
  //             product_eg,
  //             price,
  //             quantity,
  //           })
  //         ),
  //       },
  //     })
  //     localStorage.setItem('orderId', orderId) // 儲存 orderId 到 localStorage
  //     console.log('result', response.data)
  //   } catch (error) {
  //     console.log(error)
  //     console.log(error.response.data)
  //     // locuseStatealStorage.removeItem('orderId')
  //   }
  //  }

  //按下一步後將資料傳送到updateOrder
  const handleNext = () => {
    if (!userName && !phone && !address) {
      return
    }
    updateOrder(data)
    console.log(data[0].m_id)
  }

  //拆元件後無法判斷!!!
  const [addressInput, setAddressInput] = useState(false)
  const [phoneInput, setPhoneInput] = useState(false)
  const [usernameInput, setUserNameInput] = useState(false)
  const [paymentInput, setPaymentInput] = useState(false)
  const handleSubmit = (e) => {
    if (!userName || !phone || !address || selectedValue2 === '請選擇...') {
      e.preventDefault()
      setPhoneInput(!phone)
      setUserNameInput(!userName)
      setAddressInput(!address)
      setPaymentInput(true)
    } else {
      handleNext()
    }
  }

  useEffect(() => {
    getCartData()
    getMemberData()
    getCouponData()
    updateOrder()
    return () => {
      //解除功能
      console.log('unmount')
    }
  }, [])
  return (
    <>
      {/* 購物流程 */}
      <section className="container-fluid nav-space">
        <Stepprocess />
      </section>
      <section className="container-fluid orderTable">
        <Listopen toggleTable={toggleTable} isOpen={isOpen} data={data} />
      </section>
      {/* 分隔線 */}
      <section className="container-fluid pb-5 d-none d-md-block">
        <Line />
      </section>
      {/* 訂購人資訊 */}
      <section className="container-fluid ">
        {/* memberData有資料且也有memberData.m_id的話渲染此元素 */}
        {memberData && memberData.sid && (
          <div className="container myWidth" key={memberData.sid}>
            <div className="tableTitle h3 j-deepSec headTitle">訂購人</div>
            <table>
              <tbody className="j-deepGray">
                <tr className="row g-0">
                  <td className="col-2 j-deepPri h3">姓名</td>
                  <td className="col-10 j-deepGray text-start h3">
                    {memberData.name}
                  </td>
                </tr>
                <tr className="row g-0">
                  <td className="col-2 j-deepPri h3">手機</td>
                  <td className="col-10 j-deepGray text-start h3">
                    {memberData.phone}
                  </td>
                </tr>
                <tr className="row g-0">
                  <td className="col-2 j-deepPri h3">地址</td>
                  <td className="col-10 j-deepGray text-start h3">
                    {memberData.address}
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
                  required
                  type="text"
                  id="userName"
                  name="userName"
                  className="input-text"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value)
                  }}
                />
                {usernameInput && (
                  <span className="error-message red">請輸入姓名</span>
                )}
              </div>
              <div className="j-input w-75 mx-2">
                <div>
                  <label htmlFor="phone">手機</label>
                </div>
                <input
                  required
                  type="number"
                  name="phone"
                  id="phone"
                  className="input-text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                  }}
                />
                {phoneInput && (
                  <span className="error-message red">請輸入手機</span>
                )}
              </div>
            </div>
            <div className="d-flex ">
              <div className="j-input w-100 mx-2">
                <div>
                  <label htmlFor="address">地址</label>
                </div>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="input-text"
                  required
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                  }}
                />
                {addressInput && (
                  <span className="error-message red">請輸入地址</span>
                )}
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
                      {selectedCoupon
                        ? selectedCoupon.couponTitle
                        : '請選擇...'}
                    </span>
                    <i className="fas fa-caret-down"></i>
                  </div>

                  {isMenuOpen1 && (
                    <ul className="dropdown-menu mt-2">
                      {coupons.map((coupon) => (
                        <li
                          key={coupon.couponTitle}
                          onClick={() => handleSelectOption1(coupon)}
                        >
                          {coupon.couponTitle}
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
                  {paymentInput && (
                    <span className="error-message red">請選擇付款方式</span>
                  )}
                  {isMenuOpen2 && (
                    <ul className="dropdown-menu mt-2">
                      {options2.map((option) => (
                        <li
                          key={option.value}
                          onClick={() => {
                            handleSelectOption2(option)
                          }}
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
                {/* <div>
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
                  {paymentInput && (
                    <span className="error-message red">請選擇付款方式</span>
                  )}
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
                </div> */}
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
              <Link
                className="gray-line-btn j-h3 title-button me-3"
                to="/cart"
                onClick={() => {
                  localStorage.removeItem('selectedSids')
                }}
              >
                上一步
              </Link>
              <Link
                to="/cart/cart03"
                className="g-line-btn j-h3 j-white"
                onClick={(e) => handleSubmit(e)}
                type="submit"
              >
                送出
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Cartsec
