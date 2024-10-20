import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically register the necessary components
import { ChartData } from 'chart.js'; // Import types for chart data

// Define the type for commit activity entries
interface CommitActivityEntry {
  total: number;
}

// Define the props type
interface CommitActivityChartProps {
  commitActivity: CommitActivityEntry[];
}

export const CommitActivityChart = ({ commitActivity }: CommitActivityChartProps) => {
  // Construct chart data
  const data: ChartData<'line'> = {
    labels: Array(commitActivity.length).fill(''), // Remove week labels
    datasets: [
      {
        label: 'Commits',
        data: commitActivity.map(entry => entry.total),
        fill: false,
        borderColor: 'green', // Line color
        borderWidth: 3, // Thin line
        pointRadius: 0, // Hide point circles
        pointHoverRadius: 0, // Hide hover circles
        tension: 0.1, // Smooth curve
      },
    ],
  };

  // Chart options to disable grid lines
  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Hide grid lines on x-axis
        },
      },
      y: {
        grid: {
          display: false, // Hide grid lines on y-axis
        },
        ticks: {
          display: false, // Hide y-axis values
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
  };

  return (
    <div className='w-full h-28'>
      <Line data={data} options={options} />
    </div>
  );
};
