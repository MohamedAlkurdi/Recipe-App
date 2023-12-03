import dish from '../images/dinner.png'
export default function Loading(){
    return(
        <div className="loading page">
            <div className="animatedDish"><img src={dish} alt="foodDish" /></div>
            <h1>Loading...</h1>
        </div>
    )
}