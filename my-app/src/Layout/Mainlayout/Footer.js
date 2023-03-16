import { Link } from 'react-router-dom'
import React from 'react'
import LogoFooter from './img/Logo-white.png'

function Footer() {
  return (
    <div className="container-fluid footer">
      <div className="container">
        <div className="row">
          <footer className="d-flex">
            <div className="d-block d-md-flex">
              <div className="col-auto pe-5 d-none d-md-block">
                <img src={LogoFooter} />
              </div>
              <div className="col-auto pe-5">
                <div className="j-h5 j-white pb-2">
                  地址 ｜台北市大安區復興南路一段390號2樓
                </div>
                <div className="j-h5 j-white pb-2">電話 ｜02-6631-6588</div>
              </div>
              <div className="col-auto">
                <div className="j-h5 j-white pb-2">
                  信箱 | joinjoin@gmail.com
                </div>
                <div className="j-h5 j-white pb-2">
                  周一至周五 14:00 - 02:00
                </div>
              </div>
            </div>
            <div className="col-auto d-none d-lg-block ms-auto">
              <img src="./img/Icon/cup-sm.png" alt="" />
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Footer
