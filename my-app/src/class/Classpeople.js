import React, { useState, useEffect } from 'react'
import './css/Class.css'
import { Link } from 'react-router-dom'

function Classpeople() {
  const [Classbooking, setClassbooking] = useState([])
  const [s1, sets1] = useState('')
  const [p1, setp1] = useState('')
  const [data, setdata] = useState('')
  const [data2, setdata2] = useState('')
  const Submit = () => {
    const alldata = {
      s1: s1,
      p1: p1,
      data: data,
      data2: data2,
    }

    localStorage.setItem('key4', JSON.stringify(alldata))
  }
  useEffect(() => {
    const fetchClassbooking = async () => {
      try {
        const response = await fetch(
          'http://localhost:3008/class/classbooking/'
        )
        const data = await response.json()
        setClassbooking(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchClassbooking()
  }, [])
  return (
    <section class="container-fluid">
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
          <div class="step complete">
            <h1>4</h1>
            <h3>填寫資料</h3>
          </div>
        </div>
      </div>

      {/* 填寫資料*/}
      <div class="container pt-3">
        <div class="title-box  justify-content-between">
          <span class="col-auto j-h2 j-deepSec pe-5">參與者</span>
          <input type="checkbox" name="food" value="1" class="j-checkbox" />
          <span class="text-align-center"> 同訂購人</span>
        </div>

        <div class="j-input w-lg-50 w-md-100 d-md-flex flex-column-md-reverse align-items-center">
          <div class="mb-3 px-xl-5">
            <div>
              <label for="name">姓名</label>
            </div>

            <div class="">
              <input
                type="text"
                class="input-text"
                value={s1}
                required
                placeholder="ex.王小明"
                onChange={(e) => sets1(e.target.value)}
              />
            </div>
          </div>
          <div class="mb-3">
            <div>
              <label for="phone">電話</label>
            </div>

            <div class="">
              <input
                type="tel"
                class="input-text"
                value={p1}
                required
                placeholder="ex.0912345678"
                onChange={(e) => setp1(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="container  ">
        <div class="title-box  justify-content-between">
          <span class="col-auto j-h2 j-deepSec">參與者</span>
        </div>
        <div class="j-input w-lg-50 w-md-100 d-md-flex flex-column-md-reverse align-items-center">
          <div class="mb-3 px-xl-5">
            <div>
              <label for="name">姓名</label>
            </div>

            <div class="">
              <input
                type="text"
                class="input-text"
                value={data}
                required
                placeholder="ex.王小明"
                onChange={(e) => setdata(e.target.value)}
              />
            </div>
          </div>
          <div class="mb-3">
            <div>
              <label for="phone">電話</label>
            </div>

            <div class="">
              <input
                type="tel"
                class="inpu2t-text"
                value={data2}
                required
                placeholder="ex.0912345678"
                onChange={(e) => setdata2(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div class="container d-flex justify-content-end pb-3">
        {/* <p class="text-center">再加一人</p> */}
        <button class="o-line-btn j-h3">
          <i class="fa-solid fa-plus"></i>參與者
        </button>
      </div>
      <div class="container ">
        <div class=" d-flex justify-content-around">
          <Link class="gray-line-btn j-h3" to="/class/Classday">
            上一步
          </Link>

          <Link
            class="o-long-btn j-h3 btnCall "
            to="/cart/classOrder01"
            onClick={Submit}
          >
            立即購買
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Classpeople
