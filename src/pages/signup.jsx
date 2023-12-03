import vector from '../images/snack.png'
import home from '../images/home.png'
import login from '../images/login.png'
import password from '../images/padlock.png'
import {Link} from "react-router-dom";
export default function Singup(){
    return(
        <div className="signup">
            <div className="signupPageContent">
                <div className="welcoming">
                    <h1>Welcome!</h1>
                </div>
                <div className="signupCardContainer">
                <div className="signupCard">
                    <div className="signupCardUpper">
                        <div className="registerBox signupCardUpperLeft">
                        <div className="userName field">
                    <label htmlFor="userName">User Name:</label>
                    <input type="text" name="userName" />
                    </div>
                    <div className="password field">
                    <label htmlFor="password">Email:</label>
                    <input type="email" name="email" />
                    </div>
                        </div>
                        <div className="registerBox signupCardUpperRight">
                        <div className="userName field">
                    <label htmlFor="userName">New password:</label>
                    <input type="password" name="newPassword" />
                    </div>
                    <div className="password field">
                    <label htmlFor="password">Repeat password:</label>
                    <input type="password" name="repeatPassword" />
                    </div>
                        </div>
                    </div>
                    <button className="loginBtn">Sign up</button>
                </div>
                </div>
                <div className="sideLinks">
                <Link  className='sideLink' to={'/'}>
                    <img src={home} alt="home" />
                </Link>
                <Link className='sideLink' >
                    <img src={password} alt="password" />
                </Link>
                <Link  className='sideLink' to={'/login'}>
                    <img src={login} alt="newUser" />
                </Link>
            </div>
            <div className="mobileLoginLinks">
                <Link  className='LoginLink' to={'/'}>
                    <img src={home} alt="home" />
                </Link>
                <Link className='LoginLink' >
                    <img src={password} alt="password" />
                </Link>
                <Link  className='LoginLink' to={'/login'}>
                    <img src={login} alt="newUser" />
                </Link>
                </div>
            </div>
            
        </div>
    )
}