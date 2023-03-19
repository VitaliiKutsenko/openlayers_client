/* global ol */
import './popup.scss';
import { showPopup } from './popupInfo';
import { selectStyle } from './popupStyle';

export const popup = map => {
  const container = document.getElementById('popup');
  const content = document.getElementById('popup-content');
  const closer = document.getElementById('popup-closer');

  const overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: { duration: 250 },
  });

  map.addOverlay(overlay);

  let selected;

  map.on('pointermove', e => {
    const message = {
      id: '',
      sphere: '',
    };

    if (selected !== null) {
      selected?.setStyle(undefined);
      selected = null;
    }

    map.forEachFeatureAtPixel(e.pixel, feature => {
      message.id = feature.id_;
      message.sphere = ol.sphere.getArea(feature.getGeometry(), 'EPSG:3857', 6378137);

      if (feature.id_) {
        switch (feature.getGeometry().getType()) {
          case 'Polygon':
            selected = feature;
            feature.setStyle(selectStyle);
            break;
        }
      }

      return true;
    });

    showPopup(e, message, map, content, overlay);

    if (!map.hasFeatureAtPixel(e.pixel)) {
      overlay.setPosition(undefined);
      closer.blur();
    }
  });
};
