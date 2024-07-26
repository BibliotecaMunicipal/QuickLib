import React from 'react';
import { Bar } from 'react-chartjs-2';
import {useGetStatistics} from '../../hooks/consult.hook'; // Asegúrate de que la ruta sea correcta

function Graph() {
  const { stats, loading, error } = useGetStatistics();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const data = {
    labels: [
      'Hombre>60', 'Hombre30-59', 'Hombre18-29', 'Hombre13-17', 'Hombre0-13',
      'Mujer>60', 'Mujer30-59', 'Mujer18-29', 'Mujer13-17', 'Mujer0-13'
    ],
    datasets: [
      {
        label: 'Consultas Internas',
        data: [
          stats.menOverSixty, stats.menBetween30And59, stats.menBetween18AndT29, stats.menBetween13AndT17, stats.menBetween0AndT12,
          stats.womenOverSixty, stats.womenBetween30And59, stats.womenBetween18AndT29, stats.womenBetween13AndT17, stats.womenBetween0AndT12
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md w-full md:w-2/3 dark:bg-neutral-800 mb-4 md:mb-0">
      <h2 className="text-center text-lg font-bold mb-4 dark:text-white">Consultas Internas</h2>
      <Bar data={data} />
    </div>
  );
}

export default Graph;
