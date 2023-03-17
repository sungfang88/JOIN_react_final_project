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

  const [classtime, setClasstime] = useState([
    { sid: 0, classtime: '', time: '', created: '' },
  ])

  const [selectedPeople, setSelectedPeople] = useState(1) // 初始人數為 1
  const [totalPrice, setTotalPrice] = useState(initialpeople[0].count) // 初始總金額為 2400

  const [data, setTime] = useState('')
  const [data2, setclass_prople] = useState('')

  const Submit = function () {
    const alldata = {
      class_date: dayjs(value).format('YYYY-MM-DD'),
      class_time: data,
      class_prople: selectedPeople,
    }

    localStorage.setItem('key3', JSON.stringify(alldata))
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
    <section class="container-fluid py-5 pb-5">
      <div class="container nav-space">
        <div class="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between py-2">
          {/* <span class="col-auto title j-deepSec"> 課程訂購流程</span>
          <div class="title-line d-block d-md-none"></div> */}
        </div>
        <div class="step-process pb-3">
          <div class="step complete">
            <h1>1</h1>
            <h3> 選擇課程組合 </h3>
          </div>

          <div class="step complete ">
            <h1>2</h1>
            <h3>選擇Bartender</h3>
          </div>
          <div class="step complete">
            <h1>3</h1>
            <h3>選擇日期時間&人數</h3>
          </div>
          <div class="step">
            <h1>4</h1>
            <h3>填寫資料</h3>
          </div>
        </div>
      </div>
      <div class="container d-flex py-5  flex-md-row flex-column">
        {/* <!-- 下拉式選單 --> */}
        <div class="container col ps-5 ">
          {/* <div class=" d-flex  ">
            <div class="j-input w-50  pe-lg-3 ">
              <div>
                <label for="period">請選擇年份</label>
              </div>
              <div class="dropdown  ">
                <YearSelect />
              </div>
            </div>
            <div class="j-input  w-50 ">
              <div>
                <label for="period">請選擇月份</label>
              </div>
              <div class="dropdown">
                <MonthSelect />
              </div>
            </div>
          </div>
          <div> */}
          <Calendar onChange={myChange} value={value} />

          {/* </div> */}
        </div>
        <div class="col container ps-5 ">
          <div class="j-input pb-3 ">
            <div>
              <label for="period">選擇時段</label>
            </div>
            {classtime.map((v, i) => (
              <label class="align-items-center">
                <input
                  type="radio"
                  name="table"
                  class="j-radio"
                  value={v.classtime}
                  onClick={(e) => {
                    setTime(e.target.value)
                  }}
                />
                {v.time}
              </label>
            ))}
            {/* <label class=" align-items-center">
              <input type="radio" name="table" value="2" class="j-radio" />
              時段1
            </label> */}
          </div>

          <div class="j-input ">
            <div>
              <label for="period ">選擇人數</label>
              <p class="h5 pt-2 ">TWD 2400/每人</p>
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

            <div class="d-flex py-3 align-items-center">
              <h3 class="j-deepGray pe-5 "> 總金額 </h3>
              <h3 class="j-deepGray  pe-2">TWD</h3>
              <h3 className="j-primary">{totalPrice * selectedPeople}</h3>
            </div>
          </div>
        </div>
      </div>

      <div class=" d-flex justify-content-around">
        <Link class="gray-line-btn j-h3" to="/class/Classbt">
          上一步
        </Link>
        <Link
          class="g-line-btn j-h3"
          to="/class/Classpeople"
          type="submit"
          onClick={Submit}
        >
          下一步
        </Link>
      </div>
    </section>
  )
}

export default Classday
