import React from "react";
import BoxItem from "../BoxItem";
import "./AnalyticsScreen.css";
import { UserContext } from "../../contexts/UserContext";

const AnalyticsScreen = () => {

    return (
        <div className="analytics-screen">
            <div className="flex-box">
                <BoxItem>Diabetes</BoxItem>
                <BoxItem>Heart</BoxItem>
                <BoxItem>Cancer</BoxItem>
                <BoxItem>Alzheimer's</BoxItem>
            </div>
            <div className="flex-box">
                <BoxItem>Mental Health</BoxItem>
            </div>
        </div>
    )
}

export default AnalyticsScreen;