import React, { useState, useEffect, useRef, useContext } from 'react'
import '../Public/style'
import './css/booking.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SEAT_ADD, SEAT_ALL } from './api_config'
import { usePopup } from '../Public/Popup'
import '../Public/css/popup.css'
import AuthContext from '../Context/AuthContext'
import dayjs from 'dayjs'

const options1 = [
  { value: 1, label: '8pm-10pm' },
  { value: 2, label: '10pm-12am' },
  { value: 3, label: '12am-2am' },
]

const options2 = [
  { value: '1', label: '吧台' },
  { value: '2', label: '方桌' },
  { value: '3', label: '包廂' },
]

function Booking() {
  const { myAuth, logout } = useContext(AuthContext)
  // console.log('myAuth', myAuth)

  const { Popup, openPopup, closePopup } = usePopup() //必要const
  const [popupProps, setPopupProps] = useState({}) //可用 useState 來做動態更新
  const initialState = useRef(true)

  const [period, setPeriod] = useState('請選擇...')
  const [periodSid, setPeriodSid] = useState()
  const [table, setTable] = useState('請選擇...')
  const [isMenuOpen1, setIsMenuOpen1] = useState(false)
  const [isMenuOpen2, setIsMenuOpen2] = useState(false)

  //*日期驗證
  const today = new Date()
    .toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    .split(' ')[0]
  const dateObj = new Date(today)
  const year = dateObj.getFullYear()
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const day = dateObj.getDate().toString().padStart(2, '0')
  const formattedToday = `${year}-${month}-${day}`

  const [reserveDate, setReserveDate] = useState('')
  const [people, setPeople] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [sid, setSid] = useState(null)
  const navigate = useNavigate()

  //*下拉選單
  const handleToggleDropdown1 = () => {
    setIsMenuOpen1(!isMenuOpen1)
  }

  const handleSelectOption1 = (option) => {
    setPeriod(option.label)
    document.getElementById('selected1').value = option.value
    setIsMenuOpen1(false)
  }

  const handleToggleDropdown2 = () => {
    setIsMenuOpen2(!isMenuOpen2)
  }

  const handleSelectOption2 = (option) => {
    setTable(option.label)
    document.getElementById('selected2').value = option.value
    setIsMenuOpen2(false)
  }
  //* 代入查詢locolStorage資料
  useEffect(() => {
    const bookingData = JSON.parse(localStorage.getItem('bookingData'))
    if (bookingData) {
      setReserveDate(bookingData.reserveDate)
      // setPeriod(bookingData.period)
      if (bookingData.period == options1[0].value) {
        setPeriod(options1[0].label)
        setPeriodSid(1)
      } else if (bookingData.period == options1[1].value) {
        setPeriod(options1[1].label)
        setPeriodSid(2)
      } else if (bookingData.period == options1[2].value) {
        setPeriod(options1[2].label)
        setPeriodSid(3)
      }
      setPeople(bookingData.people)
    }
  }, [])

  //*帶入會員資料
  const [checked, setChecked] = useState(false)
  const handleCheckboxChange = (event) => {
    const { checked } = event.target
    setChecked(checked)
    if (checked) {
      // console.log('check')
    } else {
      // console.log('not check')
      setName('')
      setPhone('')
    }
  }

  const [memberdata, setMemberData] = useState({ name: '', phone: '' })
  const getMemberData = async () => {
    try {
      const response = await axios.get(`${SEAT_ALL}/${myAuth.sid}`, {
        withCredentials: true,
      })
      // console.log(myAuth.sid)
      setMemberData(response.data[0])
      // console.log(response.data[0])
      setName(response.data[0].name)
      setPhone(response.data[0].phone)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (checked) {
      // console.log('check')
      getMemberData()
    } else {
      setName('')
      setPhone('')
    }
  }, [checked])

  //* 上傳資料
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('上傳中')
    try {
      const response = await fetch(SEAT_ADD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          member_sid: myAuth.sid,
          name: name,
          phone: phone,
          reserveDate: reserveDate,
          period_sid: +document.getElementById('selected1').value || periodSid,
          table_sid: +document.getElementById('selected2').value,
          people: people,
        }),
      })
      console.log(response.data)
      //解決popup路徑重複問題
      const data = await response.json()
      const sid = data.result.insertId
      setSid(sid)
      console.log(data)
      console.log(sid)
      openPopup()
    } catch (error) {
      console.log(error)
    }
    localStorage.removeItem('bookingData')
    localStorage.removeItem('queryResult')
  }

  return (
    <>
      <section className="container-fluid nav-space b-bg2 mb-0">
        <div className="container pt-3">
          <h1 className="j-white mb-4">歡迎來Join ! 享受美好時光</h1>
          <form className="px-4 px-md-5 py-4 book-form" onSubmit={handleSubmit}>
            {/* <!-- 純文字 --> */}
            <div className="row mb-3 mb-md-5 mt-0 mt-md-3">
              <div className="mb-3">
                <span className="book-title mt-4 j-deepSec">訂位資料</span>
              </div>
              <div className="col-12 col-md-6">
                <div className="j-input">
                  <div>
                    <label htmlFor="date">日期</label>
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

                <div className="j-input">
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
                        {options1.map((option) => (
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

              <div className="col-12 col-md-6">
                <div className="j-input">
                  <div>
                    <label htmlFor="people">人數</label>
                  </div>
                  <input
                    type="number"
                    id="people"
                    className="input-text"
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                    required
                    min="1"
                    max="50"
                  />
                </div>
                {/* <!-- 下拉式選單 --> */}
                <div className="j-input">
                  <div>
                    <label htmlFor="period">座位種類</label>
                  </div>
                  <div className="dropdown">
                    <div
                      className="dropdown-toggle w-100"
                      onClick={handleToggleDropdown2}
                    >
                      <span className="dropdown-label">
                        {table || '請選擇...'}
                      </span>
                      <i className="fas fa-caret-down"></i>
                    </div>
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
                    <input type="hidden" id="selected2" name="selected" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 d-flex align-items-end">
                <span className="book-title mt-4 j-deepSec mb-2 h2 me-5">
                  訂位人資料
                </span>
                <div className="j-input d-flex flex-row">
                  <label className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      name="food"
                      value="1"
                      className="j-checkbox"
                      checked={checked}
                      onChange={handleCheckboxChange}
                    />
                    同會員資料
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="j-input">
                  <div>
                    <label htmlFor="name">姓名</label>
                  </div>
                  <input
                    type="text"
                    className="input-text"
                    required
                    placeholder="ex.王小明"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="j-input">
                  <div>
                    <label htmlFor="phone">電話</label>
                  </div>
                  <input
                    type="text"
                    id="phone"
                    className="input-text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-3">
              <Link to="#">
                <button className="gray-line-btn h3 me-2">取消</button>
              </Link>
              {/* <Link to="/seat/confirm-seat"> */}
              <button className="o-line-btn h3" type="submit">
                送出
              </button>
              {/* </Link> */}
            </div>
          </form>
        </div>
      </section>
      <Popup
        content={'訂位成功！'}
        icon={<i className="fa-solid fa-circle-check"></i>}
        btnGroup={[
          {
            text: '關閉',
            handle: () => {
              navigate(`/seat/confirm-seat/${sid}`)
            },
          },
        ]}
      />
    </>
  )
}

export default Booking
