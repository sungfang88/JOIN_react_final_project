import { useContext, useCallback } from 'react'
import AuthContext from '../Context/AuthContext'

export const useUtils = () => {
  const { myAuth } = useContext(AuthContext)
  const checkLogin = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (myAuth && myAuth?.sid) {
        resolve({ isLogged: true, myAuth: myAuth })
      } else {
        resolve({ isLogged: false })
      }
    })
  }, [myAuth])

  const setUpPopup = useCallback((setPopupProps, popupProps) => {
    return new Promise((resolve, reject) => {
      setPopupProps(popupProps)
      resolve(true)
    })
  }, [])
  return { checkLogin, setUpPopup }
}
