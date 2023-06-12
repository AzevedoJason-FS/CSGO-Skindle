import { React } from "react";
import { FaGlobeAmericas, FaHome } from "react-icons/fa";

const Nav = () => {
    return(
        <nav className="sidenav">
            <a href="/" id="nav_link"><FaHome /> Home</a>
            <a href="/leaderboard" id="nav_link"><FaGlobeAmericas /> Leaderboard</a>
        <footer className="footer">
        <p id="footer_text">Jason Azevedo @ CS:GO Skindle,2023</p>
        </footer>
        </nav>
    )
}

export default Nav

