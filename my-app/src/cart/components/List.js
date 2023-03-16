import React, { useState, useRef, useEffect, useContext } from 'react'
import { usePopup } from '../../Public/Popup'
import { DELETE_DATA } from '../api_comfig'
function List(props) {
  const { Popup, openPopup, closePopup } = usePopup() //必要const
  const [popupProps, setPopupProps] = useState({}) //可用 useState 來做動態更新
  const initialState = useRef(true)
  const { data, setData } = props

  // btnGroup array {text: 按鍵字, handle: onclick function}
  const openDupBtnPopup = (sid, product_ch) => {
    initialState.current = false
    setPopupProps({
      content: `確定要刪除${product_ch}`,
      btnGroup: [
        {
          text: '刪除',
          handle: () => {
            handleDelete(sid)
            closePopup()
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

  //刪除購物車項目
  const handleDelete = async (sid) => {
    console.log('action', sid)
    console.log('sid', sid)
    try {
      const response = await fetch(`${DELETE_DATA}${sid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('sid', sid)
      const result = await response.json()
      console.log(result)
      window.location.reload()
    } catch (error) {
      console.log(error)
      console.log(await error.text())
    }
  }
  useEffect(() => {
    if (initialState.current !== true) {
      openPopup() //可以直接打開pop up
    }
  }, [popupProps])
  return (
    <>
      <div className="container">
        <div className="headTitle h3 j-deepSec mb-3">商品訂單</div>
        <ul className="g-0 mx-3">
          <div className="d-md-flex d-none tableTitle mb-3">
            <li className="col-2 h3"></li>
            <ul className="col-10 g-0 row">
              <ol className="text-center d-md-flex d-grid col-md-10 col-6 g-0">
                <li className="col">品項</li>
                <li className="col">價錢</li>
                <li className="col">數量</li>
              </ol>
              <li className="col-md-2 col-6 d-md-block text-center"> 刪除</li>
            </ul>
          </div>
          {data.map((r, i) => {
            return (
              <div className="d-flex tableTbody mb-2 orderBottomLine">
                <li className="col-md-2 col-6 text-center" key={i}>
                  <img
                    className="orderImg pe-2"
                    src={require('../img/001.webp')} // {`http://192.168.21.179/product/${r.product_img}`}
                    alt=""
                  />
                </li>
                <ul className="col-md-10 col-6 g-0 row">
                  <div className="d-flex">
                    <ol className="text-center d-md-flex d-grid col-10 g-0 p-0">
                      <li className="col fs-7">
                        <div>
                          {r.product_ch}
                          <br />
                          <span className="d-none d-md-grid">
                            {r.product_eg}
                          </span>
                        </div>
                      </li>
                      <li className="col">{r.price}</li>
                      <li className="col">
                        <i
                          className="fa-solid fa-square-minus"
                          onClick={() => {
                            const newData = data.map((v, i) => {
                              console.log('hi')
                              if (v.sid === r.sid && v.quantity > 1) {
                                return {
                                  ...v,
                                  quantity: v.quantity - 1,
                                  amount: v.quantity * v.price,
                                }
                              }
                              return v
                            })
                            console.log('newData', newData)
                            setData(newData)
                          }}
                        ></i>
                        <span className="px-4">{r.quantity}</span>
                        <i
                          className="fa-solid fa-square-plus"
                          onClick={() => {
                            const newData = data.map((v, i) => {
                              if (v.sid === r.sid) {
                                return { ...v, quantity: v.quantity + 1 }
                              }
                              return v
                            })
                            setData(newData)
                          }}
                        ></i>
                      </li>
                    </ol>
                    <li
                      className="col-md-2 col-2 align-items-center justify-content-center"
                      onClick={() => {
                        openDupBtnPopup(r.sid, r.product_ch)
                        console.log('handleDelete', r.sid)
                      }}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </li>
                  </div>
                </ul>
              </div>
            )
          })}
        </ul>
      </div>
      <Popup {...popupProps} />
    </>
  )
}

export default List
