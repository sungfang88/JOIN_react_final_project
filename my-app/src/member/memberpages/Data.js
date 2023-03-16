import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import { MEMBER_DATA, ALLDATA } from '../membercomponents/memberapi_config'
import base64js from 'base64-js'
import AuthContext from '../../Context/AuthContext'

function Data() {
  const navigate = useNavigate()
  const { myAuth } = useContext(AuthContext)
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

  //開合的狀態
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef(null)

  const [memberdata, setMemberdata] = useState({
    sid: 0,
    name: '',
    email: '',
    phone: '',
    birthday: '',
    area: '',
    city: '',
    address: '',
    userphoto: '',
  })
  const [memberphoto, setMmemberphoto] = useState('')

  const memberAddress = memberdata.area + memberdata.city + memberdata.address

  const getMemberData = async () => {
    //回傳依據後端給的擋頭(這裡是JSON)-> 所以會自動JSON parse 解析成js的物件表達式
    const response = await axios.get(MEMBER_DATA + '/' + myAuth.sid)
    console.log(response.data)
    setMemberdata(response.data.rows[0])

    const base64Str = response.data.image

    // base64js.toByteArray() 方法接收一个 Base64 字符串
    const byteCharacters = base64js.toByteArray(base64Str)
    // 使用 Blob 对象将字节数组转换为 Blob 对象，并指定 MIME 类型

    const blobpng = new Blob([byteCharacters], { type: 'image/*' })

    // 将 Blob 对象转换为 URL 对象
    const imageUrl = URL.createObjectURL(blobpng)
    console.log(imageUrl)
    setMmemberphoto(imageUrl)
  }

  useEffect(() => {
    getMemberData()
  }, [])

  useEffect(() => {
    // 當使用者點擊畫面其他位置時，收合下拉式選單
    function handleClickOutside(event) {
      //dropdown.contains(event.target)用於判斷 event.target 是否在 .dropdown 的範圍內
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    // 監聽點擊事件
    document.addEventListener('click', handleClickOutside)

    //useEffect 的 cleanup function
    //在 component 卸載或 useEffect 被重新執行時清除這個監聽事件
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [dropdownRef, setIsMenuOpen])

  // 點擊下拉式選單時，展開或收合選單
  function handleToggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }
  // 點擊下拉式選單裡的項目時，在隱藏的input中告知選到誰，並關閉下拉式選單
  function handleMenuItemClick(event) {
    const selectedValue = event.target.parentElement.getAttribute('data-value')
    document.querySelector('#selected').value = selectedValue
    setIsMenuOpen(false)
  }

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      {/* <!-- Sec-navbar 要用nav-space 空出上面的距離 --> */}

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
            </div>
          </div>
        </div>
      </div>
      {/* <!--內容 第一個section要加nav-space pt-md-0---> */}
      {/* 主section(電腦版) */}
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
            <div className="col-10 border-start border-2">
              <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
                <span className="col-2 title j-deepSec">個人資料</span>
                <div className="title-line d-block d-md-none"></div>
                <button
                  className="o-line-btn j-h3"
                  onClick={() => {
                    navigate('/member/edit')
                  }}
                >
                  編輯資料&nbsp;&gt;&gt;
                </button>
              </div>
              <div className="row">
                <div className="col-2">
                  <div className="member-photo text-center ms-2">
                    <img src={memberphoto} alt="" className="border border-1" />

                    <p className="tr-fs j-deepSec mt-2">{memberdata.name}</p>
                  </div>
                </div>
                <div className="col-10">
                  <div className="ms-5 me-5 ps-5 pe-5 mb-3">
                    <span className="j-deepGray fs-5 ">信箱:</span>
                    <div className="input-style">{memberdata.email}</div>
                  </div>
                  <div className="ms-5 me-5 ps-5 pe-5 mb-3">
                    <span className="j-deepGray fs-5 ">電話:</span>
                    <div className="input-style">{memberdata.phone}</div>
                  </div>
                  <div className="ms-5 me-5 ps-5 pe-5 mb-3">
                    <span className="j-deepGray fs-5 ">生日:</span>
                    <div className="input-style">
                      {dayjs(memberdata.birthday).format('YYYY-MM-DD')}
                    </div>
                  </div>
                  <div className="ms-5 me-5 ps-5 pe-5 mb-5">
                    <span className="j-deepGray fs-5 ">地址:</span>
                    <div className="input-style">{memberAddress}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 主section(手機版)  */}
      <section className="container-fluid nav-space pt-md-0 d-md-none">
        <div className="constainer">
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

              <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
                <span className="col-12 title j-deepSec">個人資料</span>
                <div className="title-line d-block d-md-none"></div>
              </div>
              <div className="col-12">
                <div className="member-phone-photo d-flex justify-content-center mt-3">
                  <img src={memberphoto} alt="" className="border border-1" />
                </div>
              </div>
              <div className="col-12 text-center border-bottom border-2 pb-2">
                <h3 className="tr-fs j-deepSec mt-2">{memberdata.name}</h3>
              </div>

              <div className="col-12 mt-3 d-flex justify-content-center">
                <div className="w-50 text-center ms-2">
                  <span className="j-deepSec tr-fs border-bottom border-2">
                    信箱
                  </span>
                </div>
                <div className="w-50 me-5">
                  <span className="tr-fs j-deepGray ">{memberdata.email}</span>
                </div>
              </div>
              <div className="col-12 mt-3 d-flex justify-content-center ">
                <div className="w-50 text-center ms-2">
                  <span className="j-deepSec tr-fs border-bottom border-2">
                    電話
                  </span>
                </div>
                <div className="w-50 me-5">
                  <span className="tr-fs j-deepGray ">{memberdata.phone}</span>
                </div>
              </div>
              <div className="col-12 mt-3 d-flex justify-content-center ">
                <div className="w-50 text-center ms-2">
                  <span className="j-deepSec tr-fs border-bottom border-2">
                    生日
                  </span>
                </div>
                <div className="w-50 me-5">
                  <span className="tr-fs j-deepGray">
                    {dayjs(memberdata.birthday).format('YYYY-MM-DD')}
                  </span>
                </div>
              </div>
              <div className="col-12 mt-3 d-flex justify-content-center ">
                <div className="w-50 text-center ms-2 ">
                  <span className="j-deepSec tr-fs border-bottom border-2">
                    地址
                  </span>
                </div>
                <div className="w-50 me-5">
                  <span className="tr-fs j-deepGray">{memberAddress}</span>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center mt-3 border-top pt-3 border-2 ">
                <button
                  className="o-line-btn j-h3"
                  onClick={() => {
                    navigate('/member/edit')
                  }}
                >
                  編輯資料&nbsp;&gt;&gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Data
