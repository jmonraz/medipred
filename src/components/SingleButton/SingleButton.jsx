import React from "react";
import "./SingleButton.css";

const SingleButton = ({ button, width, onClick }) => {
    return (
        <>
            <button key={button.label} className="row-button" onClick={() => onClick(button.label)} id={button.label} type="button">
                <img src={button.icon} alt="add_icon" width={width} />
            </button>
        </>
    );
}

export default SingleButton;