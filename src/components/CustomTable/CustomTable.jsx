import React from "react";
import "./CustomTable.css";

const CustomTable = ({ data, columns }) => {
    const defaultArray = [];
    console.log('customtable:', data);
    const arrayToMap = data || defaultArray;
    return (
        <div className="custom-table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {arrayToMap.map((patient, index) => {
                        console.log(patient, index);
                        return (

                            <tr key={index}>
                                {Object.values(patient).map((value, valueIndex) => (
                                    <td key={valueIndex}>{value}</td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CustomTable;