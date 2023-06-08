import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, Circle, useMapEvent, useMapEvents } from 'react-leaflet';

const deliveryData = require('../data/data.json');


export default function MapDistribution() {

    const [dataFreq, setDataFreq] = useState([]);

    const getDistribution = (dataTemp) => {
        var dataTemp2 = [];
        dataTemp.forEach((d) => {
            dataTemp2.push({
                lng: d.longitude,
                lat: d.latitude,
                flag: 0,
            });
        });

        // const data = dataTemp2;
        var dataTemp3 = [];
        for (let i = 0; i < dataTemp2.length; i++) {
            const elem = dataTemp2[i];
            if (dataTemp2[i].flag)
                continue;

            var cnt = 0;
            for (let j = 0; j < dataTemp2.length; j++) {
                if (
                    elem.lat === dataTemp2[j].lat &&
                    elem.lng === dataTemp2[j].lng
                ) {
                    cnt++;
                    dataTemp2[j].flag = 1;
                }
            }


            dataTemp3.push({ lat: elem.lat, lng: elem.lng, value: cnt });

        }

        const data = dataTemp3;
        console.log(data);
        setDataFreq(data);
    }

    useEffect(() => {
        getDistribution(deliveryData);

    }, []);

    return (

        <>

            <div className='my-5 p-5'>

                <div className="row">

                    <div className="col-6">
                        <div className='map-2'>
                            <MapContainer
                                className='shadow-5-strong'
                                center={[12.9716, 77.5946]}
                                // crs = {L.CRS.EPSG3857}
                                zoom={13}
                                zoomControl={true}
                                preferCanvas={false}>

                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />

                                {

                                    dataFreq.map((d) => {
                                        var lat = d.lat;
                                        var lng = d.lng;
                                        var value = d.value;
                                        // console.log(value);

                                        return <Circle center={[lat, lng]} pathOptions={{
                                            "color": "None", "fillColor": "#00695C", "fillOpacity": "0.5", "name": "P-2", "interactive": "true"
                                        }} radius={value * 50}>
                                            <Popup>
                                                <p className='fs-6'>No of orders: {value}</p>
                                            </Popup>
                                        </Circle>

                                    })
                                }

                            </MapContainer>
                        </div>
                    </div>

                    <div className="col-5">
                        <h3 className='display-4 my-4 fw-bold'>Central Neighborhoods Dominate Online Food Orders</h3>

                        <p className='fs-5 mt-4' style={{ "textAlign": "justify", "textJustify": "inter-word" }}> When it comes to online food ordering, the central neighborhoods of Bangalore are the clear winners. Gandhinagar, Indiranagar, and Koramangala are particularly popular, with residents of these areas enjoying a wide range of restaurants and clubs. </p>

                        <p className='fs-5 mt-4' style={{ "textAlign": "justify", "textJustify": "inter-word" }}> It's no surprise that these neighborhoods are also some of the city's most well-off, as residents have the means to enjoy the finer things in life. So, whether you're a local looking for the best places to order in or a foodie visiting the city, these hotspots are sure to satisfy your appetite.</p>

                        <hr className='hr hr-blurry mt-5' />

                    </div>
                </div>


            </div>

        </>

    )
}
