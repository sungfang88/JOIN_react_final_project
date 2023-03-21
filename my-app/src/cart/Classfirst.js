import React, { useState, useEffect, useContext } from 'react'
import '../Public/style'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import Line from './components/Line'
import Classmember from './components/Classmember'
import Classstepprocess from './components/Classstepprocess'
import AuthContext from '../Context/AuthContext'
import {
  CLASSFORM_DATA,
  MEMBER_DATA,
  UPDATED_CLASSFORM,
  UPDATED_COUPON,
  COUPON_DATA,
} from './api_comfig'

const options2 = [{ value: 'type1', label: '到店付款' }]

function Classfirst() {
  const { myAuth } = useContext(AuthContext)
  console.log('myAuth', myAuth)
  //取得classOrder資料
  const [data, setData] = useState([])
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const class_form_sid = searchParams.get('class_form_sid')
  const getClassData = async () => {
    try {
      const response = await axios.get(`${CLASSFORM_DATA}${class_form_sid}`, {
        withCredentials: true,
      })
      setData(response.data)
      console.log('response.data', response.data)
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

  //優惠卷 下拉式選單收合
  const [isMenuOpen1, setIsMenuOpen1] = useState(false)
  //控制input
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const handleToggleDropdown1 = () => {
    setIsMenuOpen1(!isMenuOpen1)
  }
  const handleSelectOption1 = (coupon) => {
    setSelectedCoupon(coupon)
    localStorage.setItem('itemId', JSON.stringify(coupon.itemId))
    console.log('couponcoupon', coupon)
    setIsMenuOpen1(false)
  }
  //總金額
  let totalPrice = 0
  if (data && data.length && data[0].class_prople) {
    totalPrice = parseInt(data[0].class_prople, 10) * 2400
  }
  console.log('class_people', data[0]?.class_prople)

  //coupon API資料(需要會員登入的m_id)
  const [coupons, setCoupon] = useState([])
  const getCouponData = async () => {
    try {
      const response = await axios.post(
        COUPON_DATA,
        {
          memberId: myAuth.sid,
          types: [1, 3],
        },
        { withCredentials: true }
      )
      console.log('coupons', response.data)
      const couponData = response.data.rows
      const filteredCoupons = couponData.filter(
        (coupon) => coupon.type === 1 || coupon.type === 3
      )
      setCoupon(filteredCoupons)
    } catch (error) {
      console.log(error)
    }
  }

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

  // 總金額
  const discountedPrice = totalPrice - discount
  console.log('coupons', coupons)

  //判斷選擇付款方式是否正確
  const [paymentInput, setPaymentInput] = useState(false)
  const handleSubmit = (e) => {
    if (selectedValue2 === '請選擇...') {
      e.preventDefault()
      setPaymentInput(selectedValue2 === '請選擇...')
    } else {
      updateForm().then(() => {
        localStorage.getItem('orderId')
        localStorage.getItem('itemId')
        upDataCoupon(couponsData).then(() => {
          window.location.href = '/cart/classOrder02'
        })
      })
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

  //送出課程訂單
  const [classOrder, setClassOrder] = useState()
  const updateForm = async (data) => {
    try {
      const orderId = 'C' + Date.now() // 建立 orderId
      const class_form_sid = 2
      const response = await axios.post(
        `${UPDATED_CLASSFORM}${class_form_sid}`,
        {
          orderId: orderId,
          m_id: myAuth.sid,
          class_form_sid: class_form_sid, //
          amount: discountedPrice,
        },
        {
          withCredentials: true,
        }
      )
      localStorage.setItem('orderId', JSON.stringify(orderId))
      console.log(response.data)
      setClassOrder(response.data)
    } catch (error) {
      console.error(error)
    }
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
          orderId: JSON.parse(localStorage.getItem('orderId')),
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

  useEffect(() => {
    getClassData()
    getMemberData()
    upDataCoupon()
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
        <Classstepprocess />
      </section>
      {/* ul li做的表單 */}
      <section className="container-fluid  orderTable">
        <div className="container ">
          <div className="headTitle h3 j-deepSec mb-3">課程訂單明細</div>
          <ul className="g-0 mx-3">
            <div className="d-md-flex d-none tableTitle mb-3">
              <li className="col-2 h3"></li>
              <ul className="col-10 g-0 row d-grid d-md-flex text-center ">
                <li className="col">時間/時段</li>
                <li className="col">組合</li>
                <li className="col">Bartender</li>
                <li className="col">價錢</li>
                <li className="col">人數</li>
              </ul>
            </div>
            {data.slice(0, 1).map((r) => {
              return (
                <div className=" d-flex tableTbody" key={r.sid}>
                  <li className="col-md-2 col-6 ">
                    <img
                      className="orderImg"
                      src={require('./img/classimg.png')}
                      alt=""
                    />
                  </li>
                  <ul className="col-md-10 col-6 g-0  d-grid d-md-flex text-center ms-md-0 ms-3">
                    <li className="col">
                      {r.class_date.slice(0, 10)}
                      <br />
                      {r.time}
                    </li>
                    <li className="col">{r.class_id}課程</li>
                    <li className="col">{r.Bartender}</li>
                    <li className="col d-md-flex d-none">$2,400</li>
                    <li className="col">{r.class_prople}人</li>
                  </ul>
                </div>
              )
            })}
          </ul>
        </div>
      </section>

      {/* 分隔線 */}
      <section className="container-fluid pb-5 d-none d-md-block">
        <Line />
      </section>

      {/* 訂購人資訊 */}
      <section className="container-fluid ">
        <Classmember memberData={memberData} />
      </section>

      {/* 付款資訊 */}
      <section className="container-fluid ">
        <div className="container myWidth mb-3">
          <form action="" className=" m-0">
            <div className="tableTitle h3 j-deepSec headTitle">付款資訊</div>
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
                    <span className="dropdown-label ellipsis">
                      {selectedCoupon
                        ? selectedCoupon.description
                        : '請選擇...'}
                    </span>
                    <i className="fas fa-caret-down"></i>
                  </div>

                  {isMenuOpen1 && (
                    <ul className="dropdown-menu mt-2 ">
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
                        課程訂單數
                      </td>
                      <td className="classTd text-end j-h3">共 1 堂</td>
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
                        {discountedPrice}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-center">
              <Link
                to="/class/Classsec" //尚未確認
                className="gray-line-btn j-h3 title-button me-2"
              >
                回課程資訊
              </Link>
              <Link
                to="#"
                className="g-line-btn j-h3 j-white"
                onClick={handleSubmit}
                type="submit"
              >
                送出訂單
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Classfirst
