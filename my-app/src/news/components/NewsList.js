import React from 'react'
import NewsItem from './NewsItem'
import { ListMotionContainer, ListMotionItem } from './ListMotion'

function NewsList({ NewsListData=[] }) {


  if(NewsListData.length==0) return <></> 

  return (
    <>
    {/* {console.log('render')} */}
      <ListMotionContainer
        element="div"
        className="row row-cols-1 row-cols-md-2  row-cols-xl-4 g-4"
      >
        {NewsListData.map((item) => {
          const {
            itemId,
            imgSrc,
            title,
            date,
            btnUrl,
            btnText,
            content,
            cate,
          } = item
          return (
            <ListMotionItem
              element="div"
              type="up"
              className="col"
              key={itemId}
            >
              <NewsItem
                itemId={itemId}
                imgSrc={imgSrc}
                title={title}
                date={new Date(date).toJSON().slice(0, 10)}
                btnUrl={btnUrl}
                btnText={btnText}
                content={content}
                cate={cate}
              />
            </ListMotionItem>
          )
        })}
      </ListMotionContainer>
    </>
  )
}

export default NewsList
