import React, { useContext, useEffect } from 'react';
import { AppContext } from './context';
import { Line } from '@reactchartjs/react-chart.js';
import numeral from 'numeral';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    app__graph: {
        '& canvas': {
            height: '185px',
            marginTop: theme.spacing(2),
        },
    },
}));

const LineGraph = () => {
    const { chartData, fetchChartData, type, country } = useContext(AppContext);

    const classes = useStyles();

    const options = {
        legend: {
            display: false,
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

    const color = () => {
        if (type === 'cases') {
            return '#EC7063';
        } else if (type === 'recovered') {
            return '#7dd71d';
        } else {
            return '#808B96';
        }
    };

    const bgColor = () => {
        if (type === 'cases') {
            return 'rgba(236, 112, 99, 0.2)';
        } else if (type === 'recovered') {
            return 'rgba(125, 215, 29,0.2)';
        } else {
            return 'rgba(128, 139, 150, 0.2)';
        }
    };

    useEffect(() => {
        fetchChartData(country);
    }, [country, type]);

    return (
        <div className={classes.app__graph}>
            <Line
                data={{
                    datasets: [
                        {
                            backgroundColor: bgColor(),
                            borderColor: color(),
                            data: chartData,
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
