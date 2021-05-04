import React, { useContext, useEffect } from 'react';
import { AppContext } from './context';
import InfoBox from './InfoBox';
import numeral from 'numeral';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    app__stats: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

const Stats = () => {
    const { countryInfo, type, fetchCountryInfo } = useContext(AppContext);
    const {
        todayCases,
        todayRecovered,
        todayDeaths,
        cases,
        recovered,
        deaths,
    } = countryInfo;

    const classes = useStyles();

    useEffect(() => {
        fetchCountryInfo();
    }, []);

    return (
        <section className={classes.app__stats}>
            <InfoBox
                isRed
                active={type === 'cases'}
                title='Cases'
                cases={numeral(todayCases).format('0,0')}
                total={numeral(cases).format('0.0a')}
            />
            <InfoBox
                active={type === 'recovered'}
                title='Recovered'
                cases={numeral(todayRecovered).format('0,0')}
                total={numeral(recovered).format('0.0a')}
            />
            <InfoBox
                isGrey
                active={type === 'deaths'}
                title='Deaths'
                cases={numeral(todayDeaths).format('0,0')}
                total={numeral(deaths).format('0.0a')}
            />
        </section>
    );
};

export default Stats;
