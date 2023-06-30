import React from "react";
import './Dashboard.css';
import Banner from "../Banner";
import OverlayBox from "../OverlayBox";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Banner />
            <OverlayBox />
        </ div>
    )
}

export default Dashboard;