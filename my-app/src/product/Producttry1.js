import React from 'react'
import { Link } from 'react-router-dom'

function Producttry1() {
  return (
    <>
      <Link to="/product/producttry2" state={{ name: 'abc', price: '123' }}>
        here
      </Link>
    </>
  )
}

export default Producttry1
