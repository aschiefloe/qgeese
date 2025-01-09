import React, { Component } from 'react';
import Map from './Map/Map';
import MapMenu from './MapMenu/MapMenu';
import allLayers from './datasets/layers';

/**
 * MapWrapper component is a React component that serves as a wrapper for the Map and MapMenu components.
 * It manages the state of the visible layers, background map style, and map visibility.
 * It also provides methods to add a new layer to the map, update the visible layers, and update the background map style.
 */
class MapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAvailableLayers: allLayers,
      visibleLayers: [],
      backgroundMap: 'mapbox://styles/mapbox/light-v10',
      showMap: true, // State variable to control map visibility
    };
    this.mapElement = React.createRef();
    this.addLayerToMap = this.addLayerToMap.bind(this);
    this.updateVisibleLayers = this.updateVisibleLayers.bind(this);
    this.updateBackgroundMap = this.updateBackgroundMap.bind(this);
  }
  
  /**
   * Adds a new layer to the map and updates the state with the new layer
   * @param {Object} layer - The layer object to be added
   */
  addLayerToMap(layer) {
    const { allAvailableLayers, visibleLayers } = this.state;
    this.setState({
      visibleLayers: [...visibleLayers, layer],
      allAvailableLayers: [...allAvailableLayers, layer],
    });
    this.mapElement.current.addLayerToMap(layer);
  }

  /**
   * Handles the change in visible layers on the map
   * Updates the state and the map with new visible layers
   * @param {Array<Object>} updatedLayers - Array of updated layer objects
   */
  updateVisibleLayers(updatedLayers) {
    const currentVisibleLayers = this.state.visibleLayers;
    const newLayers = updatedLayers.filter(layer => !currentVisibleLayers.includes(layer)).map(layer => layer.id);
    const layersToHide = currentVisibleLayers.filter(layer => !updatedLayers.includes(layer)).map(layer => layer.id);

    this.setState({ visibleLayers: updatedLayers });
    this.mapElement.current.manageMapLayers(newLayers, layersToHide);
  }

  /**
   * Handles the change in background map style
   * Updates the state and changes the background map style
   * @param {Object} event - The event object containing the new style value
   */
  updateBackgroundMap(event) {
    const newStyle = event.target.value;
    this.setState({ backgroundMap: newStyle });
    this.mapElement.current.switchMapStyle(newStyle);
  }
  // Render the MapWrapper component

  render() {
    const { allAvailableLayers, visibleLayers, backgroundMap, showMap } = this.state;

    return (
      <div className="root-wrapper">
        <div className="main-container">
          <div className="map-menu-container">
            <MapMenu
                layers={allAvailableLayers}
                visibleLayers={visibleLayers}
                layersChanged={this.updateVisibleLayers}
                addLayer={this.addLayerToMap}
            />
          </div>
          {showMap && (
            <div className="map-container">
              <Map
                allAvailableLayers={allAvailableLayers}
                visibleLayers={visibleLayers}
                backgroundMap={backgroundMap}
                ref={this.mapElement}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MapWrapper;
