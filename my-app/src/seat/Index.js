import React, { useState, useEffect } from 'react'
import '../Public/style'
import './css/booking.css'
import { Link } from 'react-router-dom'
import { PERIOD, SEARCH } from './api_config'
import axios from 'axios'

const options2 = [
  { value: '1', label: '琴酒 Gin' },
  { value: '2', label: '蘭姆酒 Rum' },
  { value: '3', label: '伏特加 Vodka' },
  { value: '4', label: '威士忌 Whisky' },
  { value: '5', label: '龍舌蘭 Tequila' },
  { value: '6', label: '白蘭地 Brandy' },
]

function Index() {
  const [reserveDate, setReserveDate] = useState('')
  const [period, setPeriod] = useState('請選擇...')
  const [people, setPeople] = useState('')
  const [results, setResults] = useState([])

  const [options, setOptions] = useState([])

  const [selectedValue2, setSelectedValue2] = useState('請選擇...')
  const [isMenuOpen1, setIsMenuOpen1] = useState(false)
  const [isMenuOpen2, setIsMenuOpen2] = useState(false)

  //下拉式選單
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

  const handleToggleDropdown2 = () => {
    setIsMenuOpen2(!isMenuOpen2)
  }

  const handleSelectOption2 = (option) => {
    setSelectedValue2(option.label)
    setIsMenuOpen2(false)
  }

  const search = async (event) => {
    event.preventDefault()
    try {
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
  }

  return (
    <>
      {/* <!-- section 1 第一個section要加nav-space pt-md-0--> */}
      <section className="container-fluid b-bg mb-5 nav-space"></section>

      <div className="container-fluid pt-md-0">
        <div className="container d-flex flex-column flex-md-row">
          {/* <!-- section-left --> */}
          <div className="sec-left d-none d-md-block">
            <button className="g-line-btn h3">訂位</button>
            <button className="g-line-btn h3">菜單</button>
            <button className="g-line-btn h3">營業據點</button>
          </div>

          <div className="row d-flex d-md-none mb-5">
            <div className="col-auto flex-grow-1">
              <button className="g-line-btn h3 w-100">訂位</button>
            </div>
            <div className="col-auto flex-grow-1">
              <button className="g-line-btn h3 w-100">菜單</button>
            </div>
            <div className="col-auto flex-grow-1">
              <button className="g-line-btn h3 w-100">營業據點</button>
            </div>
          </div>

          {/* <!-- section-right --> */}
          <div className="sec-right ps-7 mb-5">
            {/* <!-- 訂位 --> */}
            <section>
              <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between w-100">
                <span className="col-auto title j-deepSec"> 訂位</span>
                <div className="title-line d-block d-md-none"></div>
              </div>
              <form className="d-flex align-items-end justify-content-between mb-3 flex-column flex-md-row">
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
                      onChange={(e) => setReserveDate(e.target.value)}
                    />
                  </div>
                  {/* 時段 */}
                  <div className="j-input col-6 m-0 px-1">
                    <div>
                      <label htmlFor="period">時段</label>
                    </div>
                    <div className="dropdown">
                      <div
                        className="dropdown-toggle"
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
                      onClick={search}
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
                <Link className="w-100" to="/seat/book-seat">
                  <button className="o-long-btn h3 py-3 w-100">訂位去！</button>
                </Link>
              </div>
            </section>

            {/* 菜單 */}
            <section>
              <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between w-100">
                <span className="col-auto title j-deepSec"> 菜單</span>
                <div className="title-line d-block d-md-none"></div>
              </div>

              <div className="mb-3 d-none d-lg-flex">
                <div>
                  <button className="g-line-btn h3 me-2">琴酒 Gin</button>
                </div>
                <div>
                  <button className="g-line-btn h3 me-2">蘭姆酒 Rum</button>
                </div>
                <div>
                  <button className="g-line-btn h3 me-2">伏特加 Vodka</button>
                </div>
                <div>
                  <button className="g-line-btn h3 me-2">威士忌 Whisky</button>
                </div>
                <div>
                  <button className="g-line-btn h3 me-2">龍舌蘭 Tequila</button>
                </div>
                <div>
                  <button className="g-line-btn h3 me-2">白蘭地 Brandy</button>
                </div>
              </div>

              <div className="j-input mb-3 d-block d-lg-none">
                <div>
                  <label htmlFor="period">基底酒種類</label>
                </div>
                <div className="dropdown">
                  <div
                    className="dropdown-toggle"
                    onClick={handleToggleDropdown2}
                  >
                    <span className="dropdown-label">
                      {selectedValue2 || '請選擇...'}
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
                  <input
                    type="hidden"
                    id="selected2"
                    name="selected"
                    value={selectedValue2}
                  />
                </div>
              </div>
              <div className="container-fluid">
                <div className="j-bg-o-grad p-4 p-lg-5 row row-cols-1 row-cols-md-2 row-cols-lg-3 text-start justify-content-between">
                  <div className="wine j-white my-4 my-lg-5">
                    <h4 className="mb-2">血腥瑪麗 Bloody Mary</h4>
                    <h5>特級朗姆酒、紅色甘露酒、義大利甜紅酒、橙片</h5>
                  </div>
                  <div className="wine j-white my-4 my-lg-5">
                    <h4 className="mb-2">血腥瑪麗 Bloody Mary</h4>
                    <h5>特級朗姆酒、紅色甘露酒、義大利甜紅酒、橙片</h5>
                  </div>
                  <div className="wine j-white my-4 my-lg-5">
                    <h4 className="mb-2">血腥瑪麗 Bloody Mary</h4>
                    <h5>特級朗姆酒、紅色甘露酒、義大利甜紅酒、橙片</h5>
                  </div>

                  <div className="wine j-white my-4 my-lg-5">
                    <h4 className="mb-2">血腥瑪麗 Bloody Mary</h4>
                    <h5>
                      特級朗姆酒、紅色甘露酒、義大利甜紅酒、橙片紅色甘露酒、義大利甜紅酒、橙片
                    </h5>
                  </div>
                  <div className="wine j-white my-4 my-lg-5">
                    <h4 className="mb-2">血腥瑪麗 Bloody Mary</h4>
                    <h5>特級朗姆酒、紅色甘露酒、義大利甜紅酒、橙片</h5>
                  </div>
                  <div className="wine j-white my-4 my-lg-5">
                    <h4 className="mb-2">血腥瑪麗 Bloody Mary</h4>
                    <h5>特級朗姆酒、紅色甘露酒、義大利甜紅酒、橙片</h5>
                  </div>

                  <div className="wine j-white my-4 my-lg-5">
                    <h4 className="mb-2">血腥瑪麗 Bloody Mary</h4>
                    <h5>特級朗姆酒、紅色甘露酒、義大利甜紅酒、橙片</h5>
                  </div>
                  <div className="wine j-white my-4 my-lg-5">
                    <h4 className="mb-2">血腥瑪麗 Bloody Mary</h4>
                    <h5>特級朗姆酒、紅色甘露酒、義大利甜紅酒、橙片</h5>
                  </div>
                  <div className="wine j-white my-4 my-lg-5">
                    <h4 className="mb-2">血腥瑪麗 Bloody Mary</h4>
                    <h5>特級朗姆酒、紅色甘露酒、義大利甜紅酒、橙片</h5>
                  </div>
                </div>
              </div>
            </section>
            {/* 營業據點 */}
            <section>
              <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between w-100">
                <span className="col-auto title j-deepSec"> 營業據點</span>
                <div className="title-line d-block d-md-none"></div>
              </div>
              <div className="d-flex flex-column flex-md-row">
                <div className="map mb-4 mb-md-0"></div>
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
    </>
  )
}

export default Index
