import React from "react";
import './FormButton.css'

const FormButton = ({ type, children, handleSubmit, disabled }) => {
    return (
        <div>
            <button className="form-button" type={type} onClick={handleSubmit} disabled={disabled}>{children}</button>
        </div>
    );
}

export default FormButton;