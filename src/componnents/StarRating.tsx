import '../styles/StarRating.css'
import { Rating } from '../enum';

const StarRating = ({ rating } :Rating) => {
  const maxStars = 5; 
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  // Created an array of star elements based on the rating
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={i} className="fa fa-star filled"></i>);
  }
  if (hasHalfStar) {
    stars.push(<i key="half" className="fa fa-star-half filled"></i>);
  } 
  const emptyStars = maxStars - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i key={`empty-${i}`} className="fa fa-star-o"></i>);
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
