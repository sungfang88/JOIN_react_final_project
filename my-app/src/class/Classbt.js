import React, { useState, useEffect } from 'react'
import './css/Class.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Classbt() {
  const [data, setData] = useState('')

  const [bartenders, setBartenders] = useState([
    { sid: 0, bartendername: '', bartenderID: '', created_at: '' },
  ])
  const Submit = function () {
    const alldata = {
      bartendername: data,
    }

    localStorage.setItem('key2', JSON.stringify(alldata))
  }

  useEffect(() => {
    const fetchBartenders = async () => {
      try {
        const response = await axios('http://localhost:3008/class/bartender')

        console.log('response.data', response.data)
        setBartenders(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchBartenders()
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

      {/* 選擇bertender*/}
      <div class="container ">
        <div class="row row-cols-1 row-cols-md-2  row-cols-xl-4  g-4 ">
          {bartenders.map((v, i) => (
            <div className="col" key={v.sid}>
              <div className="card card-a">
                <img
                  src={`/img/${v.bartender_img}`}
                  class="card-img-top"
                  alt="..."
                />

                <div className="info d-flex">
                  <input
                    type="radio"
                    name="classname"
                    value={v.bartendername}
                    class="j-radio"
                    onClick={(e) => {
                      setData(e.target.value)
                    }}
                  />
                  <h3 className="j-h3 j-deepSec">{v.bartendername}</h3>
                </div>
              </div>
            </div>
          ))}
          {/*<div class="col">
             <div class="card card-a">
              <img
                src={require('./img/bartender1.webp')}
                class="card-img-top"
                alt="..."
              />
              <div class="info">
                <h3 class="j-h3 j-deepSec">Wilbur </h3>
                <div class="j-text j-deepSec mb-3"></div>
                <div class="o-long-btn  h3">選擇</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card card-a">
              <img
                src={require('./img/bartender2.jpeg')}
                alt="bartender2"
                class="card-img-top"
              />
              <div class="info">
                <h3 class="j-h3 j-deepSec">Richie</h3>
                <div class="j-text j-deepSec mb-3"></div>
                <div class="o-long-btn  h3">選擇</div>
              </div>
            </div> 
          </div>
          <div class="col">
            <div class="card card-a">
              <img
                src={require('./img/bartender3.webp')}
                alt="bartender3"
                class="card-img-top"
              />
              <div class="info">
                <h3 class="j-h3 j-deepSec">Steve </h3>
                <div class="j-text j-deepSec mb-3"></div>
                <div class="o-long-btn  h3">選擇</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card card-a">
              <img
                src={require('./img/bartender4.webp')}
                alt="bartender4"
                class="card-img-top"
              />
              <div class="info">
                <h3 class="j-h3 j-deepSec">Timmy </h3>
                <div class="j-text j-deepSec mb-3"></div>
                <div class="o-long-btn  h3">選擇</div>
              </div>
            </div>
          </div>*/}
        </div>
        <br />
        <div class=" d-flex justify-content-around  pb-3">
          <Link class="gray-line-btn j-h3" to="/class/Classsec">
            上一步
          </Link>
          <Link class="g-line-btn j-h3" to="/class/Classday" onClick={Submit}>
            下一步
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Classbt
