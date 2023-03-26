import React, { useState, useEffect } from 'react'
import './css/Class.css'
import { Link } from 'react-router-dom'
//import MonthSelect from './MonthSelect'
//import YearSelect from './YearSelect'
// import Calendar from './Calendar'
import Calendar from 'react-calendar'
import './css/Calendar.css'
import axios from 'axios'
import dayjs from 'dayjs'
import { usePopup } from '../Public/Popup'
import { useNavigate } from 'react-router-dom'

const initialpeople = [
  {
    id: 0, // 從 0 開始遞增
    count: 2400,
  },
  {
    id: 1,
    count: 4800,
  },
  {
    id: 2,
    count: 7200,
  },
  {
    id: 3,
    count: 9600,
  },
  {
    id: 4,
    count: 12000,
  },
  {
    id: 5,
    count: 14400,
  },
]

function Classday() {
  const [value, onChange] = useState()
  const { Popup, openPopup, closePopup } = usePopup() //必要const
  const [PopupProps, setPopupProps] = useState({}) //可用 useState 來做動態更新
  const navigate = useNavigate()

  const myChange = (date) => {
    const allowDays = [2, 4, 6]
    const day = date.getDay()

    if (allowDays.includes(day)) {
      console.log('good')
      onChange(date)
    } else {
      console.log('bad')
    }
  }

  // function isDisabled(date) {
  //   // 获取星期几的值，其中 0 表示星期日，1 表示星期一，2 表示星期二，以此类推
  //   const day = date.getDay()
  //   // 禁用周一、三、五、日
  //   return day === 1 || day === 3 || day === 5 || day === 0
  // }

  // 日期禁用周一、三、五、日
  function isDisabled(date) {
    const day = date.getDay()

    return day === 1 || day === 3 || day === 5 || day === 0
  }

  const [classtime, setClasstime] = useState([
    { sid: 0, classtime: '', time: '', created: '' },
  ])

  const [selectedPeople, setSelectedPeople] = useState(1) // 初始人數為 1
  const [totalPrice, setTotalPrice] = useState(initialpeople[0].count) // 初始總金額為 2400

  const [data, setTime] = useState('')
  const [data2, setclass_prople] = useState('')

  // const Submit = function () {
  //   const alldata = {
  //     class_date: dayjs(value).format('YYYY-MM-DD'),
  //     class_time: data,
  //     class_prople: selectedPeople,
  //   }

  //   localStorage.setItem('key3', JSON.stringify(alldata))
  // }

  const Submit = function () {
    if (data) {
      const alldata = {
        class_date: dayjs(value).format('YYYY-MM-DD'),
        class_time: data,
        class_prople: selectedPeople,
      }

      localStorage.setItem('key3', JSON.stringify(alldata))
      navigate('/class/Classpeople')
    } else {
      setPopupProps(true)
    }
  }

  function isDisabled(date) {
    // 获取星期几的值，其中 0 表示星期日，1 表示星期一，2 表示星期二，以此类推
    const day = date.getDay()
    // 禁用周一、三、五、日
    return day === 1 || day === 3 || day === 5 || day === 0
  }

  useEffect(() => {
    const fetchClasstime = async () => {
      try {
        const response = await axios('http://localhost:3008/class/classtime')
        console.log('response.data', response.data)

        setClasstime(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchClasstime()
  }, [])
  return (
    <>
      <section className="container-fluid py-5 pb-5">
        <div className="container nav-space">
          <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between py-2">
            {/* <span className="col-auto title j-deepSec"> 課程訂購流程</span>
          <div className="title-line d-block d-md-none"></div> */}
          </div>
          <div className="step-process pb-3">
            <div className="step complete">
              <h1>1</h1>
              <h3> 選擇課程組合 </h3>
            </div>

            <div className="step complete ">
              <h1>2</h1>
              <h3>選擇調酒師</h3>
            </div>
            <div className="step complete">
              <h1>3</h1>
              <h3>選擇日期時間&人數</h3>
            </div>
            <div className="step">
              <h1>4</h1>
              <h3>填寫資料</h3>
            </div>
          </div>
        </div>
        <div className="container d-flex py-5  flex-md-row flex-column">
          {/* <!-- 下拉式選單 --> */}
          <div className="container col ps-5 ">
            {/* <div className=" d-flex  ">
            <div className="j-input w-50  pe-lg-3 ">
              <div>
                <label for="period">請選擇年份</label>
              </div>
              <div className="dropdown  ">
                <YearSelect />
              </div>
            </div>
            <div className="j-input  w-50 ">
              <div>
                <label for="period">請選擇月份</label>
              </div>
              <div className="dropdown">
                <MonthSelect />
              </div>
            </div>
          </div>
          <div> */}
            <Calendar
              onChange={myChange}
              value={value}
              tileDisabled={({ date }) => isDisabled(date)}
              minDate={new Date()}
            />

            {/* </div> */}
          </div>
          <div className="col container ps-5 ">
            <div className="j-input pb-3 ">
              <div>
                <label for="period">選擇時段</label>
              </div>
              {classtime.map((v, i) => (
                <label className="align-items-center">
                  <input
                    type="radio"
                    name="table"
                    className="j-radio"
                    value={v.classtime}
                    onClick={(e) => {
                      setTime(e.target.value)
                    }}
                  />
                  {v.time}
                </label>
              ))}
              {/* <label className=" align-items-center">
              <input type="radio" name="table" value="2" className="j-radio" />
              時段1
            </label> */}
            </div>

            <div className="j-input ">
              <div>
                <label for="period ">選擇人數</label>
                <p className="h5 pt-2 ">TWD 2400/每人</p>
                <td>
                  <i
                    className="fa-solid fa-square-minus"
                    onClick={() => {
                      if (selectedPeople > 1) {
                        setSelectedPeople(selectedPeople - 1)
                        setTotalPrice(initialpeople[0].count) // 更新總金額
                      }
                    }}
                  ></i>
                  <span
                    className="px-4"
                    value={setclass_prople}
                    onClick={(e) => {
                      setclass_prople(e.target.value)
                    }}
                  >
                    {selectedPeople}
                  </span>
                  <i
                    className="fa-solid fa-square-plus"
                    onClick={() => {
                      if (selectedPeople < 6) {
                        setSelectedPeople(selectedPeople + 1)
                        setTotalPrice(initialpeople[0].count) // 更新總金額
                      }
                    }}
                  ></i>
                </td>
                <input type="hidden" id="selected" name="selected" />
              </div>

              <div className="d-flex py-3 align-items-center">
                <h3 className="j-deepGray pe-5 "> 總金額 </h3>
                <h3 className="j-deepGray  pe-2">TWD</h3>
                <h3 className="j-primary">{totalPrice * selectedPeople}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className=" d-flex justify-content-around">
          <Link className="gray-line-btn j-h3" to="/class/Classbt">
            上一步
          </Link>
          <Link
            className="g-line-btn j-h3"
            to="/class/Classpeople"
            type="submit"
            onClick={(e) => {
              Submit()
              e.preventDefault()
              openPopup()
            }}
          >
            下一步
          </Link>
        </div>
      </section>
      <div className="pb-0 pb-md-5"></div>
      {PopupProps && (
        <Popup
          content={'請選擇選項'}
          icon={<i className="fa-solid fa-circle-exclamation"></i>}
          btnGroup={[
            {
              text: '確定',
              handle: () => {
                setPopupProps(false)
              },
            },
          ]}
        />
      )}
    </>
  )
}

export default Classday
