import React, { useEffect, useRef, useState } from 'react'
import { usePopup } from '../../Public/Popup'

function CouponItem() {
  const { Popup, openPopup, closePopup } = usePopup()
  return (
    <>
      <div className="col-12 col-md-6 mb-3">
        <div className="coupon-content flex-column">
          <div className="w-100 d-inline-flex align-items-center justify-content-between">
            <h2>商品滿千元折百</h2>
            <button className="wo-line-btn j-h4" onClick={openPopup}>領取</button>
          </div>
          <div className="couponline">
            <div>使用方式：單筆消費滿1000元折100元</div>
            <div>使用期限：2023-05-31</div>
          </div>
        </div>
      </div>
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
      <Popup content={'領取成功'} icon ={<i className="fa-solid fa-circle-check"></i>} />
    </>
  )
}

export default CouponItem
