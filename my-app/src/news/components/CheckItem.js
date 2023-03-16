import React, { useState } from 'react'
function CheckItem({ isCheck, text, onClick }) {
  return (
      <div
        className={`check-box ${isCheck && 'ischeck'}`}
        onClick={onClick}
      >
        <div className="mission-font">
          {isCheck ? <i className="fa-solid fa-check"></i> : <p>{text}</p>}
        </div>
      </div>
  )
}

export default CheckItem
