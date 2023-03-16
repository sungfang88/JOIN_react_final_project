import React, { useState } from 'react'

function Payment(props) {
  const {
    handleToggleDropdown2,
    selectedValue2,
    isMenuOpen2,
    options2,
    handleSelectOption2,
    handleNext,
    handleSubmit,
  } = props
  const [paymentInput, setPaymentInput] = useState(false)
  handleSubmit = (e) => {
    if (selectedValue2 === '請選擇...') {
      handleNext()
    } else {
      e.preventDefault()
      setPaymentInput(true)
    }
  }
  return (
    <>
      <div>
        <label htmlFor="period">付款方式</label>
      </div>
      <div className="dropdown">
        <div className="dropdown-toggle" onClick={handleToggleDropdown2}>
          <span className="dropdown-label">
            {selectedValue2 || '請選擇...'}
          </span>
          <i className="fas fa-caret-down"></i>
        </div>
        {paymentInput && (
          <span className="error-message red">請選擇付款方式</span>
        )}
        {isMenuOpen2 && (
          <ul className="dropdown-menu mt-2">
            {options2.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  handleSelectOption2(option)
                }}
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
    </>
  )
}

export default Payment
