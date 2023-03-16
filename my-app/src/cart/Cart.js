//路由
import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Cartsec from './Cartsec'
import Index from './Index'
import Cartthird from './Cartthird'
import Classsec from './Classsec'
import AutoScrollToTop from './components/AutoScrollToTop'
import './css/Cart.css'
import Classfirst from './Classfirst'

function Cart() {
  return (
    <>
      {/* 定義子路徑的路由 */}
      <AutoScrollToTop>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* 主頁 */}
          <Route path="/cart02" element={<Cartsec />} />
          <Route path="/cart03" element={<Cartthird />} />
          <Route path="/classOrder01" element={<Classfirst />} />
          <Route path="/classOrder02" element={<Classsec />} />
        </Routes>
      </AutoScrollToTop>
    </>
  )
}

export default Cart
