import notFound from '../images/404.png'
export default function NotFound(){
    return(
        <div className="page notFound">
            <div className="notFoundContent">
                <h1>page was not found!</h1>
                <img className='notFoundImage' src={notFound} alt="notFound" />
            </div>
        </div>
    )
}