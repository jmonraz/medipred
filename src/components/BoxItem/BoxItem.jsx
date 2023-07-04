import React from "react";
import "./BoxItem.css";

const BoxItem = ({ children, icon, onClick }) => {
    return (
        <div className="box-item" onClick={() => onClick('diabetes')}>
            <p>{children}</p>
        </div>
    )
}

export default BoxItem;