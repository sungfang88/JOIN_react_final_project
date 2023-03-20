import React, { useState } from 'react'
import { usePopup } from '../../Public/Popup'
import { useUtils } from '../Utils'
import { useNavigate } from 'react-router-dom'
import { POST_INSERT_COUPON } from '../data/api_config'
import axios from 'axios'

function CouponItem({ itemId, title, description, endDate, isAvalible }) {
  const navigate = useNavigate()
  const [popupProps, setPopupProps] = useState({})
  const [showBtn, setShowBtn] = useState(isAvalible)
  const { Popup, openPopup, closePopup } = usePopup()
  const { checkLogin, setUpPopup } = useUtils()

  const handleClick = async () => {
    //判斷會員登入
    const { isLogged, myAuth } = await checkLogin()
    if (!isLogged) {
      setUpPopup(setPopupProps, {
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
      }).then(() => {
        openPopup()
      })
      return
    } else {
      try {
        const insertresult = await axios.post(POST_INSERT_COUPON, {
          memberId: myAuth.sid,
          couponId: itemId,
        })
        const insertresultData = await insertresult.data

        if (insertresultData.success) {
          setUpPopup(setPopupProps, {
            content: '領取成功',
            icon: <i className="fa-solid fa-circle-check"></i>,
          }).then(() => {
            openPopup()
            setShowBtn((prev) => {
              return !prev
            })
          })
        } else {
          setUpPopup(setPopupProps, {
            content: insertresultData.error,
          }).then(() => {
            openPopup()
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
      <div className="col-12 col-md-6 mb-3">
        <div className="coupon-content flex-column">
          <div className="w-100 d-inline-flex align-items-center justify-content-between">
            <h2>{title}</h2>
            {showBtn && (
              <button className="wo-line-btn j-h4" onClick={handleClick}>
                領取
              </button>
            )}
          </div>
          <div className="couponline">
            <div>使用方式：{description}</div>
            <div>使用期限：{endDate}</div>
          </div>
        </div>
      </div>
      <Popup {...popupProps} />
    </>
  )
}

export default CouponItem
