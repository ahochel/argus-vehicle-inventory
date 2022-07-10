// @ts-ignore
import randomLocation from 'random-location';

type GeoPoint = {
  latitude: Number;
  longitude: Number;
};

const centerPoint: GeoPoint = { latitude: 52.191097, longitude: 19.355406 };
const radiusInKM = 10;
const radius = radiusInKM * 1000; // meters

const generateRandomGeoPoint = () => {
  const { latitude, longitude }: GeoPoint =
    randomLocation.randomCircumferencePoint(centerPoint, radius);

  return { latitude, longitude };
};

export default generateRandomGeoPoint;
