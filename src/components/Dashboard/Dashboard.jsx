import React, { useState, useRef, useEffect, useContext } from "react";
import './Dashboard.css';
import Banner from "../Banner";
import OverlayBox from "../OverlayBox";
import GraphBox from "../GraphBox";
import Menu from "../Menu";
import AnalyticsScreen from "../AnalyticsScreen";
import PatientsScreen from "../PatientsScreen";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = () => {

    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(false);
    const { updateUser, updateAuthenticated, user } = useContext(UserContext);
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
        setSelectedMenuItem(item.target.innerText);
        if (isHamburgerMenuOpen) {
            setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
        }
        if (isUserMenuOpen) {
            setIsUserMenuOpen(!setIsUserMenuOpen);
        }

        if (item.target.innerText === 'Logout') {
            updateAuthenticated(false);
            updateUser(false);
        }
    }

    const renderComponent = () => {
        switch (selectedMenuItem) {
            case 'Analytics':
                return <AnalyticsScreen />;
            case 'Patients':
                return <PatientsScreen />;
            default:
                return (
                    <>
                        <div className="flex-box">
                            <GraphBox>GRAPH 1</GraphBox>
                            <GraphBox>GRAPH 2</GraphBox>
                        </div>
                        <div className="flex-box">
                            {/*code here for table*/}
                            <GraphBox>GRAPH 3</GraphBox>
                        </div>
                    </>
                );

        }
    }
    return (
        <div className="dashboard">
            <Banner onToggleHamburgerMenu={handleToggleHamburgerMenu} onToggleUserMenu={handleToggleUserMenu} />
            {isHamburgerMenuOpen && <Menu menuItems={hamburgerMenuItems} position="start" onClick={handleMenuItemClick} />}
            {isUserMenuOpen && <Menu menuItems={userMenuItems} position="end" onClick={handleMenuItemClick} />}
            <OverlayBox>
                {renderComponent()}
            </OverlayBox>
        </ div>
    )
}

export default Dashboard;