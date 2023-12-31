import React from "react";
import "./Menu.css";

const Menu = ({ isMenuOpen, menuRef, menuItems, position, onClick }) => {
    const menuContainerClass = `menu-container ${position}`;
    return (
        <div className={menuContainerClass}>
            <ul>
                {menuItems.map((item, index) => {
                    return (
                        <li key={index} onClick={onClick}>{item}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Menu;