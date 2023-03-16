import React from 'react'
// 登入版本
import Navbar from './Navbar'

// 未登入版本
// import Navbar from '../../Public/Navbar'

import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function Mainlayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Mainlayout
