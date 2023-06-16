import { React } from "react";
import { FaGlobeAmericas, FaHome } from "react-icons/fa";

const Nav = () => {
    return(
        <nav className="sidenav">
            <span>
            <a href="/" id="nav_link"><FaHome /> Home</a>
            <a href="/leaderboard" id="nav_link"><FaGlobeAmericas /> Leaderboard</a>
            </span>
        <footer className="footer">
        <p id="footer_text">By Jason Azevedo, 2023</p>
        </footer>
        </nav>
    )
}

export default Nav

