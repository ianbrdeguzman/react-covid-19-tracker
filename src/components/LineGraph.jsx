import React, { useContext } from 'react';
import { AppContext } from './context';
import { Line } from '@reactchartjs/react-chart.js';
import numeral from 'numeral';

const LineGraph = () => {
    const { casesData, recoveredData, deathsData } = useContext(AppContext);
    const options = {
        legend: {
            display: true,
            boxWidth: 10,
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function (tooltipItem) {
                    return numeral(tooltipItem.value).format('+0,0');
                },
            },
        },
        scales: {
            xAxes: [
                {
                    type: 'time',
                    time: {
                        parser: 'MM/DD/YY',
                        tooltipFormat: 'll',
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        callback: function (value) {
                            return numeral(value).format('0a');
                        },
                    },
                },
            ],
        },
    };

    return (
        <div className='graph'>
            <Line
                data={{
                    datasets: [
                        {
                            label: 'Cases',
                            backgroundColor: '#EC7063',
                            borderColor: '#EC7063',
                            fill: false,
                            data: casesData,
                        },
                        {
                            label: 'Recovered',
                            backgroundColor: '#52BE80',
                            borderColor: '#52BE80',
                            fill: false,
                            data: recoveredData,
                        },
                        {
                            label: 'Deaths',
                            backgroundColor: '#CACFD2',
                            borderColor: '#CACFD2',
                            fill: false,
                            data: deathsData,
                        },
                    ],
                }}
                options={options}
                height={null}
                width={null}
            />
        </div>
    );
};

export default LineGraph;
