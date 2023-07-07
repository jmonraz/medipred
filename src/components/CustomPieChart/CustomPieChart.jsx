import React from "react";
import { Pie } from 'react-chartjs-2';

const CustomPieChart = () => {
    // Define data chart
    const data = {
        labels: ['Infants', 'Children', 'Adolescents', 'Adults', 'Seniors'],
        datasets: [
            {
                data: [20, 50, 100, 500, 700],
                backgroundColor: ['red', 'blue', 'yellow', 'purple', 'green'],
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                position: 'left',
                align: 'center',
                labels: {
                    boxWidth: 15,
                    padding: 5,
                },
            },
        },
    };

    return (
        <div style={{ width: '250px' }}>
            <h4>Patients Category</h4>
            <Pie data={data} options={chartOptions} />
        </div>
    );
};

export default CustomPieChart;
