import { fetchGeoInfo } from '../store/actions';

export const getGeoInfo = id => {
  try {
    const data = fetch(`https://openlayers-server.vercel.app/api/geoinfo?id=${id}`);

    return data
      .then(info => info.json())
      .then(infoData => {
        return fetchGeoInfo(...infoData);
      });
  } catch (e) {
    console.log(e);
  }
};

export const postGeoJSON = payload => {
  try {
    const data = fetch(`https://openlayers-server.vercel.app/api/geojson`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: payload,
    });

    return data.then(info => info.status);
  } catch (e) {
    console.log(e);
  }
};
