import React from 'react'
import { Link, useLocation } from 'react-router-dom'
function Stepprocess(props) {
  const location = useLocation()
  return (
    <>
      <div className="container">
        <div className="step-process">
          <Link
            className={`step ${location.pathname === '/cart' ? 'active' : ''}
            ${location.pathname === '/cart/cart02' ? 'complete' : ''}
            ${location.pathname === '/cart/cart03' ? 'complete' : ''}`}
            onClick={() => {
              localStorage.removeItem('selectedSids')
            }}
            to="/cart"
          >
            <h1>1</h1>
            <h3>{location.pathname.includes('/class') ? '' : '購物車'}</h3>
          </Link>
          <Link
            className={`step
            ${location.pathname === '/cart/cart02' ? 'active' : ''}
            ${location.pathname === '/cart/cart03' ? 'complete' : ''}`}
            to="/cart/cart02"
          >
            <h1>2</h1>
            <h3>填寫資料</h3>
          </Link>
          <Link
            className={`step ${
              location.pathname === '/cart/cart03' ? 'active' : ''
            }`}
            to="/cart/cart03"
          >
            <h1>3</h1>
            <h3>訂單確認</h3>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Stepprocess
