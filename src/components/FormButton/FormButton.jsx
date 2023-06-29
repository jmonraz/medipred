import React from "react";
import './FormButton.css'

const FormButton = ({ type, children, handleSubmit }) => {
    return (
        <div>
            <button className="form-button" type={type} onClick={handleSubmit}>{children}</button>
        </div>
    );
}

export default FormButton;