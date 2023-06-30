import React from "react";
import "./GraphBox.css";
const GraphBox = ({ children }) => {
    return (
        <div className="graph-box">
            <h2>{children}</h2>
        </div>
    )
}

export default GraphBox;