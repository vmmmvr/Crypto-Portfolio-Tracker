import { Line } from 'react-chartjs-2';
import { Card} from '@material-tailwind/react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { CryptoDataPoint } from '../../interfaces/coins';
import { missingPorperties } from '../../utils/utils';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CryptoChart = ({ data, symbol }: {data: CryptoDataPoint[], symbol: string}) => {
  const chartData = {
    labels: data.map((point) => new Date(point.time * 1000).getDate()), // Convert Unix time to date
    datasets: [
      {
        label: 'Closing Price (USD)',
        data: data.map((point) => point.close),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: '',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <Card {...missingPorperties} className="sm:p-6 sm:my-4 w-full  shadow-none  bg-primary-50">
        <span> {symbol} price For the past 30 days</span>
      <Line width={300} data={chartData} options={options} />
    </Card>
  );
};

export default CryptoChart;
