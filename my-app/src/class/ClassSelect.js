import React, { useState, useEffect } from 'react'
import '../Public/style'
import axios from 'axios'

// const options1 = [
//   { value: 'highToLow', label: '馬丁尼' },
//   { value: 'lowToHigh', label: '尼格羅尼' },
//   { value: 'lowToHigh', label: '柯夢波丹' },
//   { value: 'lowToHigh', label: '長島冰茶' },
//   { value: 'lowToHigh', label: 'Mojito' },
//   { value: 'lowToHigh', label: '瑪格麗特' },
// ]

function ClassSelect({ myChange }) {
  const [selectedValue1, setSelectedValue1] = useState('請選擇...')

  const [isMenuOpen1, setIsMenuOpen1] = useState(false)

  const handleToggleDropdown1 = () => {
    setIsMenuOpen1(!isMenuOpen1)
  }

  const handleSelectOption1 = (option) => {
    setSelectedValue1(option.wine_name)
    setIsMenuOpen1(false)
    myChange(option.wine_name)
  }

  const [Classwine, setClasswine] = useState([
    {
      sid: 0,
      wine_name: '',
    },
  ])

  useEffect(() => {
    const fetchClasswine = async () => {
      try {
        const response = await axios('http://localhost:3008/class/classwine')
        console.log('response.data', response.data)

        setClasswine(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchClasswine()
  }, [])
  return (
    <>
      <div className="d-block container">
        {/* <!-- 下拉式選單 --> */}
        <div className="j-input">
          <div className="dropdown">
            <div className="dropdown-toggle " onClick={handleToggleDropdown1}>
              <span className="dropdown-label">
                {selectedValue1 || '請選擇...'}
              </span>
              <i className="fas fa-caret-down"></i>
            </div>
            {isMenuOpen1 && (
              <ul className="dropdown-menu mt-2">
                {Classwine.map((V) => (
                  <li
                    key={V.sid}
                    value={V.sid}
                    onClick={() => handleSelectOption1(V)}
                  >
                    {V.wine_name}
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
      </div>
    </>
  )
}

ClassSelect.defaultProps = {
  myChange: (value) => {},
  
}
export default ClassSelect
