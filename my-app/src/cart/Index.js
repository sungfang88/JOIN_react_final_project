import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CART_DATA } from './api_comfig'
import { UPDATED } from './api_comfig'
import Stepprocess from './components/Stepprocess'
import AuthContext from '../Context/AuthContext'
import List from './components/List'
import axios from 'axios'

function Index() {
  const { myAuth } = useContext(AuthContext)
  console.log('myAuth', myAuth)
  //取得購物車資料
  const [data, setData] = useState([{}])
  const getCartData = async () => {
    try {
      const response = await axios.get(`${CART_DATA}${myAuth.sid}`, {
        withCredentials: true,
      })
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  //算金額
  const totalPrice = data.reduce((acc, v, i) => acc + v.price * v.quantity, 0)
  const totalCount = data.reduce((acc, v, i) => acc + v.quantity, 0)

  //將購物車資料送回資料庫
  const updateCartItem = async (item) => {
    try {
      const response = await fetch(`${UPDATED}${myAuth.sid}/${item.sid}`, {
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
        <Stepprocess />
      </section>
      <section className="container-fluid orderTable">
        <List data={data} setData={setData} />
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
          {/* <a className="gray-line-btn j-h3 title-button me-3">繼續購物</a> */}
          <Link
            className="gray-line-btn j-h3 title-button me-3"
            to="/cart/classOrder01"
          >
            課程
          </Link>
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
export default Index
