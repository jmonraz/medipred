import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

// components
import Menu from "../../components/Menu";
import Banner from "../../components/Banner";

// screens
import Dashboard from "../Dashboard/Dashboard";
import PatientsScreen from "../PatientsScreen/PatientsScreen";
import AppointmentsScreen from "../AppointmentsScreen/AppointmentsScreen";
import AnalyticsScreen from "../AnalyticsScreen/AnalyticsScreen";
import ReportsScreen from "../ReportsScreen/ReportsScreen";
import UsersScreen from "../UsersScreen/UsersScreen";


const HomeScreen = () => {

    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(false);
    const { updateUser, updateAuthenticated, user } = useContext(UserContext);

    const hamburgerMenuItems = ["Home", "Patients", "Appointments", "Analytics", "Reports", "Users"];
    const userMenuItems = [`User: ${user.username}`, `Email: ${user.email}`, "Change Password", "Help", "About", "Logout"];
    const navigate = useNavigate();

    const handleToggleHamburgerMenu = () => {
        console.log(selectedMenuItem);
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

    const handleMenuItemClick = item => {
        console.log(item.target.innerText);
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
        if (item.target.innerText === 'Home') {
            navigate("/home/dashboard");
        }
        if (item.target.innerText === 'Patients') {
            navigate("/home/patients");
        }
        if (item.target.innerText === 'Appointments') {
            navigate("/home/appointments")
        }
        if (item.target.innerText === 'Analytics') {
            navigate("/home/analytics")
        }
        if (item.target.innerText === 'Reports') {
            navigate("/home/reports")
        }
        if (item.target.innerText === 'Users') {
            navigate("/home/users")
        }

    }

    return (
        <div className="dashboard">
            <Banner onToggleHamburgerMenu={handleToggleHamburgerMenu} onToggleUserMenu={handleToggleUserMenu} />
            {isHamburgerMenuOpen && <Menu menuItems={hamburgerMenuItems} position="start" onClick={handleMenuItemClick} />}
            {isUserMenuOpen && <Menu menuItems={userMenuItems} position="end" onClick={handleMenuItemClick} />}
            <Routes>
                <Route path="/" element={<Navigate to="dashboard" replace />} />
                <Route
                    path="/dashboard"
                    element={<Dashboard />} />
                <Route path="/patients" element={<PatientsScreen />} />
                <Route path="/appointments" element={<AppointmentsScreen />} />
                <Route path="/analytics" element={<AnalyticsScreen />} />
                <Route path="/reports" element={<ReportsScreen />} />
                <Route path="/users" element={<UsersScreen />} />
            </Routes>
        </div>
    )
}

export default HomeScreen;