import { FETCH_GEO_INFO } from './actionsType';
import { store } from './store';

export const fetchGeoInfo = payload =>
  store({
    type: FETCH_GEO_INFO,
    payload,
  });
