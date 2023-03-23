import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './Public/style'
import Home from './home/Home'
import Test_cartanima from './test/Test_cartanima'
import Cart from './cart/Cart'
import Class from './class/Class'
import News from './news/News'
import Member from './member/Member'
import Product from './product/Product'
import Seat from './seat/Seat'
import Mainlayout from './Layout/Mainlayout/Mainlayout'
import Mainlayoutwithnavbar from './Layout/Mainlayout/Mainlayoutwithnavbar'

// 如果要測試登入，把下面這行註解拿掉
import { AuthContextProvider } from './Context/AuthContext'
import { NavbarContextProvider } from './Context/NavbarContext'

// import Test_3 from './test/Test_3'

function App() {
  // const {isAuth} = useContext(AuthContext)

  return (
    <>
      {/* 把下方的Test_2 改成自己的js檔案 */}
      {/* 最後使用yarn start就可以了 */}
      <Router>
        <AuthContextProvider>
          <NavbarContextProvider>
            <Routes>
              <Route path="/" element={<Mainlayoutwithnavbar />}>
                <Route index element={<Home />} />
              </Route>

              <Route element={<Mainlayout />}>
                {/* <Route index element={<Test_2 />} /> */}
                <Route path="/cart/*" element={<Cart />} />
                <Route path="/class/*" element={<Class />} />
                <Route path="/news/*" element={<News />} />
                <Route path="/product/*" element={<Product />} />
                <Route path="/seat/*" element={<Seat />} />
              </Route>

              {/* <Route path="/member/*" element={isAuth ? <Member />:<NoLogin />} /> */}
              <Route path="/member/*" element={<Member />} />
              {/* <Route path="/member/logout" element={<Member />} /> */}
            </Routes>
          </NavbarContextProvider>
        </AuthContextProvider>
      </Router>
    </>
  )
}

export default App
