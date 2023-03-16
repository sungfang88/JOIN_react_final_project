import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { SEAT_ALL } from './api_config'
import axios from 'axios'
import dayjs from 'dayjs'
import { usePopup } from '../Public/Popup'

//應該要跳轉訂位編號的訂位明細
function Confirm() {
  const { Popup, openPopup, closePopup } = usePopup() //必要const
  const [popupProps, setPopupProps] = useState({}) //可用 useState 來做動態更新
  const initialState = useRef(true)
  const { sid } = useParams()
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${SEAT_ALL}/${sid}`).then((response) => {
      setData(response.data)
      console.log(sid)
      console.log(response.data)
      // const category = response.data[0].category
      // console.log(category)
    })
  }, [sid])

  const removeItem = async (req, res) => {
    // if (!+itemId) {
    //   return
    // }
    const response = await axios.delete(SEAT_ALL + '/' + sid)
    console.log(response.data)
  }

  return (
    <>
      {/* <!-- section 1 第一個section要加nav-space pt-md-0--> */}
      <section className="container-fluid nav-space">
        <div className="container">
          <div className="pb-5"></div>
          <h3 className="j-bg-lightPri j-deepSec p-2 mt-3 mt-md-5">訂位明細</h3>
          <table className="mb-3 d-none d-md-table">
            <thead className="j-deepPri">
              <tr>
                <td>日期</td>
                <td>時段</td>
                <td>座位種類</td>
                <td>人數</td>
                <td>姓名</td>
                <td>電話</td>
              </tr>
            </thead>
            <tbody className="j-deepGray">
              {data.map((item) => (
                <tr key={item.sid}>
                  <td>{dayjs(item.reserveDate).format('YYYY-MM-DD')}</td>
                  <td>{item['period-sid']}</td>
                  <td>{item.table_sid}</td>
                  <td>{item.people}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  {/* <td>{console.log(data)}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <table className="mb-3 d-table d-md-none">
            <tbody>
              <tr>
                <td className="j-deepPri category">日期</td>
                {data.map((item) => (
                  <td
                    className="j-deepGray text-start"
                    key={item.id + item.reserveDate}
                  >
                    {dayjs(item.reserveDate).format('YYYY-MM-DD')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="j-deepPri category">時段</td>
                {data.map((item) => (
                  <td
                    className="j-deepGray text-start"
                    key={item.id + item.period_sid}
                  >
                    {item.period_sid}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="j-deepPri category">座位種類</td>
                {data.map((item) => (
                  <td
                    className="j-deepGray text-start"
                    key={item.id + item.table_sid}
                  >
                    {item.table_sid}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="j-deepPri category">人數</td>
                {data.map((item) => (
                  <td
                    className="j-deepGray text-start"
                    key={item.id + item.people}
                  >
                    {item.people}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="j-deepPri category">姓名</td>
                {data.map((item) => (
                  <td
                    className="j-deepGray text-start"
                    key={item.id + item.name}
                  >
                    {item.name}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="j-deepPri category">電話</td>
                {data.map((item) => (
                  <td
                    className="j-deepGray text-start"
                    key={item.id + item.phone}
                  >
                    {item.phone}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      {/* <!-- section 2 --> */}
      <section className="container-fluid">
        <div className="container d-flex justify-content-center">
          <button
            className="gray-line-btn h3 mx-1 mx-md-5"
            onClick={(e) => {
              e.preventDefault()
              openPopup()
            }}
          >
            取消訂位
          </button>
          <Link to="/seat">
            <button className="g-line-btn h3 mx-1 mx-md-5">回到訂位首頁</button>
          </Link>
        </div>
      </section>
      <div className="pb-0 pb-md-5"></div>
      <Popup
        content={'確定要取消訂位？'}
        icon={<i className="fa-solid fa-circle-exclamation"></i>}
        btnGroup={[
          {
            text: '取消',
            handle: () => {
              closePopup()
            },
          },
          {
            text: '確定',
            handle: () => {
              removeItem()
              navigate(`/seat`)
            },
          },
        ]}
      />
    </>
  )
}

export default Confirm
