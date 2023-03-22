import React, { useState, useEffect } from 'react'

import Loadingnoball from '../Public/Loadingnoball'
import Loading from '../Public/Loading'

function Test_loading() {
  const [loadingOne, setLoadingOne] = useState(false)

  // 下方isLoading示範未抓到資料前將持續動畫
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingOne(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 下方fetchData示範未抓到資料前將持續動畫
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3008/product/api/allproduct')
      const data = await res.json()
    }
    fetchData()
    // 如果想看資料沒抓到的樣子，可以把下面的setIsLoading(true)註解掉
    setIsLoading(true)
  }, [])
  return (
    <>
      {/* 動畫執行只執行一次 */}
      {loadingOne ? '' : <Loadingnoball />}

      {/* 如果上方的 fetchData沒有抓到資料，則會持續進行*/}
      {isLoading ? '' : <Loadingnoball />}
      <div style={{ height: '100vh' }}>Test_loading無球版</div>
    </>
  )
}

export default Test_loading
