import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePopup } from '../Public/Popup'
import { useUtils } from './Utils'
import { POST_PROCESS_WHEEL, GET_WHEEL_RECORDS } from './data/api_config.js'
import AutoScrollToTop from './AutoScrollToTop'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import './css/turntable.css'

function Turntable() {
  const navigate = useNavigate()
  const uuid = uuidv4()
  const [isRolling, setIsRolling] = useState(false)
  const [popupProps, setPopupProps] = useState({})
  const { Popup, openPopup, closePopup } = usePopup()
  const { checkLogin, setUpPopup } = useUtils()
  const [fetchPrizeRecords, setFetchPrizeRecords] = useState()

  const fetchRecords = async () => {
    const { isLogged, myAuth } = await checkLogin()
    if(!isLogged) {
      return []
    }
    const res = await axios.post(GET_WHEEL_RECORDS, {
      memberId: myAuth.sid,
    })
    const resData = await res.data
    setFetchPrizeRecords(resData?.rows)
  }

  const displayPrize = (itemDeg) => {
    let pProps = {
      content: '',
      icon: <i className="fa-solid fa-circle-check"></i>,
    }
    switch (true) {
      case itemDeg >= 225 && itemDeg < 270:
        pProps.content = '恭喜獲得折一百'
        pProps.couponId = 3
        break
      case itemDeg >= 180 && itemDeg < 225:
        pProps.content = '恭喜獲得折五十'
        pProps.couponId = 4
        break
      case itemDeg >= 90 && itemDeg < 180:
        pProps.content = '恭喜獲得折五元'
        pProps.couponId = 5
        break
      case itemDeg >= 45 && itemDeg < 90:
        pProps.content = '恭喜獲得九五折'
        pProps.couponId = 2
        break
      case itemDeg >= 0 && itemDeg < 45:
        pProps.content = '恭喜獲得九折'
        pProps.couponId = 15
        break
      case itemDeg >= 270 && itemDeg < 360:
      default:
        pProps.couponId = 'A'
        pProps.content = '再抽一次'
        pProps.btnGroup = [
          {
            text: '確定',
            handle: () => {
              closePopup()
              doTurn()
            },
          },
        ]
    }
    return new Promise((resolve, reject) => {
      resolve(pProps)
    })
  }
  const doTurn = async () => {
    const { isLogged, myAuth } = await checkLogin()
    if (!isLogged) {
      setUpPopup(setPopupProps, {
        content: '請先登入會員',
        btnGroup: [
          {
            text: '立即登入',
            handle: () => {
              localStorage.setItem(
                'presentURL',
                JSON.stringify(window.location.href))
              navigate('/member/login')
            },
          },
          { text: '關閉', handle: closePopup },
        ],
      }).then(() => {
        openPopup()
      })
      return
    }

    const wheelDom = document.querySelector('#wheel')
    const itemDeg = Math.floor(Math.random() * 360)
    const targetDeg = 3600 + itemDeg
    let pProps = await displayPrize(itemDeg)
    const res = await axios.post(POST_PROCESS_WHEEL, {
      memberId: myAuth.sid,
      couponId: pProps.couponId
    })
    const resData = await res.data
    if (!resData.success) {
      setUpPopup(setPopupProps, { content: resData.error }).then(() => {
        openPopup()
        setIsRolling(false)
      })
      return
    }
    wheelDom.style.transform = 'rotate(0deg)'
    if (isRolling === false) {
      setIsRolling('rolling')
      let spinAnimation = wheelDom.animate(
        [
          { transform: 'rotate(0deg)' },
          { transform: `rotate(${targetDeg}deg)` },
        ],
        {
          fill: 'forwards',
          easing: 'ease-out',
          duration: 1000,
        }
      )
      spinAnimation.onfinish = async () => {
        setIsRolling('done')
        setTimeout(() => {
          setUpPopup(setPopupProps, pProps).then(() => {
            openPopup()
            setIsRolling(false)
          })
        }, 500)
      }
    }
  }
  useEffect(() => {
    if(isRolling === false){
      fetchRecords()
      // console.log(fetchPrizeRecords);
    }
  }, [isRolling])

  return (
    <>
      <AutoScrollToTop>
        <div className="container-fluid d-none d-md-block nav-space pb-5">
          <div className="container">
            <div className="row sec-navbar">
              <div className="col-auto">
                <Link to="/" className="me-1">
                  首頁
                </Link>
                /
                <Link to="/news" className="me-1">
                  最新消息
                </Link>
                /<Link to="/news/Turntable">每日優惠轉盤</Link>
              </div>
            </div>
          </div>
        </div>
        <section className="container-fluid nav-space pt-md-0 mb-3">
          <div className="container">
            <div className="row">
              <div className="title-box d-flex flex-column flex-md-row align-items-center">
                <span className="col-auto title j-deepSec me-md-5">
                  每日轉盤活動
                </span>
                <div className="title-line d-block d-md-none mb-2"></div>
              </div>
              <div className="d-none col-md-2 d-md-flex cup">
                <img
                  src={`/img/winebowl-1.png`}
                  alt="winebowl"
                  className="w-100"
                />
              </div>
              <div className="col-md-8 m-auto">
                <div className="turntable-wrap w-50 m-auto">
                  <img
                    src="/img/turntable.png"
                    alt=""
                    className="w-100"
                    id="wheel"
                  />
                  <img
                    src="/img/pointer.png"
                    alt="pointer"
                    className="w-25 turntable-pointer"
                    onClick={doTurn}
                  />
                </div>
              </div>
              <div className="d-none col-md-2 d-md-flex cup2">
                <img src={`/img/winebowl-2.png`} alt="..." className="w-100" />
              </div>
            </div>
          </div>
        </section>
        <section className="container-fluid ">
          <div className="row">
            <div className="tablewidth m-auto mt-4">
              <h3 className="j-deepSec headTitle">獲獎紀錄</h3>
              <table>
                <thead className="j-deepPri">
                  <tr>
                    <td>名稱</td>
                    <td>時間</td>
                  </tr>
                </thead>
                <tbody className="j-deepGray">
                  {fetchPrizeRecords && fetchPrizeRecords.map((item, index) => {
                    return (
                      <tr key={uuid.concat(item.itemid)}>
                        <td >{item.title}</td>
                        <td>{new Intl.DateTimeFormat("fr-ca").format(new Date(item.create_at))}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* <!-- section 2 --> */}
        <section className="container-fluid">
          <div className="container">
            <p>
              若有爭議，以JOIN後台紀錄作為歸戶標準，恕不接受客人以截圖、翻拍等方式要求回饋，未遵循活動方式及規則者，恕不予回饋。
            </p>
          </div>
        </section>
        {/* <Popup content={'今天已領取過優惠'} /> */}
        <Popup {...popupProps} />
      </AutoScrollToTop>
    </>
  )
}

export default Turntable
