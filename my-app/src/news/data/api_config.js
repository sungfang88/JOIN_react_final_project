export const HOST = 'http://127.0.0.1:3008'

//news
export const FETCH_NEWS_LIST = `${HOST}/news/getList`
export const GET_NEWS_DETAIL = `${HOST}/news/getDetail`

//coupon
export const GET_CHECKIN_RECORDS = `${HOST}/coupon/getCheckinRecords`
export const POST_DOCHECKIN = `${HOST}/coupon/doCheckin`
export const POST_PROCESS_WHEEL = `${HOST}/coupon/processWheel`
export const GET_WHEEL_RECORDS = `${HOST}/coupon/getWheelRecords`
