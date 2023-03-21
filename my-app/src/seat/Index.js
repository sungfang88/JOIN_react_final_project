import React, { useState, useEffect, useContext, useRef } from 'react'
import '../Public/style'
import './css/booking.css'
import { Link, useNavigate } from 'react-router-dom'
import { PERIOD, SEARCH } from './api_config'
import axios from 'axios'
import { usePopup } from '../Public/Popup'
import AuthContext from '../Context/AuthContext'
import JoinMap from './JoinMap'
import Menu from './Menu'

function Index() {
  const { myAuth } = useContext(AuthContext)

  //*sidebar
  const bookingRef = useRef(null)
  const menuRef = useRef(null)
  const mapRef = useRef(null)
  const handlesidebar = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'auto' })
      const navbarHeight = document.querySelector('.navbar').offsetHeight
      const elementPosition =
        ref.current.getBoundingClientRect().top +
        window.pageYOffset -
        (navbarHeight + 15)
      window.scrollTo({ top: elementPosition, behavior: 'auto' })
    }
  }

  //*日期驗證
  const today = new Date()
    .toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    .split(' ')[0]
  const dateObj = new Date(today)
  const year = dateObj.getFullYear()
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const day = dateObj.getDate().toString().padStart(2, '0')
  const formattedToday = `${year}-${month}-${day}`

  //查詢用
  const [results, setResults] = useState([])
  const [reserveDate, setReserveDate] = useState('')
  const [period, setPeriod] = useState('請選擇...')
  const [people, setPeople] = useState('')
  const [searchData, setSearchData] = useState({})

  //popup
  const { Popup, openPopup, closePopup } = usePopup()
  const navigate = useNavigate()

  //下拉選單
  const [options, setOptions] = useState([])
  const [isMenuOpen1, setIsMenuOpen1] = useState(false)

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('bookingData'))
    if (storedData) {
      setReserveDate(storedData.reserveDate)
      setPeriod(storedData.period)
      setPeople(storedData.people)
    }
  }, [])

  //*下拉式選單
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(PERIOD)
        const data = await response.json()
        setOptions(
          data.map((item) => ({
            value: item.sid.toString(),
            label: item.period,
          }))
        )
      } catch (error) {
        console.log(error)
      }
    }
    fetchOptions()
  }, [])

  const handleToggleDropdown1 = () => {
    setIsMenuOpen1(!isMenuOpen1)
  }

  const handleSelectOption1 = (option) => {
    setPeriod(option.label)
    document.getElementById('selected1').value = option.value
    setIsMenuOpen1(false)
  }

  const searchForm = document.getElementById('searchForm')
  //* 查詢
  const Search = async (event) => {
    event.preventDefault()
    if (searchForm.checkValidity() && (period == 1 || 2 || 3)) {
      // console.log('Form is valid!')
      setSearchData({
        reserveDate,
        period: +document.getElementById('selected1').value,
        people,
      })
      try {
        // saveSearchData({ reserveDate, period, people })
        const response = await axios.get(SEARCH, {
          params: {
            reserveDate,
            period: +document.getElementById('selected1').value,
            people,
          },
        })
        if (response && response.data) {
          setResults(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      // console.log('Form is invalid!')
      // 驗證以後再做...
    }
  }

  //*localStorage
  //TODO 刷新頁面後localStorage會消失
  //讀取local資料
  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem('searchData')) || {}
    setSearchData(storageData)
    setReserveDate(storageData.date || '')
    setPeriod(storageData.period || '')
    setPeople(storageData.people || '')
    setResults(JSON.parse(localStorage.getItem('results')) || [])
  }, [])

  //狀態變化時將其寫入 `localStorage`
  // useEffect(() => {
  //   localStorage.setItem('queryResult', JSON.stringify(results))
  // }, [results])

  useEffect(() => {
    localStorage.setItem('bookingData', JSON.stringify(searchData))
    console.log('刷新')
  }, [searchData])

  return (
    <>
      {/* <!-- section 1 第一個section要加nav-space pt-md-0--> */}
      <section className="container-fluid b-bg mb-5 nav-space"></section>

      <div className="container-fluid pt-md-0">
        <div className="container d-flex flex-column flex-md-row">
          {/* <!-- section-left --> */}
          <div className="sec-left d-none d-md-block">
            <button
              className="g-line-btn h3"
              onClick={() => handlesidebar(bookingRef)}
            >
              訂位
            </button>
            <button
              className="g-line-btn h3"
              onClick={() => handlesidebar(menuRef)}
            >
              菜單
            </button>
            <button
              className="g-line-btn h3"
              onClick={() => handlesidebar(mapRef)}
            >
              營業據點
            </button>
          </div>

          <div className="row d-flex d-md-none mb-5">
            <div className="col-auto flex-grow-1">
              <button
                className="g-line-btn h3 w-100"
                onClick={() => handlesidebar(bookingRef)}
              >
                訂位
              </button>
            </div>
            <div className="col-auto flex-grow-1">
              <button
                className="g-line-btn h3 w-100"
                onClick={() => handlesidebar(menuRef)}
              >
                菜單
              </button>
            </div>
            <div className="col-auto flex-grow-1">
              <button
                className="g-line-btn h3 w-100"
                onClick={() => handlesidebar(mapRef)}
              >
                營業據點
              </button>
            </div>
          </div>

          {/* <!-- section-right --> */}
          <div className="sec-right ps-7 mb-5">
            {/* <!-- 訂位 --> */}
            <section id="booking" ref={bookingRef}>
              <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between w-100">
                <span className="col-auto title j-deepSec"> 訂位</span>
                <div className="title-line d-block d-md-none"></div>
              </div>
              <form
                className="d-flex align-items-end justify-content-between mb-3 flex-column flex-md-row"
                id="searchForm"
              >
                <div className="d-flex col-12 col-md-8 mb-2 mb-md-0">
                  {/* 日期 */}
                  <div className="j-input col-6 m-0 px-1">
                    <div>
                      <label htmlFor="name">日期 </label>
                    </div>
                    <input
                      type="date"
                      className="input-text"
                      value={reserveDate}
                      min={formattedToday}
                      onChange={(e) => setReserveDate(e.target.value)}
                      required
                    />
                  </div>
                  {/* 時段 */}
                  <div className="j-input col-6 m-0 px-1">
                    <div>
                      <label htmlFor="period">時段</label>
                    </div>
                    <div className="dropdown">
                      <div
                        className="dropdown-toggle w-100"
                        onClick={handleToggleDropdown1}
                      >
                        <span className="dropdown-label">
                          {period || '請選擇...'}
                        </span>
                        <i className="fas fa-caret-down"></i>
                      </div>
                      {isMenuOpen1 && (
                        <ul className="dropdown-menu mt-2">
                          {options.map((option) => (
                            <li
                              key={option.value}
                              onClick={() => handleSelectOption1(option)}
                            >
                              {option.label}
                            </li>
                          ))}
                        </ul>
                      )}
                      <input type="hidden" id="selected1" name="selected" />
                    </div>
                  </div>
                </div>

                <div className="d-flex col-12 col-md-4 align-items-end">
                  {/* 人數 */}
                  <div className="j-input col-6 m-0 px-1">
                    <div>
                      <label htmlFor="people">人數</label>
                    </div>
                    <input
                      type="number"
                      id="people"
                      className="input-text"
                      min="1"
                      max="50"
                      value={people}
                      onChange={(e) => setPeople(e.target.value)}
                      required
                    />
                  </div>
                  {/* 查詢 */}
                  <div className="col-6 px-1">
                    <button
                      type="submit"
                      className="g-line-btn j-h3 j-white w-100"
                      onClick={Search}
                    >
                      查詢
                    </button>
                  </div>
                </div>
              </form>
              <div className="container-fluid">
                <div className="row">
                  <h3 className="j-bg-lightPri j-deepSec py-2">剩餘座位</h3>
                </div>
              </div>

              <table className="mb-3">
                <thead className="j-deepPri">
                  <tr>
                    <td>吧台</td>
                    <td>方桌</td>
                    <td>包廂</td>
                  </tr>
                </thead>
                <tbody className="j-deepGray">
                  <tr>
                    <td>{results.bar}</td>
                    <td>{results.desk}</td>
                    <td>{results.room}</td>
                    {/* <td>{console.log(result)}</td> */}
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-md-content-end flex-grow-1">
                {/* <Link className="w-100" to="/seat/book-seat"> */}
                {myAuth.authorized ? (
                  <button
                    className="o-long-btn h3 py-3 w-100"
                    onClick={(e) => {
                      e.preventDefault()
                      navigate('/seat/book-seat')
                    }}
                  >
                    訂位去！
                  </button>
                ) : (
                  <button
                    className="o-long-btn h3 py-3 w-100"
                    onClick={(e) => {
                      e.preventDefault()
                      openPopup()
                    }}
                  >
                    訂位去！
                  </button>
                )}
                {/* </Link> */}
              </div>
            </section>

            {/* 菜單 */}
            <Menu ref={menuRef} />
            {/* 營業據點 */}
            <section id="location" ref={mapRef}>
              <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between w-100">
                <span className="col-auto title j-deepSec"> 營業據點</span>
                <div className="title-line d-block d-md-none"></div>
              </div>
              <div className="d-flex flex-column flex-md-row">
                <div className="map mb-4 mb-md-0">
                  <JoinMap />
                </div>
                <div className="map-info ps-0 ps-md-5">
                  <h2 className="j-deepPri">交通位置</h2>
                  <ul className="h4 j-deepSec mb-3 mb-md-5">
                    <li className="my-2">台北市大安區復興南路一段390號2樓</li>
                    <li className="my-2">
                      公車：搭乘xx號及xx號在xx站下車，走路三分鐘可到達
                    </li>
                    <li className="my-2">捷運：大安捷運站4號、6號出口</li>
                  </ul>
                  <h2 className="j-deepPri pt-5">營業時間</h2>
                  <ul className="h4 j-deepSec">
                    <li className="my-2">星期一及國定假日公休</li>
                    <li className="my-2">
                      一次用餐時間為兩小時，時段分別為八點到十點、十點到十二點、十二點到兩點
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Popup
        content={'請先登入會員'}
        btnGroup={[
          {
            text: '立即登入',
            handle: () => {
              localStorage.setItem(
                'presentURL',
                JSON.stringify(window.location.href)
              )
              navigate('/member/login')
            },
          },
          {
            text: '關閉',
            handle: closePopup,
          },
        ]}
      />
    </>
  )
}

export default Index
