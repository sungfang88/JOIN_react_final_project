import React, { useState } from 'react'
import './css/Class.css'
import { Link } from 'react-router-dom'

function Index() {
  return (
    <>
      {/* <!-- Sec-navbar 要用nav-space 空出上面的距離 --> */}
      <section class="container-fluid nav-space pt-md-0">
        <div class="container  nav-space d-flex flex-column-reverse flex-md-row align-items-center py-5">
          <div class="col order-1 order-md-2 ">
            <div class="px-md-5 pt-md-2">
              <h1 class="j-h1 j-deepSec">輕鬆學調酒課</h1>
              <h2 class="j-h2 j-primary">$2400</h2>
              <p class="j-deepGray">課程時間：約3小時</p>
              <br />
              <p class="j-deepGray">課程組合：</p>
              <p class="j-deepGray">組合A： 馬丁尼、尼格羅尼、bartander特調 </p>
              <p class="j-deepGray">
                組合B： 柯夢波丹、長島冰茶、bartander特調{' '}
              </p>
              <p class="j-deepGray">組合C： Mojito、瑪格麗特、bartander特調 </p>
              <p class="j-deepGray">組合D： 自選、自選、bartander特調 </p>
              <div class="col-auto">
                <Link class="o-long-btn j-h3" to="/class/Classsec">
                  報名
                </Link>
              </div>
            </div>
          </div>
          <div class="col order-2 order-md-1 container">
            <img src={`/img/1.png`} alt="1" width="100%" />
          </div>
        </div>

        <div class="container py-5">
          <div class="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span class="col-auto title j-deepSec">課程特色</span>
            <div class="title-line d-block d-md-none"></div>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-md-6 order-md-2 mb-4 mb-md-0">
                <img src={`/img/2.png`} alt="2" class="img-fluid" />
              </div>
              <div class="col-md-6 order-md-1">
                <h2 class="j-primary">架構化的學習脈絡：</h2>

                <h3 class="text-justify j-deepGray lh-lg">
                  從六大基酒與經典調酒開始
                  調酒世界中最常使用的基礎風味酒（簡稱基酒）可分成6大類，包括伏特加、琴酒、蘭姆酒、龍舌蘭、威士忌、白蘭地。在課程中，幫助學生提升味覺和嗅覺的認知和靈敏度，透過6大基酒的特色，讓學生系統化建立起對6大基酒的認識。透過練習，學生可以熟悉和辨識出不同的酒類風味。
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="container  py-5">
          <div class="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span class="col-auto title j-deepSec">課程介紹</span>
            <div class="title-line d-block d-md-none"></div>
          </div>
          <div class="mb-3  container py-1">
            <div class="row g-0 md-d-flex align-items-md-center justify-content-md-center flex-column-md-reverse">
              <div class="col text-center class-bg ">
                <p class="j-h1 j-primary">
                  LESSON 1 <br />
                  課程介紹&器材介紹
                </p>
                <p class="j-h3 j-deepGray">
                  課程章節介紹 <br />
                  調酒器材使用介紹&酒杯介紹
                </p>
              </div>
            </div>
            <div class="col text-center pt-3">
              <img src={`/img/3-1.png`} alt="3-1" class="img-fluid" />
            </div>
          </div>

          <div class=" mb-3  container py-1">
            <div class="row g-0 md-d-flex align-items-md-center justify-content-md-center flex-column-md-reverse">
              <div class="col text-center class-bg ">
                <p class="j-h1 j-primary text-center ">
                  LESSON 2 <br />
                  介紹6大基本酒
                </p>
                <p class="j-h3 j-deepGray  text-center">
                  伏特加 Vodka 蘭姆酒 Rum
                </p>
                <p class="j-h3 j-deepGray  text-center">
                  琴酒 Gin 龍舌蘭 Tequila
                </p>
                <p class="j-h3 j-deepGray  text-center">
                  威士忌 Whiskey 白蘭地 Brandy
                </p>
              </div>
            </div>
            <div class="col text-center pt-3">
              <img src={`/img/4-1.png`} alt="4-1" class="img-fluid" />
            </div>
          </div>
          <div class=" mb-3  container py-1">
            <div class="row g-0 md-d-flex align-items-md-center justify-content-md-center flex-column-md-reverse">
              <div class="col text-center class-bg ">
                <p class="j-h1 j-primary text-center ">
                  LESSON 3 <br />
                  基本調酒技巧介紹
                </p>
                <p class="j-h3 j-deepGray  text-center">漂浮 Float 攪拌 Stir</p>
                <p class="j-h3 j-deepGray  text-center">
                  搖盪 Shake 滾動 Rolling
                </p>
                <p class="j-h3 j-deepGray  text-center">
                  搗碎 Muddle 攪拌機攪拌 Blend
                </p>
              </div>
            </div>
            <div class="col text-center pt-3">
              <img src={`/img/5-1.png`} alt="5-1" class="img-fluid" />
            </div>
          </div>
          <div class=" mb-3 container py-1">
            <div class="row g-0 md-d-flex align-items-md-center justify-content-md-center flex-column-md-reverse">
              <div class="col text-center class-bg ">
                <p class="j-h1 j-primary text-center ">
                  LESSON 4 <br />
                  DIY 動手玩調酒
                </p>
                <p class="j-h3 j-deepGray  text-center">
                  親手做出屬於你的味道調酒 <br />
                  透過老師教得做出自己的調酒
                </p>
              </div>
            </div>
            <div class="col text-center pt-3">
              <img src={`/img/6-1.png`} alt="6-1" class="img-fluid" />
            </div>
          </div>
        </div>

        <div class="container py-5">
          <div class="title-box d-flex flex-column flex-md-row align-items-center justify-content-md-between">
            <span class="col-auto title j-deepSec">購買須知</span>
            <div class="title-line d-block d-md-none"></div>
          </div>
          <div class="purchase">
            <ul>
              <li class="j-h3">
                當參加人數未達上述規定的最少人數時，將取消課程，於上課前 2
                天發出取消 Email 通知。
              </li>
              <li class="j-h3">參加者必須年滿18歲才能參加此活動</li>
              <li class="j-h3">只有付費的參與者才能進入場地</li>
              <li class="j-h3">請隨身攜帶身分證件，以利進行身分以及年齡查驗</li>
            </ul>
          </div>
          <div class=" d-flex justify-content-center">
            <Link class="o-long-btn j-h3 " to="/class/Classsec">
              報名課程
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Index
