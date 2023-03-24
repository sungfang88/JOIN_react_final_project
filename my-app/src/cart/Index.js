import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { GETCART_DATA } from './api_comfig'
import { UPDATED } from './api_comfig'
import { usePopup } from '../Public/Popup'
import Stepprocess from './components/Stepprocess'
import AuthContext from '../Context/AuthContext'
import List from './components/List'
import axios from 'axios'

function Index() {
  const { Popup, openPopup, closePopup } = usePopup() //必要const
  const [popupProps, setPopupProps] = useState({}) //可用 useState 來做動態更新
  const initialState = useRef(true)

  const { myAuth } = useContext(AuthContext)
  console.log('myAuth', myAuth)

  // 在 component 中新增一個狀態來儲存被選取的 sid
  const [selectedSids, setSelectedSids] = useState(
    JSON.parse(localStorage.getItem('selectedSids') || '[]')
  )

  useEffect(() => {
    localStorage.setItem('selectedSids', JSON.stringify(selectedSids))
  }, [selectedSids])

  useEffect(() => {
    localStorage.removeItem('selectedSids')
    setSelectedSids([])
  }, [])

  const handleCheckboxChange = (e, item) => {
    if (e.target.checked) {
      setSelectedSids([...selectedSids, item])
    } else {
      setSelectedSids(
        selectedSids.filter((selectedSids) => selectedSids.id !== item.id)
      )
    }
    // 更新 localStorage
    localStorage.setItem('selectedSids', JSON.stringify(selectedSids))
  }

  // btnGroup array {text: 按鍵字, handle: onclick function}
  const openDupBtnPopup = () => {
    initialState.current = false
    setPopupProps({
      content: `請選擇商品`,
      btnGroup: [
        {
          text: '關閉',
          handle: closePopup,
        },
      ],
    })
    // openPopup()
  }

  //取得購物車資料
  const [data, setData] = useState([{}])
  const getCartData = async () => {
    try {
      const response = await axios.get(`${GETCART_DATA}${myAuth.sid}`, {
        withCredentials: true,
      })
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  //算金額
  const totalPrice = selectedSids.reduce(
    (acc, v, i) => acc + (v.price || 0) * (v.quantity || 0),
    0
  )
  const totalCount = selectedSids.reduce(
    (acc, v, i) => acc + (v.quantity || 0),
    0
  )

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
    selectedSids.forEach((item) => {
      updateCartItem(item)
    })
  }

  useEffect(() => {
    if (initialState.current !== true) {
      openPopup() //可以直接打開pop up
    }
    getCartData()
    return () => {
      //解除功能
      console.log('unmount')
    }
  }, [popupProps])

  return (
    <>
      {/* 購物流程  */}
      <section className="container-fluid nav-space">
        <Stepprocess />
      </section>
      <section className="container-fluid orderTable">
        <List
          data={data}
          setData={setData}
          handleCheckboxChange={handleCheckboxChange}
          setSelectedSids={setSelectedSids}
          selectedSids={selectedSids}
        />
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
          <Link
            className="gray-line-btn j-h3 title-button me-3"
            to="/cart/classOrder01"
            onClick={() => {
              localStorage.removeItem('selectedSids')
            }}
          >
            繼續購物
          </Link>
          <Link
            className="g-line-btn j-h3 title-button"
            onClick={(event) => {
              const selectedSidsInLocalStorage =
                localStorage.getItem('selectedSids')
              const selectedSids = JSON.parse(
                selectedSidsInLocalStorage || '[]'
              )
              if (selectedSids.length === 0) {
                console.log('selectedSids is an empty array')
                openDupBtnPopup()
                event.preventDefault() // 阻止預設行為，即不進行頁面跳轉
              } else {
                console.log('12345')
                handleNext()
              }
            }}
            to="/cart/cart02"
          >
            下一步
          </Link>
        </div>
      </section>
      <Popup {...popupProps} />
    </>
  )
}
export default Index
