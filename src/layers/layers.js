import './layers.scss';

/*global ol*/
export const osmStandard = new ol.layer.Tile({
  source: new ol.source.OSM(),
  title: 'OSM',
  visible: true,
});
export const additionalLayers = {
  worldTopoMap: new ol.layer.Tile({
    source: new ol.source.XYZ({
      attributions:
        'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
        'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
      url:
        'https://server.arcgisonline.com/ArcGIS/rest/services/' +
        'World_Topo_Map/MapServer/tile/{z}/{y}/{x}.png',
    }),
    title: 'worldTopoMap',
    visible: false,
  }),
  stamenTerrain: new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png',
    }),
    title: 'stamenTerrain',
    visible: false,
  }),
};

export const layers = new ol.layer.Group({
  layers: [osmStandard, additionalLayers.stamenTerrain, additionalLayers.worldTopoMap],
});

const select = document.querySelector('#select-map');

select.addEventListener('change', e => {
  const options = e.target.options;
  const index = options.selectedIndex;
  const value = options[index].value;

  layers.getLayers().forEach(item => {
    const title = item.get('title');

    item.setVisible(value === title);
  });
});
