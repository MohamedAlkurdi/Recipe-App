import emptyPlate from '../images/hunger.png'
export default function Empty(){
    return(
        <div className="empty page">
            <div className="content">
            <h1>yout favorite food list is empty</h1>
            <img src={emptyPlate} alt="empty plate" />   
            </div>
        </div>
    )
}