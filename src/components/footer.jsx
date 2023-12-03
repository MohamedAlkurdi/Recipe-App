import { Link } from 'react-router-dom'
import api from '../images/logo-small.png'
import flaction from '../images/flaction1.png'
import '../App.css'
export default function Footer(){
    return(
        <footer className="footer">
        <div className="upperFooter">
            <div className="credits">
                <a target='blank' href="https://www.themealdb.com/api.php" alt="api">
                <img src={api} alt="" />
                </a>
                <a target='blank' href="https://www.themealdb.com/api.php" alt="api">
                <img src={flaction} alt="" />
                </a>
            </div>
            <div className="footerNvigation">
            <div className="linksLeftSide linksSide">
            <Link className='footerLink' to={'/'}>Home</Link>
            <Link className='footerLink' to={'/recipesList'}>Food menu</Link>
            <Link className='footerLink' to={'/foodTour'}>Tour tour</Link>
            </div>
            <div className="linksRightSide linksSide">
            <Link className='footerLink' to={'/fav'}>Favorate</Link>
            <Link className='footerLink' to={'/contact'}>Contact</Link>
            <Link className='footerLink' to={'/signup'}>Subsecribe</Link>
            </div>
            </div>
        </div>
        <hr style={{backgroundColor:"white",height:"2px",width:"100%"}} />
        <div className="media">
        <a target='blank' href="https://www.facebook.com/profile.php?id=100012475842352"><i class="fa-brands fa-square-facebook"></i></a>
        <a target='blank' href="https://twitter.com/muhammed_he"><i class="fa-brands fa-square-twitter"></i></a>
        <a target='blank' href="https://www.instagram.com/muhammed.alkurdi.he/"><i class="fa-brands fa-instagram"></i></a>
        <a target='blank' href="https://www.linkedin.com/in/mohamed-alkurdi-5b97b3243/"><i class="fa-brands fa-linkedin"></i></a>
        <a target='blank' href="https://github.com/MohamedAlkurdi?tab=repositories"><i class="fa-brands fa-square-github"></i></a>
        </div>
        <h3 className="footerFooter">&reg; all raights are reserved for the developer mohamed alkurdi</h3>
        </footer>
    )
}