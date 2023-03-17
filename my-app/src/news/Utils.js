import { useContext } from 'react'
import AuthContext from '../Context/AuthContext'

export const useCheckLogin = () => {
  const { myAuth } = useContext(AuthContext)
  return new Promise((resolve, reject) => {
    if (myAuth && myAuth?.sid) {
      resolve({ isLogged: true, myAuth: myAuth })
    } else {
      resolve({ isLogged: false })
    }
  })
}
