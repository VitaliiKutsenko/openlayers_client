/*global ol*/
import { accuracyFeatureStyle, flyTo, positionFeatureStyle } from './geolocationStyle';

export const geolocation = (map, view) => {
  const geolocation = new ol.Geolocation({
    trackingOptions: { enableHighAccuracy: true },
    projection: view.getProjection(),
  });
  const accuracyFeature = new ol.Feature();
  const positionFeature = new ol.Feature();

  function el(id) {
    return document.getElementById(id);
  }

  el('track-position').addEventListener('click', e => {
    e.target.classList.toggle('track');

    if (e.target.classList.contains('track')) {
      geolocation.setTracking(e.target);

      geolocation.on('error', error => {
        const info = document.getElementById('info');

        info.innerHTML = error.message;
        info.style.display = '';
      });

      geolocation.on('change:accuracyGeometry', () => {
        accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
      });

      geolocation.once('change', () => flyTo(geolocation.values_.position, () => {}, view));

      positionFeature.setStyle(positionFeatureStyle);

      accuracyFeature.setStyle(accuracyFeatureStyle);

      geolocation.on('change:position', () => {
        const coordinates = geolocation.getPosition();

        positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
      });
    } else {
      geolocation.setTracking(false);
      accuracyFeature.setStyle(null);
      positionFeature.setStyle(null);
      positionFeature.setGeometry(null);
      accuracyFeature.setGeometry(null);
    }
  });

  new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({ features: [accuracyFeature, positionFeature] }),
  });
};
