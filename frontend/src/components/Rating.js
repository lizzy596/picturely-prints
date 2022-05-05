import { FaRegStar, FaRegStarHalf} from 'react-icons/fa'
import { ImStarFull, ImStarHalf, ImStarEmpty } from 'react-icons/im'

const Rating = ({value, text}) => {

    const style = { color: "yellow" }
  return (
    <div className="rating">
    <div>
    <span>{value >= 1 ? <ImStarFull style={style} size={24} /> : value >= 0.5 ? <ImStarHalf  style={style} size={24}/> : <ImStarEmpty  style={style} size={24} />}</span>
    <span>{value >= 2 ? <ImStarFull style={style} size={24} /> : value >= 1.5 ? <ImStarHalf  style={style} size={24}/> : <ImStarEmpty  style={style} size={24} />}</span>
    <span>{value >= 3 ? <ImStarFull style={style} size={24} /> : value >= 2.5 ? <ImStarHalf  style={style} size={24}/> : <ImStarEmpty  style={style} size={24} />}</span>
    <span>{value >= 4 ? <ImStarFull style={style} size={24} /> : value >= 3.5 ? <ImStarHalf  style={style} size={24}/> : <ImStarEmpty  style={style} size={24} />}</span>
    <span>{value >= 5 ? <ImStarFull style={style} size={24} /> : value >= 4.5 ? <ImStarHalf  style={style} size={24}/> : <ImStarEmpty  style={style} size={24} />}</span>
    </div>
    <div>
    <span className="rating-text">{text}</span>
    </div>



  




  
   
    </div>
  )
}

export default Rating