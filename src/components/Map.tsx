import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@chakra-ui/react";
import { LatLngExpression } from "leaflet";
import axios from "axios";
import { useEffect, useState } from "react";

const Map = ({
  lat,
  lng,
  locationName,
}: {
  lat?: number;
  lng?: number;
  locationName: string;
}) => {
  const [coordinates, setCoordinates] = useState<LatLngExpression | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (lat && lng) {
        setCoordinates([lat, lng]);
      } else if (locationName) {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${locationName}&limit=1`
          );

          if (response.data && response.data[0]) {
            const { lat: newLat, lon: newLng } = response.data[0];
            setCoordinates([parseFloat(newLat), parseFloat(newLng)]);
          }
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
      }
    };

    fetchCoordinates();
  }, [lat, lng, locationName]);

  return (
    <Box
      width={["100%", "100%", "600px"]}
      height={["300px", "300px", "400px"]}
      borderRadius="20px"
      marginTop={["20px", "20px", "40px"]}
    >
      <MapContainer
        center={coordinates || [51.5074, 0.1278]}
        zoom={coordinates ? 13 : 4}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {coordinates && (
          <Marker position={coordinates}>
            <Popup>{locationName}</Popup>
          </Marker>
        )}
      </MapContainer>
    </Box>
  );
};

export default Map;
