import React, { useState, forwardRef, useEffect } from 'react'
import axios from 'axios'
import { MENU } from './api_config'

const options2 = [
  { value: 'GI', label: '琴酒 Gin' },
  { value: 'RM', label: '蘭姆酒 Rum' },
  { value: 'VK', label: '伏特加 Vodka' },
  { value: 'WK', label: '威士忌 Whisky' },
  { value: 'TQ', label: '龍舌蘭 Tequila' },
  { value: 'BD', label: '白蘭地 Brandy' },
]
const Menu = forwardRef((props, ref) => {
  const [menuData, setMenuData] = useState([])
  //* 按鈕切換菜單
  const MenuButton = ({ name, category, onMenuDataLoaded }) => {
    const handleClick = async () => {
      try {
        const response = await axios.get(`${MENU}/${category}`)
        onMenuDataLoaded(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    return (
      <button className="g-line-btn h3 me-2" onClick={handleClick}>
        {name}
      </button>
    )
  }
  const handleMenuDataLoaded = (data) => {
    setMenuData(data)
  }

  //* 下拉式選單
  const [selectedValue2, setSelectedValue2] = useState('請選擇...')
  const [selectedName, setSelectedName] = useState('')
  const [isMenuOpen2, setIsMenuOpen2] = useState(false)
  const handleToggleDropdown2 = () => {
    setIsMenuOpen2(!isMenuOpen2)
  }
  useEffect(() => {
    if (!selectedValue2) {
      return
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${MENU}/${selectedValue2}`)
        setMenuData(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [selectedValue2])

  const handleSelectOption2 = (option) => {
    setSelectedValue2(option.value)
    setSelectedName(option.label)
    setIsMenuOpen2(false)
  }
  return (
    <section id="menu" ref={ref}>
      <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between w-100">
        <span className="col-auto title j-deepSec"> 菜單</span>
        <div className="title-line d-block d-md-none"></div>
      </div>

      <div className="mb-3 d-none d-lg-flex">
        <div>
          <MenuButton
            category="GI"
            onMenuDataLoaded={handleMenuDataLoaded}
            name="琴酒 Gin"
          ></MenuButton>
        </div>
        <div>
          <MenuButton
            category="RM"
            onMenuDataLoaded={handleMenuDataLoaded}
            name="蘭姆酒 Rum"
          ></MenuButton>
        </div>
        <div>
          <MenuButton
            category="VK"
            onMenuDataLoaded={handleMenuDataLoaded}
            name="伏特加 Vodka"
          ></MenuButton>
        </div>
        <div>
          <MenuButton
            category="WK"
            onMenuDataLoaded={handleMenuDataLoaded}
            name="威士忌 Whisky"
          ></MenuButton>
        </div>
        <div>
          <MenuButton
            category="TQ"
            onMenuDataLoaded={handleMenuDataLoaded}
            name="龍舌蘭 Tequila"
          ></MenuButton>
        </div>
        <div>
          <MenuButton
            category="BD"
            onMenuDataLoaded={handleMenuDataLoaded}
            name="白蘭地 Brandy"
          ></MenuButton>
        </div>
      </div>

      <div className="j-input mb-3 d-block d-lg-none">
        <div>
          <label htmlFor="period">基底酒種類</label>
        </div>
        <div className="dropdown">
          <div
            className="dropdown-toggle w-100"
            onClick={handleToggleDropdown2}
          >
            <span className="dropdown-label">
              {selectedName || '請選擇...'}
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
            id="selected2"
            name="selected"
            value={selectedValue2}
          />
        </div>
      </div>
      <div className="container-fluid">
        <div className="j-bg-o-grad p-4 p-lg-4 row row-cols-1 row-cols-md-2 row-cols-lg-3 text-start justify-content-between">
          {menuData.map((item) => (
            <div className="wine j-white my-4 my-lg-4" key={item.sid}>
              <h3 className="mb-2">
                {item.name}
                <span>&nbsp;&nbsp;{item.name_en}</span>
              </h3>
              <h5>{item.ingredient}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Menu
