import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';
import Banner from "../Banner";
import OverlayBox from "../OverlayBox";
import GraphBox from "../GraphBox";
import Menu from "../Menu";
import AnalyticsScreen from "../AnalyticsScreen";
import PatientsScreen from "../PatientsScreen";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState(false);

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
        <>
            <OverlayBox>
                {renderComponent()}
            </OverlayBox>
        </>
    )
}

export default Dashboard;