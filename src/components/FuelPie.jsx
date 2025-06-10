import React from 'react';
import ReactECharts from 'echarts-for-react';

function FuelPie({data}) {
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            borient: 'horizontal',
            bottom: 10,
            padding: (10, 20, 10, 20),
            left: 'center',
        },
        series: [
            {
            name: 'Fuel Type Sales',
            type: 'pie',
            radius: '45%',
            center: ['50%', '40%'], 
            data: data.map(entry => ({ value: entry.count, name: entry.fuel })),
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
            formatter: '{b}: {c} ({d}%)',
            }
            },
        ],
    };
    return <ReactECharts option={option} notMerge={true} lazyUpdate={true} style={{height: '350px', width: '100%'}}/>;
}

export default FuelPie;