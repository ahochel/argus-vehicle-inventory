import * as React from 'react';
import MapComponent, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  Source,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GeoJSONSourceOptions } from 'mapbox-gl';
import { LayerProps } from 'react-map-gl/dist/es5';
import { useMemo, useState } from 'react';
import { Car } from 'tabler-icons-react';
import useFetchData, { HTTPMethods } from '../../../hooks/useFetchData';
import { VehicleData } from '../../Vehicles/VehiclesTable';
import { Unpacked } from '../../../utils/types';
import { formatLocaleDateTime } from '../../../helpers/formatLocaleDateTime';

const centerPoint = { latitude: 52.191097, longitude: 19.355406 };
const geojson: GeoJSONSourceOptions['data'] = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [-122.4, 37.8] },
      properties: {},
    },
  ],
};

const layerStyle: LayerProps = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf',
  },
};

const BACKEND_URL = 'https://ahochel-vehicle-inventory.herokuapp.com/api';

// FIXME: Rename _id to vehicleId
/* eslint-disable no-underscore-dangle */
function Map() {
  const { data } = useFetchData<{
    data: VehicleData;
  }>(HTTPMethods.GET, `${BACKEND_URL}/vehicle`);
  const [popupInfo, setPopupInfo] = useState<Unpacked<VehicleData> | null>(
    null
  );

  const pins = useMemo(
    () =>
      data &&
      data.data.map((vehicle) => (
        <Marker
          key={`marker-vehicle-${vehicle._id}`}
          longitude={vehicle.lastGeolocationPoint.longitude}
          latitude={vehicle.lastGeolocationPoint.latitude}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(vehicle);
          }}
        >
          <Car size={48} strokeWidth={1.5} color="#4065bf" />
        </Marker>
      )),
    [data]
  );

  return (
    <MapComponent
      initialViewState={{
        ...centerPoint,
        zoom: 5,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1IjoieGFyYWZvMTM3MyIsImEiOiJja3p6Z2dqMmswOXk3M3BueHB6a3N2MGYwIn0.tfxJ6QACnYCVOS0ZJM7oJw"
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      {pins}

      {popupInfo && (
        <Popup
          anchor="top"
          maxWidth="400"
          longitude={Number(popupInfo.lastGeolocationPoint.longitude)}
          latitude={Number(popupInfo.lastGeolocationPoint.latitude)}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            <strong>Vehicle ID:</strong> {popupInfo._id}
            <br />
            <strong>Vehicle Name:</strong> {popupInfo.vehicleName}
            <br />
            <strong>Car type:</strong> {popupInfo.carType}
            <br />
            <strong>Last position update:</strong>{' '}
            {formatLocaleDateTime(popupInfo.lastSuccessfulConn)}
          </div>
        </Popup>
      )}

      <Source id="my-data" type="geojson" data={geojson}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Layer {...layerStyle} />
      </Source>
    </MapComponent>
  );
}
/* eslint-enable no-underscore-dangle */

export default Map;
