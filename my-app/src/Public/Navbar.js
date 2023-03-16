import { Link } from 'react-router-dom'
import React from 'react'
import Logo from './img/Logo.png'

//這裡是未登入的navbar

function Navbar() {
  return (
    <nav className="navbar container-fluid">
      <div className="container py-2">
        <div className="col-auto">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="col-auto d-md-flex align-items-center d-none">
          <ul className="menu col-auto m-0 j-h3">
            <li>
              <Link to="/product">商品</Link>
            </li>
            <li>
              <Link to="/class">課程</Link>
            </li>
            <li>
              <Link to="/seat">訂位</Link>
            </li>
            <li>
              <Link to="/news">最新消息</Link>
            </li>
          </ul>
          <div className="col-auto ms-4">
            <Link className="o-line-btn me-2 j-h3" to="/member">
              登入
            </Link>
            <Link className="o-line-btn j-h3" to="/cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </div>
        </div>
        <button className="o-line-btn col-auto d-block d-md-none j-primary">
          <i className="fa-solid fa-cart-shopping"></i>
        </button>

        {/* 手機版menu */}
        <div className="menu-sm d-flex d-md-none">
          <div className="menu-sm-option">
            <i className="fa-solid fa-newspaper"></i>
            <h5>消息</h5>
          </div>
          <div className="menu-sm-option active">
            <i className="fa-solid fa-wine-bottle"></i>
            <h5>商品</h5>
          </div>
          <div className="menu-sm-option">
            <i className="fa-solid fa-champagne-glasses"></i>
            <h5>訂位</h5>
          </div>
          <div className="menu-sm-option">
            <i className="fa-solid fa-chalkboard"></i>
            <h5>課程</h5>
          </div>
          <div className="menu-sm-option">
            <i className="fa-solid fa-user"></i>
            <h5>會員</h5>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
