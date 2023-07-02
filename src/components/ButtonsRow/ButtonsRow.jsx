import React from "react";
import "./ButtonsRow.css"

const ButtonsRow = ({ buttons, width, onClick }) => {
    return (
        <div className="button-row">
            {buttons.map((item, index) => {

                return (
                    <button key={item.label} className="row-button" onClick={() => onClick(item.label)} id={item.label}><img src={item.icon} alt="add_icon" width={width} /></button>
                );
            })}
        </div>
    );
}

export default ButtonsRow;