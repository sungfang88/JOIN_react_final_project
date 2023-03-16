import React from 'react'
import { useLocation, Link } from 'react-router-dom'

function Producttry2() {
  const location = useLocation()
  const state = location.state

  console.log(state)
  console.log(state.price)
  return <div>{state.price}</div>
}

export default Producttry2
