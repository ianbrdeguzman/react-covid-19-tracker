import React, { useContext, useEffect } from 'react';
import { AppContext } from './context';
import Loading from './Loading';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import numeral from 'numeral';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    app__map: {
        height: '516px',
        marginTop: theme.spacing(2),
        border: '0.5rem solid #ffffff',
        borderRadius: '4px',
        boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)`,
        overflow: 'hidden',
        position: 'relative',
        '& .leaflet-container': {
            height: '100%',
        },
    },
    app__map__info__container: {
        width: '150px',
    },
    app__map__info__flag: {
        height: '80px',
        width: '100%',
        backgroundSize: '100% 100%',
        marginBottom: theme.spacing(1),
        boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)`,
        '& img': {
            width: '100%',
            height: '100%',
        },
    },
    app__map__info__name: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: theme.palette.grey[800],
    },
    app__map__info__cases: {
        fontSize: '14px',
        marginTop: theme.spacing(1),
        color: theme.palette.grey[600],
    },
}));

const Map = () => {
    const {
        mapCenter,
        mapZoom,
        mapCountries,
        type,
        fetchCountriesList,
        isLoading,
    } = useContext(AppContext);

    const classes = useStyles();

    const ChangeView = () => {
        const map = useMap();
        map.setView(mapCenter, mapZoom);
        return null;
    };

    const casesType = {
        cases: {
            hex: '#EC7063',
            multiplier: 300,
        },
        recovered: {
            hex: '#7dd71d',
            multiplier: 300,
        },
        deaths: {
            hex: '#808B96',
            multiplier: 1200,
        },
    };

    useEffect(() => {
        fetchCountriesList();
    }, []);

    if (isLoading) {
        return (
            <section className='map'>
                <Loading />
            </section>
        );
    }
    return (
        <section className={classes.app__map}>
            <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                scrollWheelZoom={false}
            >
                <ChangeView />
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {mapCountries.map((country, index) => {
                    return (
                        <Circle
                            key={index}
                            center={[
                                country.countryInfo.lat,
                                country.countryInfo.long,
                            ]}
                            fillOpacity={0.2}
                            pathOptions={{
                                color: casesType[type].hex,
                                fillColor: casesType[type].hex,
                            }}
                            radius={
                                Math.sqrt(country[type]) *
                                casesType[type].multiplier
                            }
                        >
                            <Popup>
                                <div
                                    className={
                                        classes.app__map__info__container
                                    }
                                >
                                    <div
                                        className={classes.app__map__info__flag}
                                        style={{
                                            backgroundImage: `url(${country.countryInfo.flag})`,
                                        }}
                                    ></div>
                                    <div
                                        className={classes.app__map__info__name}
                                    >
                                        {country.country}
                                    </div>
                                    <div
                                        className={
                                            classes.app__map__info__cases
                                        }
                                    >
                                        Cases:{' '}
                                        {numeral(country.cases).format('0,0')}
                                    </div>
                                    <div
                                        className={
                                            classes.app__map__info__cases
                                        }
                                    >
                                        Recovered:{' '}
                                        {numeral(country.recovered).format(
                                            '0,0'
                                        )}
                                    </div>
                                    <div
                                        className={
                                            classes.app__map__info__cases
                                        }
                                    >
                                        Deaths:{' '}
                                        {numeral(country.deaths).format('0,0')}
                                    </div>
                                </div>
                            </Popup>
                        </Circle>
                    );
                })}
            </MapContainer>
        </section>
    );
};

export default Map;
