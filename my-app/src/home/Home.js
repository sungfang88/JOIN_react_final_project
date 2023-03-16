import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './css/Index.css'
// import Carousel from './Caraousel'
import ProductCard from '../product/ProductCard'

function Home() {
  const [likedProducts, setLikedProducts] = useState([])
  const [bestProductData, setBestProductData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        'http://localhost:3008/product/api/getProductbest'
      )
      const data = await res.json()
      setBestProductData(data.rows)
    }
    fetchData()
  }, [])

  const handleLike = (productId) => {
    if (likedProducts.includes(productId)) {
      setLikedProducts(likedProducts.filter((id) => id !== productId))
      localStorage.removeItem(productId)
    } else {
      setLikedProducts([...likedProducts, productId])
      localStorage.setItem(productId, true)
    }
  }
  return (
    <>
      <header className="container-fluid sm-header d-flex d-lg-block align-items-center">
        <div className="container">
          <div className="d-none d-md-flex">
            <div className="w-100 text-center d-flex flex-column justify-content-between">
              <div className="card-flip-1">
                <div className="flip">
                  <div className="front-1 cardf-1">
                    <img src={`/img/index-1.png`} alt="" className="w-75" />
                  </div>
                  <div className="back-1 cardb-1">
                    <img src={`/img/index-5.jpeg`} alt="" />
                  </div>
                </div>
              </div>
              <div>
                <img src={`/img/index-3.png`} className="w-75" alt="" />
              </div>
            </div>
            <div className="w-100">
              <div className="card-flip-2">
                <div className="flip">
                  <div className="front-2 cardf-2">
                    <img src={`/img/index-1.png`} alt="..." className="w-75" />
                  </div>
                  <div className="back-2 cardb-2">
                    <img src={`/img/seat.jpeg`} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100 text-center d-flex flex-column justify-content-between">
              <div>
                <img src={`/img/index-2.png`} className="w-75" alt="" />
              </div>
              <div className="card-flip-1">
                <div className="flip">
                  <div className="front-1 cardf-3"></div>
                  <div className="back-1 cardb-3">
                    <img src={`img/index-9.jpeg`} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100">
              <div className="card-flip-2">
                <div className="flip">
                  <div className="front-2 cardf-4"></div>
                  <div className="back-2 cardb-4">
                    <img src={`/img/index-8.jpeg`} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100 text-center d-flex flex-column justify-content-between">
              <div className="card-flip-1">
                <div className="flip">
                  <div className="front-1 cardf-5">
                    <img src={`/img/index-1.png`} alt="" className="w-75" />
                  </div>
                  <div className="back-1 cardb-5">
                    <img src={`/img/index-7.jpeg`} alt="" />
                  </div>
                </div>
              </div>
              <div>
                <img src={`/img/index-4.png`} className="w-75" alt="" />
              </div>
            </div>
          </div>
          <div className="d-flex d-md-none align-items-center flex-column">
            <img src={`/img/index-15.png`} alt="" className="pb-3" />
            <img src={`/img/index-1.png`} alt="" />
          </div>
        </div>
      </header>
      <div className="pt-5"></div>
      <div className="pt-5"></div>

      {/* <!-- section 1 第一個section要加nav-space pt-md-0--> */}
      <section className="container-fluid nav-space">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center">
            <div className="intro-img me-5 d-none d-md-block">
              <img src={`/img/index-10.png`} alt="" />
            </div>
            <div className="j-deepSec">
              <h2 className="mb-3">我有酒，你有故事嗎？</h2>
              <h4>
                酒對我們來說，已經成為了生活不可分割的一部分，
                開心的時候喝，不開心的時候更要喝
                <br />
                致力於實現「人生苦短，沒有喝酒解決不了的問題，如果有，再喝一杯！」
                <br />
                喝酒、買酒、學調酒，都來找Join解酒癮吧！
              </h4>
            </div>
          </div>
        </div>
      </section>
      <div className="pb-5 d-none d-md-block"></div>
      <div className="pb-5"></div>
      {/* <!-- 最新消息--> */}
      <section className="container-fluid">
        <div className="container">
          <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span className="col-auto title j-deepSec"> 最新消息</span>
            <div className="title-line d-block d-md-none"></div>
          </div>

          <div className="news j-bg-o-grad p-4 p-md-5 position-relative">
            <div className="news-info">
              <ul className="list-unstyled h4 mb-3 mb-md-5">
                <li className="mb-4">
                  <Link to="#" className="j-white">
                    週年慶！會員八折優惠！
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="#" className="j-white">
                    新用戶體驗價享九折優惠，不醉不歸！
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="#" className="j-white">
                    賀！本店榮獲2023金杯獎第一名！全店消費皆八折優惠
                    賀！本店榮獲2023金杯獎第一名！全店消費皆八折優惠
                  </Link>
                </li>
              </ul>
              <Link to="/news">
                <button className="wo-line-btn j-h3">
                  查看更多 <i className="fa-solid fa-angles-right"></i>
                </button>
              </Link>
            </div>
            <div className="news-img d-none d-lg-block">
              <img src={`/img/index-11.jpeg`} alt="" />
            </div>
          </div>
        </div>
      </section>
      <div className="pb-5"></div>

      {/* <!-- 調酒推薦 --> */}
      <section className="container-fluid">
        <div className="container">
          <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span className="col-auto title j-deepSec"> 調酒推薦</span>
            <div className="title-line d-block d-md-none"></div>
            <Link to="/seat">
              <button className="o-line-btn j-h3 d-none d-md-block">
                來喝酒 <i className="fa-solid fa-angles-right"></i>
              </button>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 justify-content-center">
            {/* card1 */}
            <div className="px-3 d-flex justify-content-center">
              <div className="cardc-1 mb-4 mb-lg-0">
                <div className="cardc-1-img mb-3">
                  <img src={`/img/index-5.jpeg`} alt="" />
                </div>
                <div className="cardc-info j-white">
                  <h4 className="mb-3">柯夢波丹</h4>
                  <h5>帶有柑橘橙香、微甜略帶酸澀，富含香甜水果香氣的調酒。</h5>
                </div>
              </div>
            </div>
            {/* card2 */}
            <div className="px-3 d-flex justify-content-center">
              <div className="cardc-2 mb-4 mb-lg-0">
                <div className="cardc-info j-white mb-3">
                  <h4 className="mb-3">飛行</h4>
                  <h5>讓你愛不釋手的酸甜花香與淡然草本香，喝了就上癮。</h5>
                </div>
                <div className="cardc-2-img">
                  <img src={`/img/index-12.jpeg`} alt="" />
                </div>
              </div>
            </div>
            {/* card3 */}
            <div className="px-3 d-flex justify-content-center">
              <div className="cardc-3 mb-4 mb-lg-0">
                <div className="cardc-3-img mb-3">
                  <img src={`/img/index-13.jpeg`} alt="" />
                </div>
                <div className="cardc-info j-white">
                  <h4 className="mb-3">莫西多</h4>
                  <h5>
                    碎冰以及薄荷加上甜甜的口感，透過新鮮薄荷的清涼引領出酒感。
                  </h5>
                </div>
              </div>
            </div>
            {/* card4 */}
            <div className="px-3 d-flex justify-content-center">
              <div className="cardc-4 mb-4 mb-lg-0">
                <div className="cardc-info j-white mb-3">
                  <h4 className="mb-3">龍舌蘭日出</h4>
                  <h5>
                    象徵著少女熱情、清純的陽光氣息，果香味加上龍舌蘭酒特有的熱烈火辣。
                  </h5>
                </div>
                <div className="cardc-4-img">
                  <img src={`/img/index-14.jpeg`} alt="" />
                </div>
              </div>
            </div>
          </div>
          {/* <Carousel /> */}
          <Link to="/seat">
            <button className="o-line-btn j-h3 d-block d-md-none w-100 mt-4">
              來喝酒 <i className="fa-solid fa-angles-right"></i>
            </button>
          </Link>
        </div>
      </section>
      <div className="pb-5"></div>

      {/* <!-- 課程 --> */}
      <section className="container-fluid">
        <div className="container">
          <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span className="col-auto title j-deepSec"> 本季課程</span>
            <div className="title-line d-block d-md-none"></div>
            <Link to="/class">
              <button className="o-line-btn j-h3 d-none d-md-block">
                學調酒 <i className="fa-solid fa-angles-right"></i>
              </button>
            </Link>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
            <div className="col">
              <div className="card card-a">
                <img
                  src={`./img/test.jpeg`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="info">
                  <h3>馬丁尼與夏夜時光特調</h3>
                  <div className="j-text j-deepSec">Wilbur</div>
                  <div className="j-text j-deepSec mb-3">3/18 16:00-18:00</div>
                  <div className="o-long-btn h3">報名</div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card-a">
                <img
                  src={`/img/test.jpeg`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="info">
                  <h3>馬丁尼與夏夜時光特調</h3>
                  <div className="j-text j-deepSec">Wilbur</div>
                  <div className="j-text j-deepSec mb-3">3/18 16:00-18:00</div>
                  <div className="o-long-btn h3">報名</div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card-a">
                <img
                  src={`./img/test.jpeg`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="info">
                  <h3>馬丁尼與夏夜時光特調</h3>
                  <div className="j-text j-deepSec">Wilbur</div>
                  <div className="j-text j-deepSec mb-3">3/18 16:00-18:00</div>
                  <div className="o-long-btn h3">報名</div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card card-a">
                <img
                  src={`/img/test.jpeg`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="info">
                  <h3>馬丁尼與夏夜時光特調</h3>
                  <div className="j-text j-deepSec">Wilbur</div>
                  <div className="j-text j-deepSec mb-3">3/18 16:00-18:00</div>
                  <div className="o-long-btn h3">報名</div>
                </div>
              </div>
            </div>
          </div>
          <Link to="/class">
            <button className="o-line-btn j-h3 d-block d-md-none w-100 mt-5">
              學調酒 <i className="fa-solid fa-angles-right"></i>
            </button>
          </Link>
        </div>
      </section>
      <div className="pb-5"></div>

      {/* <!-- 商品 --> */}
      <section className="container-fluid">
        <div className="container">
          <div className="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span className="col-auto title j-deepSec"> 精選商品</span>
            <div className="title-line d-block d-md-none"></div>
            <Link to="/product">
              <button className="o-line-btn j-h3 d-none d-md-block">
                來買酒 <i className="fa-solid fa-angles-right"></i>
              </button>
            </Link>
          </div>
          {/* <div className="row row-cols-2 row-cols-xl-3 row-cols-xxl-4 g-4 g-lg-5 g-xl-5 mt-4">
            <div className="col">
              <Link to="#/" alt="Mythrill" target="_blank">
                <div className="mycard product">
                  <div className="wrapper">
                    <img
                      src={`./img/001.webp`}
                      className="cover-image"
                      alt=""
                    />
                  </div>
                  <div className="mycard-icon">
                    <button className="icon-button btn like-btn">
                      <i
                        className="fa-regular fa-heart j-primary"
                        data-id="product-1"
                      ></i>
                    </button>
                  </div>
                  <div className="origin-color"></div>
                  <div className="mycard-title">
                    <h2 className="mb-0">商品名稱商品名稱商品名稱</h2>
                    <p className="mb-0">$2000</p>
                    <div className="d-grid gap-2 mt-0 mt-md-3">
                      <button className="btn wo-line-btn" type="button">
                        加入購物車
                      </button>
                    </div>
                  </div>
                  <img src={`/img/001.webp`} className="character" alt="" />
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="#/" alt="Mythrill" target="_blank">
                <div className="mycard product">
                  <div className="wrapper">
                    <img src={`/img/001.webp`} className="cover-image" alt="" />
                  </div>
                  <div className="mycard-icon">
                    <button className="icon-button btn like-btn">
                      <i
                        className="fa-regular fa-heart j-primary"
                        data-id="product-2"
                      ></i>
                    </button>
                  </div>
                  <div className="origin-color"></div>
                  <div className="mycard-title">
                    <h2 className="mb-0">商品名稱商品名稱商品名稱</h2>
                    <p className="mb-0">$2000</p>
                    <div className="d-grid gap-2 mt-0 mt-md-3">
                      <button className="btn wo-line-btn" type="button">
                        加入購物車
                      </button>
                    </div>
                  </div>
                  <img src={`/img/001.webp`} className="character" alt="" />
                </div>
              </Link>
            </div>
            <div className="col">
              <Link to="#/" alt="Mythrill" target="_blank">
                <div className="mycard product">
                  <div className="wrapper">
                    <img src={`/img/001.webp`} className="cover-image" alt="" />
                  </div>
                  <div className="mycard-icon">
                    <button className="icon-button btn like-btn">
                      <i
                        className="fa-regular fa-heart j-primary"
                        data-id="product-3"
                      ></i>
                    </button>
                  </div>
                  <div className="origin-color"></div>
                  <div className="mycard-title">
                    <h2 className="mb-0">商品名稱商品名稱商品名稱</h2>
                    <p className="mb-0">$2000</p>
                    <div className="d-grid gap-2 mt-0 mt-md-3">
                      <button className="btn wo-line-btn" type="button">
                        加入購物車
                      </button>
                    </div>
                  </div>
                  <img src={`/img/001.webp`} className="character" alt="" />
                </div>
              </Link>
            </div>
            <div className="col">
              <Link to="#/" alt="Mythrill" target="_blank">
                <div className="mycard product">
                  <div className="wrapper">
                    <img src={`/img/001.webp`} className="cover-image" alt="" />
                  </div>
                  <div className="mycard-icon">
                    <button className="icon-button btn like-btn">
                      <i
                        className="fa-regular fa-heart j-primary"
                        data-id="product-4"
                      ></i>
                    </button>
                  </div>
                  <div className="origin-color"></div>
                  <div className="mycard-title">
                    <h2 className="mb-0">商品名稱商品名稱商品名稱</h2>
                    <p className="mb-0">$2000</p>
                    <div className="d-grid gap-2 mt-0 mt-md-3">
                      <button className="btn wo-line-btn" type="button">
                        加入購物車
                      </button>
                    </div>
                  </div>
                  <img src={`/img/001.webp`} className="character" alt="" />
                </div>
              </Link>
            </div>
          </div> */}
          <div className="row row-cols-1 row-cols-md-2  row-cols-xl-4 g-4 g-lg-5 g-xl-5 mt-2">
            {bestProductData.slice(0, 4).map((product) => (
              <ProductCard
                key={product.product_id}
                productId={product.product_id}
                productch={product.product_ch}
                productprice={product.productprice}
                isLiked={likedProducts.includes(product.product_id)}
                productimg={`/img/001.webp`}
                onLike={handleLike}
              />
            ))}
          </div>
          <Link to="/product">
            <button className="o-line-btn j-h3 d-block d-md-none w-100">
              來買酒 <i className="fa-solid fa-angles-right"></i>
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
