import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';

function GraphCard() {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/cars/sales/year').then(res => {
      const years = res.data.map(item => item.year);
      const counts = res.data.map(item => item.count);

      const chartDom = document.getElementById('car-sales-chart');
      if (!chartDom) return;

      const myChart = echarts.init(chartDom);
      setChartInstance(myChart);

      const option = {
        title: {
          text: '',
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: years,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: counts,
            type: 'bar',
            itemStyle: {
              color: '#4f46e5', // Indigo-600
            },
          },
        ],
      };

      myChart.setOption(option);
    });

    return () => {
      if (chartInstance) {
        chartInstance.dispose();
      }
    };
  }, []);

  return (
    <div className="flex justify-center flex-col text-center bg-white p-4 rounded-xl shadow-md h-[400px] w-[100%] md:w-[60%] m-2.5">
      <h2 className="text-3xl font-medium mt-4 mb-4">Car Sales by Year</h2>
      <div id="car-sales-chart" style={{ height: '300px', width: '100%' }} />
    </div>
  );
}

export default GraphCard;
