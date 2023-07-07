import React from "react";
import { Bar } from 'react-chartjs-2';
import { Chart, BarController, CategoryScale, LinearScale } from 'chart.js/auto';

const CustomChart = () => {
    // Register required scales
    Chart.register(BarController, CategoryScale, LinearScale);

    // Define data chart
    const data = {
        labels: ['Yes', 'No'],
        datasets: [
            {
                label: 'Diabetes Risk Analysis',
                data: [12, 2],
                backgroundColor: 'rgba(75, 192, 192, 0.2',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Diabetes Risk Analysis</h2>
            <Bar data={data} />
        </div>
    );
};

export default CustomChart;
