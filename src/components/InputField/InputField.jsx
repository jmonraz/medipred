import React from "react";
import './InputField.css';

const InputField = ({ id, placeholder, value, type = 'text', onChange, required = false }) => {
    return (
        <div>
            <input className="input-field" placeholder={placeholder} value={value} type={type} id={id} onChange={onChange} required={required} />
        </div>
    );
}

export default InputField;