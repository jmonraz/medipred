import React, { useState, useRef, useEffect } from "react";
import './Dashboard.css';
import Banner from "../Banner";
import OverlayBox from "../OverlayBox";
import Menu from "../Menu";

const Dashboard = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = event => {
            if (menuRef.current && !menuRef.current.contains(event.targe)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        }

    }, []);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    return (
        <div className="dashboard">
            <Banner onToggleMenu={handleToggleMenu} />
            {isMenuOpen && <Menu />}
            <OverlayBox />
        </ div>
    )
}

export default Dashboard;