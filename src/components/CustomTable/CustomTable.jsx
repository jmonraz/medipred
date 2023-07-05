import React from "react";
import "./CustomTable.css";

const CustomTable = ({ data, columns, onRowDoubleClick }) => {
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
                        return (
                            <tr key={index} onDoubleClick={() => onRowDoubleClick(patient)}>
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