import { debounce } from '../services';
import { state } from '../../store/store';
import { getGeoInfo } from '../../api/api';

export const popupInfo = (info, content, message) => {
  let str = ``;

  for (let [keys, values] of Object.entries(info)) {
    str += `<div>
            <p>${keys.toLowerCase()}:</p>
            <span>${values}</span>
            </div>`;
  }

  return `<section>${str}
            <div>
            <p>площадь:</p>
            <span>${Math.round(message.sphere)}&#13217</span>
            </div>
</section>`;
};

export const showPopup = debounce((e, message, map, content, overlay) => {
  const coordinate = e.coordinate;

  if (!message.id) {
    return;
  }

  if (map.hasFeatureAtPixel(e.pixel)) {
    if (message.id in state) {
      const info = state[message.id];

      content.innerHTML = popupInfo(info, content, message);
      overlay.setPosition(coordinate);
    } else {
      getGeoInfo(message.id).then(info => {
        content.innerHTML = popupInfo(info, content, message);
        overlay.setPosition(coordinate);
      });
    }
  }
}, 300);
