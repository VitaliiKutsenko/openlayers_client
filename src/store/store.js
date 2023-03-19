import { FETCH_GEO_INFO } from './actionsType';

export const state = {};
export const store = ({ type, payload }) => {
  switch (type) {
    case FETCH_GEO_INFO:
      const { id } = payload;

      if ('properties' in payload) {
        const { properties } = payload;

        return (state[id] = properties);
      }

      return (state[id] = { message: 'информация отсутсвует' });

    default:
      return state;
  }
};
