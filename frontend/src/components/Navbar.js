import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar-container">
      <ul className="nav navbar">
        <li className="nav-item"><Link to="/browse">Browse</Link></li>
        <li className="nav-item"><Link to="/createpost">Create Posts</Link></li>
        {/* <li className="nav-item"><a href="/profile">Profile</a></li> */}
        <li className="nav-item"><Link to="/profile">Profile</Link></li>
        <li className="nav-item"><Link to="/login">Login</Link></li>
        {/* <li className='nav-item'><a href="/login">Login</a></li> */}
      </ul>
    </nav>
  );
}

export default Navbar;