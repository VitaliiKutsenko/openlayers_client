import './style/index.scss';
import './components/geolocation/geolocation';
import { geolocation } from './components/geolocation/geolocation';
import { popup } from './components/popup/popup';
import { rasterLayer } from './layers/geoJSON';
import { layers } from './layers/layers';

/*global ol*/
window.onload = () => {
  const view = new ol.View({
    center: [0, 0],
    zoom: 1,
  });

  const map = new ol.Map({
    target: 'map',
    view: view,
  });

  map.addLayer(layers);
  map.addLayer(rasterLayer);

  popup(map);

  geolocation(map, view);
};
