import React from 'react'
import './css/news.css'
import { Link } from 'react-router-dom'
import CouponItem from './components/CouponItem'

function Coupon() {
  return (
    <>
      <section className="container-fluid d-none d-md-block nav-space ">
        <div className="container">
          <div className="row  justify-content-center">
            <div className="col-auto">
              <Link to="/news/Turntable">
                <img
                  src={`/img/banner-1.png`}
                  alt="banner"
                  className="img-fluid w-100"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid nav-space pt-md-0">
        <div className="container">
          <div className="row">
            <div className="title-box d-flex flex-column flex-md-row align-items-center">
              <span className="col-auto title j-deepSec me-md-5">
                全站優惠券
              </span>
              <div className="title-line d-block d-md-none mb-2"></div>
            </div>
          </div>
          <div className="row">
            <CouponItem />
            <CouponItem />
            <CouponItem />
          </div>
        </div>
      </section>
      <div className="daily-check">
        <Link to="/news/CheckIn">
          <h5>每日簽到</h5>
        </Link>
      </div>

      <section className="ccontainer-fluid d-none">
        <div className="container">
          <div className="row  justify-content-center">
            <div className="col-auto">
              <img
                src={`/img/discount-coupon.png`}
                alt="banner"
                className="img-fluid w-100"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Coupon
