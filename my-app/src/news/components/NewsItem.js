import React from 'react'
import { Link } from 'react-router-dom'

function NewsItem({
  itemId,
  imgSrc,
  title,
  date,
  btnUrl,
  btnText,
  content,
  cate,
}) {
  return (
        <div className="card card-a">
          <img
            src={`http://localhost:3008/news_img/${imgSrc}`}
            className="card-img-top"
            alt="messageImage"
          />
          <div className="info">
            <h3>{title}</h3>
            <div className="j-text j-deepSec">{date}</div>
            <div className="j-text j-deepSec mb-3 text-truncate">{content}</div>
            <Link to={`Detail/${itemId}`}>
              <div className="o-long-btn h3">查看內容</div>
            </Link>
          </div>
        </div>
  )
}

export default NewsItem
