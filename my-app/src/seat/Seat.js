import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Booking from './Booking'
import Index from './Index'
import Confirm from './Confirm'
import AutoScrollToTop from './AutoScrollToTop'
// import './css/Seat.css'

function Seat() {
  return (
    <>
      {/* 定義子路徑的路由 */}
      <AutoScrollToTop>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/book-seat" element={<Booking />} />
          <Route path="/confirm-seat/:sid" element={<Confirm />} />
        </Routes>
      </AutoScrollToTop>
    </>
  )
}

export default Seat
