import React, { useState, useEffect, useContext } from 'react'
import Classmember from './components/Classmember'
import axios from 'axios'
import Classstepprocess from './components/Classstepprocess'
import Completion from './components/Completion'
import AuthContext from '../Context/AuthContext'
import { MEMBER_DATA, CLASS_DATA, CLASSORDER_DATA } from './api_comfig'
import { Link, useLocation } from 'react-router-dom'

function Classsec() {
  const { myAuth } = useContext(AuthContext)
  console.log('myAuth', myAuth)
  //取得classOrder資料
  const [data, setData] = useState([])
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const class_form_sid = searchParams.get('classformsid')
  const getClassData = async () => {
    try {
      const response = await axios.get(`${CLASS_DATA}${class_form_sid}`, {
        withCredentials: true,
      })
      setData(response.data)
      console.log('response.data', response.data)
    } catch (error) {
      console.log(error)
    }
  }
  //取得會員資料
  const [memberData, setMember] = useState({})
  const getMemberData = async () => {
    try {
      const response = await axios.get(`${MEMBER_DATA}${myAuth.sid}`, {
        withCredentials: true,
      })
      console.log(response.data)
      setMember(response.data[0])
    } catch (error) {
      console.error(error)
    }
  }

  //訂單明細收合
  const [isOpen, setIsOpen] = useState(false)
  const toggleTable = () => {
    setIsOpen(!isOpen)
  }
  const orderId = JSON.parse(localStorage.getItem('orderId'))

  useEffect(() => {
    getClassData()
    getMemberData()
    // updateForm()
    //getOrderData()
    return () => {
      //解除功能
      console.log('unmount')
    }
  }, [])

  return (
    <>
      {/* 購物流程 */}
      <section className="container-fluid nav-space">
        <Classstepprocess />
      </section>

      {/* ul li做的表單  */}
      <section className="container-fluid orderTable">
        <div className="container">
          <div
            className="headTitle h3 j-deepSec mb-3 d-flex justify-content-between element-class"
            onClick={toggleTable}
          >
            <p className="m-0">課程訂單明細</p>
          </div>
          {isOpen && (
            <ul className="g-0 m-auto mx-3">
              <div className="d-md-flex d-none tableTitle mb-3">
                <li className="col-2 h3"></li>
                <ul className="col-10 g-0 row d-grid d-md-flex text-center">
                  <li className="col">時間/時段</li>
                  <li className="col">組合</li>
                  <li className="col">Bartender</li>
                  <li className="col">價錢</li>
                  <li className="col">折價卷</li>
                  <li className="col">人數</li>
                </ul>
              </div>

              {data.map((r) => {
                return (
                  <div className="d-flex tableTbody">
                    <li className="col-md-2 col-6">
                      <img
                        className="orderImg"
                        src={require('./img/classimg.png')}
                        alt=""
                      />
                    </li>
                    <ul className="col-md-10 col-6 g-0 row d-grid d-md-flex text-center ms-md-0 ms-3">
                      <li className="col">
                        {r.class_date.slice(0, 10)}
                        <br />
                        {r.time}
                      </li>
                      <li className="col">{r.class_id}課程</li>
                      <li className="col">{r.Bartender}</li>
                      <li className="col d-md-flex d-none">
                        $
                        {2400 * r.class_prople -
                          (2400 * r.class_prople - r.amount)}
                      </li>
                      <li className="col d-md-flex d-none">
                        -{2400 * r.class_prople - r.amount}
                      </li>
                      <li className="col">{r.class_prople}人</li>
                    </ul>
                  </div>
                )
              })}
            </ul>
          )}
        </div>
      </section>

      {/* 訂購完成訊息 */}
      <section className="container-fluid pb-5">
        <Completion />
      </section>

      {/* 訂購人資訊  */}
      <section className="container-fluid">
        <Classmember memberData={memberData} />
      </section>

      {/* 訂單編號資訊 */}
      <section className="container-fluid pb-5">
        <div className="container myWidth">
          <div className="h3 j-deepSec headTitle">訂單編號</div>
          <h2 className="j-deepSec text-center bottomLine">
            {localStorage.getItem('orderId').replace(/"/g, '')}
          </h2>
        </div>
      </section>

      {/* 返回按鈕  */}
      <section className="container-fluid">
        <div className="text-center">
          <Link
            className="gray-line-btn j-h3 title-button me-2"
            to="/member/orderclass"
            onClick={() => {
              localStorage.removeItem('orderId')
              localStorage.removeItem('itemId')
              localStorage.removeItem('key1')
              localStorage.removeItem('key2')
              localStorage.removeItem('key3')
              localStorage.removeItem('key4')
            }}
          >
            查看歷史訂單
          </Link>
          <Link
            to="/class"
            className="g-line-btn j-h3 title-button"
            onClick={() => {
              localStorage.removeItem('orderId')
              localStorage.removeItem('itemId')
              localStorage.removeItem('key1')
              localStorage.removeItem('key2')
              localStorage.removeItem('key3')
              localStorage.removeItem('key4')
            }}
          >
            繼續購物
          </Link>
        </div>
      </section>
    </>
  )
}

export default Classsec
