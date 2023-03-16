import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Index from './Index'
import Classsec from './Classsec'
import Classbt from './Classbt'
import Classday from './Classday'
import Classpeople from './Classpeople'
import AutoScrollToTop from './AutoScrollToTop'

// import './css/product.css'

function Class() {
  return (
    <>
      {/* 定義子路徑的路由 */}
      <AutoScrollToTop>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Classsec" element={<Classsec />} />
          <Route path="/Classbt" element={<Classbt />} />
          <Route path="/Classday" element={<Classday />} />
          <Route path="/Classpeople" element={<Classpeople />} />
        </Routes>
      </AutoScrollToTop>
    </>
  )
}

export default Class
