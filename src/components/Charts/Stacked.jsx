import React from "react";
import { Bar } from 'react-chartjs-2';

import { stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis } from "../../data/dummy";

const Stacked = ({ width, height }) => {
  const datasets = stackedCustomSeries.map((series) => ({
    label: series.name,
    data: series.dataSource.map((dataPoint) => dataPoint.y),
    backgroundColor: series.background,
  }));

  const data = {
    labels: stackedCustomSeries[0].dataSource.map((dataPoint) => dataPoint.x),
    datasets: datasets,
  };

  const options = {
    scales: {
      x: stackedPrimaryXAxis,
      y: stackedPrimaryYAxis,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'center',
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `y: ${context.parsed.y}`,
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} width={width} height={height} />
    </div>
  );
};

export default Stacked;
