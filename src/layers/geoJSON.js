/*global ol*/

import { postGeoJSON } from '../api/api';

const styles = {
  Point: new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 26],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: '../public/svgs1.svg',
      scale: 0.7,
    }),
  }),
  Polygon: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#138b4f',
      width: 3,
    }),
    fill: new ol.style.Fill({ color: '#6dd97f' }),
  }),
};

const styleFn = (feature, resolution) => {
  if (feature.getGeometry().getType() === 'Point') {
    return resolution < 288 ? styles[feature.getGeometry().getType()] : null;
  } else {
    return styles[feature.getGeometry().getType()];
  }
};

export const rasterLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'http://localhost:5000/api/geojson',
    format: new ol.format.GeoJSON({ featureProjection: 'EPSG:3857' }),
  }),
  style: styleFn,
  visible: true,
  title: 'map',
});
const input = document.querySelector('#geoJson-input');

input.addEventListener('input', e => {
  const value = e.target.value;

  e.target.nextElementSibling.disabled = !value.includes('FeatureCollection');
});

const button = document.querySelector('#geoJson-button');

button.addEventListener('click', e => {
  const value = e.target.previousElementSibling.value;

  postGeoJSON(value).then(data => (data === 200 ? rasterLayer.getSource().refresh() : null));
});
