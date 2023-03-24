import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faLine } from '@fortawesome/free-brands-svg-icons'
import { usePopup } from '../Public/Popup'

function ShareLink(props) {
  const { Popup, openPopup, closePopup } = usePopup()
  const copylink = `http://localhost:3002/product/productdetail/${props.productId}`
  console.log(copylink)
  const clickbooks = () => {
    navigator.clipboard.writeText(copylink)
  }
  const charetoline = () => {
    window.location.href = `https://line.me/R/msg/text/?${encodeURIComponent(
      copylink
    )}`
  }
  const handleClosePopup = () => {
    closePopup()
  }
  return (
    <>
      <Popup
        content={`已成功複製連結`
          .replace(/<br>/g, '\n')
          .replace(/<\/?[^>]+>/gi, '')}
        btnGroup={[{ text: 'ok', handle: handleClosePopup }]}
        icon={<i className="fa-solid fa-circle-check"></i>}
      />
      {/* <div className="pt-3"> */}
      {/* <span>分享到: </span> */}
      <button
        className="no-line-btn btn ms-3"
        onClick={() => {
          clickbooks()
          openPopup()
        }}
      >
        <FontAwesomeIcon icon={faLink} className="j-deepSec h2" />
      </button>
      <button className="no-line-btn btn" onClick={charetoline}>
        <FontAwesomeIcon icon={faLine} className="j-deepSec h2" />
      </button>
      {/* </div> */}
    </>
  )
}

export default ShareLink
