import React, { useContext } from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import { AppContext } from './context';
import numeral from 'numeral';

const Map = () => {
    const { mapCenter, mapZoom, mapCountries, type } = useContext(AppContext);

    const ChangeView = () => {
        const map = useMap();
        map.setView(mapCenter, mapZoom);
        return null;
    };

    const casesType = {
        cases: {
            hex: '#CC1034',
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

    return (
        <section className='map'>
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
                                <div className='info-container'>
                                    <div
                                        className='info-flag'
                                        style={{
                                            backgroundImage: `url(${country.countryInfo.flag})`,
                                        }}
                                    ></div>
                                    <div className='info-name'>
                                        {country.country}
                                    </div>
                                    <div className='info-confirmed'>
                                        Cases:{' '}
                                        {numeral(country.cases).format('0,0')}
                                    </div>
                                    <div className='info-recovered'>
                                        Recovered:{' '}
                                        {numeral(country.recovered).format(
                                            '0,0'
                                        )}
                                    </div>
                                    <div className='info-deaths'>
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
