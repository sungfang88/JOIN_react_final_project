import React from 'react'
import { Link, useLocation } from 'react-router-dom'
function Classstepprocess(props) {
  const location = useLocation()
  return (
    <>
      <div className="container">
        <div className="step-process">
          <Link
            className={`step
            ${location.pathname === '/cart/classOrder01' ? 'active' : ''}
            ${location.pathname === '/cart/classOrder02' ? 'complete' : ''}`}
            to="/cart/classOrder01"
          >
            <h1>1</h1>
            <h3>填寫資料</h3>
          </Link>
          <Link
            className={`step ${
              location.pathname === '/cart/classOrder02' ? 'active' : ''
            }`}
            to="/cart/classOrder02"
          >
            <h1>2</h1>
            <h3>訂單確認</h3>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Classstepprocess
