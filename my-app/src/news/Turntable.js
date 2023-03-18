import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePopup } from '../Public/Popup'
import { useUtils } from './Utils'
import AutoScrollToTop from './AutoScrollToTop'
import './css/turntable.css'

function Turntable() {
  const navigate = useNavigate()
  const [isRolling, setIsRolling] = useState(false)

  const [popupProps, setPopupProps] = useState({})
  const { Popup, openPopup, closePopup } = usePopup()
  const { checkLogin, setUpPopup } = useUtils()

  const doTurn = async () => {
    let { isLogged, myAuth } = await checkLogin()
    if (!isLogged) {
      setUpPopup(setPopupProps, {
        content: '請先登入會員',
        btnGroup: [
          {
            text: '立即登入',
            handle: () => {
              navigate('/member')
            },
          },
          { text: '關閉', handle: closePopup },
        ],
      }).then(() => {
        openPopup()
      })
      return
    }
    //check today record
    const wheelDom = document.querySelector('#wheel')
    wheelDom.style.transform = 'rotate(0deg)'
    if (isRolling === false) {
      setIsRolling('rolling')
      let spinAnimation = wheelDom.animate(
        [{ transform: 'rotate(0deg)' }, { transform: 'rotate(720deg)' }],
        {
          fill: 'forwards',
          easing: 'linear',
          duration: 800,
        }
      )
      spinAnimation.onfinish = function () {
        let itemDeg = Math.floor(Math.random() * 360)
        let targetDeg = Math.floor(720 + itemDeg)
        var final = wheelDom.animate(
          [{ transform: `rotate(${targetDeg}deg)` }],
          {
            fill: 'forwards',
            easing: 'ease-out',
            duration: 800,
          }
        )

        final.onfinish = () => {
          //call api
          let pProps = {
            content: '',
            icon: <i className="fa-solid fa-circle-check"></i>,
          }
          if (itemDeg >= 270 && itemDeg < 360) {
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
          } else if (itemDeg >= 225 && itemDeg < 270) {
            pProps.content = '恭喜獲得折一百'
          } else if (itemDeg >= 180 && itemDeg < 225) {
            pProps.content = '恭喜獲得折五十'
          } else if (itemDeg >= 90 && itemDeg < 180) {
            pProps.content = '恭喜獲得折五元'
          } else if (itemDeg >= 45 && itemDeg < 90) {
            pProps.content = '恭喜獲得九五折'
          } else if (itemDeg >= 0 && itemDeg < 45) {
            pProps.content = '恭喜獲得九折'
          } else {
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
          setTimeout(() => {
            setIsRolling('done')
            setUpPopup(setPopupProps, pProps).then(() => {
              openPopup()
              setIsRolling(false)
            })
          }, 500)
        }

        // spinAnimation.play()
      }
    }
  }

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
                  <tr>
                    <td>九五折</td>
                    <td>2023-03-01</td>
                  </tr>
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
