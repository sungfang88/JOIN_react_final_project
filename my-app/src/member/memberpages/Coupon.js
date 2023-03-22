import { useState, useRef, useContext, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { COUPONDATA, ALLDATA } from '../membercomponents/memberapi_config'
import axios from 'axios'
import AuthContext from '../../Context/AuthContext'
import dayjs from 'dayjs'

function Coupon() {
  const navigate = useNavigate()
  const [coupondata, setCoupondata] = useState([
    {
      title: '',
      end_date: '',
      status: 0,
      expire_soon: '',
      expirecolor: '',
    },
  ])
  const [memberLevel, setMemberLevel] = useState('')
  const [levelTitle, setLevelTitle] = useState('')

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { myAuth } = useContext(AuthContext)

  const [alldata, setAlldata] = useState({
    coupondata: false,
    listdata: false,
    classdata: false,
    seatdata: false,
    mystoredata: false,
  })
  const [fivecoupon, setFivecoupon] = useState([
    {
      title: '',
      end_date: '',
      status: 0,
      expire_soon: '',
      expirecolor: '',
    },
  ])
  const [expectfivecoupon, setExpectFivecoupon] = useState([
    {
      title: '',
      end_date: '',
      status: 0,
      expire_soon: '',
      expirecolor: '',
    },
  ])

  const [showallcoupon, setShowallcoupon] = useState(false)

  const getAllData = async () => {
    const getall = await axios.get(ALLDATA + '/' + myAuth.sid)
    console.log('getall.data', getall.data)
    setAlldata(getall.data)
  }

  const getData = async () => {
    const response = await axios.get(COUPONDATA + '/' + myAuth.sid)
    console.log(response.data.data)
    setCoupondata(response.data.data)
    setFivecoupon(
      response.data.data.filter((v, i) => {
        return i < 5
      })
    )
    setExpectFivecoupon(
      response.data.data.filter((v, i) => {
        return i >= 5
      })
    )
    console.log('fivecoupon', fivecoupon)
    if (response.data.member_level === 1) {
      setMemberLevel('text-secondary')
      setLevelTitle('銀牌會員')
    } else if (response.data.member_level === 2) {
      setMemberLevel('text-warning')
      setLevelTitle('金牌會員')
    } else {
      setMemberLevel('text-success')
      setLevelTitle('大神會員')
    }
  }
  useEffect(() => {
    getData()
  }, [showallcoupon])
  useEffect(() => {
    getAllData()
  }, [])

  // 點擊下拉式選單裡的項目時，在隱藏的input中告知選到誰，並關閉下拉式選單
  function handleMenuItemClick(event) {
    const selectedValue = event.target.parentElement.getAttribute('data-value')
    document.querySelector('#selected').value = selectedValue
    setIsMenuOpen(false)
  }

  // 點擊下拉式選單時，展開或收合選單
  function handleToggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* <!-- 麵包屑 --> */}
      <div className="container-fluid d-none d-md-block nav-space pb-5">
        <div className="container">
          <div className="row sec-navbar">
            <div className="col-auto">
              <a
                href="#/"
                className="me-1"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/member')
                }}
              >
                會員
              </a>
              /{' '}
              <a
                href="#/"
                className="me-1"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/member/coupon')
                }}
              >
                優惠券
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- 主section(電腦版) --> */}
      <section className="container-fluid nav-space pt-md-0 d-none d-md-block">
        <div className="container">
          <div className="row">
            <div className="col-2 d-none d-lg-block">
              <div className="d-flex flex-column">
                <button
                  className="g-line-btn j-h3 mb-2 me-4"
                  onClick={() => {
                    navigate('/member')
                  }}
                >
                  會員資料
                </button>
                {alldata.coupondata ? (
                  <button
                    className="g-line-btn j-h3 mb-2 me-4"
                    onClick={() => {
                      navigate('/member/coupon')
                    }}
                  >
                    優惠券
                  </button>
                ) : (
                  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
                    優惠券
                  </button>
                )}

                {alldata.listdata ? (
                  <button
                    className="g-line-btn j-h3 mb-2 me-4"
                    onClick={() => {
                      navigate('/member/orderlist')
                    }}
                  >
                    訂單紀錄
                  </button>
                ) : (
                  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
                    訂單紀錄
                  </button>
                )}
                {alldata.classdata ? (
                  <button
                    className="g-line-btn j-h3 mb-2 me-4"
                    onClick={() => {
                      navigate('/member/orderclass')
                    }}
                  >
                    課程紀錄
                  </button>
                ) : (
                  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
                    課程紀錄
                  </button>
                )}
                {alldata.seatdata ? (
                  <button
                    className="g-line-btn j-h3 mb-2 me-4"
                    onClick={() => {
                      navigate('/member/booking')
                    }}
                  >
                    訂位紀錄
                  </button>
                ) : (
                  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
                    訂位紀錄
                  </button>
                )}
                {alldata.mystoredata ? (
                  <button
                    className="g-line-btn j-h3 mb-2 me-4"
                    onClick={() => {
                      navigate('/member/mystore')
                    }}
                  >
                    我的收藏
                  </button>
                ) : (
                  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
                    我的收藏
                  </button>
                )}
              </div>
            </div>
            <div className="col-10 border-start border-2">
              <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
                <span className="col-2 title j-deepSec">優惠券</span>
                <div className="title-line d-block d-md-none"></div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-4">
                    <div className="medal text-center">
                      <i
                        className={
                          'fa-sharp fa-solid fa-medal j-deepPri ' + memberLevel
                        }
                      ></i>
                      <h3 className="mt-3 j-deepGray">{levelTitle}</h3>
                    </div>
                  </div>
                  <div className="col-8">
                    <table className="mt-3">
                      <thead className="j-deepPri d-md-table-header-group">
                        <tr>
                          <td>優惠券</td>
                          <td>過期時間</td>
                          <td>狀態</td>
                        </tr>
                      </thead>

                      <tbody className="j-deepGray">
                        {fivecoupon.map((v, i) => {
                          return (
                            <tr key={i}>
                              <td>{v.title}</td>
                              <td>{dayjs(v.end_date).format('YYYY-MM-DD')}</td>
                              <td>
                                <span className={v.expirecolor}>
                                  {v.expire_soon}
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                        {showallcoupon
                          ? expectfivecoupon.map((v, i) => {
                              return (
                                <tr key={i}>
                                  <td>{v.title}</td>
                                  <td>
                                    {dayjs(v.end_date).format('YYYY-MM-DD')}
                                  </td>
                                  <td>
                                    <span className={v.expirecolor}>
                                      {v.expire_soon}
                                    </span>
                                  </td>
                                </tr>
                              )
                            })
                          : []}
                      </tbody>
                    </table>
                    {expectfivecoupon.length > 0 ? (
                      <div className="col-12">
                        <div className="j-deepPri d-flex justify-content-center border-top border-3 mt-3 pt-3 sec-navbar">
                          {showallcoupon ? (
                            <a
                              href="#/"
                              className="j-deepSec"
                              onClick={() => {
                                setShowallcoupon(!showallcoupon)
                              }}
                            >
                              顯示部分優惠券&nbsp;&nbsp;
                              <i className="fa-sharp fa-solid fa-caret-up"></i>
                            </a>
                          ) : (
                            <a
                              href="#/"
                              className="j-deepSec"
                              onClick={() => {
                                setShowallcoupon(!showallcoupon)
                              }}
                            >
                              顯示所有優惠券&nbsp;&nbsp;
                              <i className="fa-sharp fa-solid fa-caret-down"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="button-group d-flex justify-content-end mt-5 mb-5">
                      <button
                        className="o-line-btn j-h3 me-2"
                        onClick={() => {
                          navigate('/cart')
                        }}
                      >
                        立即購物使用&nbsp;&gt;&gt;
                      </button>
                      <button
                        className="o-line-btn j-h3"
                        onClick={() => {
                          navigate('/news/coupon')
                        }}
                      >
                        立即領取優惠&nbsp;&gt;&gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- 主section(手機版) --> */}
      <section className="container-fluid nav-space pt-md-0 d-md-none">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-4">
              {/* 下拉式選單  */}
              <div className="j-input">
                <div className="dropdown" ref={dropdownRef}>
                  <div
                    className={`dropdown-toggle ${isMenuOpen ? 'active' : ''}`}
                    onClick={handleToggleMenu}
                  >
                    <span
                      className="dropdown-label"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      分頁清單
                    </span>
                  </div>
                  <ul
                    className={`dropdown-menu mt-2 ${
                      isMenuOpen ? '' : 'd-none'
                    }`}
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li data-value="data" onClick={handleMenuItemClick}>
                      <a
                        href="#/"
                        className="j-deepGray d-block"
                        onClick={(e) => {
                          e.preventDefault()
                          navigate('/member')
                        }}
                      >
                        會員資料
                      </a>
                    </li>
                    <li data-value="coupon" onClick={handleMenuItemClick}>
                      <a
                        href="#/"
                        className="j-deepGray d-block"
                        onClick={(e) => {
                          e.preventDefault()
                          navigate('/member/coupon')
                        }}
                      >
                        優惠券
                      </a>
                    </li>
                    <li data-value="orderlist" onClick={handleMenuItemClick}>
                      <a
                        href="#/"
                        className="j-deepGray d-block"
                        onClick={(e) => {
                          e.preventDefault()
                          navigate('/member/orderlist')
                        }}
                      >
                        訂單紀錄
                      </a>
                    </li>
                    <li data-value="orderlist" onClick={handleMenuItemClick}>
                      <a
                        href="#/"
                        className="j-deepGray d-block"
                        onClick={(e) => {
                          e.preventDefault()
                          navigate('/member/orderclass')
                        }}
                      >
                        課程紀錄
                      </a>
                    </li>
                    <li data-value="orderlist" onClick={handleMenuItemClick}>
                      <a
                        href="#/"
                        className="j-deepGray d-block"
                        onClick={(e) => {
                          e.preventDefault()
                          navigate('/member/booking')
                        }}
                      >
                        訂位紀錄
                      </a>
                    </li>
                    <li data-value="mystore" onClick={handleMenuItemClick}>
                      <a
                        href="#/"
                        className="j-deepGray d-block"
                        onClick={(e) => {
                          e.preventDefault()
                          navigate('/member/mystore')
                        }}
                      >
                        我的收藏
                      </a>
                    </li>
                  </ul>
                  <input type="hidden" id="selected" name="selected" value="" />
                </div>
              </div>

              <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
                <span className="col-12 title j-deepSec">優惠券</span>
                <div className="title-line d-block d-md-none"></div>
              </div>
              <div className="col-12 medal-phone text-center mt-5">
                <i
                  className={
                    'fa-sharp fa-solid fa-medal j-deepPri ' + memberLevel
                  }
                ></i>
                <h3 className="mt-3 j-deepGray">{levelTitle}</h3>
              </div>

              <div className="col-12 coupon-item d-flex mt-3 border-bottom border-2">
                <div className="col-6 d-flex justify-content-satrt">
                  <span className="tr-fs j-deepGray ms-4">優惠券名稱</span>
                </div>

                <div className="col-6 d-flex justify-content-start border-start">
                  <span className="tr-fs j-deepGray ms-5">優惠券狀態</span>
                </div>
              </div>
              {coupondata.map((v, i) => {
                return (
                  <div key={i}>
                    <div className="col-12 coupon-item d-flex mt-3 border-bottom border-2">
                      <div className="col-6 d-flex justify-content-start">
                        <span className="tr-fs j-deepGray ms-4">{v.title}</span>
                      </div>

                      <div className="col-6 d-flex justify-content-start border-start">
                        <span className={`tr-fs ms-5 ${v.expirecolor}`}>
                          -{v.expire_soon}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}

              <div className="col-12 button-group d-flex justify-content-center mt-5">
                <button
                  className="o-line-btn j-h3 me-2"
                  onClick={() => {
                    navigate('/cart')
                  }}
                >
                  立即購物使用&nbsp;&gt;&gt;
                </button>
                <button
                  className="o-line-btn j-h3 ms-2"
                  onClick={() => {
                    navigate('/news/coupon')
                  }}
                >
                  立即領取優惠&nbsp;&gt;&gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Coupon
