import { usePopup } from '../../Public/Popup'
const { Popup, openPopup, closePopup } = usePopup() //必要const
const [popupProps, setPopupProps] = useState({}) //可用 useState 來做動態更新
const initialState = useRef(true)

openDefaultPopup(response.data.error, '前往註冊', linktoRegister)
openDefaultPopup('未選擇要登入的Gmail', '關閉', closePopup)

const openDefaultPopup = (message, btntext, fn) => {
  initialState.current = false

  // content 字串 彈窗內容
  setPopupProps({
    content: message,
    btnGroup: [
      {
        text: btntext,
        handle: fn,
      },
    ],
  })
  // openPopup()
}
useEffect(() => {
  if (initialState.current !== true) {
    openPopup() //可以直接打開pop up
  }
}, [popupProps])


<Popup {...popupProps} />

--------------------------------------

ALLDATA

const [alldata, setAlldata] = useState({
  coupondata: false,
  listdata: false,
  classdata: false,
  seatdata: false,
  mystoredata: false,
})

const getAllData = async () => {
  const getall = await axios.get(ALLDATA + '/' + myAuth.sid)
  console.log('getall.data', getall.data)
  setAlldata(getall.data)
}

useEffect(() => {
  getAllData()
}, [])


<div className="d-flex flex-column">
<button
  className="g-line-btn j-h3 mb-2 me-4"
  onClick={() => {
    navigate('/member')
  }}
>
  會員資料
</button>
{alldata.coupondata ? (
  <button
    className="g-line-btn j-h3 mb-2 me-4"
    onClick={() => {
      navigate('/member/coupon')
    }}
  >
    折價券
  </button>
) : (
  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
    折價券
  </button>
)}

{alldata.listdata ? (
  <button
    className="g-line-btn j-h3 mb-2 me-4"
    onClick={() => {
      navigate('/member/orderlist')
    }}
  >
    訂單紀錄
  </button>
) : (
  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
    訂單紀錄
  </button>
)}
{alldata.classdata ? (
  <button
    className="g-line-btn j-h3 mb-2 me-4"
    onClick={() => {
      navigate('/member/orderclass')
    }}
  >
    課程紀錄
  </button>
) : (
  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
    課程紀錄
  </button>
)}
{alldata.seatdata ? (
  <button
    className="g-line-btn j-h3 mb-2 me-4"
    onClick={() => {
      navigate('/member/booking')
    }}
  >
    訂位紀錄
  </button>
) : (
  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
    訂位紀錄
  </button>
)}
{alldata.mystoredata ? (
  <button
    className="g-line-btn j-h3 mb-2 me-4"
    onClick={() => {
      navigate('/member/mystore')
    }}
  >
    我的收藏
  </button>
) : (
  <button className="disabledbtn j-h3 mb-2 me-4 text-secondary">
    我的收藏
  </button>
)}
</div>
--------------------------------------------------
const cartPlus = localStorage.getItem('cart')
const cartPlusJSON = JSON.parse(cartPlus)
const data = { ...cartPlusJSON, mid: accountId }
console.log('data', data)

const CartAJAX = (LOGINCART, data)=>{
  axios.post(LOGINCART, data).then((response) => {
    if (response.data.success) {
      localStorage.removeItem('cart')}})
}

--------------------------------------------
if (cartPlus) {
  axios.post(LOGINCART, data).then((response) => {
    
    if (response.data.success) {
      localStorage.removeItem('cart')
      localStorage.setItem(
                'myAuth',
                JSON.stringify({ useremail, accountId, token })
              )
              setMyAuth({
                authorized: true, // 有沒有登入
                sid: accountId,
                useremail: useremail,
                token: token,
              })
              //看有沒有上一頁的url

              const presentURL = localStorage.getItem('presentURL')
              if (presentURL) {
                const lasturl = JSON.parse(presentURL)
                console.log('有presentURL', lasturl)
                window.location.href = lasturl
              } else {
                console.log('沒有presentURL', HOST)
                window.location.href = HOST
              }






    } else {
      localStorage.setItem(
        'myAuth',
        JSON.stringify({ useremail, accountId, token })
      )
      setMyAuth({
        authorized: true, // 有沒有登入
        sid: accountId,
        useremail: useremail,
        token: token,
      })
      //看有沒有上一頁的url

      const presentURL = localStorage.getItem('presentURL')
      if (presentURL) {
        const lasturl = JSON.parse(presentURL)
        console.log('有presentURL', lasturl)
        window.location.href = lasturl
      } else {
        console.log('沒有presentURL', HOST)
        window.location.href = HOST
      }
    }
  })
}
--------------------------------------------------------
const linktoSTATEURL = function () {
  const likedProducts = localStorage.getItem('likedProducts')
  const likedProductsJSON = JSON.parse(likedProducts)
  const arr = Object.keys(likedProductsJSON)
  const sendlikedata = {
    productarray: arr,
    mid: response.data.result.insertId,
  }
  if (!!likedProducts) {
    axios.post(LOGINSTORE, sendlikedata)
  }
  const cartPlus = localStorage.getItem('cart')
  const cartPlusJSON = JSON.parse(cartPlus)
  const data = {
    ...cartPlusJSON,
    mid: response.data.result.insertId,
  }
  console.log('data', data)
  if (cartPlus) {
    axios.post(LOGINCART, data).then((response) => {
      console.log('response.data', response.data)
      if (response.data.success) {
        localStorage.removeItem('cart')

        
        localStorage.setItem(
          'myAuth',
          JSON.stringify({
            useremail: registerform.email,
            accountId: response.data.result.insertId,
            token: response.data.token,
          })
        )
        setMyAuth({
          authorized: true, // 有沒有登入
          sid: response.data.result.insertId,
          useremail: registerform.email,
          token: response.data.postData.token,
        })
        navigate('/product/productdetail', {
          state: productstate,
        })
      } else {
     
        localStorage.setItem(
          'myAuth',
          JSON.stringify({
            useremail: registerform.email,
            accountId: response.data.result.insertId,
            token: response.data.token,
          })
        )
        setMyAuth({
          authorized: true, // 有沒有登入
          sid: response.data.result.insertId,
          useremail: registerform.email,
          token: response.data.postData.token,
        })
        navigate('/product/productdetail', {
          state: productstate,
        })
      }
    })
  } else {
  
    localStorage.setItem(
      'myAuth',
      JSON.stringify({
        useremail: registerform.email,
        accountId: response.data.result.insertId,
        token: response.data.token,
      })
    )
    setMyAuth({
      authorized: true, // 有沒有登入
      sid: response.data.result.insertId,
      useremail: registerform.email,
      token: response.data.postData.token,
    })
    navigate('/product/productdetail', {
      state: productstate,
    })
  }
}
 //領取優惠券走state url
            const takeTicketSTATEURL = async () => {
              console.log(
                'INSERTCOUPON+1',
                INSERTCOUPON + '/' + response.data.result.insertId + '/' + 1
              )
              const addcoupon = await axios.get(
                INSERTCOUPON + '/' + response.data.result.insertId + '/' + 1
              )
              console.log('addcoupon.data', addcoupon.data)

              openDefaultPopup(
                '新會員95折優惠券已領取',
                '一起買醉吧!!',
                linktoSTATEURL
              )
            }

----------------------
const lasturl = JSON.parse(presentURL)
            console.log('有presentURL', lasturl)

            //連到presentURL同時設定會員給context
            const linktopresentURL = function () {
              const likedProducts = localStorage.getItem('likedProducts')
              const likedProductsJSON = JSON.parse(likedProducts)
              const arr = Object.keys(likedProductsJSON)
              const sendlikedata = {
                productarray: arr,
                mid: response.data.result.insertId,
              }
              if (!!likedProducts) {
                axios.post(LOGINSTORE, sendlikedata)
              }
              const cartPlus = localStorage.getItem('cart')
              const cartPlusJSON = JSON.parse(cartPlus)
              const data = {
                ...cartPlusJSON,
                mid: response.data.result.insertId,
              }
              console.log('data', data)
              if (cartPlus) {
                axios.post(LOGINCART, data).then((response) => {
                  console.log('response.data', response.data)
                  if (response.data.success) {
                    localStorage.removeItem('cart')
                    console.log('lasturlinlinktopresentURL', lasturl)
                    localStorage.setItem(
                      'myAuth',
                      JSON.stringify({
                        useremail: registerform.email,
                        accountId: response.data.result.insertId,
                        token: response.data.token,
                      })
                    )
                    setMyAuth({
                      authorized: true, // 有沒有登入
                      sid: response.data.result.insertId,
                      useremail: registerform.email,
                      token: response.data.postData.token,
                    })
                    window.location.href = lasturl
                  } else {
                    console.log('lasturlinlinktopresentURL', lasturl)
                    localStorage.setItem(
                      'myAuth',
                      JSON.stringify({
                        useremail: registerform.email,
                        accountId: response.data.result.insertId,
                        token: response.data.token,
                      })
                    )
                    setMyAuth({
                      authorized: true, // 有沒有登入
                      sid: response.data.result.insertId,
                      useremail: registerform.email,
                      token: response.data.postData.token,
                    })
                    window.location.href = lasturl
                  }
                })
              } else {
                console.log('lasturlinlinktopresentURL', lasturl)
                localStorage.setItem(
                  'myAuth',
                  JSON.stringify({
                    useremail: registerform.email,
                    accountId: response.data.result.insertId,
                    token: response.data.token,
                  })
                )
                setMyAuth({
                  authorized: true, // 有沒有登入
                  sid: response.data.result.insertId,
                  useremail: registerform.email,
                  token: response.data.postData.token,
                })
                window.location.href = lasturl
              }
            }
            //領取優惠券
            const takeTicket = async () => {
              console.log(
                'INSERTCOUPON+1',
                INSERTCOUPON + '/' + response.data.result.insertId + '/' + 1
              )
              const addcoupon = await axios.get(
                INSERTCOUPON + '/' + response.data.result.insertId + '/' + 1
              )
              console.log('addcoupon.data', addcoupon.data)

              openDefaultPopup(
                '新會員95折優惠券已領取',
                '一起買醉吧!!',
                linktopresentURL
              )
            }

            openDefaultPopup('註冊成功', '索取優惠券', takeTicket)


            http://localhost:3002/product/productdetail
            "http://localhost:3002/class"