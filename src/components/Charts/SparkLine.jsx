import { Line } from 'react-chartjs-2';

const SparkLine = ({ id, height, width, color, data, type, currentColor }) => {
  const sparklineData = {
    labels: data.map(point => point.x),
    datasets: [
      {
        label: '',
        data: data.map(point => point.y),
        borderColor: currentColor,
        borderWidth: 2,
        fill: type === 'Area',
        backgroundColor: color,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `data: ${context.raw.y}`,
        },
      },
    },
  };

  return (
    <div>
      <Line data={sparklineData} options={options} height={height} width={width} />
    </div>
  );
};

export default SparkLine;
