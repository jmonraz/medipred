import React from "react";
import './MainButton.css'

const MainButton = ({ onClick, children }) => {
    return (
        <>
            <button className="main-button" onClick={onClick}>{children}</button>
        </>
    );
}

export default MainButton;