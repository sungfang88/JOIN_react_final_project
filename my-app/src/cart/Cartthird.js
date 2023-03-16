import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { CART_DATA, ORDER_DATA } from './api_comfig'
import axios from 'axios'
import Stepprocess from './components/Stepprocess'
import Listopen from './components/Listopen'
import Completion from './components/Completion'
import AuthContext from '../Context/AuthContext'
function Cartthird() {
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

  //取得訂單資料(LINE PAY 轉址不成功)
  const [order, setOrder] = useState({})
  const params = new URLSearchParams(window.location.search)
  const transactionId = params.get('transactionId')
  const orderId = params.get('orderId')
  const getOrderData = async () => {
    try {
      const response = await axios.get(
        `${ORDER_DATA}?transactionId=${transactionId}&orderId=${orderId}`,
        {
          withCredentials: true,
        }
      )
      setOrder(response.data)
      window.location.href = `http://localhost:3002/cart/linePayOrder?transactionId=${transactionId}&orderId=${transactionId}`
    } catch (error) {
      console.log(error)
    }
  }

  //控制商品明細收合
  const [isOpen, setIsOpen] = useState(false)
  const toggleTable = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    getCartData()
    getOrderData()
    return () => {
      //解除功能
      console.log('unmount')
    }
  }, [])
  return (
    <>
      {/* 購物流程 */}
      <section className="container-fluid nav-space">
        <Stepprocess />
      </section>

      <section className="container-fluid orderTable">
        <Listopen toggleTable={toggleTable} isOpen={isOpen} data={data} />
      </section>

      {/* 訂購完成訊息 */}
      <section className="container-fluid px-5">
        <Completion />
      </section>

      {/* 訂購人資訊 */}

      <section className="container-fluid">
        <div className="container myWidth">
          <table className="mb-3">
            <div className="tableTitle h3 j-deepSec headTitle">收件人</div>
            <tbody className="j-deepGray">
              <tr className="row g-0">
                <td className="col-md-2 col-3 j-deepPri h3">姓名</td>
                <td className="col-md-10 col-9 j-deepGray text-start h3">
                  {order.addressee}
                </td>
              </tr>
              <tr className="row g-0">
                <td className="col-md-2 col-3 j-deepPri h3">手機</td>
                <td className="col-md-10 col-9 j-deepGray text-start h3">
                  {order.phone}
                </td>
              </tr>
              <tr className="row g-0">
                <td className="col-md-2 col-3 j-deepPri h3">地址</td>
                <td className="col-md-10 col-9 j-deepGray text-start h3">
                  {order.address}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 訂單編號資訊 */}
      <section className="container-fluid">
        <div className="container myWidth">
          <div>
            <div className="h3 j-deepSec headTitle">配送方式</div>
            <h2 className="j-deepSec text-center bottomLine">
              {order.payment}
            </h2>
          </div>
          <div>
            <div className="h3 j-deepSec headTitle">訂單編號</div>
            <h2 className="j-deepSec text-center bottomLine">
              {order.orderId}
            </h2>
          </div>
        </div>
      </section>
      {/* 返回按鈕 */}
      <section className="container-fluid px-5">
        <div className="text-center">
          <button
            className="gray-line-btn j-h3 title-button me-3"
            onClick={() => {
              localStorage.removeItem('orderData')
            }}
          >
            查看歷史訂單
          </button>
          <button
            className="g-line-btn j-h3 title-button"
            onClick={() => {
              localStorage.removeItem('orderData')
            }}
          >
            繼續購物
          </button>
        </div>
      </section>
    </>
  )
}

export default Cartthird
