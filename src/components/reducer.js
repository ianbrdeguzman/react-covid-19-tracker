const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
            };
        case 'SET_COUNTRY_INFO':
            return {
                ...state,
                countryInfo: action.payload.info,
                country: action.payload.code,
                countryName: action.payload.name,
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
        case 'SET_MAP_CENTER':
            return {
                ...state,
                mapCenter: action.payload.center,
                mapZoom: action.payload.zoom,
            };
        case 'SET_MAP_COUNTRIES':
            return {
                ...state,
                mapCountries: action.payload,
            };
        case 'SET_TYPE':
            return {
                ...state,
                type: action.payload,
            };
        default:
            throw new Error('No action type found');
    }
};

export default reducer;
