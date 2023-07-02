import React from "react";
import "./ButtonsRow.css"

const ButtonsRow = ({ buttons, width }) => {
    return (
        <div className="button-row">
            {buttons.map((item, index) => {

                return (
                    <button key={index} className="row-button"><img src={item.icon} alt="add_icon" width={width} /></button>
                );
            })}
        </div>
    );
}

export default ButtonsRow;