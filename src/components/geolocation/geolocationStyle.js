/*global ol*/
export const positionFeatureStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({ color: '#3399CC' }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 1,
    }),
  }),
});

export const accuracyFeatureStyle = new ol.style.Style({
  fill: new ol.style.Fill({ color: 'rgba(51,153,204,0.33)' }),
  stroke: new ol.style.Stroke({
    color: '#fff',
    width: 1,
  }),
});

export const flyTo = (location, done, view) => {
  const duration = 1000;
  const zoom = view.getZoom();

  let parts = 1;
  let called = false;

  function callback(complete) {
    --parts;

    if (called) {
      return;
    }

    if (parts === 0 || !complete) {
      called = true;
      done(complete);
    }
  }

  view.animate(
    {
      center: location,
      duration: duration,
    },
    callback
  );

  view.animate(
    {
      zoom: zoom - 1,
      duration: duration / 2,
    },
    {
      zoom: 10,
      duration: duration,
    },
    callback
  );
};
