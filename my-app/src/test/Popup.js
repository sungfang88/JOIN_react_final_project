import React, { useState } from 'react'

function Popup() {
  const [showContent, setShowContent] = useState(false)

  const handleClick = () => {
    setShowContent(!showContent)
  }

  return (
    <>
      <div className="container">
        <div className="father" style={{ border: '2px solid blue' }}>
          <div className="child1">
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <h1>hello</h1>
            <button onClick={handleClick}>彈跳視窗</button>
          </div>
          <div
            className={`child2 ${showContent ? '' : 'd-none'}`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 128, 0, 0.5)',
              padding: '20px',
            }}
          >
            <p>do something</p>
            <button onClick={handleClick}>關閉視窗</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Popup
