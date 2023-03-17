import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../Context/AuthContext'

import './css/member.css'
// import '../Public/style'
// import Test_2 from '../test/Test_2'
import Test from '../test/Test'
import Booking from './memberpages/Booking'
import Coupon from './memberpages/Coupon'
import Data from './memberpages/Data'
import Edit from './memberpages/Edit'
import Mystore from './memberpages/Mystore'
import Orderlist from './memberpages/Orderlist'
import Mainlayout from '../Layout/Mainlayout/Mainlayout'
import Login from './memberpages/Login'
import Register from './memberpages/Register'
import OrderClass from './memberpages/OrderClass'
import Popupdemo from './memberpages/Popdemo'
import Verify from './memberpages/Verify'
import Newpassword from './memberpages/Newpassword'
import Home from '../home/Home'

function Member() {
  const { myAuth } = useContext(AuthContext)
  if (myAuth.authorized) {
    return (
      <>
        {/* 判斷是否有登入 */}
        <Routes>
          <Route path="/" element={<Mainlayout />}>
            <Route index element={<Data />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/coupon" element={<Coupon />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/mystore" element={<Mystore />} />
            <Route path="/orderlist" element={<Orderlist />} />
            <Route path="/orderclass" element={<OrderClass />} />
            <Route path="/popdemo" element={<Popupdemo />} />
            <Route path="/login" element={<Home />} />
            <Route path="/register" element={<Home />} />
            <Route path="/newpassword" element={<Home />} />
          </Route>
        </Routes>
      </>
    )
  } else {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/newpassword" element={<Newpassword />} />
      </Routes>
    )
  }
}

export default Member
