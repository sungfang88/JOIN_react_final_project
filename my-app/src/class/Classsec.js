import React, { useState, useEffect } from 'react'
import './css/Class.css'
import { Link } from 'react-router-dom'
import ClassSelect from './ClassSelect'
import axios from 'axios'

function Classsec() {
  const [data, setData] = useState('')

  const [selectname1, setSelectname1] = useState('')
  const [selectname2, setSelectname2] = useState('')

  const [ClassNames, setClassNames] = useState([
    {
      sid: 0,
      classsid: '',
      wine1: '',
      wine2: '',
      wine3: '',
      classname_date: '',
    },
  ])
  const Submit = function () {
    const alldata = {
      class_id: data,
      // 寫變數取值
      wine1: selectname1,
      wine2: selectname2,
    }

    localStorage.setItem('key1', JSON.stringify(alldata))
  }

  useEffect(() => {
    const fetchClassNames = async () => {
      try {
        const response = await axios('http://localhost:3008/class/classname')
        console.log('response.data', response.data)

        setClassNames(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchClassNames()
  }, [])
  return (
    <section class="container-fluid">
      <div class="container nav-space">
        <div class="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between py-2">
          <span class="col-auto title j-deepSec"> 課程訂購流程</span>
          <div class="title-line d-block d-md-none"></div>
        </div>
        <div class="step-process pb-3">
          <div class="step complete">
            <h1>1</h1>
            <h3> 選擇課程組合 </h3>
          </div>

          <div class="step ">
            <h1>2</h1>
            <h3>選擇Bartender</h3>
          </div>
          <div class="step">
            <h1>3</h1>
            <h3>選擇日期時間&人數</h3>
          </div>
          <div class="step">
            <h1>4</h1>
            <h3>填寫資料</h3>
          </div>
        </div>
      </div>
      {/* 課程組合 */}
      <div class="container ">
        <table action=" ref={this.input}">
          <thead class="j-deepPri">
            <tr>
              <td>check</td>
              <td>課程組合</td>
              <td>課程內容</td>
            </tr>
          </thead>

          <tbody class="j-deepGray">
            {ClassNames.map((v, i) => (
              <tr>
                <td>
                  <input
                    type="radio"
                    name="classname"
                    value={v.classsid}
                    class="j-radio"
                    onClick={(e) => {
                      setData(e.target.value)
                    }}
                  />
                </td>
                <td> {v.classsid}</td>
                <td>
                  {v.wine1} / {v.wine2} <p> {v.wine3}</p>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  type="radio"
                  name="classname"
                  class="j-radio"
                  value={'組合D'}
                  onClick={(e) => {
                    setData(e.target.value)
                  }}
                />
              </td>
              <td>組合D</td>
              <td class=" align-items-center ">
                <div class="container flex-md-column ">
                  <div class="dropdown w-25 ">
                    <ClassSelect myChange={(v) => setSelectname1(v)} />
                  </div>

                  <div class="dropdown w-25  ">
                    <ClassSelect myChange={(v) => setSelectname2(v)} />
                  </div>
                </div>
                <div class=" align-items-center ">
                  <p>bartander特調</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <br />
        <div class=" d-flex justify-content-around">
          <Link class="gray-line-btn j-h3" to="/class">
            取消
          </Link>
          <Link
            class="g-line-btn j-h3"
            to="/class/Classbt"
            onClick={Submit}
            type="submit"
          >
            下一步
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Classsec
