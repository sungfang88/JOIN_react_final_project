import React, { useState, useEffect } from 'react'
import '../Public/style'
// const options1 = [
//   { value: 'highToLow', label: '馬丁尼' },
//   { value: 'lowToHigh', label: '尼格羅尼' },
//   { value: 'lowToHigh', label: '柯夢波丹' },
//   { value: 'lowToHigh', label: '長島冰茶' },
//   { value: 'lowToHigh', label: 'Mojito' },
//   { value: 'lowToHigh', label: '瑪格麗特' },
// ]
const options2 = [
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
]

// const options3 = [
//   { value: '1', label: '1月' },
//   { value: '2', label: '2月' },
//   { value: '3', label: '3月' },
//   { value: '4', label: '4月' },
//   { value: '5', label: '5月' },
//   { value: '6', label: '6月' },
//   { value: '7', label: '7月' },
//   { value: '8', label: '8月' },
//   { value: '9', label: '9月' },
//   { value: '10', label: '10月' },
//   { value: '11', label: '11月' },
//   { value: '12', label: '12月' },
// ]

function YearSelect() {
  // const [selectedValue1, setSelectedValue1] = useState('請選擇...')
  const [selectedValue2, setSelectedValue2] = useState('請選擇...')
  // const [selectedValue3, setSelectedValue3] = useState('請選擇...')
  // const [isMenuOpen1, setIsMenuOpen1] = useState(false)
  const [isMenuOpen2, setIsMenuOpen2] = useState(false)
  // const [isMenuOpen3, setIsMenuOpen3] = useState(false)
  // const handleToggleDropdown1 = () => {
  //   setIsMenuOpen1(!isMenuOpen1)
  // }

  // const handleSelectOption1 = (option) => {
  //   setSelectedValue1(option.label)
  //   setIsMenuOpen1(false)
  // }

  const handleToggleDropdown2 = () => {
    setIsMenuOpen2(!isMenuOpen2)
  }

  const handleSelectOption2 = (option) => {
    setSelectedValue2(option.label)
    setIsMenuOpen2(false)
  }
  // const handleToggleDropdown3 = () => {
  //   setIsMenuOpen3(!isMenuOpen2)
  // }

  // const handleSelectOption3 = (option) => {
  //   setSelectedValue3(option.label)
  //   setIsMenuOpen3(false)
  // }
  return (
    <>
      <div className="d-block ">
        {/* <!-- 下拉式選單 --> */}
        <div className="j-input">
          {/* <div>
            <label htmlFor="period">商品類別</label>
          </div> */}
          {/* <div className="dropdown">
            <div className="dropdown-toggle" onClick={handleToggleDropdown1}>
              <span className="dropdown-label">
                {selectedValue1 || '請選擇...'}
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
          </div> */}
        </div>

        {/* <!-- 下拉式選單 --> */}
        <div className="row">
          <div className="col">
            <div className="j-input">
              <div className="dropdown">
                <div
                  className="dropdown-toggle"
                  onClick={handleToggleDropdown2}
                >
                  <span className="dropdown-label">
                    {selectedValue2 || '請選擇...'}
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
          {/* <div className="col">
            <div className="j-input">
              <div className="dropdown">
                <div
                  className="dropdown-toggle"
                  onClick={handleToggleDropdown3}
                >
                  <span className="dropdown-label">
                    {selectedValue3 || '請選擇...'}
                  </span>
                  <i className="fas fa-caret-down"></i>
                </div>
                {isMenuOpen3 && (
                  <ul className="dropdown-menu mt-2">
                    {options3.map((option) => (
                      <li
                        key={option.value}
                        onClick={() => handleSelectOption3(option)}
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
                  value={selectedValue3}
                /> 
              </div>
            </div>
          </div>*/}
        </div>
      </div>
    </>
  )
}

export default YearSelect
