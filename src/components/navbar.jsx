import logo from '../images/logo.png'
import { NavLink,Link} from "react-router-dom";
import SearchBar from './searchBar';
import { useEffect, useState } from 'react';

export default function Navbar(){
    const [visible,setVisible] = useState(false)
    const [mobileNavVis,setMobileNavVis] = useState(false);

    function handleSubsecribeBtn(){
        setVisible(prev => !prev)
    }
    function handleMobileNavVisibility(){
        setMobileNavVis(prev=>!prev);
    }
    useEffect(() => {
        document.addEventListener('click',(e)=>{
            e.stopPropagation()
            let target= e.target.classList.value
            if(target !== 'loginOption active' && target !== 'subsecribeBtn'){
                setVisible(false)
            }
        })
      }, []);
      function handleClosingMobileFav(){
        setMobileNavVis(false);
      }
return(
    <div className="navbar">
        <Link to={'/'} className="appLogo flex-1">
            <img src={logo} alt="logo" />
            <p className='logoLabel'>
                <span>Recipes</span>
                <span>Manager</span>
                </p>
        </Link>
        <div className="searchBarMeadiaController flex-2">
        <SearchBar/>
        </div>
        <div className="links flex-3">
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/recipesList'}>List</NavLink>
        <NavLink to={'/foodTour'}>Tour</NavLink>
        <NavLink to={'/fav'}>Favorate</NavLink>
        <NavLink to={'/contact'}>Contact</NavLink>
        <div className="subsecribe">
            <button onClick={handleSubsecribeBtn} className='subsecribeBtn'>Subsecribe<i class="fa-solid fa-chevron-down"></i></button>
            <div className="loginOptions" style={{display:visible?'flex':'none'}}>
            <NavLink className={'loginOption'} to={'/login'}>Login</NavLink>
            <NavLink className={'loginOption'} to={'/signup'}>Sing Up</NavLink>
            </div>
        </div>
        <button onClick={handleMobileNavVisibility} className='mobileNavigationBtn'><i class="fa-solid fa-bars"></i></button>
        </div>
        <div style={{display:mobileNavVis?'flex':'none'}} className="mobileNav">
        <div className='mobileSearchBarMeadiaController '>
        <SearchBar/>
        </div>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/recipesList'}>List</NavLink>
        <NavLink to={'/foodTour'}>Tour</NavLink>
        <NavLink to={'/fav'}>Favorate</NavLink>
        <NavLink to={'/contact'}>Contact</NavLink>
        <NavLink className={'loginOption'} to={'/login'}>Login</NavLink>
        <NavLink className={'loginOption'} to={'/signup'}>Sing Up</NavLink>
        <button onClick={handleClosingMobileFav} className="closeMobileNavBtn"><i class="fa-solid fa-x"></i></button>
        </div>
    </div>
)
}