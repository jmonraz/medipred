import React from "react";
import BoxItem from "../BoxItem";
import "./AnalyticsScreen.css";
import DiabetesScreen from "../DiabetesScreen/DiabetesScreen";
import { UserContext } from "../../contexts/UserContext";

const AnalyticsScreen = () => {
    const [selectedMenuItem, setSelectedMenuItem] = React.useState('');

    const handleMenuItemClick = item => {
        console.log(item);
        setSelectedMenuItem(item);
    }

    const renderComponent = () => {
        switch (selectedMenuItem) {
            case 'diabetes':
                return <DiabetesScreen />
            default:
                return (
                    <div className="analytics-screen">
                        <div className="flex-box">
                            <BoxItem onClick={handleMenuItemClick}>Diabetes</BoxItem>
                            <BoxItem>Heart</BoxItem>
                            <BoxItem>Cancer</BoxItem>
                            <BoxItem>Alzheimer's</BoxItem>
                        </div>
                        <div className="flex-box">
                            <BoxItem>Mental Health</BoxItem>
                        </div>
                    </div>
                );
        }
    }

    return (
        <>
            {renderComponent()}
        </>
    )
}

export default AnalyticsScreen;