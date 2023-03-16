import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { usePopup } from '../../Public/Popup'
import { useNavigate } from 'react-router-dom'

import { GMAIL, VERIFY } from '../membercomponents/memberapi_config'
function Verify() {
  const navigate = useNavigate()
  const { Popup, openPopup, closePopup } = usePopup() //必要const
  const [popupProps, setPopupProps] = useState({}) //可用 useState 來做動態更新
  const initialState = useRef(true)

  const [gmail, setGmail] = useState('')
  const [verifyinput, setVerifyinput] = useState(false)
  const [code, setCode] = useState('')
  const [mytoken, setMytoken] = useState('')

  const sendGmail = async () => {
    console.log('GMAIL', GMAIL)
    const response = await axios.get(GMAIL + '/' + gmail)
    console.log('response.data', response.data)

    if (response.data.success) {
      setVerifyinput(true)
      setMytoken(response.data.mytoken)
    } else {
      const linktoRegister = function () {
        navigate('/member/register')
      }

      openDefaultPopup(response.data.message, '註冊頁', linktoRegister)

    }
    //setVerifyinput(true)
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

  const handleSubmit = async () => {
    console.log('code', code)
    const senddata = { code: code, mytoken: mytoken }
    localStorage.setItem('verifygmail', JSON.stringify(gmail))
    const verify = await axios.post(VERIFY, senddata)
    console.log('verify.data', verify.data)
    if (verify.data.success) {
      const linktoNewpassword = function () {
        navigate('/member/newpassword')
      }
      openDefaultPopup('成功', '設定新密碼頁面', linktoNewpassword)
    }else{openDefaultPopup('驗證密碼錯誤', '關閉', closePopup)}
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
            <div className="d-flex justify-content-center mb-2">
              <div className="verifyTopic verifyTopic-phone">
                <p>喝到斷片。。。</p>
              </div>
            </div>
            <div className="data mt-3 width-lg width-lg-phone">
              <div className="input-group mb-2 ">
                <label
                  className="input-group-text labelinput"
                  htmlFor="verifyemail"
                >
                  信箱驗證
                </label>
                <input
                  type="email"
                  value={gmail}
                  className="form-control verifyinput"
                  onChange={(e) => {
                    setGmail(e.target.value)
                  }}
                  id="verifyemail"
                  required
                />
              </div>
              <div className=" d-flex justify-content-between mt-2 mb-2 border-bottom border-1 ">
                <p className="noticetext d-inline-block">
                  請自信箱收取驗證碼並填入下方輸入欄裡
                </p>
                <button
                  className="btn btn-sm btn-light mb-1 mailsendeer"
                  onClick={sendGmail}
                >
                  送出
                </button>
              </div>

              <div className="input-group mb-1 ">
                <label
                  className="input-group-text labelinput"
                  htmlFor="verifynum"
                >
                  驗證碼
                </label>
                {verifyinput ? (
                  <>
                    <input
                      type="text"
                      value={code}
                      className="form-control verifyinput"
                      id="verifynum"
                      onChange={(e) => {
                        setCode(e.target.value)
                      }}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={code}
                      className="form-control verifyinput "
                      id="verifynum"
                      disabled
                    />
                  </>
                )}
              </div>
              {verifyinput ? (
                <>
                  <div className="input-group input-group-sm ">
                    <input
                      type="submit"
                      onClick={handleSubmit}
                      className="form-control btn btn-outline-light"
                      value="提&nbsp;&nbsp;&nbsp;交&nbsp;&nbsp;&nbsp;驗&nbsp;&nbsp;&nbsp;證&nbsp;&nbsp;&nbsp;碼"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="input-group input-group-sm ">
                    <input
                      type="submit"
                      disabled
                      className="form-control btn btn-outline-light"
                      value="提&nbsp;&nbsp;&nbsp;交&nbsp;&nbsp;&nbsp;驗&nbsp;&nbsp;&nbsp;證&nbsp;&nbsp;&nbsp;碼"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Popup {...popupProps} />
    </>
  )
}

export default Verify
