// 收藏按鈕

import React, { useRef, useState, useEffect } from 'react'

export function LikeButton() {
  const [isLiked, setIsLiked] = useState(false)
  const heartIconRef = useRef(null)
  const productId = heartIconRef.current
    ? heartIconRef.current.dataset.id
    : null

  useEffect(() => {
    if (localStorage.getItem(productId) !== null) {
      setIsLiked(true)
    }
  }, [productId])

  const handleClick = (event) => {
    event.preventDefault()
    if (isLiked) {
      localStorage.removeItem(productId)
      setIsLiked(false)
    } else {
      localStorage.setItem(productId, true)
      setIsLiked(true)
    }
  }

  const handleMouseEnter = () => {
    if (!isLiked) {
      heartIconRef.current.classList.remove('fa-regular')
      heartIconRef.current.classList.add('fa-solid')
    }
  }

  const handleMouseLeave = () => {
    if (!isLiked) {
      heartIconRef.current.classList.remove('fa-solid')
      heartIconRef.current.classList.add('fa-regular')
    }
  }

  return (
    <button
      className={`like-btn ${isLiked ? 'is-liked' : ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <i
        className={`fa-heart${isLiked ? '-solid' : '-regular'}`}
        data-id={productId}
        ref={heartIconRef}
      ></i>
    </button>
  )
}

export function Dropdown() {
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dropdownRef.current
          .querySelector('.dropdown-menu')
          .classList.remove('show')
        dropdownRef.current
          .querySelector('.dropdown-toggle')
          .classList.remove('active')
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [dropdownRef])

  function handleToggleClick() {
    const dropdownMenu = dropdownRef.current.querySelector('.dropdown-menu')
    const dropdownToggle = dropdownRef.current.querySelector('.dropdown-toggle')
    dropdownMenu.classList.toggle('show')
    dropdownToggle.classList.toggle('active')
  }

  function handleItemClick(event) {
    const dropdownLabel = dropdownRef.current.querySelector('.dropdown-label')
    const dropdownMenu = dropdownRef.current.querySelector('.dropdown-menu')
    const dropdownToggle = dropdownRef.current.querySelector('.dropdown-toggle')
    const selectedValue = event.target.getAttribute('data-value')
    dropdownLabel.textContent = event.target.textContent
    dropdownRef.current.querySelector('input[type="hidden"]').value =
      selectedValue
    dropdownMenu.classList.remove('show')
    dropdownToggle.classList.remove('active')
  }

  return (
    <div ref={dropdownRef} className="dropdown">
      <button
        type="button"
        className="dropdown-toggle"
        onClick={handleToggleClick}
      >
        Dropdown
      </button>
      <ul className="dropdown-menu">
        <li onClick={handleItemClick} data-value="1">
          Option 1
        </li>
        <li onClick={handleItemClick} data-value="2">
          Option 2
        </li>
        <li onClick={handleItemClick} data-value="3">
          Option 3
        </li>
      </ul>
      <input type="hidden" name="dropdown-value" />
      <span className="dropdown-label">Dropdown</span>
    </div>
  )
}
