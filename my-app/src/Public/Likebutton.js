import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'

function LikeButton(props) {
  const { productId, isLiked, onClick, onMouseEnter, onMouseLeave } = props

  const handleMouseEnter = (e) => {
    if (!isLiked) {
      e.target.classList.remove('fa-regular')
      e.target.classList.add('fa-solid')
    }
  }

  const handleMouseLeave = (e) => {
    if (!isLiked) {
      e.target.classList.remove('fa-solid')
      e.target.classList.add('fa-regular')
    }
  }

  return (
    <FontAwesomeIcon
      icon={isLiked ? solidHeart : faHeart}
      onClick={onClick}
      onMouseEnter={onMouseEnter || handleMouseEnter}
      onMouseLeave={onMouseLeave || handleMouseLeave}
      className="j-primary"
    />
  )
}

export default LikeButton
