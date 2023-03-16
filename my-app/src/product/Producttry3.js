import React, { useState } from 'react'
import '../Public/style'

function Producttry3() {
  const [showItems, setShowItems] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const clickthis = () => {
    setShowItems(!showItems)
  }

  const selectItem = (item) => {
    setSelectedItem(item)
    setShowItems(false)
  }

  return (
    <>
      <div className="selectbox-left">
        <div className="selectbox select-title">
          <button
            className="g-line-btn h3 d-inline-block d-md-none"
            onClick={clickthis}
          >
            {selectedItem ? selectedItem : '請選擇'}
          </button>
        </div>

        <div
          className={`selectbox select-item ${
            showItems ? '' : 'd-none'
          } d-md-block`}
        >
          <button
            className="g-line-btn h3"
            onClick={() => selectItem('名稱一')}
          >
            名稱一
          </button>
          <button
            className="g-line-btn h3"
            onClick={() => selectItem('名稱二')}
          >
            名稱二
          </button>
          <button
            className="g-line-btn h3"
            onClick={() => selectItem('名稱三')}
          >
            名稱三
          </button>
        </div>
      </div>
    </>
  )
}

export default Producttry3
