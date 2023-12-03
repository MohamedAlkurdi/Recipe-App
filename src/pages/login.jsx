import vector from '../images/stand.png'
import home from '../images/home.png'
import newUser from '../images/add.png'
import password from '../images/padlock.png'
import { NavLink,Link} from "react-router-dom";

export default function Login(){
    return(
        <div className="login">
            <div className="loginPageContent">
                <div className="welcoming">
                    <h1>Welcome back!</h1>
                </div>
                <div className="vectorAndLogin">
                <div className="loginVectorPart">
                    <img src={vector} alt='vector' className="loginVector"/>
                </div>
                <div className="loginCard">
                    <div className="userName field">
                    <label htmlFor="userName">User Name:</label>
                    <input type="text" name="userName" />
                    </div>
                    <div className="password field">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" />
                    </div>
                    <button className="loginBtn">Login</button>
                </div>
                </div>
                <div className="sideLinks">
                <Link  className='sideLink' to={'/'}>
                    <img src={home} alt="home" />
                </Link>
                <Link className='sideLink' >
                    <img src={password} alt="password" />
                </Link>
                <Link  className='sideLink' to={'/signup'}>
                    <img src={newUser} alt="newUser" />
                </Link>
                </div>
                <div className="mobileLoginLinks">
                <Link  className='LoginLink' to={'/'}>
                    <img src={home} alt="home" />
                </Link>
                <Link className='LoginLink' >
                    <img src={password} alt="password" />
                </Link>
                <Link  className='LoginLink' to={'/signup'}>
                    <img src={newUser} alt="newUser" />
                </Link>
                </div>
            </div>
            
        </div>
    )
}