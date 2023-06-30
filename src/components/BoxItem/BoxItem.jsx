import React from "react";
import "./BoxItem.css";

const BoxItem = ({ children, icon }) => {
    return (
        <div className="box-item">
            <p>{children}</p>
        </div>
    )
}

export default BoxItem;