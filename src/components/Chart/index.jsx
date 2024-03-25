import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Chart
} from 'chart.js';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const ChartComponent = ({ data }) => {
  const countCustomersByDate = (data) => {
    const counts = {};
    data.forEach((item) => {
      const date = new Date(item.createdDate).toLocaleDateString();
      counts[date] = counts[date] ? counts[date] + 1 : 1;
    });
    return counts;
  };

  const objectToArray = (obj) => {
    return Object.keys(obj).map((key) => ({
      date: key,
      count: obj[key]
    }));
  };
  const customerCounts = countCustomersByDate(data);
  const customerData = objectToArray(customerCounts);

  const dates = customerData.map((item) => item.date);
  const counts = customerData.map((item) => item.count);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'The number of the customers created',
        data: counts,
        fill: false,
        borderColor: 'blue',
        borderWidth: 2
      }
    ]
  };

  return (
    <div className='w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'>
      <div>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
          Chart of the customers created by day
        </h5>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default ChartComponent;
