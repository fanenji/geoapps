var GeoApp = GeoApp || {}

GeoApp.config = {
  style: 'mapbox://styles/mapbox/dark-v9', // 'mapbox://styles/mapbox/dark-v9' 'mapbox://styles/stefanoparodi/cj8zs4h59byfm2slhym11xhl4'
  sources: [
    {
      name: 'toponimi',
      type: 'geojson',
      url: '/geoservices/data/toponimi.json',
    },
    {
      name: 'edifici',
      type: 'geojson',
      url: '/geoservices/data/edifici.json',
    },
  ],
  layers: [
    {
      type: 'heatmap',
      source: 'toponimi',
      paint: {
        opacity: {
          default: 1,
          stops: [[9, 1], [13, 0]],
        },
      },
      before: 'waterway-label',
    },
    {
      type: 'circle',
      source: 'toponimi',
      minzoom: 12,
      paint: {
        color: 'blue',
        radius: 8,
      },
      before: 'waterway-label',
      popup: 'basic',
    },
    {
      type: 'fill-extrusion',
      source: 'edifici',
      minzoom: 12,
      paint: {
        color: '#aaa',
        height: { property: 'Q_EDIFICIO', type: 'identity' },
        //base: { property: 'base_height', type: 'identity' }
      },
      before: 'waterway-label',
      popup: 'basic',
    },
  ],
  onClick: function(map, e) {
    new mapboxgl.Popup()
      .setLngLat(e.features[0].geometry.coordinates)
      .setHTML('<b>Toponimo:</b><br /> ' + e.features[0].properties['NOME'])
      .addTo(map)
  },
}