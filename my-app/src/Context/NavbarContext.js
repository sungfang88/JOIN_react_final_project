import { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { NAVBARCART } from '../member/membercomponents/memberapi_config'
import AuthContext from './AuthContext'

import axios from 'axios'
const NavbarContext = createContext({})

export default NavbarContext

export const NavbarContextProvider = ({ children }) => {
  const { myAuth } = useContext(AuthContext)

  const [cartlistnum, setCartlistnum] = useState(0)
  const getcartlistnumber = async () => {
    const getcart = await axios.get(NAVBARCART + '/' + myAuth.sid)
    console.log('getcart.data', getcart.data)
    setCartlistnum(getcart.data)
  }
  useEffect(() => {
    getcartlistnumber()
  }, [])

  return (
    <NavbarContext.Provider value={{ cartlistnum, getcartlistnumber }}>
      {children}
    </NavbarContext.Provider>
  )
}
