import goldenStar from '../images/filledStar.png';
import emptyStar from '../images/emptyStar.png';

import header from '../images/header.png'
export default function Card({props}){
    const {src,testimonial,stars} = props;
    const starsArray = [];
        const emptyStars = 5 - stars;
        for(let j = 0;j<stars;j++){
            starsArray.push(<li className='star godenStar'><img src={goldenStar} alt='star'/></li>)
        }
        for(let k=0;k<emptyStars;k++){
            starsArray.push(<li className='star emptyStar'><img src={emptyStar} alt='star'/></li>)
        }

    return(
        <li className="card">
            <div className="imageSection">
            <img className='reviwerImage' src={src} alt="reviwerImage" />
            </div>
            <div className="content">
            <p><img className='start' src={header} alt="" /> {testimonial} <span className='end' >//</span></p>
            </div>
            <div className="stars">
                <ul className='startContainer'>
                {starsArray}
                </ul>
            </div>
        </li>
    )
}