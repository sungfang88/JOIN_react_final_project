import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import React from 'react'
import Logo from './img/Logo.png'
import AuthContext from '../../Context/AuthContext'
import NavbarContext from '../../Context/NavbarContext'
import { useLocation } from 'react-router-dom'

// 這支是有登入的版本

function Navbar() {
  const [path, setpath] = useState('')
  const location = useLocation()
  console.log('location.pathname', location.pathname)
  const getpath = () => {
    const pathArray = location.pathname.split('/')
    const mainPath = pathArray[1]
    console.log(mainPath) // 'member'
    setpath(mainPath)
  }

  const { myAuth, logout } = useContext(AuthContext)
  const { cartlistnum } = useContext(NavbarContext)
  useEffect(() => {
    getpath()
  }, [location])

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
            {myAuth.authorized ? (
              <>
                <li>
                  <Link to="/member">會員資料</Link>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>

          <div className="col-auto ms-4">
            {myAuth.authorized ? (
              <>
                {' '}
                <a
                  href="#/"
                  className="o-line-btn me-2 j-h3"
                  onClick={(e) => {
                    e.preventDefault()
                    logout()
                    localStorage.removeItem('presentURL')
                  }}
                >
                  登出
                </a>
                <Link
                  className="o-line-btn j-h3 cart-icon"
                  to="/cart"
                  onClick={() => {
                    localStorage.removeItem('presentURL')
                  }}
                >
                  <i className="fa-solid fa-cart-shopping "></i>
                  {cartlistnum === 0 ? (
                    <></>
                  ) : (
                    <span className="cart-count">{cartlistnum}</span>
                  )}
                </Link>
              </>
            ) : (
              <>
                {' '}
                <Link
                  className="o-line-btn me-2 j-h3"
                  to="/member/login"
                  onClick={() => {
                    localStorage.setItem(
                      'presentURL',
                      JSON.stringify(window.location.href)
                    )
                  }}
                >
                  登入
                </Link>
                <Link
                  className="o-line-btn j-h3"
                  to="/member/login"
                  onClick={() => {
                    localStorage.setItem(
                      'presentURL',
                      JSON.stringify(window.location.href)
                    )
                  }}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
              </>
            )}
          </div>
        </div>

        <button className="col-auto d-block d-md-none j-primary custom">
          {myAuth.authorized ? (
            <Link
              className="o-line-btn j-h3 cart-icon"
              to="/cart"
              onClick={() => {
                localStorage.removeItem('presentURL')
              }}
            >
              <i className="fa-solid fa-cart-shopping "></i>
              {cartlistnum === 0 ? (
                <></>
              ) : (
                <span className="cart-count">{cartlistnum}</span>
              )}
            </Link>
          ) : (
            <Link
              className="o-line-btn j-h3"
              to="/member/login"
              onClick={() => {
                localStorage.setItem(
                  'presentURL',
                  JSON.stringify(window.location.href)
                )
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          )}
        </button>

        {/* 手機版menu */}
        <div className="menu-sm d-flex d-md-none">
          <Link to="/news">
            <div
              className={
                path === 'news' ? 'menu-sm-option active' : 'menu-sm-option'
              }
            >
              <i className="fa-solid fa-newspaper"></i>
              <h5>消息</h5>
            </div>
          </Link>
          <Link to="/product">
            <div
              className={
                path === 'product' ? 'menu-sm-option active' : 'menu-sm-option'
              }
            >
              <i className="fa-solid fa-wine-bottle"></i>
              <h5>商品</h5>
            </div>
          </Link>
          <Link to="/seat">
            <div
              className={
                path === 'seat' ? 'menu-sm-option active' : 'menu-sm-option'
              }
            >
              <i className="fa-solid fa-champagne-glasses"></i>
              <h5>訂位</h5>
            </div>
          </Link>
          <Link to="/class">
            <div
              className={
                path === 'class' ? 'menu-sm-option active' : 'menu-sm-option'
              }
            >
              <i className="fa-solid fa-chalkboard"></i>
              <h5>課程</h5>
            </div>
          </Link>
          {myAuth.authorized ? (
            <>
              <Link to="/member">
                <div
                  className={
                    path === 'member'
                      ? 'menu-sm-option active'
                      : 'menu-sm-option'
                  }
                >
                  <i className="fa-solid fa-user"></i>
                  <h5>會員</h5>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/member/login">
                <div
                  className={
                    path === 'member'
                      ? 'menu-sm-option active'
                      : 'menu-sm-option'
                  }
                >
                  <i className="fa-solid fa-user"></i>
                  <h5>會員</h5>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
