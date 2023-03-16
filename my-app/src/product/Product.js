import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Productdetail from './Productdetail'
import Producttry1 from './Producttry1'
import Producttry2 from './Producttry2'
import Producttry3 from './Producttry3'
import Index from './Index'
// import './css/product.css'

function Product() {
  return (
    <>
      {/* 定義子路徑的路由 */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/productdetail" element={<Productdetail />} />
        <Route path="/producttry1" element={<Producttry1 />} />
        <Route path="/producttry2" element={<Producttry2 />} />
        <Route path="/producttry3" element={<Producttry3 />} />
      </Routes>
    </>
  )
}

export default Product
