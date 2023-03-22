import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'
import {
  ORDERLIST,
  ORDERLISTTOTALE,
  LISTPRODUCT,
  ALLDATA,
} from '../membercomponents/memberapi_config'
// 要使用chunk(分塊)函式用
import _ from 'lodash'
import dayjs from 'dayjs'

import axios from 'axios'

function Orderlist() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

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

  const navigate = useNavigate()

  // 從伺服器得到資料記錄用 用陣列因會拿到 [{},{},{}.....]
  const [usersOrderlist, setUsersOrderlist] = useState([])

  // 呈現資料使用，排序完會破壞原陣列所以顯示都以這支為準
  const [usersDisplay, setUsersDisplay] = useState([
    [
      {
        address: '',
        addressee: '',
        amount: '',
        coupon_code: null,
        created_at: '',
        m_id: 0,
        orderId: '',
        phone: '',
        price: '',
        product_ch: '',
        product_id: '',
        products_order_sid: 0,
        sid: 0,
        product_img: '',
        payment: null,
        quantity: 0,
      },
      {
        address: '',
        addressee: '',
        amount: '',
        coupon_code: null,
        created_at: '',
        m_id: 0,
        orderId: '',
        phone: '',
        price: '',
        product_ch: '',
        product_id: '',
        products_order_sid: 0,
        sid: 0,
        product_img: '',
        payment: null,
        quantity: 0,
      },
    ],
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

  // 文字輸入框可控表單元件使用，主要是用來當在輸入框輸入文字時，不會一直促發setKeyword
  const [inputText, setInputText] = useState('')

  // 真正用於搜尋過濾的狀態
  const [keyword, setKeyword] = useState('')

  //用來訂單時間的排序
  const [sortType, setSortType] = useState(2)
  //用來訂單名稱序列
  const [listNameArray, setListNameArray] = useState([[]])

  //訂單編號

  //用來固定頁數按鈕時 該頁按鈕 左右兩邊固定頁數按鈕數量
  const [beginPage, setBeginPage] = useState(0)
  //頁數開始按鈕
  const [endPage, setEndPage] = useState(0)

  // 分頁用
  // pageNow 目前頁號
  // perPage 每頁多少數量
  // pageTotal 目前有多少頁
  const [pageNow, setPageNow] = useState(1) // 預設為第1頁
  const [perPage, setPerPage] = useState(2) // 預設為每頁有2筆
  const [pageTotal, setPageTotal] = useState(0) // 預設總頁數為0

  //呈現該會員的所有清單
  const [totalorderlistData, setTotalorderlistData] = useState([])

  //呈現詳細表單縮合使用
  const [showList, setShowList] = useState({})

  //選擇到的id 轉變它的true/false
  const toggleProduct = (listId) => {
    setShowList((prevState) => ({
      ...prevState,
      [listId]: !prevState[listId],
    }))
  }

  //要取資料
  const { myAuth } = useContext(AuthContext)
  const getMemberData = async () => {
    //原始資料
    const orderNumres = await axios.get(ORDERLISTTOTALE + '/' + myAuth.sid)
    //orderNum [{sid: 1, orderId: 'P1586415360'}, {sid: 2, orderId: 'P1586416261'}, {…}, {…}]
    const orderNum = orderNumres.data
    console.log('orderNum', orderNum)
    setUsersOrderlist(orderNum)
    // 作keyword過濾
    let newOrderlist = filterByKeyword(orderNum, keyword)
    console.log('filterByKeyword', newOrderlist)
    if (newOrderlist.length === 0) {
      newOrderlist = orderNum
      console.log('ifnewOrderlist', newOrderlist)
    }

    // 作時間sort排序
    newOrderlist = sortByType(newOrderlist, sortType)
    console.log('sortByType', newOrderlist)
    //設定總頁
    let pagelength = 0
    if (newOrderlist.length / perPage < 1) {
      pagelength = 1
      setPageNow(1)
    } else {
      pagelength = Math.ceil(newOrderlist.length / perPage)
    }
    setPageTotal(pagelength)
    if (pagelength < 2) {
    }
    console.log('共需要幾頁', pagelength)

    //頁碼
    pageButtonNum(pageNow, pagelength, 1)

    let perpageaxiosarray = []
    for (let i = 0; i < newOrderlist.length; i++) {
      let response = await axios.get(
        LISTPRODUCT + '/' + myAuth.sid + '/' + newOrderlist[i].orderId
      )
      perpageaxiosarray.push(response.data)
    }
    //perpageaxiosarray拿到[Array(1), Array(4), Array(2), Array(3)]分別各是不同訂單的細項
    console.log('已篩選後的訂單裡的詳細資料', perpageaxiosarray)

    // 拆分頁
    //  _.chunk([1,2,3,4], 2) => [[1,2],[3,4]]
    const pageArray = _.chunk(perpageaxiosarray, perPage)
    console.log('pageArray[pageNow-1]', pageArray[pageNow - 1])
    console.log('pageArray', pageArray)
    if (pagelength < pageNow) {
      setUsersDisplay(pageArray[0])
    } else {
      setUsersDisplay(pageArray[pageNow - 1])
    }
    const listName = pageArray[pageNow - 1].map((v, i) => {
      return { orderId: v[0].orderId, created_at: v[0].created_at }
    })
    console.log('listName', listName)
    setListNameArray(listName)
    setIsLoading(false)
  }

  //關鍵字排序:用純函式-傳入資料陣列，以keyword進行過濾 => 回傳"過濾後"的資料"陣列"
  const filterByKeyword = (usersOrderlist, keyword) => {
    return usersOrderlist.filter((v, i) => {
      return v.orderId.includes(keyword)
    })
  }

  //時間排序 純函式
  const sortByType = (dataArray, type) => {
    switch (type) {
      // 以age排序-由小至大 => type=1
      case 1:
        return [...dataArray].sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )

      // 以age排序-由大至小 => type=2
      case 2:
        return [...dataArray].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )

      // 以id排序-由小至大 => type=1 (預設)
      default:
        return [...dataArray].sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
    }
  }

  //做Pagination固定數量頁數按鈕

  const pageButtonNum = function (pageNow, pageTotal, pagebtnNav) {
    // 總頁數按鈕少於(左右兩邊固定頁數按鈕數量)*2+1時
    if (pageTotal <= pagebtnNav * 2 + 1) {
      setBeginPage(1)
      setEndPage(pageTotal)
    } else if (pageNow - 1 < pagebtnNav) {
      // 該頁pageNow - 1 < pagebtnNav 時，最前面的按鈕就固定從1開始
      setBeginPage(1)
      setEndPage(pagebtnNav * 2 + 1)
    } else if (pageTotal - pageNow < pagebtnNav) {
      // 該頁是 pageTotal - pageNow  < pagebtnNav 時 最後面的按鈕固定只到totalPages
      setBeginPage(pageTotal - (pagebtnNav * 2 + 1) + 1)
      setEndPage(pageTotal)
    } else {
      setBeginPage(pageNow - pagebtnNav)
      setEndPage(pageNow + pagebtnNav)
    }
  }

  // 搭配css的純載入指示動畫
  const loader = (
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
  //只要一次資料
  useEffect(() => {
    getAllData()
  }, [])

  useEffect(() => {
    console.log('要資料')

    getMemberData()
  }, [keyword, sortType, pageNow])

  // 當keyword或age選項有變化時，開起loader指示動畫
  useEffect(() => {
    setIsLoading(true)
  }, [keyword, sortType, pageNow])

  const listItem = function (v, i, listid) {
    return (
      <div key={i}>
        {console.log('usersDisplay[i][0]', usersDisplay[i][0])}
        {console.log('listid', listid)}

        {/* {console.log('usersDisplay[i]map',usersDisplay[i].map((v,i)=>{return v.product_ch}))} */}
        {console.log(
          'usersDisplay[i]filter&map',
          usersDisplay[i]
            .filter((v, i) => {
              return i > 0
            })
            .map((v, i) => {
              return v
            })
        )}

        <div className="col-12 ">
          <div className="row d-flex justify-content-between align-items-center mb-2 mt-2 border-bottom mx-2 pb-1">
            <div className="col-2">
              {isLoading ? (
                loader
              ) : (
                <img
                  src={
                    'http://localhost:3008/product_img/' +
                    usersDisplay[i][0].product_img +
                    '.webp'
                  }
                  alt=""
                  className="productImg"
                />
              )}
            </div>
            <div className="col-6 d-flex justify-content-start ps-5">
              {/* <h4 className="j-deepGray">人頭馬VSOP特選桶白蘭地 &nbsp;&nbsp;X3</h4> */}

              <h4 className="j-deepGray ps-5">
                - {usersDisplay[i][0].product_ch}
              </h4>
            </div>
            <div className="col-2 d-flex justify-content-center">
              <h4 className="j-deepGray">X{usersDisplay[i][0].quantity}瓶</h4>
            </div>

            {/* <h4 className="j-deepPri">$1500元</h4> */}
            <div className="col-2 d-flex justify-content-end">
              <h4 className="j-deepPri">
                {+usersDisplay[i][0].price * usersDisplay[i][0].quantity}元
              </h4>
            </div>
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center mt-2 pb-2 ">
          <a
            href="#/"
            role="button"
            className={usersDisplay[i].length===1?"d-none":"j-deepSec"}
            onClick={(e) => {
              e.preventDefault()
              toggleProduct(listid)
            }}
          >
            檢視所有商品&nbsp;
            {showList[listid] ? (
              <i className="fa-sharp fa-solid fa-caret-down"></i>
            ) : (
              <i className="fa-sharp fa-solid fa-caret-right"></i>
            )}
          </a>
        </div>
        {showList[listid] && (
          <div id={listid}>
            {usersDisplay[i]
              .filter((v, i) => {
                return i > 0
              })
              .map((v, i) => {
                return (
                  <div key={i}>
                    {console.log('v.product_img', v.product_img)}
                    <div className="col-12 ">
                      <div className="row d-flex justify-content-around align-items-center collapse mb-2 mt-2 border-top mx-2 pt-2">
                        <div className="col-2">
                          <img
                            src={`http://localhost:3008/product_img/${v.product_img}.webp`}
                            alt=""
                            className="productImg"
                          />
                        </div>
                        {/* <h4 className="j-deepGray">
                        人頭馬VSOP特選桶白蘭地 &nbsp;&nbsp;X3
                      </h4> */}
                        <div className="col-6 d-flex justify-content-start align-items-center ps-5">
                          <h4 className="j-deepGray ps-5">- {v.product_ch}</h4>
                        </div>
                        <div className="col-2 d-flex justify-content-center align-items-center">
                          <h4 className="j-deepGray">X{v.quantity}瓶</h4>
                        </div>
                        <div className="col-2 d-flex justify-content-end">
                          <h4 className="j-deepPri">
                            ${+v.price * v.quantity}元
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            <hr />
          </div>
        )}
        <div className="col-12 d-flex justify-content-between">
          {console.log(
            'usersDisplay[i]mappricetotal',
            usersDisplay[i]
              .map((v, i) => {
                return v.price * 3
              })
              .reduce((acc, val) => acc + val, 0)
          )}

          <p className="fs-5 j-deepSec">
            {usersDisplay[i]
              .map((v, i) => {
                return v.quantity
              })
              .reduce((acc, val) => acc + val, 0)}
            個商品
          </p>
          <p className="fs-5 j-deepSec">
            訂單金額:$
            {usersDisplay[i]
              .map((v, i) => {
                return +v.price * v.quantity
              })
              .reduce((acc, val) => acc + val, 0)}
            元
          </p>
        </div>
        <div className="col-12 d-flex justify-content-end">
          <Link
            to="/product/productdetail"
            state={{
              productId: `${usersDisplay[i][0].product_id}`,
            }}
          >
            <button className="btn btn-primary g-line-btn">再買一次</button>
          </Link>
        </div>
      </div>
    )
  }

  const listCard = function (v, i) {
    return (
      <div className="shoppinglist mb-5 mt-5 border-bottom border-2 border-secondary pb-5">
        <div className="col-12 d-flex justify-content-between mt-5 border-bottom border-2">
          {/* <h4 className="j-deepGray">訂單編號:P12356789</h4> */}
          <h4 className="j-deepGray">訂單編號:{listNameArray[i]['orderId']}</h4>
          {console.log(
            dayjs(listNameArray[i]['created_at']).format('YYYY-MM-DD')
          )}

          <p className="j-deepGray">
            成立時間:
            {dayjs(listNameArray[i]['created_at']).format('YYYY-MM-DD')}
          </p>
        </div>

        {listItem(v, i, listNameArray[i]['orderId'])}
      </div>
    )
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
                  navigate('/member/orderlist')
                }}
              >
                訂單紀錄
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- 主section(電腦版) --> */}
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

            <div className="col-12 col-md-10 ps-5 border-start border-2 ">
              <div className="row ">
                <div className="col-6 d-none d-lg-block">
                  <div className="d-flex justify-content-start">
                    <input
                      name="search"
                      type="text"
                      value={inputText}
                      placeholder="歷史清單查詢"
                      onChange={(e) => {
                        setInputText(e.target.value)
                        // 如果使用者清除所有輸入時要回復為原本列表
                        // 注意：這裡要以e.target.value來判斷，"不可"使用inputText(異步，尚未更動)
                        if (e.target.value === '') {
                          setKeyword('')
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setKeyword(inputText)
                        }
                      }}
                      className="d-inline-block me-1"
                    />
                    <button
                      onClick={() => {
                        setKeyword(inputText)
                      }}
                      className="btn o-line-btn me-1"
                    >
                      搜尋
                    </button>

                    <a
                      type="button"
                      className="btn o-line-btn me-1"
                      href="#/"
                      onClick={() => {
                        if (sortType === 1) {
                          setSortType(2)
                          setPageNow(1)
                        } else {
                          setSortType(1)
                          setPageNow(1)
                        }
                      }}
                    >
                      <i className="fa-sharp fa-solid fa-calendar"></i>
                      &nbsp;&nbsp;時間排序
                    </a>
                  </div>
                </div>
                <div className="col-6 d-none d-lg-block">
                  <div className="d-flex justify-content-end">
                    <div
                      className="btn-toolbar"
                      role="toolbar"
                      aria-label="Toolbar with button groups"
                    >
                      <div
                        className="btn-group me-2"
                        role="group"
                        aria-label="First group"
                      >
                        <a
                          type="button"
                          className="btn btn-outline-primary g-line-btn me-1"
                          href="#/"
                          onClick={() => {
                            if (beginPage === 1) {
                              setPageNow(1)
                            } else {
                              setPageNow(pageNow - 1)
                            }
                          }}
                        >
                          &lt;
                        </a>
                        {Array(endPage - beginPage + 1)
                          .fill(1)
                          .map((v, i) => {
                            return (
                              <a
                                key={i}
                                type="button"
                                className={
                                  pageNow === beginPage + i
                                    ? 'btn btn-outline-primary g-line-btn me-1 active-page'
                                    : 'btn btn-outline-primary g-line-btn me-1 '
                                }
                                href="#/"
                                onClick={() => {
                                  setPageNow(beginPage + i)
                                }}
                              >
                                {beginPage + i}
                              </a>
                            )
                          })}

                        <a
                          type="button"
                          className="btn btn-outline-primary g-line-btn"
                          href="#/"
                          onClick={() => {
                            if (pageNow === endPage) {
                              setPageNow(endPage)
                            } else {
                              setPageNow(pageNow + 1)
                            }
                          }}
                        >
                          &gt;
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* //卡片 */}
                {console.log('usersDisplay', usersDisplay)}
                {/* {usersDisplay.map((v, i) => {
                  return v.map((v, i) => {
                    return <div key={i}>{listCard}</div>
                  })
                })} */}

                {/* 這邊的V是個Array */}

                {Array(usersDisplay.length)
                  .fill(1)
                  .map((v, i) => {
                    return <div key={i}>{listCard(v, i)}</div>
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

            <div className="">
              <input
                name="search"
                type={inputText}
                placeholder="歷史清單查詢"
                onChange={(e) => {
                  setInputText(e.target.value)
                  // 如果使用者清除所有輸入時要回復為原本列表
                  // 注意：這裡要以e.target.value來判斷，"不可"使用inputText(異步，尚未更動)
                  if (e.target.value === '') {
                    setKeyword('')
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setKeyword(inputText)
                  }
                }}
                className="d-inline-block me-1"
              />
              <button
                onClick={() => {
                  setKeyword(inputText)
                }}
                className="btn o-line-btn me-1"
              >
                搜尋
              </button>

              <a
                type="button"
                className="btn o-line-btn me-1"
                href="#/"
                onClick={() => {
                  if (sortType === 1) {
                    setSortType(2)
                    setPageNow(1)
                  } else {
                    setSortType(1)
                    setPageNow(1)
                  }
                }}
              >
                <i className="fa-sharp fa-solid fa-calendar"></i>&nbsp;時間排序
              </a>
            </div>
          </div>

          {Array(usersDisplay.length)
            .fill(1)
            .map((v, i) => {
              return (
                <div key={i}>
                  <div className="shopping-phone-list pb-2 mt-2">
                    <div className="col-12">
                      <h4 className="j-deepGray border-bottom border-2 border-secondary pb-2">
                        訂單編號:{listNameArray[i]['orderId']}
                      </h4>
                      <p className="j-deepGray">
                        成立時間:
                        {dayjs(listNameArray[i]['created_at']).format(
                          'YYYY-MM-DD'
                        )}
                      </p>
                    </div>

                    <div className="col-12 d-flex justify-content-center">
                      <div className="pic-phone">
                        <img
                          src={
                            'http://localhost:3008/product_img/' +
                            usersDisplay[i][0].product_img +
                            '.webp'
                          }
                          alt=""
                          className="productImg"
                        />
                      </div>
                    </div>
                    <div className="col-12 text-center border-bottom border-2 pb-3 mb-2">
                      <h4 className="j-deepGray mb-2">
                        {usersDisplay[i][0].product_ch}
                      </h4>
                      <h5 className="j-deepGray">
                        x{usersDisplay[i][0].quantity}瓶
                      </h5>
                    </div>
                    <div className="col-12 d-flex justify-content-center mb-3">
                      <a>
                        <button className="btn btn-primary g-line-btn btn-phone">
                          再買一次
                        </button>
                      </a>
                    </div>
                    <div className="col-12 d-flex justify-content-center mb-3">
                      <a
                        href="#/"
                        role="button"
                        className={usersDisplay[i].length===1?"d-none":"j-deepSec"}
                        onClick={(e) => {
                          e.preventDefault()
                          toggleProduct(listNameArray[i]['orderId'])
                        }}
                      >
                        檢視所有商品&nbsp;
                        {showList[listNameArray[i]['orderId']] ? (
                          <i className="fa-sharp fa-solid fa-caret-down"></i>
                        ) : (
                          <i className="fa-sharp fa-solid fa-caret-right"></i>
                        )}
                      </a>
                    </div>

                    {showList[listNameArray[i]['orderId']] && (
                      <div id={listNameArray[i]['orderId']}>
                        {usersDisplay[i]
                          .filter((v, i) => {
                            return i > 0
                          })
                          .map((v, i) => {
                            return (
                              <div key={i} className="border-top border-2">
                                <div className="col-12">
                                  <div className="row d-flex align-items-center">
                                    <div className="col-3 ps-3">
                                      <img
                                        src={`http://localhost:3008/product_img/${v.product_img}.webp`}
                                        alt=""
                                        className="productImg"
                                      />
                                    </div>
                                    <div className="col-6">
                                      <h4 className="j-deepGray mb-2 d-flex justify-content-start align-items-center">
                                        {v.product_ch}&nbsp;
                                      </h4>
                                    </div>
                                    <div className="col-2">
                                      <h4 className="j-deepGray mb-2 d-flex justify-content-center align-items-center">
                                        {v.quantity}瓶
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}

                        <hr />
                        <div className="col-12 d-flex justify-content-between">
                          <p className="fs-5 j-deepSec">
                            {usersDisplay[i]
                              .map((v, i) => {
                                return v.quantity
                              })
                              .reduce((acc, val) => acc + val, 0)}
                            個商品
                          </p>
                          <p className="fs-5 j-deepSec">
                            訂單金額:$
                            {usersDisplay[i]
                              .map((v, i) => {
                                return +v.price * v.quantity
                              })
                              .reduce((acc, val) => acc + val, 0)}
                            元
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
        <div className="col-12 d-flex justify-content-center mt-5">
          <div className="btn-group me-2" role="group" aria-label="First group">
            <a
              type="button"
              className="btn btn-outline-primary g-line-btn me-1"
              href="#/"
              onClick={() => {
                if (beginPage === 1) {
                  setPageNow(1)
                } else {
                  setPageNow(pageNow - 1)
                }
              }}
            >
              &lt;
            </a>
            {Array(endPage - beginPage + 1)
              .fill(1)
              .map((v, i) => {
                return (
                  <a
                    key={i}
                    type="button"
                    className={
                      pageNow === beginPage + i
                        ? 'btn btn-outline-primary g-line-btn me-1 active-page'
                        : 'btn btn-outline-primary g-line-btn me-1 '
                    }
                    href="#/"
                    onClick={() => {
                      setPageNow(beginPage + i)
                    }}
                  >
                    {beginPage + i}
                  </a>
                )
              })}

            <a
              type="button"
              className="btn btn-outline-primary g-line-btn"
              href="#/"
              onClick={() => {
                if (pageNow === endPage) {
                  setPageNow(endPage)
                } else {
                  setPageNow(pageNow + 1)
                }
              }}
            >
              &gt;
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Orderlist
