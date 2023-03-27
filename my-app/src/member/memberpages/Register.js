import { useState, useContext, useEffect, useRef } from 'react'
import AuthContext from '../../Context/AuthContext'
import dayjs from 'dayjs'
import { usePopup } from '../../Public/Popup'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//countries=[台北市,新北市,桃園市.....]
//townships=[[大安區,中山區,信區],[蘆洲區,三重區],[澎湖市],......]
//postcodes=[[204,205,206],[274,273],[123]]
import {
  countries,
  townships,
  postcodes,
} from '../membercomponents/data-townships'
import axios from 'axios'
import {
  REGISTER,
  HOST,
  INSERTCOUPON,
  LOGINCART,
  LOGINSTORE,
} from '../membercomponents/memberapi_config'

function Register() {
  const { Popup, openPopup, closePopup } = usePopup() //必要const
  const [popupProps, setPopupProps] = useState({}) //可用 useState 來做動態更新
  const initialState = useRef(true)
  const navigate = useNavigate()

  const { setMyAuth } = useContext(AuthContext)
  const location = useLocation()
  const productstate = location.state
  console.log('state', productstate)

  const [registerform, setRegisterform] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    birthday: '',
    address: '',
  })
  const [checkpwd, setCheckpwd] = useState('')
  const initPostcode = ''
  // 記錄陣列的索引值，預設值是-1，相當於"請選擇xxx"
  const [countryIndex, setCountryIndex] = useState(-1)
  const [townshipIndex, setTownshipIndex] = useState(-1)

  // 郵遞區號使用字串(數字字串)
  const [postcode, setPostcode] = useState('')
  //看密碼輸入用
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isCheckPasswordVisible, setIsCheckPasswordVisible] = useState(false)

 const fastregister =()=>{
  setRegisterform((prev) => ({
    ...registerform,
    email: 'abcd@gmail.com',
    password:'1234567',
    phone:'091234567',
    name:'王曉明',
    address:"復興南路100號"


  }))
  setCheckpwd('123456')
 }
 const maingmail=()=>{
  setRegisterform((prev) => ({
    ...registerform,
    email: 'lf2nt0301@gmail.com',
  }))}



  //切換看密碼的狀態函式
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState)
  }
  const toggleCheckPasswordVisibility = () => {
    setIsCheckPasswordVisible((prevState) => !prevState)
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

  //驗證密碼正不正確
  const verifyPasswd = () => {
    if (registerform.password === checkpwd) {
      return true
    } else {
      openDefaultPopup('密碼驗證不符', '關閉', closePopup)

      return false
    }
  }

  //檢查手機符不符合格式
  const isPhoneNumber = function (phoneNumber) {
    // 台灣手機號碼格式正則表達式
    const phoneNumberRegex = /^(09)[0-9]{8}$/

    // 使用正則表達式檢查手機號碼格式是否正確
    if (phoneNumberRegex.test(phoneNumber)) {
      return true
    } else {
      openDefaultPopup('手機號碼格式不符', '關閉', closePopup)

      return false
    }
  }

  //送出表單
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('上傳中')

    const form = event.target
    const formData = new FormData(form)
    const selectedAreaOption = form.querySelector(
      `select[name="area"] option[value="${formData.get('area')}"]`
    )
    const areaName = selectedAreaOption.textContent
    console.log(areaName)
    if (areaName === '選擇縣市') {
      openDefaultPopup('請選擇縣市/區域', '關閉', closePopup)

      return
    }

    const selectedCityOption = form.querySelector(
      `select[name="city"] option[value="${formData.get('city')}"]`
    )
    const cityName = selectedCityOption.textContent
    console.log(cityName)
    if (cityName === '選擇區域') {
      openDefaultPopup('請選擇區域', '關閉', closePopup)

      return
    }
    if (verifyPasswd() === false) {
      return
    }
    if (checkPassword(registerform.password) === false) {
      return
    }
    if (isPhoneNumber(registerform.phone) === false) {
      return
    }

    const registerformData = new FormData()
    registerformData.append('name', registerform.name)
    registerformData.append('email', registerform.email)
    registerformData.append('password', registerform.password)
    registerformData.append('phone', registerform.phone)
    registerformData.append('birthday', registerform.birthday)
    registerformData.append('area', areaName)
    registerformData.append('city', cityName)
    registerformData.append('address', registerform.address)
    registerformData.append('userphoto', 'nopic.png')

    console.log(registerformData)
    console.log(REGISTER)
    let membertoken =""
    axios
      .post(REGISTER, registerformData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data)
        if (response.data.success) {
          console.log({
            useremail: registerform.email,
            accountId: response.data.result.insertId,
            token: response.data.token,
          })
           membertoken =response.data.token

          const presentURL = localStorage.getItem('presentURL')

          if (presentURL) {
            if (presentURL === 'http://localhost:3002/product/productdetail') {
              console.log('走status')
              //連到presentURL同時設定會員給context
              const linktostateURL = function () {
                const likedProducts = localStorage.getItem('likedProducts')
                let likedProductsJSON = ''
                if (likedProducts === null) {
                  likedProductsJSON = ''
                } else {
                  likedProductsJSON = JSON.parse(likedProducts)
                }
                const arr = Object.keys(likedProductsJSON)
                const sendlikedata = {
                  productarray: arr,
                  mid: response.data.result.insertId,
                }
                if (!!likedProducts) {
                  axios.post(LOGINSTORE, sendlikedata)
                }
                const cartPlus = localStorage.getItem('cart')
                const cartPlusJSON = JSON.parse(cartPlus)
                const data = {
                  ...cartPlusJSON,
                  mid: response.data.result.insertId,
                }
                console.log('data', data)
                if (cartPlus) {
                  axios.post(LOGINCART, data).then((response) => {
                    console.log('response.data', response.data)
                    if (response.data.success) {
                      console.log('response.data', response.data)
                      localStorage.removeItem('cart')

                      localStorage.setItem(
                        'myAuth',
                        JSON.stringify({
                          useremail: registerform.email,
                          accountId: response.data.result.insertId,
                          token: membertoken,
                        })
                      )
                      setMyAuth({
                        authorized: true, // 有沒有登入
                        sid: response.data.result.insertId,
                        useremail: registerform.email,
                        token: membertoken,
                      })
                      navigate('/product/productdetail', {
                        state: productstate,
                      })
                    } else {
                      localStorage.setItem(
                        'myAuth',
                        JSON.stringify({
                          useremail: registerform.email,
                          accountId: response.data.result.insertId,
                          token: response.data.token,
                        })
                      )
                      setMyAuth({
                        authorized: true, // 有沒有登入
                        sid: response.data.result.insertId,
                        useremail: registerform.email,
                        token: response.data.postData.token,
                      })
                      navigate('/product/productdetail', {
                        state: productstate,
                      })
                    }
                  })
                } else {
                  localStorage.setItem(
                    'myAuth',
                    JSON.stringify({
                      useremail: registerform.email,
                      accountId: response.data.result.insertId,
                      token: response.data.token,
                    })
                  )
                  setMyAuth({
                    authorized: true, // 有沒有登入
                    sid: response.data.result.insertId,
                    useremail: registerform.email,
                    token: response.data.postData.token,
                  })
                  navigate('/product/productdetail', {
                    state: productstate,
                  })
                }
              }
              const takeTicket = async () => {
                console.log(
                  'INSERTCOUPON+1',
                  INSERTCOUPON + '/' + response.data.result.insertId + '/' + 1
                )
                const addcoupon = await axios.get(
                  INSERTCOUPON + '/' + response.data.result.insertId + '/' + 1
                )
                console.log('addcoupon.data', addcoupon.data)

                openDefaultPopup(
                  '新會員95折優惠券已領取',
                  '一起買醉吧!!',
                  linktostateURL
                )
              }
              openDefaultPopup('註冊成功', '索取優惠券', takeTicket)
            } else {
              const lasturl = JSON.parse(presentURL)
              console.log('有presentURL', lasturl)

              //連到presentURL同時設定會員給context
              const linktopresentURL = function () {
                const likedProducts = localStorage.getItem('likedProducts')
                let likedProductsJSON = ''
                if (likedProducts === null) {
                  likedProductsJSON = ''
                } else {
                  likedProductsJSON = JSON.parse(likedProducts)
                }
                const arr = Object.keys(likedProductsJSON)
                const sendlikedata = {
                  productarray: arr,
                  mid: response.data.result.insertId,
                }
                if (!!likedProducts) {
                  axios.post(LOGINSTORE, sendlikedata)
                }
                const cartPlus = localStorage.getItem('cart')
                const cartPlusJSON = JSON.parse(cartPlus)
                const data = {
                  ...cartPlusJSON,
                  mid: response.data.result.insertId,
                }
                console.log('data', data)
                if (cartPlus) {
                  axios.post(LOGINCART, data).then((response) => {
                    console.log('response.data', response.data)
                    if (response.data.success) {
                      localStorage.removeItem('cart')
                      console.log('lasturlinlinktopresentURL', lasturl)
                      localStorage.setItem(
                        'myAuth',
                        JSON.stringify({
                          useremail: registerform.email,
                          accountId: response.data.result.insertId,
                          token: response.data.token,
                        })
                      )
                      setMyAuth({
                        authorized: true, // 有沒有登入
                        sid: response.data.result.insertId,
                        useremail: registerform.email,
                        token: response.data.postData.token,
                      })
                      window.location.href = lasturl
                    } else {
                      console.log('lasturlinlinktopresentURL', lasturl)
                      localStorage.setItem(
                        'myAuth',
                        JSON.stringify({
                          useremail: registerform.email,
                          accountId: response.data.result.insertId,
                          token: response.data.token,
                        })
                      )
                      setMyAuth({
                        authorized: true, // 有沒有登入
                        sid: response.data.result.insertId,
                        useremail: registerform.email,
                        token: response.data.postData.token,
                      })
                      window.location.href = lasturl
                    }
                  })
                } else {
                  console.log('lasturlinlinktopresentURL', lasturl)
                  localStorage.setItem(
                    'myAuth',
                    JSON.stringify({
                      useremail: registerform.email,
                      accountId: response.data.result.insertId,
                      token: response.data.token,
                    })
                  )
                  setMyAuth({
                    authorized: true, // 有沒有登入
                    sid: response.data.result.insertId,
                    useremail: registerform.email,
                    token: response.data.postData.token,
                  })
                  window.location.href = lasturl
                }
              }
              //領取優惠券
              const takeTicket = async () => {
                console.log(
                  'INSERTCOUPON+1',
                  INSERTCOUPON + '/' + response.data.result.insertId + '/' + 1
                )
                const addcoupon = await axios.get(
                  INSERTCOUPON + '/' + response.data.result.insertId + '/' + 1
                )
                console.log('addcoupon.data', addcoupon.data)

                openDefaultPopup(
                  '新會員95折優惠券已領取',
                  '一起買醉吧!!',
                  linktopresentURL
                )
              }

              openDefaultPopup('註冊成功', '索取優惠券', takeTicket)
            }
          } else {
            console.log('沒有presentURL', HOST)

            const linktoHOST = function () {
              const likedProducts = localStorage.getItem('likedProducts')
            let likedProductsJSON = ''
            if (likedProducts === null) {
              likedProductsJSON = ''
            } else {
              likedProductsJSON = JSON.parse(likedProducts)
            }
              const arr = Object.keys(likedProductsJSON)
              const sendlikedata = {
                productarray: arr,
                mid: response.data.result.insertId,
              }
              if (!!likedProducts) {
                axios.post(LOGINSTORE, sendlikedata)
              }
              const cartPlus = localStorage.getItem('cart')
              const cartPlusJSON = JSON.parse(cartPlus)
              const data = {
                ...cartPlusJSON,
                mid: response.data.result.insertId,
              }
              console.log('data', data)
              if (cartPlus) {
                axios.post(LOGINCART, data).then((response) => {
                  console.log('response.data', response.data)
                  if (response.data.success) {
                    localStorage.removeItem('cart')

                    console.log('lasturlinlinktopresentURL', HOST)
                    localStorage.setItem(
                      'myAuth',
                      JSON.stringify({
                        useremail: registerform.email,
                        accountId: response.data.result.insertId,
                        token: response.data.token,
                      })
                    )
                    setMyAuth({
                      authorized: true, // 有沒有登入
                      sid: response.data.result.insertId,
                      useremail: registerform.email,
                      token: response.data.postData.token,
                    })
                    window.location.href = 'http://localhost:3002'
                  } else {
                    console.log('lasturlinlinktopresentURL', HOST)
                    localStorage.setItem(
                      'myAuth',
                      JSON.stringify({
                        useremail: registerform.email,
                        accountId: response.data.result.insertId,
                        token: response.data.token,
                      })
                    )
                    setMyAuth({
                      authorized: true, // 有沒有登入
                      sid: response.data.result.insertId,
                      useremail: registerform.email,
                      token: response.data.postData.token,
                    })
                    window.location.href = 'http://localhost:3002'
                  }
                })
              } else {
                console.log('lasturlinlinktopresentURL', HOST)
                localStorage.setItem(
                  'myAuth',
                  JSON.stringify({
                    useremail: registerform.email,
                    accountId: response.data.result.insertId,
                    token: response.data.token,
                  })
                )
                setMyAuth({
                  authorized: true, // 有沒有登入
                  sid: response.data.result.insertId,
                  useremail: registerform.email,
                  token: response.data.postData.token,
                })
                window.location.href = 'http://localhost:3002'
              }
            }
            //領取優惠券
            const takeTicket = async () => {
              console.log(
                'INSERTCOUPON+1',
                INSERTCOUPON + '/' + response.data.result.insertId + '/' + 1
              )
              const addcoupon = await axios.get(
                INSERTCOUPON + '/' + response.data.result.insertId + '/' + 1
              )
              console.log('addcoupon.data', addcoupon.data)

              openDefaultPopup(
                '新會員95折優惠券已領取',
                '一起買醉吧!!',
                linktoHOST
              )
            }

            openDefaultPopup('註冊成功', '一起買醉吧!!', takeTicket)
          }
        } else {
          console.log(response.data.error)
          openDefaultPopup(response.data.error, '關閉', closePopup)
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

  // 利用傳入時的initPostcode初始化用
  useEffect(() => {
    if (initPostcode) {
      setPostcode(initPostcode)
      // 使用initPostcode尋找對應的countryIndex, townshipIndex
      //基本上postcodes陣列的索引會是剛好是countries的索引
      //則postcodes的第二層索引會是townships第二層索引
      for (let i = 0; i < postcodes.length; i++) {
        for (let j = 0; j < postcodes[i].length; j++) {
          if (postcodes[i][j] === initPostcode) {
            setCountryIndex(i)
            setTownshipIndex(j)
            return // 跳出巢狀for迴圈
          }
        }
      }
    }
  }, [initPostcode])

  // 當countryIndex, townshipIndex均有值時，設定postcode值
  useEffect(() => {
    if (countryIndex > -1 && townshipIndex > -1) {
      setPostcode(postcodes[countryIndex][townshipIndex])
    }
  }, [countryIndex, townshipIndex])

  //當popupProps被改動時 促發popup
  useEffect(() => {
    if (initialState.current !== true) {
      openPopup() //可以直接打開pop up
    }
  }, [popupProps])

  return (
    <>
      <div className="container-fluid ">
        <div className="row  d-flex mainPage j-bg-g-grad">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex justify-content-center mb-lg-2">
              <div className="registerTopic registerTopic-phone">
                <p onClick={()=>{fastregister()}}>
                  關於你的故事<i className="bi bi-pencil-square"></i>
                </p>
              </div>
            </div>

            <div className="data mt-3 width-lg width-lg-phone">
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-2 ">
                  <label
                    className="input-group-text labelinput"
                    htmlFor="registerEmail"
                    onClick={()=>{maingmail()}}
                  >
                    信箱
                  </label>
                  <input
                    type="text"
                    className="form-control registerinput"
                    id="registerEmail"
                    name="email"
                    value={registerform.email}
                    onChange={(e) => {
                      setRegisterform((prev) => ({
                        ...registerform,
                        email: e.target.value,
                      }))
                    }}
                    required
                  />
                </div>

                <div className="input-group mb-2 ">
                  <label
                    className="input-group-text labelinput"
                    htmlFor="registerPassword"
                  >
                    密碼
                  </label>
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    className="form-control registerinput"
                    id="registerPassword"
                    name="password"
                    value={registerform.password}
                    onChange={(e) => {
                      setRegisterform((prev) => ({
                        ...registerform,
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
                <div className="input-group mb-2 ">
                  <label
                    className="input-group-text labelinput"
                    htmlFor="checkregisterpassword"
                  >
                    確認密碼
                  </label>

                  <input
                    type={isCheckPasswordVisible ? 'text' : 'password'}
                    value={checkpwd}
                    onChange={(e) => {
                      setCheckpwd(e.target.value)
                    }}
                    className="form-control registerinput"
                    id="checkregisterpassword"
                    required
                  />
                  <button
                    className="btn btn-outline-secondary labelinput translate-bg-btn"
                    type="button"
                    onClick={() => {
                      toggleCheckPasswordVisibility()
                    }}
                  >
                    <i className="fa-sharp fa-solid fa-eye"></i>
                  </button>
                </div>
                <div className="input-group mb-2 ">
                  <label
                    className="input-group-text labelinput"
                    htmlFor="registerUsername"
                  >
                    姓名
                  </label>
                  <input
                    type="text"
                    className="form-control registerinput"
                    id="registerUsername"
                    name="name"
                    value={registerform.name}
                    onChange={(e) => {
                      setRegisterform((prev) => ({
                        ...registerform,
                        name: e.target.value,
                      }))
                    }}
                    required
                  />
                </div>
                <div className="input-group mb-2 ">
                  <label
                    className="input-group-text labelinput"
                    htmlFor="registerPhone"
                  >
                    手機
                  </label>
                  <input
                    type="text"
                    className="form-control registerinput"
                    placeholder="0912345678(格式)"
                    id="registerPhone"
                    name="phone"
                    value={registerform.phone}
                    onChange={(e) => {
                      setRegisterform((prev) => ({
                        ...registerform,
                        phone: e.target.value,
                      }))
                    }}
                    required
                  />
                </div>
                <div className="input-group mb-2 ">
                  <label
                    className="input-group-text labelinput"
                    htmlFor="registerBrith"
                  >
                    生日
                  </label>
                  <input
                    type="date"
                    className="form-control registerinput"
                    id="registerBrith"
                    name="birthday"
                    value={registerform.birthday}
                    required
                    onChange={(e) => {
                      setRegisterform((prev) => ({
                        ...registerform,
                        birthday: dayjs(e.target.value).format('YYYY-MM-DD'),
                      }))
                    }}
                  />
                </div>
                <div className="input-group mb-2 ">
                  <label
                    htmlFor="area"
                    className=" labelinput input-group-text"
                  >
                    地區
                  </label>
                  <select
                    className="form-control registerinput "
                    value={countryIndex}
                    name="area"
                    onChange={(e) => {
                      // 將字串轉成數字
                      setCountryIndex(+e.target.value)
                      // 重置townshipIndex的值
                      setTownshipIndex(-1)
                      // 重置postcode的值
                      setPostcode('')
                    }}
                  >
                    <option value="-1">選擇縣市</option>
                    {countries.map((value, index) => (
                      <option key={index} value={index} data-areaname={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-2 ">
                  <label htmlFor="city" className="labelinput input-group-text">
                    城市
                  </label>
                  <select
                    className="form-control registerinput"
                    value={townshipIndex}
                    name="city"
                    onChange={(e) => {
                      // 將字串轉成數字
                      setTownshipIndex(+e.target.value)
                    }}
                  >
                    <option value="-1">選擇區域</option>
                    {countryIndex > -1 &&
                      townships[countryIndex].map((value, index) => (
                        <option key={index} value={index} data-cityname={value}>
                          {value}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="input-group mb-2 border-bottom border-1 pb-2">
                  <label
                    className="input-group-text labelinput"
                    htmlFor="registerAddress"
                  >
                    地址
                  </label>
                  <input
                    type="text"
                    className="form-control registerinput"
                    name="address"
                    value={registerform.address}
                    onChange={(e) => {
                      setRegisterform((prev) => ({
                        ...registerform,
                        address: e.target.value,
                      }))
                    }}
                    id="registerAddress"
                  />
                </div>

                <div className="input-group">
                  <input
                    type="submit"
                    className="form-control btn btn-outline-light"
                    value="註&nbsp;&nbsp;&nbsp;冊"
                  />
                </div>
              </form>
            </div>
            {/* <div className="Gmailregister d-flex justify-content-center ">
              <button className="btn btn-lg text-light">
                <i className="bi bi-google fs-2"></i>&nbsp;mail 快速註冊
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <Popup {...popupProps} />
    </>
  )
}

export default Register
