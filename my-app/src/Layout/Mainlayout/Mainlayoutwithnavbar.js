import React from 'react'
// 登入版本


// 未登入版本
// import Navbar from '../../Public/Navbar'

import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function Mainlayoutwithnavbar() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}

export default Mainlayoutwithnavbar
