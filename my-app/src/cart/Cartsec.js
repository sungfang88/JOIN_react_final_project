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
  UPDATED_COUPON,
} from './api_comfig'

const options2 = [{ value: 'type1', label: 'LINE PAY' }]

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
      console.log('getcartdata', response.data)
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
    localStorage.setItem('itemId', JSON.stringify(coupon.itemId))
    console.log(coupon.code)
    setIsMenuOpen1(false)
  }

  //算數量
  const totalCount = data.reduce((acc, v, i) => {
    if (typeof v.quantity === 'number' && !isNaN(v.quantity)) {
      return acc + v.quantity
    } else {
      return acc
    }
  }, 0)

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

  //算總金額
  let totalPrice = 0 // 先声明并初始化为 0
  totalPrice = data.reduce((acc, v, i) => {
    if (
      typeof v.price === 'number' &&
      !isNaN(v.price) &&
      typeof v.quantity === 'number' &&
      !isNaN(v.quantity)
    ) {
      return acc + v.price * v.quantity
    } else {
      return acc
    }
  }, 0)
  console.log('totalPrice', totalPrice) // 使用 totalPrice 变量进行调试

  // 優惠券折扣
  let discount = 0
  if (
    selectedCoupon &&
    coupons.some((coupon) => coupon.itemId === selectedCoupon.itemId)
  ) {
    const coupon = coupons.find(
      (coupon) => coupon.itemId === selectedCoupon.itemId
    )
    if (coupon.discount_type === 1) {
      // 固定金额折扣
      discount = coupon.discount
    } else if (coupon.discount_type === 2) {
      // 百分比折扣
      discount = (totalPrice * coupon.discount) / 100
    }
  }

  // 折扣後總金額
  const discountedPrice = totalPrice - discount
  console.log('coupons', coupons)
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
    console.log('data', data)
    const orderId = 'P' + Date.now()
    let totalQuantity = 0
    let priceDiscount = 0
    data.forEach(({ quantity }) => {
      totalQuantity += quantity
      priceDiscount = discount / totalQuantity
    })
    const response = await axios.post(`${UPDATED_ORDER}${myAuth.sid}`, {
      amount: discountedPrice,
      addressee: userName,
      orderId: orderId,
      phone: phone,
      address: address,
      payment: 'LINE PAY待付款',
      products: data.map(({ product_ch, price, quantity, product_id }) => {
        const discountedPrice = price - priceDiscount / quantity
        return {
          id: product_id,
          name: product_ch,
          price: discountedPrice,
          quantity: quantity,
          itemsAmount: discountedPrice,
        }
      }),
    })
    const resLINE = response.data
    console.log('resLINE.data.web', response.data)
    localStorage.setItem('orderId', orderId)
    console.log('result', response)
    window.location.href = resLINE.web
  }

  //將優惠卷的資料庫改寫
  const [couponsData, setCouponData] = useState([])
  const upDataCoupon = async () => {
    console.log('coupons.itemId', coupons.itemId)
    try {
      const response = await axios.post(
        UPDATED_COUPON,
        {
          memberId: myAuth.sid,
          orderId: localStorage.getItem('orderId'),
          itemId: localStorage.getItem('itemId'),
        },
        { withCredentials: true }
      )
      console.log('couponsData', localStorage.getItem('orderId'))
      setCouponData(selectedCoupon)
    } catch (error) {
      console.log(error)
    }
  }

  //判斷是否都有填寫
  const [addressInput, setAddressInput] = useState(false)
  const [phoneInput, setPhoneInput] = useState(false)
  const [usernameInput, setUserNameInput] = useState(false)
  const [paymentInput, setPaymentInput] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!userName || !phone || !address || selectedValue2 === '請選擇...') {
      e.preventDefault()
      setPhoneInput(!phone)
      setUserNameInput(!userName)
      setAddressInput(!address)
      setPaymentInput(true)
    } else {
      getCartData().then(() => {
        updateOrder(data).then(() => {
          localStorage.getItem('orderId')
          localStorage.getItem('itemId')
          upDataCoupon(couponsData)
        })
      })
    }
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
                    className="dropdown-toggle "
                    onClick={handleToggleDropdown1}
                  >
                    <span className="dropdown-label ellipsis">
                      {selectedCoupon
                        ? selectedCoupon.description
                        : '請選擇...'}
                    </span>
                    <i className="fas fa-caret-down"></i>
                  </div>

                  {isMenuOpen1 && (
                    <ul className="dropdown-menu mt-2">
                      {coupons
                        .filter((coupon) => totalPrice >= coupon.threshold)
                        .map((coupon, index) => (
                          <li
                            key={`coupon-${index}`} // 使用 index 作为 key
                            onClick={() => handleSelectOption1(coupon)}
                          >
                            {coupon.description}
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
              <button
                className="g-line-btn j-h3 j-white"
                onClick={(e) => {
                  handleSubmit(e)
                  e.preventDefault()
                }}
              >
                送出
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Cartsec
