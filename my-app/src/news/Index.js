import React, { useState, useEffect, useRef } from 'react'
import NewsList from './components/NewsList'
import './css/news.css'
import { Link } from 'react-router-dom'
import { FETCH_NEWS_LIST } from './data/api_config.js'
// import { fetchNewsList } from './data/fetchNewsList'

//下拉式選單選項
const options1 = [
  { value: 0, label: '全部' },
  { value: 1, label: '會員' },
  { value: 2, label: '商品' },
  { value: 3, label: '課程' },
  { value: 4, label: '訂位' },
]

const options2 = [
  { value: 'newToOld', label: '新至舊' },
  { value: 'oldToNew', label: '舊至新' },
]

function News() {
  //向伺服器用get獲取資料
  const fetchNewsList = async (setFetchData) => {
    const r = await fetch(FETCH_NEWS_LIST)
    const data = await r.json()
    // console.log('fetch', data)

    let rows = data.rows.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
    setFetchData(rows)
  }

  const [fetchData, setFetchData] = useState([])
  const [newsListData, setNewsListData] = useState([])
  const initList = useRef(true)
  const [isLoading, setIsLoading] = useState(true)

  const [selectedValue1, setSelectedValue1] = useState({
    value: 0,
    label: '全部',
  })
  const [isMenuOpen1, setIsMenuOpen1] = useState(false)
  const [selectedValue2, setSelectedValue2] = useState({
    value: 'newToOld',
    label: '新至舊',
  })
  const [isMenuOpen2, setIsMenuOpen2] = useState(false)

  // user start to operate
  const [start, setStart] = useState(false)

  const handleToggleDropdown1 = () => {
    // setIsMenuOpen1(!isMenuOpen1)
    setIsMenuOpen1((prev) => {
      setIsMenuOpen2(false)
      return !prev
    })
  }

  const handleSelectOption1 = (option) => {
    // console.log('handleSelectOption1', option)
    setSelectedValue1(option)
    setIsMenuOpen1(false)
  }

  const handleToggleDropdown2 = () => {
    // setIsMenuOpen2(!isMenuOpen2)
    setIsMenuOpen2((prev) => {
      setIsMenuOpen1(false)
      return !prev
    })
  }

  const handleSelectOption2 = (option) => {
    // console.log('handleSelectOption2', option)
    setSelectedValue2(option)
    setIsMenuOpen2(false)
  }
  useEffect(() => {
    if (initList.current === true) {
      fetchNewsList(setFetchData).then(() => {
        initList.current = false
        setStart(true)
      })
    }
  }, [])
  useEffect(() => {
    // console.log('selectedValue1', selectedValue1)
    const { value, label } = selectedValue1
    
    if(!start && value===0) return 

    setNewsListData(() => {
      return [...fetchData].filter((item) => {
        return value !== 0 ? item.cate === value : item
      })
    })
  }, [selectedValue1.value, fetchData])

  useEffect(() => {
    // console.log('selectedValue2', selectedValue2)

    const { value, label } = selectedValue2

    if(!start && value==='newToOld') return 

    setNewsListData(
      [...newsListData].sort((a, b) => {
        return value === 'newToOld'
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date)
      })
    )
  }, [selectedValue2.value])

  //  1.6s後自動關掉載入指示動畫
  // useEffect(() => {
  //   if (isLoading) {
  //     setTimeout(() => {
  //       setIsLoading(false)
  //     }, 1600)
  //   }
  // }, [isLoading])

  // 搭配css的純載入指示動畫
  // const loader = (
  // <div className="col d-flex justify-content-center">
  //     <div className="lds-roller">
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //     </div>
  // </div>
  // )

  return (
    <>
      <section className="container-fluid d-none d-md-block nav-space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-auto">
              <Link to="/news/Turntable">
                <img
                  src={`/img/banner-1.png`}
                  alt="banner"
                  className="img-fluid w-100"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid nav-space pt-md-0">
        <div className="container">
          <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span className="col-auto title j-deepSec"> 最新消息</span>
            <div className="title-line d-block d-md-none"></div>
            <div className="col d-flex justify-content-end">
              <div className="j-input p-3 p-md-0 pe-md-1">
                <div>
                  <label htmlFor="period">分類</label>
                </div>
                <div className="dropdown">
                  <div
                    className="dropdown-toggle"
                    onClick={handleToggleDropdown1}
                  >
                    <span className="dropdown-label">
                      {selectedValue1?.label || '請選擇...'}
                    </span>
                    <i className="fas fa-caret-down"></i>
                  </div>
                  {isMenuOpen1 && (
                    <ul className="dropdown-menu mt-2">
                      {options1.map((option) => (
                        <li
                          key={option.value}
                          onClick={() => handleSelectOption1(option)}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}
                  <input
                    type="hidden"
                    id="selected"
                    name="selected"
                    value={selectedValue1}
                  />
                </div>
              </div>
              <div className="j-input p-3 p-md-0">
                <div>
                  <label htmlFor="period">排序</label>
                </div>
                <div className="dropdown">
                  <div
                    className="dropdown-toggle"
                    onClick={handleToggleDropdown2}
                  >
                    <span className="dropdown-label">
                      {selectedValue2?.label || '請選擇...'}
                    </span>
                    <i className="fas fa-caret-down"></i>
                  </div>
                  {isMenuOpen2 && (
                    <ul className="dropdown-menu mt-2">
                      {options2.map((option) => (
                        <li
                          key={option.value}
                          onClick={() => handleSelectOption2(option)}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}
                  <input
                    type="hidden"
                    id="selected"
                    name="selected"
                    value={selectedValue2}
                  />
                </div>
              </div>
            </div>
          </div>
          <NewsList NewsListData={newsListData} />
        </div>
      </section>
      <div className="daily-check">
        <Link to="/news/CheckIn">
          <h5>每日簽到</h5>
        </Link>
      </div>
    </>
  )
}

export default News
