import React, { useEffect, useState } from 'react'

function Counter(props) {
  const [count, setCount] = useState(1)
  const [isCart, setIsCart] = useState('')

  useEffect(() => {
    if (localStorage.getItem) {
    }
  })

  function handlePlusClick() {
    setCount(count + 1)
  }

  function handleMinusClick() {
    if (count > 1) {
      setCount(count - 1)
    }
  }
  function clickconsole() {
    console.log('click!')
    console.log(count)
    console.log(props.productId)

    const cartItem = {
      productId: props.productId,
      amount: count,
    }

    localStorage.setItem('cart', JSON.stringify(cartItem))
  }

  return (
    <>
      <div className="row justify-content-center text-align-center justify-content-md-start  mt-4 row-cols-1  row-cols-md-2">
        <div className="col pe-auto pe-md-4">
          <div className="row justify-content-center">
            <div className="col-3">
              <button
                className="g-line-btn j-h3 minus w-100"
                onClick={handleMinusClick}
              >
                <i className="fa-solid fa-minus "></i>
              </button>
            </div>
            <div className="col-6 px-0">
              <input
                type="text"
                className="j-h3 g-line-input text-align-center product-amount input-text w-100"
                value={count}
                readOnly
              />
            </div>
            <div className="col-3">
              <button
                className="g-line-btn me-0 me-md-2 j-h3 plus  w-100"
                onClick={handlePlusClick}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-6 col-xl px-auto pe-auto pe-md-0 px-xl-0 pe-lg-auto mt-3 mt-md-0">
          <div className="row mt-xl-0">
            <div className="col">
              <button className="o-line-btn j-h3 d-md-block w-100">
                立即購買
              </button>
            </div>
            <div className="col">
              <button className="cart-btn j-h3 w-100" onClick={clickconsole}>
                加入購物車
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 分隔 */}
      {/* <div className="row justify-content-center">
        <div className="col-3">
          <button
            className="g-line-btn j-h3 minus w-100"
            onClick={handleMinusClick}
          >
            <i className="fa-solid fa-minus"></i>
          </button>
        </div>
        <div className="col-6 px-0">
          <input
            type="text"
            className="j-h3 g-line-input text-align-center product-amount input-text w-100"
            value={count}
            readOnly
          />
        </div>
        <div className="col-3">
          <button
            className="g-line-btn me-0 me-md-2 j-h3 plus w-100"
            onClick={handlePlusClick}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div> */}
    </>
  )
}

export default Counter
