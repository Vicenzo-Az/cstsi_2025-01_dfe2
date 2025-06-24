// src/components/ui/ChartRenderer.jsx
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

const ChartRenderer = ({ data, height = 300 }) => {
  if (!data) return <div>Nenhum dado disponível para visualização</div>;

  const chartData = {
    labels: data.labels || [],
    datasets: [
      {
        label: data.datasetLabel || 'Dados',
        data: data.values || [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: data.title || 'Gráfico de Dados',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => {
            if (data.isCurrency) return `R$ ${value.toLocaleString('pt-BR')}`;
            return value;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: `${height}px` }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartRenderer;