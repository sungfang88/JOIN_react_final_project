import React, { useState, useEffect } from 'react'
import Cartanima from '../Public/Cartanima'

function Test_cartanima() {
  const [cartAni, setCartani] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCartani(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, cartAni)
  return (
    <>
      <button onClick={() => setCartani(true)}>按下我</button>
      {cartAni ? <Cartanima text={'訊息'} /> : null}
    </>
  )
}

export default Test_cartanima
