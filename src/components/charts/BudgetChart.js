import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BudgetChart = ({ budgets }) => {
  const data = {
    labels: budgets.map(budget => budget.category),
    datasets: [
      {
        label: 'Budget Limit',
        data: budgets.map(budget => budget.limit),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Amount Spent',
        data: budgets.map(budget => budget.spent),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default BudgetChart;
