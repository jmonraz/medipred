import React from "react";
import "./Banner.css"
import hamburgerIcon from "../../assets/images/icons/hamburger_menu_icon_white.png";
import userIcon from "../../assets/images/icons/user_icon_white.png";

const Banner = ({ onToggleHamburgerMenu, onToggleUserMenu }) => {
    return (
        <div className="banner-container">
            <ul className="menu-items">
                <div>
                    <li id="hamburger-menu" onClick={onToggleHamburgerMenu}><img src={hamburgerIcon} alt="hamburger_icon" width="30px" height="35px" /></li>
                    <li id="header-title">MediPred©</li>
                </div>
                <div>
                    <li id="user-icon" onClick={onToggleUserMenu}><img src={userIcon} alt="user_icon" width="30px" /></li>
                </div>
            </ul>
        </div>
    )
}

export default Banner;