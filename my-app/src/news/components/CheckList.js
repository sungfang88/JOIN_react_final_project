import React, { useState } from 'react'
import CheckItem from './CheckItem'

function CheckList({ checkInList }) {

  return (
    <div className="row justify-content-center justify-content-md-start">
      {checkInList.map((item)=>{
        const { key, isCheck, text } = item
        return (
          <CheckItem
          key={key}
          isCheck={isCheck}
          text={text}
        />
        )
      })}
    </div>
  )
}

export default CheckList
