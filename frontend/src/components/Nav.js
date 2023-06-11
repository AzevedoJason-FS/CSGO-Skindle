import { React } from "react";
import { FaGlobeAmericas, FaHome } from "react-icons/fa";

const Nav = () => {
    return(
        <nav className="sidenav">
            <a href="/" id="nav_link"><FaHome /> Home</a>
            <a href="/leaderboard" id="nav_link"><FaGlobeAmericas /> Leaderboard</a>
        </nav>
    )
}

export default Nav

