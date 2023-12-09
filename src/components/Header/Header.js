import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/argentBankLogo.png";


function Header() {

    return (
        <nav className="main-nav">
            <NavLink to="/" className="main-nav-logo">
                <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
            </NavLink>
            <div>
           <NavLink to="/login" className="main-nav-item">
             <i className="fa fa-user-circle"></i>
            Sign In
         </NavLink>
            </div>
        </nav>
    );
}

export default Header;