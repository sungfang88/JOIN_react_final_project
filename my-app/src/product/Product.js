import { Routes, Route } from 'react-router-dom'
import React from 'react'
import { useContext } from 'react'
import AuthContext from '../Context/AuthContext'

import Productdetail from './Productdetail'
import Producttry1 from './Producttry1'
import Producttry2 from './Producttry2'
import Producttry3 from './Producttry3'
import Index from './Index'
// import './css/product.css'

function Product() {
  // const { myAuth } = useContext(AuthContext)
  // if (myAuth.authorized) {
  return (
    <>
      {/* 判斷是否有登入 */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/productdetail" element={<Productdetail />} />
        <Route path="/Producttry3" element={<Producttry3 />} />
      </Routes>
    </>
    //   )
    // } else {
    //   return (
    //     <Routes>
    //       <Route path="/" element={<Index />} />
    //       <Route path="/productdetail" element={<Productdetail />} />
    //     </Routes>
  )
  // }
}

export default Product
