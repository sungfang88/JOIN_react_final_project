import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UPDATED,DELETE_DATA,CART_DATA  } from '../api_comfig'
function Products01() {
  const [data, setData] = useState([])
  const getCartData = async () => {
    const r = await fetch(CART_DATA, {
      credentials: 'include',
    })
    const json = await r.json()
    // console.log(json)
    setData(json)
  }
  const totalPrice = data.reduce((acc, v, i) => acc + v.price * v.quantity, 0)
  const totalCount = data.reduce((acc, v, i) => acc + v.quantity, 0)

  //刪除購物車項目
  const handleDelete = async (sid) => {
    await fetch(DELETE_DATA, {
      credentials: 'include',
    })
    if (!window.confirm(`是否要刪除${sid}?`)) return
    try {
      const response = await fetch(`${DELETE_DATA}${sid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.json()
      console.log(result)
      window.location.reload()
    } catch (error) {
      console.log(error)
      console.log(await error.text())
    }
  }

  //將購物車資料送回資料庫
  const updateCartItem = async (item) => {
    try {
      const response = await fetch(`${UPDATED}${item.m_id}/${item.sid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.log(error)
      console.log(await error.text())
    }
  }
  //按下一部後將資料傳送到updateCartItem
  const handleNext = () => {
    data.forEach((item) => {
      updateCartItem(item)
    })
  }

  useEffect(() => {
    getCartData()

    return () => {
      //解除功能
      console.log('unmount')
    }
  }, [])

  return (
    <>
      {/* 購物流程  */}
      <section className="container-fluid nav-space">
        <div className="container">
          <div className="step-process">
            <div className="step active">
              <h1>1</h1>
              <h3>購物車</h3>
            </div>

            <div className="step">
              <h1>2</h1>
              <h3>填寫資料</h3>
            </div>
            <div className="step">
              <h1>3</h1>
              <h3>訂單確認</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="container-fluid orderTable">
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
                <li className="col-md-2 col-6 d-md-block text-center">刪除</li>
              </ul>
            </div>
            {data.map((r, i) => {
              return (
                <div className="d-flex tableTbody mb-2 orderBottomLine">
                  <li className="col-md-2 col-6 text-center" key={i}>
                    <img
                      className="orderImg pe-2"
                      src={`http://192.168.21.179/product/${r.product_img}`}
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
                          handleDelete(r.sid)
                          console.log(r.sid)
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
      </section>
      {/* 金額總計 */};
      <div className="container-fluid pb-5">
        <div className="container">
          <div className="d-flex justify-content-end">
            <div className="col-md-4 col-12 p-4">
              <table>
                <tbody className="j-deepGray">
                  <tr>
                    <td className="classTd text-start j-h3 j-deepPri">
                      商品訂單數
                    </td>
                    <td className="classTd text-end j-h3">
                      共 {totalCount} 件
                    </td>
                  </tr>
                  <tr>
                    <td className="classTd text-start h3 j-deepPri">
                      應付總金額
                    </td>
                    <td className="classTd text-end h2 j-deepSec">
                      {totalPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* 返回按鈕  */}
      <section className="container-fluid">
        <div className="text-center">
          <a className="gray-line-btn j-h3 title-button">繼續購物</a>
          <Link
            className="g-line-btn j-h3 title-button"
            to="/cart/cart02"
            onClick={() => {
              handleNext()
            }}
          >
            下一步
          </Link>
        </div>
      </section>
    </>
  )
}

export default Products01
