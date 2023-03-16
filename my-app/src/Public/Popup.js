import React, { useCallback, useMemo, useState } from 'react'
import './css/popup.css'

// export default Popup
export const usePopup = (initialState = false) => {
  const [showPopup, setShowPopup] = useState(initialState)
  const openPopup = useCallback(() => {
    // console.log('openPopup');
    setShowPopup(true)
  }, [])

  const closePopup = useCallback(() => {
    // console.log('closePopup');
    setShowPopup(false)
  }, [])

  const Popup = useMemo(() => {
    const PopupComponent = ({
      content = '',
      icon = <i className="fa-solid fa-circle-exclamation"></i>,
      btnGroup = [
        {
          text: '關閉',
          handle: closePopup,
        },
      ],
    }) => {
      return (
        <section
          className={`container-fluid ${
            showPopup ? 'popup-background' : 'd-none'
          }`}
        >
          <div className="container">
            <div className="check-popup j-h3">
              <div className="popup-content">
                <div className="popup-font">{icon}</div>
                <h2 className="mb-4">{content}</h2>
                {btnGroup &&
                  btnGroup.map((btn) => {
                    const { text, handle } = btn
                    return (
                      <button
                        className="wo-line-btn j-h4 m-1"
                        key={text}
                        onClick={handle}
                      >
                        {text}
                      </button>
                    )
                  })}
              </div>
            </div>
          </div>
        </section>
      )
    }
    return PopupComponent
  }, [showPopup, closePopup])
  return {
    Popup,
    openPopup,
    closePopup,
  }
}
