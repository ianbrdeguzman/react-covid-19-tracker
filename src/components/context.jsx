import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import reducer from './reducer';

const AppContext = createContext();

const defaultState = {
    countries: [],
    country: 'all',
    countryName: '',
    countryInfo: {},
    tableData: [],
    chartData: [],
    mapCenter: [25.799891, -41.949865],
    mapZoom: 3,
    mapCountries: [],
    type: 'cases',
    isLoading: true,
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const onCountryChange = async (countryCode) => {
        const url =
            countryCode === 'all'
                ? 'https://disease.sh/v3/covid-19/all'
                : `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`;

        if (countryCode !== 'all') {
            fetchMapData(url);
        } else {
            dispatch({
                type: 'SET_MAP_CENTER',
                payload: {
                    center: [25.799891, -41.949865],
                    zoom: 3,
                },
            });
        }
        fetchCountryInfo(url, countryCode);
        fetchChartData(countryCode);
    };

    const onInfoBoxClick = (type) => {
        dispatch({ type: 'SET_TYPE', payload: type });
    };

    const fetchMapData = async (url) => {
        const response = await axios.get(url);
        const data = response.data;
        const { countryInfo } = data;
        dispatch({
            type: 'SET_MAP_CENTER',
            payload: {
                center: [countryInfo.lat, countryInfo.long],
                zoom: 5,
            },
        });
    };
    const fetchCountryInfo = async (url, countryCode) => {
        const newURL = url || 'https://disease.sh/v3/covid-19/all';
        const newCode = countryCode || 'all';
        const response = await axios.get(newURL);
        dispatch({
            type: 'SET_COUNTRY_INFO',
            payload: {
                name: response.data.country,
                info: response.data,
                code: newCode,
            },
        });
    };

    const createChartData = (data, type) => {
        const chartData = [];
        let lastDataPoint;
        for (let date in data.cases) {
            if (lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: data[type][date] - lastDataPoint,
                };
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[type][date];
        }
        return chartData;
    };

    const fetchChartData = async (countryCode) => {
        const url =
            countryCode === 'all'
                ? 'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
                : `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=120 `;
        const response = await axios.get(url);
        const data = response.data;
        if (countryCode !== 'all') {
            const chartData = createChartData(data.timeline, state.type);
            dispatch({ type: 'SET_CHART_DATA', payload: chartData });
        } else {
            const chartData = createChartData(data, state.type);
            dispatch({ type: 'SET_CHART_DATA', payload: chartData });
        }
    };

    const sortData = (data) => {
        const sortedData = [...data];
        return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
    };

    const fetchCountriesList = async () => {
        dispatch({ type: 'SET_LOADING_ON' });
        const response = await axios.get(
            'https://disease.sh/v3/covid-19/countries'
        );
        const data = response.data;
        const listOfCountries = data.map((country) => {
            return {
                name: country.country,
                value: country.countryInfo.iso3,
            };
        });
        const sortedData = sortData(data);
        dispatch({ type: 'SET_COUNTRIES', payload: listOfCountries });
        dispatch({ type: 'SET_TABLE_DATA', payload: sortedData });
        dispatch({ type: 'SET_MAP_COUNTRIES', payload: response.data });
        dispatch({ type: 'SET_LOADING_OFF' });
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                onCountryChange,
                onInfoBoxClick,
                fetchCountriesList,
                fetchCountryInfo,
                fetchChartData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
