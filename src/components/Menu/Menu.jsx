import React from "react";
import "./Menu.css";

const Menu = ({ isMenuOpen, menuRef }) => {
    return (
        <div className="menu-container">
            <ul>
                <li>Patients</li>
                <li>Appointments</li>
                <li>Diseases</li>
                <li>Analytics</li>
                <li>Roles</li>
            </ul>
        </div>
    )
}

export default Menu;