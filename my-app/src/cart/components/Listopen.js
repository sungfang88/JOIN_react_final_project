import React from 'react'

function Listopen(props) {
  const { toggleTable, isOpen, data } = props
  return (
    <>
      <div className="container">
        <div
          className="headTitle h3 j-deepSec mb-3 d-flex justify-content-between element-class"
          onClick={toggleTable}
        >
          <p className="m-0">商品訂單明細</p>
          <img id="toggle-btn" src="../img/Icon/Dropdown.png" alt="" />
        </div>
        {/* isOpen 為一個布林值變數，當其為 true 時，代表要顯示該元素。所以當 isOpen 為 true 時，該元素會被渲染出來 */}
        {isOpen && (
          <ul id="order-list" className="g-0 m-auto mx-3 ">
            <div className="d-md-flex d-none tableTitle mb-3">
              <li className="col-2 h3"></li>
              <ul className="text-center d-md-flex d-grid col-md-10 col-6 g-0">
                <li className="col">品項</li>
                <li className="col">價錢</li>
                <li className="col">數量</li>
              </ul>
            </div>
            {data.map((r) => {
              return (
                <div className="d-flex tableTbody hide mb-2 orderBottomLine">
                  <li className="col-md-2 col-6 text-center" key={r.sid}>
                    <img
                      className="orderImg  ms-3"
                      src={`http://localhost:3008/product_img/${r.product_img}`}
                      alt=""
                    />
                  </li>
                  <ul className="col-md-10 col-6 g-0 row d-grid d-md-flex text-md-center text-start">
                    <li className="col fs-7">
                      <div>
                        {r.product_ch}
                        <br />
                        <span className="d-none d-md-grid">{r.product_eg}</span>
                      </div>
                    </li>
                    <li className="col">{r.price}</li>
                    <li className="col">{r.quantity}件</li>
                  </ul>
                </div>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}

export default Listopen
