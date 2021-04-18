import React, { useContext } from 'react';
import { AppContext } from './context';
import InfoBox from './InfoBox';
import numeral from 'numeral';

const Stats = () => {
    const { countryInfo, type } = useContext(AppContext);
    const {
        todayCases,
        todayRecovered,
        todayDeaths,
        cases,
        recovered,
        deaths,
    } = countryInfo;
    return (
        <section className='app__stats'>
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
