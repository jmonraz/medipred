import React from "react";
import "./GraphBox.css";
const GraphBox = ({ children }) => {
    return (
        <div className="graph-box">
            <div className="graph-item">
                {children}
            </div>

        </div>
    )
}

export default GraphBox;