import React, { useEffect, useRef, useState } from 'react'
import { usePopup } from '../Public/Popup'

function Popupdemo() {
  const { Popup, openPopup, closePopup } = usePopup() //必要const
  const [popupProps, setPopupProps] = useState({}) //可用 useState 來做動態更新
  const initialState = useRef(true)

  useEffect(() => {
    if (initialState.current !== true) {
      openPopup() //可以直接打開pop up
    }
  }, [popupProps])

  const openDefaultPopup = () => {
    initialState.current = false

    // content 字串 彈窗內容
    setPopupProps({
      content: '預設彈窗',
    })
    // openPopup()
  }

  // btnGroup array {text: 按鍵字, handle: onclick function}
  const openDupBtnPopup = () => {
    initialState.current = false
    setPopupProps({
      content: '多按鈕',
      btnGroup: [
        {
          text: 'Btn1',
          handle: () => {
            alert('Btn1')
          },
        },
        {
          text: 'Btn2',
          handle: () => {
            alert('Btn2')
          },
        },
        {
          text: '關閉',
          handle: closePopup,
        },
      ],
    })
    // openPopup()
  }

  const openChangeIconPopup = () => {
    initialState.current = false
    const iconArr = [
      <i className="fa-solid fa-circle-check"></i>,
      <i className="fa-solid fa-star"></i>,
      <i className="fa-brands fa-github"></i>,
      <i className="fa-solid fa-heart"></i>,
      <i className="fa-brands fa-youtube"></i>,
      <i className="fa-regular fa-face-smile"></i>,
      <i className="fa-solid fa-hippo"></i>,
    ]
    // icon ex: <i className="fa-solid fa-hippo"></i>
    setPopupProps({
      content: '變更圖示',
      icon: iconArr[Math.floor(Math.random() * 7)],
      btnGroup: [
        {
          text: '換icon',
          handle: () => {
            openChangeIconPopup()
          },
        },
        {
          text: '關閉',
          handle: closePopup,
        },
      ],
    })
    // openPopup()
  }
  return (
    <>
      <div className="container m-3">
        <div className="row justify-content-center">
          <div className="col-3">
            <button
              className=" o-line-btn j-h3 d-md-block "
              onClick={openDefaultPopup}
            >
              預設
            </button>
          </div>
          <div className="col-3">
            <button
              className=" o-line-btn j-h3 d-md-block "
              onClick={openDupBtnPopup}
            >
              多按鈕
            </button>
          </div>
          <div className="col-3">
            <button
              className=" o-line-btn j-h3 d-md-block "
              onClick={openChangeIconPopup}
            >
              改圖示
            </button>
          </div>
        </div>
      </div>
      {/* <Popup
        content={'完成簽到'}
        icon={<i className="fa-solid fa-circle-check"></i>}
        btnGroup={[
          {
            text: '希歡',
            handle: () => {
              alert('希歡')
            },
          },
          {
            text: '關閉',
            handle: closePopup,
          },
        ]}
      /> */}

      <Popup {...popupProps} />
    </>
  )
}

export default Popupdemo
