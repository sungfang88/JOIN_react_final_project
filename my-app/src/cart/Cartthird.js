import React from 'react'
import { useState, useEffect, useContext } from 'react'
import {
  CART_DATA,
  ORDER_DATA,
  DELETE_CART_DATA,
  ORDER_CONFIRM,
} from './api_comfig'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Stepprocess from './components/Stepprocess'
import Listopen from './components/Listopen'
import Completion from './components/Completion'
import AuthContext from '../Context/AuthContext'

function Cartthird() {
  const { myAuth } = useContext(AuthContext)
  console.log('myAuth', myAuth)
  //取得勾選到得購物車資料
  const [data, setData] = useState([{}])
  const getCartData = async () => {
    try {
      const storedSids = JSON.parse(localStorage.getItem('selectedSids')) || []
      const selectedSids = storedSids.map((item) => item.sid)
      const response = await axios.get(
        `${CART_DATA}${selectedSids.join('/')}`,
        {
          withCredentials: true,
        }
      )
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // 訂單完成後清除購物車資料的 API 請求
  const handleDeleteCart = async () => {
    try {
      const storedSids = JSON.parse(localStorage.getItem('selectedSids')) || []
      const selectedSids = storedSids.map((item) => item.sid)
      await axios.delete(`${DELETE_CART_DATA}`, {
        data: {
          sids: selectedSids,
        },
        withCredentials: true,
      })
    } catch (error) {
      console.log(error)
    }
  }

  //訂單資訊
  const [order, setOrder] = useState()
  const orderId = localStorage.getItem('orderId')
  const getOrderData = async () => {
    try {
      const response = await axios.get(`${ORDER_DATA}${orderId}`, {
        withCredentials: true,
      })
      console.log('order', response.data)
      setOrder(response.data[0])
    } catch (error) {
      console.log(error)
    }
    console.log('order', order)
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
        {order && order.sid && (
          <div className="container myWidth" key={order.sid}>
            <table className="mb-3">
              <tbody className="j-deepGray">
                <tr className="row g-0">
                  <td className="tableTitle h3 j-deepSec headTitle text-start">
                    收件人
                  </td>
                </tr>
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
        )}
      </section>
      {/* 訂單編號資訊 */}
      <section className="container-fluid">
        {order && order.sid && (
          <div className="container myWidth">
            <div>
              <div className="h3 j-deepSec headTitle">配送方式</div>
              <h2 className="j-deepSec text-center bottomLine">宅配到府</h2>
            </div>
            <div>
              <div className="h3 j-deepSec headTitle">訂單編號</div>
              <h2 className="j-deepSec text-center bottomLine">
                {order.orderId}
              </h2>
            </div>
          </div>
        )}
      </section>

      {/* 返回按鈕 */}
      <section className="container-fluid px-5">
        <div className="text-center">
          <Link
            to="/member/orderlist"
            className="gray-line-btn j-h3 title-button me-3"
            onClick={async () => {
              await handleDeleteCart()
              localStorage.removeItem('selectedSids')
              localStorage.removeItem('orderId')
              localStorage.removeItem('itemId')
            }}
          >
            查看歷史訂單
          </Link>
          <Link
            to="/product"
            className="gray-line-btn j-h3 title-button me-3"
            onClick={async () => {
              await handleDeleteCart()
              localStorage.removeItem('selectedSids')
              localStorage.removeItem('orderId')
              localStorage.removeItem('itemId')
            }}
          >
            繼續購物
          </Link>
        </div>
      </section>
    </>
  )
}

export default Cartthird
