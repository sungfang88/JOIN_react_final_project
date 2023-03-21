import React, { useState, useEffect } from 'react'
import './css/Class.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { usePopup } from '../Public/Popup'
import { useNavigate } from 'react-router-dom'

function Classbt() {
  const [data, setData] = useState('')
  const { Popup, openPopup, closePopup } = usePopup() //必要const
  const [PopupProps, setPopupProps] = useState({}) //可用 useState 來做動態更新
  const navigate = useNavigate()

  const [bartenders, setBartenders] = useState([
    { sid: 0, bartender: '', bartenderID: '', created_at: '' },
  ])

  // const Submit = function () {
  //   const alldata = {
  //     bartender: data,
  //   }

  //   localStorage.setItem('key2', JSON.stringify(alldata))
  // }

  const Submit = function () {
    if (data) {
      const alldata = {
        bartender: data,
      }

      localStorage.setItem('key2', JSON.stringify(alldata))
      navigate('/class/Classday')
    } else {
      setPopupProps(true)
    }
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
    <>
      <section className="container-fluid">
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
              <h3>選擇Bartender</h3>
            </div>
            <div className="step">
              <h1>3</h1>
              <h3>選擇日期時間&人數</h3>
            </div>
            <div className="step">
              <h1>4</h1>
              <h3>填寫資料</h3>
            </div>
          </div>
        </div>

        {/* 選擇bertender*/}
        <div className="container ">
          <div className="row row-cols-1 row-cols-md-2  row-cols-xl-4  g-4 ">
            {bartenders.map((v, i) => (
              <div className="col" key={v.sid}>
                <div className="card card-a">
                  <img
                    src={`/img/${v.bartender_img}`}
                    className="card-img-top"
                    alt="..."
                  />

                  <div className="info d-flex">
                    <input
                      type="radio"
                      name="classname"
                      value={v.bartendername}
                      className="j-radio"
                      onClick={(e) => {
                        setData(e.target.value)
                      }}
                    />
                    <h3 className="j-h3 j-deepSec">{v.bartendername}</h3>
                  </div>
                </div>
              </div>
            ))}
            {/*<div className="col">
             <div className="card card-a">
              <img
                src={require('./img/bartender1.webp')}
                className="card-img-top"
                alt="..."
              />
              <div className="info">
                <h3 className="j-h3 j-deepSec">Wilbur </h3>
                <div className="j-text j-deepSec mb-3"></div>
                <div className="o-long-btn  h3">選擇</div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card card-a">
              <img
                src={require('./img/bartender2.jpeg')}
                alt="bartender2"
                className="card-img-top"
              />
              <div className="info">
                <h3 className="j-h3 j-deepSec">Richie</h3>
                <div className="j-text j-deepSec mb-3"></div>
                <div className="o-long-btn  h3">選擇</div>
              </div>
            </div> 
          </div>
          <div className="col">
            <div className="card card-a">
              <img
                src={require('./img/bartender3.webp')}
                alt="bartender3"
                className="card-img-top"
              />
              <div className="info">
                <h3 className="j-h3 j-deepSec">Steve </h3>
                <div className="j-text j-deepSec mb-3"></div>
                <div className="o-long-btn  h3">選擇</div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card card-a">
              <img
                src={require('./img/bartender4.webp')}
                alt="bartender4"
                className="card-img-top"
              />
              <div className="info">
                <h3 className="j-h3 j-deepSec">Timmy </h3>
                <div className="j-text j-deepSec mb-3"></div>
                <div className="o-long-btn  h3">選擇</div>
              </div>
            </div>
          </div>*/}
          </div>
          <br />
          <div className=" d-flex justify-content-around  pb-3">
            <Link className="gray-line-btn j-h3" to="/class/Classsec">
              上一步
            </Link>
            <Link
              className="g-line-btn j-h3"
              to="/class/Classday"
              onClick={(e) => {
                Submit()
                e.preventDefault()
                openPopup()
              }}
            >
              下一步
            </Link>
          </div>
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

export default Classbt
