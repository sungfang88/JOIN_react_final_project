import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './css/checkIn.css'
import CheckList from './components/CheckList'
import { usePopup } from '../Public/Popup'
import AutoScrollToTop from './AutoScrollToTop'
import { GET_CHECKIN_RECORDS, POST_DOCHECKIN } from './data/api_config.js'
import { useCheckLogin } from './Utils.js'
import axios from 'axios'

function CheckIn() {
  const [checkInList, setCheckInList] = useState([])
  const [accumulatedCheck, setAccumulatedCheck] = useState(0)
  const { Popup, openPopup, closePopup } = usePopup()
  const navigate = useNavigate()
  const checkLogin = useCheckLogin()
  const initList = useRef(false)
  //簽到天數、獎勵
  const countCheckin = 12
  const split = 4

  useEffect(() => {
    checkLogin
      .then(async (result) => {
        const { isLogged, myAuth } = result
        if (isLogged && initList.current === false) {
          initList.current = true
          const r = await fetch(GET_CHECKIN_RECORDS + `/${myAuth.sid}`)
          const data = await r.json()
          setAccumulatedCheck(data.count)
        }
      })
      .finally(() => {
        let l = []
        for (let index = 0; index < countCheckin; index++) {
          l = l.concat({
            key: `item-${Date.now() + index}`,
            isCheck: !!(accumulatedCheck >= index + 1),
            text: (index + 1) % split === 0 || index === 0 ? '領取獎勵' : '',
          })
        }
        setCheckInList(l)
      })
  }, [accumulatedCheck])

  //變更簽到圖示
  const [popupProps, setPopupProps] = useState({})
  const doCheckIn = () => {
    if (accumulatedCheck !== countCheckin) {
      checkLogin.then((result) => {
        const { isLogged, myAuth } = result
        if (isLogged) {
          const { sid } = myAuth
          axios
            .post(POST_DOCHECKIN, {
              memberId: sid,
            })
            .then((res) => {
              console.table(res.data)
              if (res.data.success) {
                let popuptext = '完成簽到'
                if (res.data?.gotCouppon) {
                  popuptext = `恭喜獲得 ${res.data?.couponTitle}`
                }
                setPopupProps({
                  content: popuptext,
                  icon: <i className="fa-solid fa-circle-check"></i>,
                })
                setAccumulatedCheck((prev) => {
                  return prev + 1
                })
              } else {
                setPopupProps({ content: res?.data?.error || '今天已簽到' })
              }
            })
        } else {
          setPopupProps({
            content: '請先登入會員',
            btnGroup: [
              {
                text: '立即登入',
                handle: () => {
                  navigate('/member/login')
                },
              },
              { text: '關閉', handle: closePopup },
            ],
          })
        }
      })
      // .finally(() => {
      //   openPopup()
      // })
    }
  }
  useEffect(() => {
    if (initList.current === true) {
      openPopup()
    }
  }, [popupProps])

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
                /<Link to="/news/CheckIn">每日簽到</Link>
              </div>
            </div>
          </div>
        </div>

        <section className="container-fluid nav-space pt-md-0">
          <div className="container">
            <div className="title-box d-flex flex-column flex-md-row align-items-center">
              <span className="col-auto title j-deepSec me-md-5">
                天天簽到領優惠
              </span>
              <div className="title-line d-block d-md-none mb-2"></div>
              <button
                className="o-line-btn j-h3 d-md-block "
                onClick={doCheckIn}
              >
                立即簽到
              </button>
            </div>
            <CheckList checkInList={checkInList} />
          </div>
        </section>
        {/* <Popup
        content={'請先登入會員'}
        btnGroup={[
          {
            text: '立即登入',
            handle: () => {
              navigate("/member/login");
            },
          },
          {
            text: '關閉',
            handle: closePopup,
          },
        ]}
      /> */}

        {/* <Popup content={'完成簽到'} icon ={<i className="fa-solid fa-circle-check"></i>} /> */}
        {/* <Popup content={'恭喜獲得{"滿兩千元享八折"}'} icon ={<i className="fa-solid fa-circle-check"></i>} />  */}

        {/* <Popup content={'今天已簽到'} /> */}
        <Popup {...popupProps} />

        <section className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col">
                <img src={`/img/check.png`} alt="check" className="w-100" />
              </div>
            </div>
          </div>
        </section>
      </AutoScrollToTop>
    </>
  )
}

export default CheckIn
