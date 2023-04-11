import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { LocationMarker } from './component/LocationMarker';
import MyMarker from './component/AddMarker';

const icon = new L.Icon({
  iconUrl: 'https://cdn4.iconfinder.com/data/icons/map-pins-2/256/19-512.png',
  iconSize: [30, 30],
});

const Maped = ({ data, onMarkerAdd }) => {

  const styleMap = {
    width: 1200,
    height: 700,
    margin: 100,
  };


  return (
    <div>
      <MapContainer center={[48.8534, 2.3488]} zoom={13} scrollWheelZoom={false} style={styleMap}>
        <TileLayer
          attribution='&amp;copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          {data.map((place) => (
            <Marker key={place.id} draggable={true} position={[place.lat, place.lng]} icon={icon}>
              <Popup>
                <h2>{place.name}</h2>
                <p>{place.description}</p>
              </Popup>
            </Marker>
          ))}
          <MyMarker />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Maped;

