import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePopup } from '../../Public/Popup'
import { useLocation } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import {
  LOGIN,
  HOST,
  GMAILLOGIN,
  BLACKMEMBER,
  LOGINCART,
  LOGINSTORE,
} from '../membercomponents/memberapi_config'
import { auth, googleprovide } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'

function Login() {
  const { Popup, openPopup, closePopup } = usePopup() //必要const
  const [popupProps, setPopupProps] = useState({}) //可用 useState 來做動態更新
  const initialState = useRef(true)

  const location = useLocation()
  const productstate = location.state

  console.log('state', productstate)

  const gmaillogin = async () => {
    const result = await signInWithPopup(auth, googleprovide)
    console.log('signInWithPopupresult', result)
    console.log('result.user.displayName', result.user.displayName)
    console.log('result.user.email', result.user.email)

    function toproduct() {
      navigate('/product/productdetail', {
        state: productstate,
      })
    }

    if (result.user.displayName !== '' && result.user.email !== '') {
      const gmailloginform = {
        email: result.user.email,
      }
      axios.post(GMAILLOGIN, gmailloginform).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          const { useremail, accountId, token } = response.data
          axios.get(BLACKMEMBER + '/' + accountId).then((response) => {
            if (response.data.success) {
              const linktoIndex = function () {
                navigate('/')
              }
              openDefaultPopup(
                '您因逾期定位超過兩次，無法登入會員',
                '關閉',
                linktoIndex
              )
            } else {
              const likedProducts = localStorage.getItem('likedProducts')
              let likedProductsJSON = ''
              if (likedProducts === null) {
                likedProductsJSON = ''
              } else {
                likedProductsJSON = JSON.parse(likedProducts)
              }
              //const likedProductsJSON = JSON.parse(likedProducts)

              const arr = Object.keys(likedProductsJSON)
              const sendlikedata = { productarray: arr, mid: accountId }
              if (!!likedProducts) {
                axios.post(LOGINSTORE, sendlikedata)
              }

              const cartPlus = localStorage.getItem('cart')
              const cartPlusJSON = JSON.parse(cartPlus)
              const data = { ...cartPlusJSON, mid: accountId }
              console.log('data', data)
              if (!!cartPlus) {
                axios.post(LOGINCART, data).then((response) => {
                  if (response.data.success) {
                    localStorage.removeItem('cart')
                    localStorage.setItem(
                      'myAuth',
                      JSON.stringify({ useremail, accountId, token })
                    )
                    setMyAuth({
                      authorized: true, // 有沒有登入
                      sid: accountId,
                      useremail: useremail,
                      token: token,
                    })
                    //看有沒有上一頁的url

                    const presentURL = localStorage.getItem('presentURL')
                    if (
                      presentURL ===
                      'http://localhost:3002/product/productdetail'
                    ) {
                      console.log('去商品', HOST)

                      navigate('/product/productdetail', {
                        state: productstate,
                      })
                    }
                    if (presentURL) {
                      const lasturl = JSON.parse(presentURL)
                      console.log('有presentURL', lasturl)
                      window.location.href = lasturl
                    } else {
                      console.log('沒有presentURL', HOST)
                      window.location.href = 'http://localhost:3002'
                    }
                  } else {
                    localStorage.setItem(
                      'myAuth',
                      JSON.stringify({ useremail, accountId, token })
                    )
                    setMyAuth({
                      authorized: true, // 有沒有登入
                      sid: accountId,
                      useremail: useremail,
                      token: token,
                    })
                    //看有沒有上一頁的url

                    const presentURL = localStorage.getItem('presentURL')
                    if (
                      presentURL ===
                      'http://localhost:3002/product/productdetail'
                    ) {
                      console.log('去商品', HOST)
                      navigate('/product/productdetail', {
                        state: productstate,
                      })
                    }
                    if (presentURL) {
                      const lasturl = JSON.parse(presentURL)
                      console.log('有presentURL', lasturl)
                      window.location.href = lasturl
                    } else {
                      console.log('沒有presentURL', HOST)
                      window.location.href = 'http://localhost:3002'
                    }
                  }
                })
              } else {
                localStorage.setItem(
                  'myAuth',
                  JSON.stringify({ useremail, accountId, token })
                )
                setMyAuth({
                  authorized: true, // 有沒有登入
                  sid: accountId,
                  useremail: useremail,
                  token: token,
                })
                //看有沒有上一頁的url

                const presentURL = localStorage.getItem('presentURL')
                if (
                  presentURL === 'http://localhost:3002/product/productdetail'
                ) {
                  console.log('去商品', HOST)
                  navigate('/product/productdetail', {
                    state: productstate,
                  })
                }
                if (presentURL) {
                  const lasturl = JSON.parse(presentURL)
                  console.log('有presentURL', lasturl)
                  window.location.href = lasturl
                } else {
                  console.log('沒有presentURL', HOST)
                  window.location.href = 'http://localhost:3002'
                }
              }
            }
          })
        } else {
          const linktoRegister = function () {
            navigate('/member/register')
          }
          openDefaultPopup(response.data.error, '前往註冊', linktoRegister)
          // navigate('/member/register')
          // alert(response.data.error || '帳號或密碼錯誤')
          //setTimeout(navigate('/member/register'), 6000)
        }
      })
    } else {
      openDefaultPopup('未選擇要登入的Gmail', '關閉', closePopup)
    }
  }

  const { setMyAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const [loginForm, setloginForm] = useState({
    email: '',
    password: '',
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState)
  }
  const loginSubmit = (event) => {
    event.preventDefault()
    console.log('上傳中')
    axios.post(LOGIN, loginForm).then((response) => {
      console.log(response.data)
      if (response.data.success) {
        const { useremail, accountId, token } = response.data
        axios.get(BLACKMEMBER + '/' + accountId).then((response) => {
          if (response.data.success) {
            const linktoIndex = function () {
              navigate('/')
            }
            openDefaultPopup(
              '您因逾期定位超過兩次，無法登入會員',
              '關閉',
              linktoIndex
            )
          } else {
            const likedProducts = localStorage.getItem('likedProducts')
            let likedProductsJSON = ''
            if (likedProducts === null) {
              likedProductsJSON = ''
            } else {
              likedProductsJSON = JSON.parse(likedProducts)
            }
            //const likedProductsJSON = JSON.parse(likedProducts)
            const arr = Object.keys(likedProductsJSON)
            const sendlikedata = { productarray: arr, mid: accountId }
            if (!!likedProducts) {
              axios.post(LOGINSTORE, sendlikedata)
            }
            const cartPlus = localStorage.getItem('cart')
            const cartPlusJSON = JSON.parse(cartPlus)
            const data = { ...cartPlusJSON, mid: accountId }
            console.log('data', data)
            if (cartPlus) {
              axios.post(LOGINCART, data).then((response) => {
                console.log('response.data', response.data)
                if (response.data.success) {
                  localStorage.removeItem('cart')
                  localStorage.setItem(
                    'myAuth',
                    JSON.stringify({ useremail, accountId, token })
                  )
                  setMyAuth({
                    authorized: true, // 有沒有登入
                    sid: accountId,
                    useremail: useremail,
                    token: token,
                  })
                  //看有沒有上一頁的url

                  const presentURL = localStorage.getItem('presentURL')
                  if (
                    presentURL === 'http://localhost:3002/product/productdetail'
                  ) {
                    console.log('去商品', HOST)
                    navigate('/product/productdetail', {
                      state: productstate,
                    })
                  }
                  if (presentURL) {
                    const lasturl = JSON.parse(presentURL)
                    console.log('有presentURL', lasturl)
                    window.location.href = lasturl
                  } else {
                    console.log('沒有presentURL', HOST)
                    window.location.href = 'http://localhost:3002'
                  }
                } else {
                  localStorage.setItem(
                    'myAuth',
                    JSON.stringify({ useremail, accountId, token })
                  )
                  setMyAuth({
                    authorized: true, // 有沒有登入
                    sid: accountId,
                    useremail: useremail,
                    token: token,
                  })
                  //看有沒有上一頁的url

                  const presentURL = localStorage.getItem('presentURL')
                  if (
                    presentURL === 'http://localhost:3002/product/productdetail'
                  ) {
                    console.log('去商品', HOST)
                    navigate('/product/productdetail', {
                      state: productstate,
                    })
                  }
                  if (presentURL) {
                    const lasturl = JSON.parse(presentURL)
                    console.log('有presentURL', lasturl)
                    window.location.href = lasturl
                  } else {
                    console.log('沒有presentURL', HOST)
                    window.location.href = 'http://localhost:3002'
                  }
                }
              })
            } else {
              localStorage.setItem(
                'myAuth',
                JSON.stringify({ useremail, accountId, token })
              )
              setMyAuth({
                authorized: true, // 有沒有登入
                sid: accountId,
                useremail: useremail,
                token: token,
              })
              //看有沒有上一頁的url

              const presentURL = localStorage.getItem('presentURL')
              if (
                presentURL === 'http://localhost:3002/product/productdetail'
              ) {
                console.log('去商品', HOST)
                navigate('/product/productdetail', {
                  state: productstate,
                })
              }
              if (presentURL) {
                const lasturl = JSON.parse(presentURL)
                console.log('有presentURL', lasturl)
                window.location.href = lasturl
              } else {
                console.log('沒有presentURL', HOST)
                window.location.href = 'http://localhost:3002'
              }
            }
          }
        })
      } else {
        openDefaultPopup(response.data.error, '關閉', closePopup)
        //alert(response.data.error || '帳號或密碼錯誤')
      }
    })
  }

  const openDefaultPopup = (message, btntext, fn) => {
    initialState.current = false

    // content 字串 彈窗內容
    setPopupProps({
      content: message,
      btnGroup: [
        {
          text: btntext,
          handle: fn,
        },
      ],
    })
    // openPopup()
  }

  const fastlogin = () => {
    setloginForm((prev) => ({
      ...loginForm,
      email: 'lf2nt0301@gmail.com',
      password: 'a123456789',
    }))
  }
  const blacklogin = () => {
    setloginForm((prev) => ({
      ...loginForm,
      email: 'joseph@gmail.com',
      password: 'abcd1234',
    }))
  }

  useEffect(() => {
    if (initialState.current !== true) {
      openPopup() //可以直接打開pop up
    }
  }, [popupProps])

  return (
    <>
      <div className="container-fluid ">
        <div className="row  d-flex mainPage j-bg-p-grad">
          <div className="col-12  d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex justify-content-center">
              <div
                className="logo"
                onClick={() => {
                  fastlogin()
                }}
              >
                <img src="../img/joinplusglasses.png" className="enterLogo" />
              </div>
            </div>

            <div className="data mt-3 width-lg width-lg-phone">
              <form onSubmit={loginSubmit}>
                <div className="row">
                  <div className="input-group mb-2 ">
                    <label
                      className="input-group-text labelinput"
                      htmlFor="email"
                    >
                      電子信箱
                    </label>
                    <input
                      type="email"
                      className="form-control logininput input-text"
                      value={loginForm.email}
                      id="email"
                      name="email"
                      onChange={(e) => {
                        setloginForm((prev) => ({
                          ...loginForm,
                          email: e.target.value,
                        }))
                      }}
                      required
                    />
                  </div>

                  <div className="input-group mb-lg-2">
                    <label
                      className="input-group-text labelinput"
                      htmlFor="password"
                    >
                      登入密碼
                    </label>
                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      className="form-control logininput input-text"
                      value={loginForm.password}
                      id="password"
                      name="password"
                      onChange={(e) => {
                        setloginForm((prev) => ({
                          ...loginForm,
                          password: e.target.value,
                        }))
                      }}
                      required
                    />
                    <button
                      className="btn btn-outline-secondary labelinput translate-bg-btn"
                      type="button"
                      onClick={() => {
                        togglePasswordVisibility()
                      }}
                    >
                      <i className="fa-sharp fa-solid fa-eye"></i>
                    </button>
                  </div>

                  <div className="d-lg-flex justify-content-end mb-2 pb-1 ">
                    <a
                      href="#/"
                      className="forgetpasswd d-block d-lg-inline-block forgetsercet-phone"
                      onClick={(e) => {
                        e.preventDefault()
                        navigate('/member/verify')
                      }}
                    >
                      忘記密碼
                    </a>
                  </div>

                  <div className="input-group">
                    <input
                      type="submit"
                      className="form-control btn btn-outline-light "
                      value="登&nbsp;&nbsp;&nbsp;入"
                    />
                  </div>
                </div>
              </form>
              <div className="text-center mt-2 d-flex justify-content-around">
                <span
                  className="d-none d-lg-block registertext text-center "
                  onClick={() => {
                    blacklogin()
                  }}
                >
                  尚未加入
                </span>
                <span className=" registertext text-center  registertext-phone">
                  立即
                  <a
                    href="#/"
                    className="registerlink"
                    onClick={(e) => {
                      e.preventDefault()
                      {
                        navigate('/member/register', {
                          state: productstate,
                        })
                      }
                    }}
                  >
                    註冊
                  </a>
                </span>
              </div>
              <div className="text-center mt-2 d-flex justify-content-around">
                <div className="Gmailregister d-flex justify-content-center ">
                  <button
                    className="btn btn-lg text-light"
                    onClick={gmaillogin}
                  >
                    <FontAwesomeIcon icon={faGoogle} className="h1" />
                    <i className="bi bi-google fs-2"></i>&nbsp;oogle
                    快速登入
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popup {...popupProps} />
    </>
  )
}

export default Login
