import React, { useState, useRef, useEffect, useContext } from "react";
import './Dashboard.css';
import Banner from "../Banner";
import OverlayBox from "../OverlayBox";
import GraphBox from "../GraphBox";
import Menu from "../Menu";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = () => {

    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { updateUser, updateAuthenticated, authenticated, user } = useContext(UserContext);
    const menuRef = useRef(null);
    const hamburgerMenuItems = ["Patients", "Appointments", "Diseases", "Analytics", "Roles", "Help"];
    const userMenuItems = [`User: ${user.username}`, `Email: ${user.email}`, "Change Password", "About", "Logout"];

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
    const handleMenuItemClick = async item => {
        console.log("Clicked item:", item.target.innerText);
        if (item.target.innerText === 'Logout') {
            updateAuthenticated(false);
            updateUser(false);
        }
    }
    return (
        <div className="dashboard">
            <Banner onToggleHamburgerMenu={handleToggleHamburgerMenu} onToggleUserMenu={handleToggleUserMenu} />
            {isHamburgerMenuOpen && <Menu menuItems={hamburgerMenuItems} position="start" onClick={handleMenuItemClick} />}
            {isUserMenuOpen && <Menu menuItems={userMenuItems} position="end" onClick={handleMenuItemClick} />}
            <OverlayBox><div className="flex-box">
                <GraphBox>GRAPH 1</GraphBox>
                <GraphBox>GRAPH 2</GraphBox>
            </div>
                <div className="flex-box">
                    {/*code here for table*/}
                    <GraphBox>GRAPH 3</GraphBox>
                </div></OverlayBox>
        </ div>
    )
}

export default Dashboard;