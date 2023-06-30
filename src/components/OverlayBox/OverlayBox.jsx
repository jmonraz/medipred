import React from "react";
import "./OverlayBox.css";

const OverlayBox = ({ children }) => {
    return (
        <div className="overlay-box">
            {children}
        </div>
    )
}

export default OverlayBox;