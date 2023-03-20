import React, { useState, useEffect, useRef } from 'react'
import './css/news.css'
import { Link } from 'react-router-dom'
import CouponItem from './components/CouponItem'
import {
  GET_COUPON_MEM,
  CHECKIN_COUPON_ARR,
  TURNTABLE_COUPON_ARR,
} from './data/api_config'
import { useUtils } from './Utils'


function Coupon() {
  const [fetchData, setFetchData] = useState([])
  const { checkLogin } = useUtils()
  const fetchCouponList = async (setFetchData) => {
    const { isLogged, myAuth } = await checkLogin()
    let fetchUrl = GET_COUPON_MEM
    if (isLogged) {
      fetchUrl += `?memId=${myAuth.sid}`
    }
    try {
      const r = await fetch(fetchUrl)
      const data = await r.json()

      const rows =
        data?.rows?.filter((item) => {
          return (
            !CHECKIN_COUPON_ARR.includes(item.sid) &&
            !TURNTABLE_COUPON_ARR.includes(item.sid)
          )
        }) ?? []

      setFetchData((prev) => {
        return rows ?? prev
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCouponList(setFetchData).then(() => {})
  }, [])

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
            {fetchData.map((item) => {
              return (
                <CouponItem
                  key={item.sid}
                  itemId={item.sid}
                  title={item.title}
                  description={item.description}
                  endDate={new Date(item.end_date).toJSON().slice(0, 10)}
                  isAvalible={!(item?.menber_sid ?? null)}
                />
              )
            })}
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
