import * as React from 'react';
import MapComponent, { Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GeoJSONSourceOptions } from 'mapbox-gl';
import { LayerProps } from 'react-map-gl/dist/es5';

const mapboxAccessToken = '';

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

function Map() {
  return (
    <MapComponent
      initialViewState={{
        longitude: -122.45,
        latitude: 37.78,
        zoom: 14,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={mapboxAccessToken}
    >
      <Source id="my-data" type="geojson" data={geojson}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Layer {...layerStyle} />
      </Source>
    </MapComponent>
  );
}

export default Map;
