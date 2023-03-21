export const HOST = 'http://127.0.0.1:3008'

//news
export const FETCH_NEWS_LIST = `${HOST}/news/getList`
export const GET_NEWS_DETAIL = `${HOST}/news/getDetail`

//coupon
export const GET_CHECKIN_RECORDS = `${HOST}/coupon/getCheckinRecords`
export const POST_DOCHECKIN = `${HOST}/coupon/doCheckin`
export const POST_PROCESS_WHEEL = `${HOST}/coupon/processWheel`
export const GET_WHEEL_RECORDS = `${HOST}/coupon/getWheelRecords`
export const POST_INSERT_COUPON = `${HOST}/coupon/insertCoupon`
export const GET_COUPON = `${HOST}/coupon/getCoupon`
export const GET_COUPON_MEM = `${HOST}/coupon/getCouponWithMember`

export const CHECKIN_COUPON_ARR = [17, 18, 19, 20]
export const TURNTABLE_COUPON_ARR = [2, 3, 4, 5, 15]
