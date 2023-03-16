import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext({})

export default AuthContext

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate()

  //預設為沒登入
  const unAuth = {
    authorized: false, // 有沒有登入
    sid: 0,
    useremail: '',
    token: '',
  }
  let initAuth = { ...unAuth }

  //看localStorage有沒有myAuth這個屬性
  const str = localStorage.getItem('myAuth')

  if (str) {
    const localAuth = JSON.parse(str)
    try {
      if (localAuth.token && localAuth.useremail) {
        initAuth = {
          authorized: true,
          sid: localAuth.accountId,
          useremail: localAuth.useremail,
          token: localAuth.token,
        }
      }
    } catch (error) {}
  }

  const logout = () => {
    localStorage.removeItem('myAuth')
    setMyAuth(unAuth)
    navigate('/')
  }

  const [myAuth, setMyAuth] = useState(initAuth)

  return (
    <AuthContext.Provider value={{ myAuth, setMyAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
