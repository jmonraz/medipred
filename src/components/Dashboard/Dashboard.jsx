import React, { useState, useRef, useEffect } from "react";
import './Dashboard.css';
import Banner from "../Banner";
import OverlayBox from "../OverlayBox";
import Menu from "../Menu";

const Dashboard = () => {

    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const hamburgerMenuItems = ["Patients", "Appointments", "Diseases", "Analytics", "Roles", "Help"];
    const userMenuItems = ["Change Password", "About", "Logout"];

    useEffect(() => {
        const handleOutsideClick = event => {
            if (menuRef.current && !menuRef.current.contains(event.targe)) {
                setIsHamburgerMenuOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        }

    }, []);

    const handleToggleHamburgerMenu = () => {
        setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
        if (isUserMenuOpen) {
            setIsUserMenuOpen(!isUserMenuOpen);
        }
    }
    const handleToggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
        if (isHamburgerMenuOpen) {
            setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
        }
    }
    return (
        <div className="dashboard">
            <Banner onToggleHamburgerMenu={handleToggleHamburgerMenu} onToggleUserMenu={handleToggleUserMenu} />
            {isHamburgerMenuOpen && <Menu menuItems={hamburgerMenuItems} position="start" />}
            {isUserMenuOpen && <Menu menuItems={userMenuItems} position="end" />}
            <OverlayBox />
        </ div>
    )
}

export default Dashboard;