import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

const MyMarker = () => {
  const [newMarker, setNewMarker] = useState(null);

  const addMarker = (position, name, description) => {
    const icon = L.icon({
      iconUrl: 'https://cdn4.iconfinder.com/data/icons/map-pins-2/256/19-512.png',
      iconSize: [30, 30],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
    });

    setNewMarker(
      <Marker key={position.toString()} position={position} icon={icon}>
        <Popup>
          <h2>{name}</h2>
          <p>{description}</p>
        </Popup>
      </Marker>,
    );
  };

  useMapEvents({
    click: (event) => {
      const { lat, lng } = event.latlng;
      L.popup()
        .setLatLng([lat, lng])
        .setContent(`
          <form onsubmit="return false">
            <label>
              Nom du lieu:
              <input type="text" id="name" />
            </label>
            <br />
            <label>
              Description:
              <textarea id="description"></textarea>
            </label>
            <br />
            <button type="submit" value="Submit" onclick="submitForm(event)">Ajoutez</button>
          </form>
          <script>
            function submitForm(event) {
              event.preventDefault();
              const name = document.getElementById("name").value;
              const description = document.getElementById("description").value;
              const position = [${lat}, ${lng}];
              addMarker(position, name, description);
            }
          </script>
        `)
        .openOn(event.target);
        console.log({lat, lng});
        
    },
  });
  console.log(newMarker);
  

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {newMarker}
    </MapContainer>
  );
};

export default MyMarker;

