import { useState, useRef, useContext, useEffect } from 'react'
import { usePopup } from '../../Public/Popup'

import { useNavigate } from 'react-router-dom'

import {
  MYSTORE,
  MYSTOREDELETE,
  ADDCART,
  ALLDATA,
} from '../membercomponents/memberapi_config'
import AuthContext from '../../Context/AuthContext'
import NavbarContext from '../../Context/NavbarContext'


import axios from 'axios'

function Mystore() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { myAuth } = useContext(AuthContext)
  const { getcartlistnumber } = useContext(NavbarContext)

  const [mystoreData, setMystoreData] = useState([
    {
      member: 0,
      productmanage: '',
      product_id: '',
      product_ch: '',
      productprice: 0,
      product_img: '',
      product_eg: '',
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
  const { Popup, openPopup, closePopup } = usePopup() //必要const
  const [popupProps, setPopupProps] = useState({}) //可用 useState 來做動態更新
  const initialState = useRef(true)
  const openDefaultPopup = (message, btntext, fn) => {
    initialState.current = false

    // content 字串 彈窗內容
    setPopupProps({
      content: message,
      btnGroup: [
        {
          text: btntext,
          handle: fn,
        },
        {
          text: '關閉',
          handle: closePopup,
        },
      ],
    })
    // openPopup()
  }

  //加入購物車
  const addCart = (itemdata) => {
    const addtocart = async () => {
      // itemdata 會是個 { } 物件
      console.log('itemdata', itemdata)
      const mystore = await axios.post(ADDCART + '/' + myAuth.sid, itemdata)
      console.log(mystore.data)
      getData()
      getcartlistnumber()
      closePopup()
    }

    openDefaultPopup('1件商品加入購物車', '加入購物車', addtocart)
  }

  //刪除我的收藏
  const deleteMystore = (product_id) => {
    const deleteiteming = async () => {
      const deletitem = await axios.get(
        MYSTOREDELETE + '/' + myAuth.sid + '/' + product_id
      )
      console.log(deletitem.data)
      getData()
      closePopup()
    }

    openDefaultPopup('確認取消收藏', '取消收藏', deleteiteming)
  }

  //要取資料
  const getData = async () => {
    const mystore = await axios.get(MYSTORE + '/' + myAuth.sid)
    console.log(mystore.data)
    setMystoreData(mystore.data)
  }

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

  //只要一次資料
  useEffect(() => {
    console.log('要資料')

    getData()
  }, [])
  useEffect(() => {
    getAllData()
  }, [])
  useEffect(() => {
    if (initialState.current !== true) {
      openPopup() //可以直接打開pop up
    }
  }, [popupProps])

  return (
    <>
      {' '}
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
                  navigate('/member/mystore')
                }}
              >
                我的收藏
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- 主要section(電腦版) --> */}
      <section className="container-fluid nav-space pt-md-0 d-none d-md-block">
        <div className="container">
          <div className="row">
            <div className="col-md-2 d-none d-lg-block border-end border-2">
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
                <span className="col-auto title j-deepSec"> 收藏清單</span>
                <div className="title-line d-block d-md-none"></div>
              </div>
              <table>
                <thead className="j-deepPri d-md-table-header-group">
                  <tr>
                    <td>加入購物車</td>
                    <td>移除收藏</td>
                    <td>商品照片</td>
                    <td>品項名稱</td>
                    <td>商品價錢</td>
                  </tr>
                </thead>
                <tbody className="j-deepGray">
                  {mystoreData.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <a
                            href="#/"
                            className="j-deepGray"
                            onClick={() => {
                              addCart({ ...v })
                            }}
                          >
                            <i className="fa-solid fa-cart-shopping"></i>
                          </a>
                        </td>
                        <td>
                          <a
                            href="#/"
                            className="j-deepGray"
                            onClick={() => {
                              deleteMystore(v.product_id)
                            }}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </a>
                        </td>
                        <td className="tdstyle">
                          <img
                            src={
                              'http://localhost:3008/product_img/' +
                              v.product_img +
                              '.webp'
                            }
                            alt=""
                          />
                        </td>
                        <td>{v.product_ch}</td>
                        <td>{v.productprice}元</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- 主要section(手機版)--> */}
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
                <span className="col-12 title j-deepSec"> 收藏清單</span>
                <div className="title-line d-block d-md-none"></div>
              </div>
              {mystoreData.map((v, i) => {
                return (
                  <div key={i}>
                    <div className="mylove-item border-top border-2 border-secondary mt-2 mb-4">
                      <div className="col-12 mt-2">
                        <div className="row">
                          <div className="pic-phone-mylove d-flex justify-content-around align-items-center col-6">
                            <img
                              src={
                                'http://localhost:3008/product_img/' +
                                v.product_img +
                                '.webp'
                              }
                              alt=""
                            />
                          </div>
                          <div className="col-6 d-flex justify-content-center align-items-center">
                            <span className="d-inline-block j-h4">
                              {v.product_ch}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-content-around mt-2 border-top border-1 pt-3">
                          <span
                            className="d-inline-block icon-phone-mylove"
                            onClick={() => {
                              addCart({ ...v })
                            }}
                          >
                            <i className="fa-solid fa-cart-shopping j-deepGray"></i>
                          </span>
                          <span
                            className="d-inline-block icon-phone-mylove"
                            onClick={() => {
                              deleteMystore(v.product_id)
                            }}
                          >
                            <i className="fa-solid fa-trash-can j-deepGray"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <Popup {...popupProps} />
    </>
  )
}

export default Mystore
