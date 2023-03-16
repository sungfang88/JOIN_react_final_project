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