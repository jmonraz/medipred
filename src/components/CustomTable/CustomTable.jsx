import React from "react";
import "./CustomTable.css";

const CustomTable = ({ data, columns, onRowDoubleClick }) => {
    const defaultArray = [];
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
                        const patientData = Object.entries(patient).filter(([key]) => key !== 'id');
                        return (
                            <tr key={patient.id} onDoubleClick={() => onRowDoubleClick(patient)}>
                                {patientData.map(([key, value]) => (
                                    <td key={key}>{value}</td>
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