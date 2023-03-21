import { useState, useRef, useContext, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import {
  BOOKINGSEAT,
  DELETEBOOK,
  ALLDATA,
} from '../membercomponents/memberapi_config'
import axios from 'axios'
import AuthContext from '../../Context/AuthContext'
import dayjs from 'dayjs'

function Booking() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  //紀錄哪張訂位被取消
  const [deleteData, setDeleteData] = useState({})
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

  //原始資料
  const [seatbooking, setSeatbooking] = useState([
    {
      sid: 0,
      created_at: '',
      member_sid: 0,
      name: '',
      people: 0,
      period: 0,
      phone: '',
      reserveDate: '',
      sid: 0,
      status: '',
      table_num: 0,
      category: '',
      quantity: 0,
    },
  ])

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
  const { myAuth } = useContext(AuthContext)

  //要取會員定位資料
  const getData = async () => {
    //原始定位資料  [{},{}...]
    const bookingSeatRes = await axios.get(BOOKINGSEAT + '/' + myAuth.sid)
    const bookingSeat = bookingSeatRes.data.data
    console.log('bookingSeat', bookingSeat)
    setSeatbooking(bookingSeat)
  }

  const deleteSeating = async (deletenum) => {
    const bookingSeatRes = await axios.get(
      DELETEBOOK + '/' + myAuth.sid + '/' + deletenum
    )
    console.log(bookingSeatRes.data)
    getData()
  }

  useEffect(() => {
    getData()
  }, [])

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
                  navigate('/member/booking')
                }}
              >
                訂位資料
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
            <div className="col-10 col-md-10 ps-5 border-start border-2 mb-5 bp-5">
              <div className="row">
                <div className="bookinglist">
                  <div className="col-12">
                    <div className="shoppinglist mb-5 mt-5 border-bottom border-2 border-secondary pb-5">
                      <div className="col-12 d-flex justify-content-between mt-5 mb-5">
                        <h4 className="j-deepGray">訂位資訊</h4>
                      </div>

                      <hr />
                      <table className="mb-3">
                        <thead className="j-deepPri d-md-table-header-group">
                          <tr>
                            {/* <td>姓名</td> */}
                            <td>姓名</td>
                            <td>電話</td>
                            <td>時間</td>
                            <td>類型</td>

                            <td>訂位人數</td>
                            <td>狀態</td>
                            <td>取消</td>
                          </tr>
                        </thead>

                        {seatbooking.map((v, i) => {
                          return (
                            <tbody key={i} className="j-deepGray">
                              <tr>
                                <td>{v.name}</td>
                                <td>{v.phone}</td>
                                <td>
                                  {dayjs(v.reserveDate).format(
                                    'YYYY-MM-DD hh-mm'
                                  )}
                                </td>
                                <td>{v.category}</td>

                                <td>{v.people}</td>
                                {v.status === '訂位成立' ? (
                                  <>
                                    <td className="j-deepSec">{v.status}</td>
                                    <td>
                                      <a
                                        href="#/"
                                        onClick={() => {
                                          setDeleteData({ [v.sid]: 3 })
                                          deleteSeating(v.sid)
                                        }}
                                      >
                                        <i className="fa-solid fa-trash-can j-deepSec"></i>
                                      </a>
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td
                                      className={
                                        v.status === '訂位取消'
                                          ? 'text-danger'
                                          : ''
                                      }
                                    >
                                      {v.status}
                                    </td>
                                    <td>
                                      <a href="#/">
                                        <i className="fa-solid fa-trash-can text-secondary"></i>
                                      </a>
                                    </td>
                                  </>
                                )}
                              </tr>
                            </tbody>
                          )
                        })}
                      </table>
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
          </div>
          {seatbooking.map((v, i) => {
            return (
              <div key={i} className="mb-5">
                <div className="bookinglist-phone border-bottom border-2 pb-3">
                  <div className="col-12">
                    <h4 className="j-deepGray border-bottom border-2 border-secondary pb-2">
                      訂位資訊
                    </h4>
                  </div>
                  <div className="col-12 mt-3 d-flex justify-content-center">
                    <div className="w-50 text-center ms-2">
                      <span className="j-deepSec tr-fs border-bottom border-2">
                        姓名
                      </span>
                    </div>
                    <div className="w-50 me-5">
                      <span className="tr-fs j-deepGray ">{v.name}</span>
                    </div>
                  </div>
                  <div className="col-12 mt-3 d-flex justify-content-center">
                    <div className="w-50 text-center ms-2">
                      <span className="j-deepSec tr-fs border-bottom border-2">
                        電話
                      </span>
                    </div>
                    <div className="w-50 me-5">
                      <span className="tr-fs j-deepGray ">{v.phone}</span>
                    </div>
                  </div>
                  <div className="col-12 mt-3 d-flex justify-content-center">
                    <div className="w-50 text-center ms-2">
                      <span className="j-deepSec tr-fs border-bottom border-2">
                        時間
                      </span>
                    </div>
                    <div className="w-50 me-5">
                      <span className="tr-fs j-deepGray ">
                        {dayjs(v.reserveDate).format('YYYY-MM-DD hh-mm')}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 mt-3 d-flex justify-content-center">
                    <div className="w-50 text-center ms-2">
                      <span className="j-deepSec tr-fs border-bottom border-2">
                        類型
                      </span>
                    </div>
                    <div className="w-50 me-5">
                      <span className="tr-fs j-deepGray ">{v.category}</span>
                    </div>
                  </div>

                  <div className="col-12 mt-3 d-flex justify-content-center">
                    <div className="w-50 text-center ms-2">
                      <span className="j-deepSec tr-fs border-bottom border-2">
                        人數
                      </span>
                    </div>
                    <div className="w-50 me-5">
                      <span className="tr-fs j-deepGray ">{v.people}</span>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-1 d-flex justify-content-center d-flex justify-content-center">
                  {v.status === '訂位成立' ? (
                    <button
                      className="o-long-btn j-h3 mt-2"
                      onClick={() => {
                        setDeleteData({ [v.sid]: 3 })
                        deleteSeating(v.sid)
                      }}
                    >
                      刪除訂位&nbsp;<i className="fa-solid fa-trash-can"></i>
                    </button>
                  ) : (
                    <button className="o-no-btn j-h3 mt-2 text-secondary">
                      {v.status}&nbsp;
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Booking
{
  /* <i className="fa-solid fa-trash-can"></i> */
}
