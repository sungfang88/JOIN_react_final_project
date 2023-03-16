import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'
import axios from 'axios'
import dayjs from 'dayjs'
import {
  MEMBER_EDIT,
  MEMBER_DATA,
  ALLDATA,
} from '../membercomponents/memberapi_config'
import base64js from 'base64-js'
import {
  countries,
  townships,
  postcodes,
} from '../membercomponents/data-townships'
import { usePopup } from '../../Public/Popup'

function Edit() {
  const { Popup, openPopup, closePopup } = usePopup() //必要const
  const [popupProps, setPopupProps] = useState({}) //可用 useState 來做動態更新
  const initialState = useRef(true)
  const navigate = useNavigate()
  const { myAuth } = useContext(AuthContext)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isCheckPasswordVisible, setIsCheckPasswordVisible] = useState(false)
  const [areachange, setAreachange] = useState(false)

  const [myForm, setmyForm] = useState({
    sid: 0,
    name: '',
    email: '',
    phone: '',
    birthday: '',
    area: '',
    city: '',
    address: '',
    userphoto: '',
  })
  const [alldata, setAlldata] = useState({
    coupondata: false,
    listdata: false,
    classdata: false,
    seatdata: false,
    mystoredata: false,
  })
  const getAllData = async () => {
    const getall = await axios.get(ALLDATA + '/' + myAuth.sid)
    console.log('getall.data', getall.data)
    setAlldata(getall.data)
  }
  const [myPhoto, setmyPhoto] = useState(null)

  const [checknewpasswd, setChecknewpasswd] = useState('')

  const [memberphoto, setMmemberphoto] = useState('')
  const [showcheck, setshowcheck] = useState('j-input d-none')

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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState)
  }
  const togglecheckPasswordVisibility = () => {
    setIsCheckPasswordVisible((prevState) => !prevState)
  }

  const getMemberData = async () => {
    //回傳依據後端給的擋頭(這裡是JSON)-> 所以會自動JSON parse 解析成js的物件表達式
    const response = await axios.get(MEMBER_DATA + '/' + myAuth.sid)
    console.log(response.data)
    setmyForm(response.data.rows[0])

    const base64Str = response.data.image

    // base64js.toByteArray() 方法接收一个 Base64 字符串
    const byteCharacters = base64js.toByteArray(base64Str)
    // 使用 Blob 对象将字节数组转换为 Blob 对象，并指定 MIME 类型

    const blobpng = new Blob([byteCharacters], { type: 'image/*' })

    // 将 Blob 对象转换为 URL 对象
    const imageUrl = URL.createObjectURL(blobpng)
    console.log(imageUrl)
    setMmemberphoto(imageUrl)
  }

  const initPostcode = ''
  // 記錄陣列的索引值，預設值是-1，相當於"請選擇xxx"
  const [countryIndex, setCountryIndex] = useState(-1)
  const [townshipIndex, setTownshipIndex] = useState(-1)

  // 郵遞區號使用字串(數字字串)
  const [postcode, setPostcode] = useState('')

  const [area, setArea] = useState('')
  const [city, setCity] = useState('')

  //上傳大頭貼用
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const inputRef = useRef(null)
  const passwdRef = useRef(null)

  //檢查密碼有沒有大於等於8個字以上 且包含數字及英文
  const checkPassword = function (password) {
    // 檢查長度是否大於等於8
    if (password.length <= 7) {
      openDefaultPopup('密碼長度要大於8個字元以上', '關閉', closePopup)

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

  //檢查手機符不符合格式
  const isPhoneNumber = function (phoneNumber) {
    // 台灣手機號碼格式正則表達式
    const phoneNumberRegex = /^(09)[0-9]{8}$/

    // 使用正則表達式檢查手機號碼格式是否正確
    if (phoneNumberRegex.test(phoneNumber)) {
      return true
    } else {
      openDefaultPopup(
        '手機格式不符，請直接輸入"10個數字字元即可"',
        '關閉',
        closePopup
      )
      return false
    }
  }

  //檢查新密碼是否正確 並上傳資料到後端
  const checkPASS = (cityName, areaName) => {
    console.log('checknewpasswd', checknewpasswd)

    console.log('確定密碼')

    let setpasswoed = ''
    const hasMyProperty = 'password' in myForm
    if (hasMyProperty) {
      setpasswoed = myForm.password
      if (myForm.password !== checknewpasswd) {
        openDefaultPopup('您新密碼輸入不同', '關閉', closePopup)

        // 確認按鈕被點擊
        // 在這裡放置刪除項目的代碼
        return
      } else {
        if (myPhoto === null) {
          console.log('檢查密碼格式')

          if (myForm.password) {
            if (checkPassword(myForm.password) === false) {
              return
            }
          }
          console.log('檢查手機格式')
          if (isPhoneNumber(myForm.phone) === false) {
            return
          }
          console.log('密碼確定')
          console.log(myPhoto)
          console.log('沒圖片+密碼確認')
          const formData = new FormData()
          formData.append('name', myForm.name)
          formData.append('email', myForm.email)
          formData.append('password', setpasswoed)
          formData.append('phone', myForm.phone)
          formData.append('birthday', myForm.birthday)
          formData.append('area', areaName)
          formData.append('city', cityName)
          formData.append('address', myForm.address)
          formData.append('userphoto', myForm.userphoto)

          console.log(myForm)
          axios
            .put(MEMBER_EDIT + '/' + myAuth.sid, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((response) => {
              if (response.data.success) {
                console.log(response.data)
                const linktomember = function () {
                  navigate('/member')
                }
                openDefaultPopup('更新完成', '關閉', linktomember)
              } else {
                console.log(response.data.error)
                const linktomember = function () {
                  navigate('/member')
                }
                openDefaultPopup(response.data.error, '關閉', linktomember)
              }
            })
        } else {
          console.log('檢查密碼格式')
          if (myForm.password) {
            if (checkPassword(myForm.password) === false) {
              return
            }
          }
          console.log('檢查手機格式')
          if (isPhoneNumber(myForm.phone) === false) {
            return
          }
          console.log('密碼確定')
          console.log(myPhoto)
          console.log('有圖片+密碼確認')

          const formData2 = new FormData()
          formData2.append('userphoto', myPhoto)
          formData2.append('name', myForm.name)
          formData2.append('email', myForm.email)
          formData2.append('password', setpasswoed)
          formData2.append('phone', myForm.phone)
          formData2.append('birthday', myForm.birthday)
          formData2.append('area', areaName)
          formData2.append('city', cityName)
          formData2.append('address', myForm.address)
          console.log(myForm)

          axios
            .put(MEMBER_EDIT + '/' + myAuth.sid, formData2, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((response) => {
              if (response.data.success) {
                console.log(response.data)
                const linktomember = function () {
                  navigate('/member')
                }
                openDefaultPopup('更新完成', '關閉', linktomember)
              } else {
                console.log(response.data.error)
                const linktomember = function () {
                  navigate('/member')
                }
                openDefaultPopup(response.data.error, '關閉', linktomember)
              }
            })
        }
      }
    } else {
      console.log('密碼確定')
      console.log(myPhoto)

      if (myPhoto === null) {
        console.log('檢查密碼格式')
        if (myForm.password) {
          if (checkPassword(myForm.password) === false) {
            return
          }
        }
        console.log('檢查手機格式')
        if (isPhoneNumber(myForm.phone) === false) {
          return
        }
        console.log('密碼確定')
        console.log(myPhoto)
        console.log('沒圖片+沒密碼')

        const formData = new FormData()
        formData.append('name', myForm.name)
        formData.append('email', myForm.email)
        formData.append('password', setpasswoed)
        formData.append('phone', myForm.phone)
        formData.append('birthday', myForm.birthday)
        formData.append('area', areaName)
        formData.append('city', cityName)
        formData.append('address', myForm.address)
        formData.append('userphoto', myForm.userphoto)

        console.log(myForm)
        axios
          .put(MEMBER_EDIT + '/' + myAuth.sid, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            if (response.data.success) {
              console.log(response.data)
              const linktomember = function () {
                navigate('/member')
              }
              openDefaultPopup('更新完成', '關閉', linktomember)
            } else {
              console.log(response.data.error)

              const linktomember = function () {
                navigate('/member')
              }
              openDefaultPopup(response.data.error, '關閉', linktomember)
            }
          })
      } else {
        console.log('檢查密碼格式')
        if (myForm.password) {
          if (checkPassword(myForm.password) === false) {
            return
          }
        }
        console.log('檢查手機格式')
        if (isPhoneNumber(myForm.phone) === false) {
          return
        }
        console.log('密碼確定')
        console.log(myPhoto)
        console.log('有圖片+沒密碼')

        const formData2 = new FormData()
        formData2.append('userphoto', myPhoto)
        formData2.append('name', myForm.name)
        formData2.append('email', myForm.email)
        formData2.append('password', setpasswoed)
        formData2.append('phone', myForm.phone)
        formData2.append('birthday', myForm.birthday)
        formData2.append('area', areaName)
        formData2.append('city', cityName)
        formData2.append('address', myForm.address)
        console.log(myForm)

        axios
          .put(MEMBER_EDIT + '/' + myAuth.sid, formData2, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            if (response.data.success) {
              console.log(response.data)
              const linktomember = function () {
                navigate('/member')
              }
              openDefaultPopup('更新完成', '關閉', linktomember)
            } else {
              console.log(response.data.error)
              const linktomember = function () {
                navigate('/member')
              }
              openDefaultPopup(response.data.error, '關閉', linktomember)
            }
          })
      }
    }
  }

  //發送表單
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
    setArea(areaName)
    // setmyForm({
    //   ...myForm,
    //   area: 1235,
    // })
    const selectedCityOption = form.querySelector(
      `select[name="city"] option[value="${formData.get('city')}"]`
    )
    const cityName = selectedCityOption.textContent
    console.log(cityName)
    setCity(cityName)
    setmyForm({
      ...myForm,
      city: cityName,
      area: areaName,
    })
    console.log(myForm)
    checkPASS(cityName, areaName)
  }

  //上傳頭貼
  const handleClick = () => {
    inputRef.current.click()
  }
  //預覽頭貼
  const handleFileInputChange = () => {
    const selectedFile = inputRef.current.files[0]
    setFile(selectedFile)
    setmyPhoto(selectedFile)
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result)
    }
    reader.readAsDataURL(selectedFile)
  }

  useEffect(() => {
    getMemberData()
  }, [])

  // 利用傳入時的initPostcode初始化用
  useEffect(() => {
    if (initPostcode) {
      setPostcode(initPostcode)
      // 使用initPostcode尋找對應的countryIndex, townshipIndex
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

  useEffect(() => {
    if (initialState.current !== true) {
      openPopup() //可以直接打開pop up
    }
  }, [popupProps])
  useEffect(() => {
    getAllData()
  }, [])
  return (
    <>
      {/* <!-- Sec-navbar 要用nav-space 空出上面的距離 --> */}

      <div className="container-fluid d-none d-md-block nav-space pb-5">
        <div className="container">
          <div className="row sec-navbar">
            <div className="col-auto">
              <a
                href="#/"
                className="me-1"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/member')
                }}
              >
                會員
              </a>
              /{' '}
              <a
                href="#/"
                className="me-1"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/member/edit')
                }}
              >
                修改個人資料
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!--內容 第一個section要加nav-space pt-md-0---> */}
      {/* 主section(電腦版) */}
      <section className="container-fluid nav-space pt-md-0 ">
        <div className="container">
          <div className="row">
            <div className="col-md-2 d-none d-lg-block border-end border-2">
              <div className="d-flex flex-column">
                <button
                  className="g-line-btn j-h3 mb-2 me-4"
                  onClick={() => {
                    navigate('/member')
                  }}
                >
                  會員資料
                </button>
                {alldata.coupondata ? (
                  <button
                    className="g-line-btn j-h3 mb-2 me-4"
                    onClick={() => {
                      navigate('/member/coupon')
                    }}
                  >
                    折價券
                  </button>
                ) : (
                  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
                    折價券
                  </button>
                )}

                {alldata.listdata ? (
                  <button
                    className="g-line-btn j-h3 mb-2 me-4"
                    onClick={() => {
                      navigate('/member/orderlist')
                    }}
                  >
                    訂單紀錄
                  </button>
                ) : (
                  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
                    訂單紀錄
                  </button>
                )}
                {alldata.classdata ? (
                  <button
                    className="g-line-btn j-h3 mb-2 me-4"
                    onClick={() => {
                      navigate('/member/orderclass')
                    }}
                  >
                    課程紀錄
                  </button>
                ) : (
                  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
                    課程紀錄
                  </button>
                )}
                {alldata.seatdata ? (
                  <button
                    className="g-line-btn j-h3 mb-2 me-4"
                    onClick={() => {
                      navigate('/member/booking')
                    }}
                  >
                    訂位紀錄
                  </button>
                ) : (
                  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
                    訂位紀錄
                  </button>
                )}
                {alldata.mystoredata ? (
                  <button
                    className="g-line-btn j-h3 mb-2 me-4"
                    onClick={() => {
                      navigate('/member/mystore')
                    }}
                  >
                    我的收藏
                  </button>
                ) : (
                  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
                    我的收藏
                  </button>
                )}
              </div>
            </div>
            <div className="col-12 col-md-10">
              <div className="row">
                <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
                  <span className="col-md-2 col-12 title j-deepSec">
                    編輯資料
                  </span>
                  <div className="title-line d-block d-md-none"></div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* <!-- col-2 --> */}
                  <div className="col-md-2 col-12">
                    <div className="member-photo text-center ms-2">
                      {previewUrl === null ? (
                        <img
                          src={memberphoto}
                          alt=""
                          className="border border-1"
                        />
                      ) : (
                        <img src={previewUrl} alt="Preview" />
                      )}
                    </div>
                    <div className="text-center ms-2">
                      <span
                        className="o-line-btn j-h3 mt-3 d-inline-block"
                        onClick={handleClick}
                      >
                        變更圖片
                      </span>
                      <input
                        type="file"
                        className="d-none"
                        name="userphoto"
                        ref={inputRef}
                        accept="image/*"
                        onChange={handleFileInputChange}
                      />
                    </div>
                  </div>
                  {/* <!-- col-10 --> */}
                  <div className="col-10">
                    <div className="row">
                      <div className="col-12 ms-5 ps-5 pe-5 me-5">
                        <div className="j-input">
                          <div>
                            <label htmlfor="name">姓名</label>
                          </div>
                          <input
                            type="text"
                            className="input-text"
                            id="name"
                            name="name"
                            value={myForm.name}
                            required
                            onChange={(e) => {
                              setmyForm((prev) => ({
                                ...myForm,
                                name: e.target.value,
                              }))
                            }}
                          />
                        </div>

                        <div className="j-input">
                          <div>
                            <label htmlfor="email">信箱</label>
                          </div>
                          <input
                            type="email"
                            id="email"
                            className="input-text"
                            name="email"
                            required
                            value={myForm.email}
                            onChange={(e) => {
                              setmyForm((prev) => ({
                                ...myForm,
                                email: e.target.value,
                              }))
                            }}
                          />
                        </div>

                        <div className="j-input">
                          <div>
                            <label htmlfor="password">新密碼</label>
                          </div>
                          <div>
                            {isPasswordVisible ? (
                              <input
                                type="text"
                                id="password"
                                className="w-80"
                                ref={passwdRef}
                                name="password"
                                onChange={(e) => {
                                  setshowcheck('j-input d-block')
                                  if (e.target.value !== '') {
                                    setmyForm((prev) => ({
                                      ...myForm,
                                      password: e.target.value,
                                    }))
                                  } else {
                                    setmyForm((prev) => ({
                                      ...myForm,
                                      password: '',
                                    }))
                                  }
                                }}
                              />
                            ) : (
                              <input
                                type="password"
                                id="password"
                                className="w-80"
                                ref={passwdRef}
                                name="password"
                                onChange={(e) => {
                                  setshowcheck('j-input d-block')
                                  if (e.target.value !== '') {
                                    setmyForm((prev) => ({
                                      ...myForm,
                                      password: e.target.value,
                                    }))
                                  } else {
                                    setmyForm((prev) => ({
                                      ...myForm,
                                      password: '',
                                    }))
                                  }
                                }}
                              />
                            )}

                            <button
                              className="btn translate-btn"
                              type="button"
                              onClick={() => {
                                togglePasswordVisibility()
                              }}
                            >
                              <i className="fa-sharp fa-solid fa-eye"></i>&nbsp;&nbsp;顯示密碼
                            </button>
                          </div>
                        </div>
                        <div className={showcheck}>
                          <div>
                            <label htmlfor="checkpassword">確認新密碼</label>
                          </div>
                          {isCheckPasswordVisible ? (
                            <input
                              type="text"
                              id="checkpassword"
                              className="w-80"
                              name="password"
                              onChange={(e) => {
                                setChecknewpasswd(e.target.value)
                              }}
                            />
                          ) : (
                            <input
                              type="password"
                              id="checkpassword"
                              className="w-80"
                              name="password"
                              onChange={(e) => {
                                setChecknewpasswd(e.target.value)
                              }}
                            />
                          )}
                          <button
                            className="btn labelinput translate-btn"
                            type="button"
                            onClick={() => {
                              togglecheckPasswordVisibility()
                            }}
                          >
                            <i className="fa-sharp fa-solid fa-eye"></i>&nbsp;&nbsp;顯示密碼
                          </button>
                        </div>

                        <div className="j-input">
                          <div>
                            <label htmlfor="phone">手機</label>
                          </div>
                          <input
                            type="text"
                            id="phone"
                            className="input-text"
                            name="phone"
                            required
                            value={myForm.phone}
                            onChange={(e) => {
                              setmyForm((prev) => ({
                                ...myForm,
                                phone: e.target.value,
                              }))
                            }}
                          />
                        </div>

                        <div className="j-input">
                          <div>
                            <label htmlfor="birthday">生日</label>
                          </div>
                          <input
                            type="date"
                            id="birthday"
                            className="input-text"
                            name="birthday"
                            value={dayjs(myForm.birthday).format('YYYY-MM-DD')}
                            onChange={(e) => {
                              setmyForm((prev) => ({
                                ...myForm,
                                birthday: dayjs(e.target.value).format(
                                  'YYYY-MM-DD'
                                ),
                              }))
                            }}
                          />
                        </div>

                        <div className="j-input d-flex ">
                          <div className="">
                            <label htmlfor="area">地區</label>
                            <select
                              value={countryIndex}
                              className="like-dropdown-toggle  j-deepGray select-bg"
                              name="area"
                              onChange={(e) => {
                                setAreachange(true)
                                // 將字串轉成數字
                                setCountryIndex(+e.target.value)
                                // 重置townshipIndex的值
                                setTownshipIndex(-1)
                                // 重置postcode的值
                                setPostcode('')
                              }}
                            >
                              <option value="-1">
                                {myForm.area === '' ? '選擇縣市' : myForm.area}
                              </option>
                              {countries.map((value, index) => (
                                <option
                                  key={index}
                                  value={index}
                                  data-areaname={value}
                                >
                                  {value}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="">
                            <label htmlfor="city">城市</label>
                            <select
                              value={townshipIndex}
                              className="like-dropdown-toggle  j-deepGray select-bg"
                              name="city"
                              onChange={(e) => {
                                // 將字串轉成數字
                                setTownshipIndex(+e.target.value)
                              }}
                            >
                              {areachange ? (
                                <option value="-1">選擇區域</option>
                              ) : (
                                <option value="-1">{myForm.city}</option>
                              )}

                              {countryIndex > -1 &&
                                townships[countryIndex].map((value, index) => (
                                  <option
                                    key={index}
                                    value={index}
                                    data-cityname={value}
                                  >
                                    {value}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="j-input border-bottom border-3 pb-2">
                          <div>
                            <label htmlfor="address">地址</label>
                          </div>
                          <input
                            type="text"
                            id="address"
                            className="input-text"
                            name="address"
                            value={myForm.address}
                            onChange={(e) => {
                              setmyForm((prev) => ({
                                ...myForm,
                                address: e.target.value,
                              }))
                            }}
                          />
                        </div>
                        <div className="j-input">
                          <input
                            type="submit"
                            className="input-text g-line-btn"
                          />
                        </div>

                        {/* <!-- col-12 -->        */}
                      </div>
                      {/* <!-- row -->      */}
                    </div>
                    {/* <!-- col-10 --> */}
                  </div>
                  {/* <!-- row -->      */}
                </div>
                {/* <!-- col-12 --> */}
              </form>{' '}
            </div>
            {/* <!-- row --> */}
          </div>
          {/* <!-- container     --> */}
        </div>
      </section>
      <Popup {...popupProps} />
    </>
  )
}

export default Edit
