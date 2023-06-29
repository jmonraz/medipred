import React from "react";
import './FormButton.css'

const FormButton = ({ type, children }) => {
    return (
        <div>
            <button className="form-button" type={type}>{children}</button>
        </div>
    );
}

export default FormButton;