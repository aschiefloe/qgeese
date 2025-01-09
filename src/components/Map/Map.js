import React, { Component } from 'react';
import './map.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW5nZWJ1IiwiYSI6ImNsdzBmM3kwZjAwOXkya29jenVneDlmdG0ifQ.Hzz9UqUZlisks55rAd7nvg';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      latitude: 63.425113,
      longitude: 10.400841,
      zoomLevel: 13.53,
    };
    this.mapContainer = React.createRef();
  }

  // Lifecycle method called when the component is mounted
  componentDidMount() {
    this.initializeMap("mapbox://styles/mapbox/light-v10");
  }

  /**
   * Initializes the map with the given style, sets center coordinates, and zoom level
   * Adds layers to the map and updates state on map move
   * @param {string} style - The style URL for the map
   */
  initializeMap(style) {
    const { longitude, latitude, zoomLevel } = this.state;
    const { allAvailableLayers } = this.props;

    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: style,
      center: [longitude, latitude],
      zoom: zoomLevel,
    });

    this.map.on('load', () => {
      allAvailableLayers.forEach((layer) => {
        this.map.addLayer(layer);
      });
    });

    this.map.on('move', () => {
      const { lng, lat } = this.map.getCenter();
      this.setState({
        longitude: lng.toFixed(4),
        latitude: lat.toFixed(4),
        zoomLevel: this.map.getZoom().toFixed(2),
      });
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  }

  /**
   * Adds a new layer to the map
   * @param {Object} layer - The layer object to be added to the map
   */
  addLayerToMap(layer) {
    this.map.addLayer(layer);
  }

  /**
   * Changes the map style to a new style given by mapStyle
   * @param {string} mapStyle - The style URL for the new map style
   */
  switchMapStyle(mapStyle) {
    this.map.setStyle(mapStyle);
  }

  /**
   * Updates the layers on the map by showing new layers and hiding specified layers
   * @param {Array<string>} layersToShow - Array of layer IDs to be shown
   * @param {Array<string>} layersToHide - Array of layer IDs to be hidden
   */
  manageMapLayers(layersToShow, layersToHide) {
    this.hideLayers(layersToHide);
    this.showLayers(layersToShow);
  }

  /**
   * Hides the specified layers on the map
   * @param {Array<string>} layers - Array of layer IDs to be hidden
   */
  hideLayers(layers) {
    layers.forEach((layerId) => {
      if (this.map.getLayer(layerId)) {
        this.map.setLayoutProperty(layerId, 'visibility', 'none');
      }
    });
  }

  /**
   * Shows the specified layers on the map
   * @param {Array<string>} layers - Array of layer IDs to be shown
   */
  showLayers(layers) {
    layers.forEach((layerId) => {
      if (this.map.getLayer(layerId)) {
        this.map.setLayoutProperty(layerId, 'visibility', 'visible');
      }
    });
  }

  render() {
    return <div className="map" ref={this.mapContainer} />;
  }
}

export default Map;
