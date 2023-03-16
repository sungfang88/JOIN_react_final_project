import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Detail from './Detail'
import Index from './Index'
import Turntable from './Turntable'
import CheckIn from './CheckIn'
import Coupon from './Coupon'
import Popupdemo from './Popupdemo'

function News() {
  return (
    <>
      {/* 定義子路徑的路由 */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Detail/:itemId" element={<Detail />} />
        <Route path="/Turntable" element={<Turntable />} />
        <Route path="/CheckIn" element={<CheckIn />} />
        <Route path="/Coupon" element={<Coupon />} />
        <Route path="/Popupdemo" element={<Popupdemo />} />
      </Routes>
    </>
  )
}

export default News
