import React from "react";
import './SmallButton.css';

const SmallButton = ({ onClick, children }) => {
    return (
        <>
            <button className="small-button" onClick={onClick}>{children}</button>
        </>
    );
}

export default SmallButton;