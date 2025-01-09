//Denne filen tar inn GeoJSON-objekter fra './geojsondata.js' og lager objekter klare til å legges på kartet som kartlag vha mapbox

import { festningen,kafeer, marinen, skansen, bussrute } from './geojsondata'

const layer_gloshaugen = {
  "id": "festningen",
  "type": "fill",
  "source": {
    type: 'geojson',
    data: festningen
  },
  "paint": {
    "fill-color": "#1E90FF", // Use color property directly
    "fill-opacity": 0.4
  },
  "layout": {
    "visibility": "none"
  }
}

const layer_dragvoll = {
  "id": "marinen",
  "type": "fill",
  "source": {
    type: 'geojson',
    data: marinen
  },
  "paint": {
    "fill-color": "#8B008B ", // Use color property directly
    "fill-opacity": 0.4
  },
  "layout": {
    "visibility": "none"
  }
}

const layer_kalvskinnet = {
  "id": "skansen",
  "type": "fill",
  "source": {
    type: 'geojson',
    data: skansen
  },
  "paint": {
    "fill-color": "#FFA500 ", // Use color property directly
    "fill-opacity": 0.4
  },
  "layout": {
    "visibility": "none"
  }
}




const layer_frisbegolf = {
"id": "kafeer",
"type": "circle",
"source": {
  type: 'geojson',
  data: kafeer
},
"paint": {
  "circle-color": "#4b5acc",
  "circle-radius": 5,
  "circle-stroke-width": 1,
  "circle-stroke-color": "#fff"
},
"layout":{
  "visibility":"none"
}
}

const layer_publicTransportRoutes  = {
  "id": "bussrute",
  "type": "line",
  "source": {
    type: 'geojson',
    data: bussrute
  },
  "paint": {
    "line-color": "#4b5acc",
    "line-width": 1
  },
  "layout":{
    "visibility":"none"
  }
}




const allLayers = [ layer_gloshaugen, layer_dragvoll,layer_kalvskinnet, layer_frisbegolf, layer_publicTransportRoutes]



// Export the allLayers array
export default allLayers;

