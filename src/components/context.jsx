import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from './reducer';

const AppContext = createContext();

const defaultState = {
    countries: [],
    country: 'all',
    countryName: '',
    countryInfo: {},
    tableData: [],
    casesData: [],
    recoveredData: [],
    deathsData: [],
    mapCenter: [25.799891, -41.949865],
    mapZoom: 3,
    mapCountries: [],
    type: 'cases',
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const onCountryChange = async (countryCode) => {
        const url =
            countryCode === 'all'
                ? 'https://disease.sh/v3/covid-19/all'
                : `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`;

        const historicalURL =
            countryCode === 'all'
                ? 'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
                : `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=120 `;

        fetchCountryInfo(url, countryCode);
        fetchChartData(historicalURL, countryCode);

        if (countryCode !== 'all') {
            fetchMapData(url);
        } else {
            dispatch({
                type: 'SET_MAP_CENTER',
                payload: {
                    center: [0, 0],
                    zoom: 3,
                },
            });
        }
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

    const createChartData = (data) => {
        const casesData = [];
        const recoveredData = [];
        const deathsData = [];
        let lastCasesData, lastRecoveredData, lastDeathsData;
        for (let type in data) {
            if (type === 'cases') {
                for (let date in data[type]) {
                    if (lastCasesData) {
                        const newCasesData = {
                            x: date,
                            y: data[type][date] - lastCasesData,
                        };
                        casesData.push(newCasesData);
                    }
                    lastCasesData = data[type][date];
                }
            } else if (type === 'recovered') {
                for (let date in data[type]) {
                    if (lastRecoveredData) {
                        const newRecoveredData = {
                            x: date,
                            y: data[type][date] - lastRecoveredData,
                        };
                        recoveredData.push(newRecoveredData);
                    }
                    lastRecoveredData = data[type][date];
                }
            } else {
                for (let date in data[type]) {
                    if (lastDeathsData) {
                        const newDeathsData = {
                            x: date,
                            y: data[type][date] - lastDeathsData,
                        };
                        deathsData.push(newDeathsData);
                    }
                    lastDeathsData = data[type][date];
                }
            }
        }
        return {
            casesData,
            recoveredData,
            deathsData,
        };
    };

    const fetchChartData = async (url, code) => {
        let newURL = '';
        if (code === 'all') {
            newURL =
                'https://disease.sh/v3/covid-19/historical/all?lastdays=120';
            const response = await axios.get(newURL);
            const { casesData, recoveredData, deathsData } = createChartData(
                response.data
            );
            dispatch({
                type: 'SET_CHART_DATA',
                payload: {
                    casesData,
                    recoveredData,
                    deathsData,
                },
            });
        } else if (code === undefined) {
            const newUrl =
                url ||
                'https://disease.sh/v3/covid-19/historical/all?lastdays=120';
            const response = await axios.get(newUrl);
            const { casesData, recoveredData, deathsData } = createChartData(
                response.data
            );
            dispatch({
                type: 'SET_CHART_DATA',
                payload: {
                    casesData,
                    recoveredData,
                    deathsData,
                },
            });
        } else if (code !== 'all') {
            const response = await axios.get(url);
            const { casesData, recoveredData, deathsData } = createChartData(
                response.data.timeline
            );
            dispatch({
                type: 'SET_CHART_DATA',
                payload: {
                    casesData,
                    recoveredData,
                    deathsData,
                },
            });
        }
    };

    const sortData = (data) => {
        const sortedData = [...data];
        return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
    };

    const fetchCountries = async () => {
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
    };

    useEffect(() => {
        fetchCountries();
        fetchCountryInfo();
        fetchChartData();
    }, []);

    return (
        <AppContext.Provider
            value={{ ...state, onCountryChange, onInfoBoxClick }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
