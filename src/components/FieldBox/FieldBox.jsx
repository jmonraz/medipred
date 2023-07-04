import React from "react";
import "./FieldBox.css";

const FieldBox = ({ data }) => {
    return (
        <div className="field-box">
            <p>{data}</p>
        </div>
    );
};

export default FieldBox;