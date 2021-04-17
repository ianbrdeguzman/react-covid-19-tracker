import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

const AppContext = createContext();

const defaultState = {
    countries: [],
    country: 'all',
    countryInfo: {},
    tableData: [],
    casesData: [],
    recoveredData: [],
    deathsData: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_COUNTRIES':
            return { ...state, countries: action.payload };
        case 'SET_COUNTRY_INFO':
            return {
                ...state,
                countryInfo: action.payload.info,
                country: action.payload.code,
            };
        case 'SET_TABLE_DATA':
            return { ...state, tableData: action.payload };
        case 'SET_CHART_DATA':
            return {
                ...state,
                casesData: action.payload.casesData,
                recoveredData: action.payload.recoveredData,
                deathsData: action.payload.deathsData,
            };
        default:
            throw new Error('No action type found');
    }
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
                ? 'https://disease.sh/v3/covid-19/historical/all?lastdays=90'
                : `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=90 `;

        fetchCountryInfo(url, countryCode);
        fetchChartData(historicalURL);
    };

    const fetchCountryInfo = async (url, countryCode) => {
        const newURL = url || 'https://disease.sh/v3/covid-19/all';
        const newCode = countryCode || 'all';
        const response = await axios.get(newURL);
        dispatch({
            type: 'SET_COUNTRY_INFO',
            payload: {
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

    const fetchChartData = async (url) => {
        const newURL =
            url || 'https://disease.sh/v3/covid-19/historical/all?lastdays=90 ';
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
    };

    useEffect(() => {
        fetchCountries();
        fetchCountryInfo();
        fetchChartData();
    }, []);

    return (
        <AppContext.Provider value={{ ...state, onCountryChange }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
