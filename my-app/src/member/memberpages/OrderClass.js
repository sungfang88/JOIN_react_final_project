import { useState, useRef, useContext, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { CLASSLIST, ALLDATA } from '../membercomponents/memberapi_config'

import AuthContext from '../../Context/AuthContext'

import axios from 'axios'

import dayjs from 'dayjs'

function OrderClass() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { myAuth } = useContext(AuthContext)

  const [classlistdata, setClasslistdata] = useState([
    {
      orderId: '',
      m_id: 0,
      class_date: '',
      class_prople: '',
      amount: 0,
      created_at: '',
      Bartender: '',
      class_time: '',
    },
  ])
  const [alldata, setAlldata] = useState({
    coupondata: false,
    listdata: false,
    classdata: false,
    seatdata: false,
    mystoredata: false,
  })
  const getAllData = async () => {
    const getall = await axios.get(ALLDATA + '/' + myAuth.sid)
    console.log('getall.data', getall.data)
    setAlldata(getall.data)
  }

  const [keytime, setKeytime] = useState('')
  const [inputtimeText, setInputtimeText] = useState('')

  //時間篩選功能
  const filterByDateTime = (Array, datetime) => {
    setInputtimeText('')
    const targetDate = new Date(datetime)
    console.log('targetDate', targetDate)
    return Array.filter((v, i) => {
      const orderDate = new Date(v.created_at)
      console.log('orderDate', orderDate)
      return orderDate.toDateString() === targetDate.toDateString()
    })
  }

  //拿取該會員課程訂單資料
  const getData = async () => {
    const response = await axios.get(CLASSLIST + '/' + myAuth.sid)
    console.log(response.data)
    const filtertimeData = filterByDateTime(response.data, keytime)
    console.log('filtertimeData', filtertimeData)
    if (filtertimeData.length === 0) {
      setClasslistdata(response.data)
    } else {
      setClasslistdata(filtertimeData)
    }
  }

  const dropdownRef = useRef(null)
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

  useEffect(() => {
    getData()
  }, [keytime])
  useEffect(() => {
    getAllData()
  }, [])

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
                  navigate('/member/orderclass')
                }}
              >
                課程訂單
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
                    折價券
                  </button>
                ) : (
                  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
                    折價券
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

            <div className="col-12 col-md-10 ps-5 border-start border-2 ">
              <div className="row ">
                <div className="col-6 d-none d-lg-block">
                  <div className="d-flex justify-content-start j-input align-items-center">
                    <input
                      name="searchtime"
                      type="date"
                      value={inputtimeText}
                      placeholder="課程時間查詢"
                      className="d-inline-block me-1"
                      onChange={(e) => {
                        setInputtimeText(e.target.value)
                      }}
                    />
                    <button
                      className="btn o-line-btn me-1"
                      onClick={() => {
                        setKeytime(inputtimeText)
                      }}
                    >
                      搜尋
                    </button>

                    <label htmlFor="searchtime" className="j-h3 j-primary">
                      課程時間查詢
                    </label>
                  </div>
                </div>
                {classlistdata.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className="shoppinglist mb-5 mt-2 border-bottom border-2 border-secondary pb-5"
                    >
                      <div className="col-12 d-flex justify-content-between mt-5 border-bottom border-2">
                        <h4 className="j-deepGray">訂單編號:{v.orderId}</h4>

                        <p className="j-deepGray">
                          成立時間:{dayjs(v.created_at).format('YYYY-MM-DD')}
                        </p>
                      </div>

                      <div className="col-12 ">
                        <div className="row d-flex justify-content-around align-items-center mb-2 border-bottom mt-2">
                          <div className="col-3 ps-5">
                            <img
                              src="../img/001.webp"
                              alt=""
                              className="productImg"
                            />
                          </div>
                          <div className="col-9 d-flex justify-content-center">
                            <h4 className="j-deepGray">BARTENDER 調酒課程</h4>
                          </div>
                        </div>
                      </div>

                      <table className="mb-3">
                        <thead className="j-deepPri d-md-table-header-group">
                          <tr>
                            <td>授課老師</td>

                            <td>上課日期</td>
                            <td>上課時間</td>
                            <td>上課人數</td>
                            <td>課程價格</td>
                          </tr>
                        </thead>
                        <tbody className="j-deepGray">
                          <tr>
                            <td>{v.Bartender}</td>

                            <td>{dayjs(v.class_date).format('YYYY-MM-DD')}</td>
                            <td>
                              {v.class_time === '時段1'
                                ? '11:00 ~ 14:00'
                                : '14:30 ~ 17:30'}
                            </td>
                            <td>{v.class_prople}</td>
                            <td>${v.amount}元</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- 主section(手機版) --> */}
      <section className="container-fluid nav-space pt-md-0 d-md-none">
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
                    會員分頁清單
                  </span>
                </div>
                <ul
                  className={`dropdown-menu mt-2 ${isMenuOpen ? '' : 'd-none'}`}
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
                      折價券
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

            <div className="d-flex justify-content-start j-input align-items-center">
              <label htmlFor="searchtime" className="j-h3 j-primary">
                課程時間查詢
              </label>
            </div>
            <div className="d-flex justify-content-start j-input align-items-center">
              <input
                name="searchtime"
                type="date"
                placeholder="課程時間查詢"
                className="d-inline-block me-1"
                onChange={(e) => {
                  setInputtimeText(e.target.value)
                }}
              />
              <button
                className="btn o-line-btn me-1"
                onClick={() => {
                  setKeytime(inputtimeText)
                }}
              >
                搜尋
              </button>
            </div>
          </div>
          {classlistdata.map((v, i) => {
            return (
              <div key={i}>
                <div className="shopping-phone-list pb-2 mt-2">
                  <div className="col-12">
                    <h4 className="j-deepGray border-bottom border-2 border-secondary pb-2">
                      訂單編號:{v.orderId}
                    </h4>
                    <p className="j-deepGray">
                      成立時間:{dayjs(v.created_at).format('YYYY-MM-DD')}
                    </p>
                  </div>

                  <div className="col-12 d-flex justify-content-center">
                    <div className="pic-phone">
                      <img
                        src="../img/001.webp"
                        alt=""
                        className="productImg"
                      />
                    </div>
                  </div>
                  <div className="col-12 text-center border-bottom border-2 pb-3 mb-2">
                    <h4 className="j-deepGray mb-2">BARTENDER 調酒課程</h4>
                  </div>

                  <div className="col-12 mt-3 d-flex justify-content-center">
                    <div className="w-50 text-center ms-2">
                      <span className="j-deepSec tr-fs border-bottom border-2">
                        上課日期
                      </span>
                    </div>
                    <div className="w-50 me-5">
                      <span className="tr-fs j-deepGray ">
                        {dayjs(v.class_date).format('YYYY-MM-DD')}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 mt-3 d-flex justify-content-center">
                    <div className="w-50 text-center ms-2">
                      <span className="j-deepSec tr-fs border-bottom border-2">
                        上課時間
                      </span>
                    </div>
                    <div className="w-50 me-5">
                      <span className="tr-fs j-deepGray ">
                        {v.class_time === '時段1'
                          ? '11:00 ~ 14:00'
                          : '14:30 ~ 17:30'}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 mt-3 d-flex justify-content-center">
                    <div className="w-50 text-center ms-2">
                      <span className="j-deepSec tr-fs border-bottom border-2">
                        上課人數
                      </span>
                    </div>
                    <div className="w-50 me-5">
                      <span className="tr-fs j-deepGray ">
                        {v.class_prople}
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className="col-12 d-flex justify-content-center">
                    <p className="fs-5 j-deepSec d-inline-block j-h3">
                      訂單總金額:${v.amount}元
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default OrderClass
