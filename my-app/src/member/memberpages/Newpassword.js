import { useState, useRef, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { usePopup } from '../../Public/Popup'
import {
  NEWPASSWORD,
  HOST,
  BLACKMEMBER,
  LOGINCART,
  LOGINSTORE,
} from '../membercomponents/memberapi_config'
import axios from 'axios'
import AuthContext from '../../Context/AuthContext'

function Newpassword() {
  const navigate = useNavigate()

  const [newpwd, setNewpwd] = useState('')
  const [showpwd, setShowpwd] = useState(false)
  const [checkShowpwd, setCheckShowpwd] = useState(false)

  const [recheckpwd, setRecheckpwd] = useState('')
  const initialState = useRef(true)
  const { Popup, openPopup, closePopup } = usePopup() //必要const
  const [popupProps, setPopupProps] = useState({}) //可用 useState 來做動態更新
  const { setMyAuth } = useContext(AuthContext)
  const location = useLocation()
  const productstate = location.state
  console.log('state', productstate)

  //驗證密碼正不正確
  const verifyPasswd = () => {
    if (newpwd === recheckpwd) {
      return true
    } else {
      openDefaultPopup('密碼驗證不符', '關閉', closePopup)

      return false
    }
  }
  //檢查密碼有沒有大於等於8個字以上 且包含數字及英文

  const checkPassword = function (password) {
    // 檢查長度是否大於等於8
    if (password.length <= 7) {
      openDefaultPopup('設定的密碼，長度要大於8個字元以上', '關閉', closePopup)

      return false
    }

    // 檢查是否包含英文字母和數字
    let containsLetter = false
    let containsNumber = false

    for (let i = 0; i < password.length; i++) {
      let char = password.charAt(i)
      if (/[a-zA-Z]/.test(char)) {
        containsLetter = true
      } else if (/\d/.test(char)) {
        containsNumber = true
      }

      if (containsLetter && containsNumber) {
        return true
      }
    }
    openDefaultPopup('密碼須包含英文及數字', '關閉', closePopup)

    return false
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

  const handlesumbit = async () => {
    if (verifyPasswd() === false) {
      return
    }
    if (checkPassword(newpwd) === false) {
      return
    }

    const verifygmail = localStorage.getItem('verifygmail')
    const JSONparsegmail = JSON.parse(verifygmail)
    const data = { gmail: JSONparsegmail, newpassword: newpwd }
    console.log('data', data)
    axios.post(NEWPASSWORD, data).then((response) => {
      console.log('response.data', response.data)
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
                  localStorage.removeItem('verifygmail')

                  if (presentURL) {
                    const lasturl = JSON.parse(presentURL)
                    console.log('有presentURL', lasturl)
                    window.location.href = lasturl
                  } else {
                    console.log('沒有presentURL', HOST)
                    window.location.href = HOST
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
                  localStorage.removeItem('verifygmail')

                  if (presentURL) {
                    const lasturl = JSON.parse(presentURL)
                    console.log('有presentURL', lasturl)
                    window.location.href = lasturl
                  } else {
                    console.log('沒有presentURL', HOST)
                    window.location.href = HOST
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
              localStorage.removeItem('verifygmail')

              if (presentURL) {
                const lasturl = JSON.parse(presentURL)
                console.log('有presentURL', lasturl)
                window.location.href = lasturl
              } else {
                console.log('沒有presentURL', HOST)
                window.location.href = HOST
              }
            }
          }
        })
      }
    })
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
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex justify-content-center mb-lg-2">
              <div className="newPasswordTopic newPasswordTopic-phone">
                <p >來!少喝一點</p>
              </div>
            </div>
            <div className="data mt-3 width-lg width-lg-phone">
              <div className="row">
                <div className="input-group mb-2 ">
                  <label
                    className="input-group-text labelinput"
                    htmlFor="newpassword"
                  >
                    新密碼
                  </label>
                  {showpwd ? (
                    <>
                      <input
                        type="text"
                        className="form-control logininput"
                        value={newpwd}
                        id="newpassword"
                        onChange={(e) => {
                          setNewpwd(e.target.value)
                        }}
                        required
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="password"
                        className="form-control logininput"
                        value={newpwd}
                        id="newpassword"
                        onChange={(e) => {
                          setNewpwd(e.target.value)
                        }}
                        required
                      />
                    </>
                  )}

                  <button
                    className="btn btn-outline-secondary labelinput translate-bg-btn"
                    onClick={() => {
                      setShowpwd(!showpwd)
                    }}
                    type="button"
                  >
                    <i className="fa-sharp fa-solid fa-eye"></i>
                  </button>
                </div>
                <div className="input-group mb-2 ">
                  <label
                    className="input-group-text labelinput"
                    htmlFor="checknewpassword"
                  >
                    確認密碼
                  </label>
                  {checkShowpwd ? (
                    <input
                      type="text"
                      value={recheckpwd}
                      className="form-control logininput"
                      id="checknewpassword"
                      onChange={(e) => {
                        setRecheckpwd(e.target.value)
                      }}
                      required
                    />
                  ) : (
                    <input
                      type="password"
                      value={recheckpwd}
                      className="form-control logininput"
                      id="checknewpassword"
                      onChange={(e) => {
                        setRecheckpwd(e.target.value)
                      }}
                      required
                    />
                  )}
                  <button
                    className="btn btn-outline-secondary labelinput translate-bg-btn"
                    onClick={() => {
                      setCheckShowpwd(!checkShowpwd)
                    }}
                    type="button"
                  >
                    <i className="fa-sharp fa-solid fa-eye"></i>
                  </button>
                </div>

                <div className="input-group">
                  <input
                    type="submit"
                    onClick={handlesumbit}
                    className="form-control btn btn-outline-light"
                    value="登&nbsp;&nbsp;&nbsp;入"
                  />
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

export default Newpassword
