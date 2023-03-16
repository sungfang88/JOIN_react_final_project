import React from 'react'
import { useState } from 'react'
function Products03() {
  const [isOpen, setIsOpen] = useState(true)

  const toggleTable = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      {/* 購物流程 */}
      <section className="container-fluid nav-space">
        <div className="container">
          <div className="step-process">
            <div className="step complete">
              <h1>1</h1>
              <h3>購物車</h3>
            </div>
            <div className="step complete">
              <h1>2</h1>
              <h3>填寫資料</h3>
            </div>

            <div className="step active">
              <h1>3</h1>
              <h3>訂單確認</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid orderTable">
        <div className="container">
          <div
            className="headTitle h3 j-deepSec mb-3 d-flex justify-content-between"
            onClick={toggleTable}
          >
            <p className="m-0">商品訂單明細</p>
            <img id="toggle-btn" src="../img/Icon/Dropdown.png" alt="" />
          </div>
          {isOpen && (
            <ul id="order-list" className="g-0 m-auto mx-3">
              <div className="d-md-flex d-none tableTitle mb-3">
                <li className="col-2 h3"></li>
                <ul className="text-center d-md-flex d-grid col-md-10 col-6 g-0">
                  <li className="col">品項</li>
                  <li className="col">價錢</li>
                  <li className="col">數量</li>
                </ul>
              </div>
              <div className="d-flex tableTbody hide mb-2 orderBottomLine">
                <li className="col-md-2 col-6 text-center">
                  <img
                    className="orderImg ms-3"
                    src="./../img/001.webp"
                    alt=""
                  />
                </li>
                <ul className="col-md-10 col-6 g-0 row d-grid d-md-flex text-center">
                  <li className="col fs-7">
                    <div>
                      人頭馬VSOP特選桶白蘭地
                      <br />
                      <span className="d-none d-md-grid">
                        REMY MARTIN VSOP MATURE CASK FINISH
                      </span>
                    </div>
                  </li>
                  <li className="col">$1,290</li>
                  <li className="col">1件</li>
                </ul>
              </div>
              <div className="d-flex tableTbody hide mb-2 orderBottomLine">
                <li className="col-md-2 col-6 text-center">
                  <img
                    className="orderImg ms-3"
                    src="./../img/001.webp"
                    alt=""
                  />
                </li>
                <ul className="col-md-10 col-6 g-0 row d-grid d-md-flex text-center">
                  <li className="col fs-7">
                    <div>
                      人頭馬VSOP特選桶白蘭地
                      <br />
                      <span className="d-none d-md-grid">
                        REMY MARTIN VSOP MATURE CASK FINISH
                      </span>
                    </div>
                  </li>
                  <li className="col">$1,290</li>
                  <li className="col">1件</li>
                </ul>
              </div>
              <div className="d-flex tableTbody hide mb-2 orderBottomLine">
                <li className="col-md-2 col-6 text-center">
                  <img
                    className="orderImg ms-3"
                    src="./../img/001.webp"
                    alt=""
                  />
                </li>
                <ul className="col-md-10 col-6 g-0 row d-grid d-md-flex text-center">
                  <li className="col fs-7">
                    <div>
                      人頭馬VSOP特選桶白蘭地
                      <br />
                      <span className="d-none d-md-grid">
                        REMY MARTIN VSOP MATURE CASK FINISH
                      </span>
                    </div>
                  </li>
                  <li className="col">$1,290</li>
                  <li className="col">1件</li>
                </ul>
              </div>
            </ul>
          )}
        </div>
      </section>

      {/* 訂購完成訊息 */}
      <section className="container-fluid px-5">
        <div className="text-center">
          <p className="h2 j-deepSec mb-3 mt-5">結帳完成!!</p>
          <p className="h3 j-deepGray mb-5">
            感謝您的訂購
            <br />
            您的訂單明細如下
          </p>
        </div>
      </section>

      {/* 訂購人資訊 */}
      <section className="container-fluid">
        <div className="container myWidth">
          <table className="mb-3">
            <div className="tableTitle h3 j-deepSec headTitle">收件人</div>
            <tbody className="j-deepGray">
              <tr className="row g-0">
                <td className="col-md-2 col-3 j-deepPri h3">姓名</td>
                <td className="col-md-10 col-9 j-deepGray text-start h3">
                  Amy
                </td>
              </tr>
              <tr className="row g-0">
                <td className="col-md-2 col-3 j-deepPri h3">手機</td>
                <td className="col-md-10 col-9 j-deepGray text-start h3">
                  0911123456
                </td>
              </tr>
              <tr className="row g-0">
                <td className="col-md-2 col-3 j-deepPri h3">地址</td>
                <td className="col-md-10 col-9 j-deepGray text-start h3">
                  台北市長安東路
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      {/* 訂單編號資訊 */}
      <section className="container-fluid">
        <div className="container myWidth">
          <div>
            <div className="h3 j-deepSec headTitle">配送方式</div>
            <h2 className="j-deepSec text-center bottomLine">到店取貨</h2>
          </div>
          <div>
            <div className="h3 j-deepSec headTitle">訂單編號</div>
            <h2 className="j-deepSec text-center bottomLine">P1632841</h2>
          </div>
        </div>
      </section>
      {/* 返回按鈕 */}
      <section className="container-fluid px-5">
        <div className="text-center">
          <button className="gray-line-btn j-h3 title-button">
            查看歷史訂單
          </button>
          <button className="g-line-btn j-h3 title-button">繼續購物</button>
        </div>
      </section>
    </>
  )
}

export default Products03
