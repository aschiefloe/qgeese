import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './menu.css'; // Import your CSS file
import ToolMenu from './ToolMenu'; // Adjust the path if needed

import { HideIcon, ShowIcon } from '../Icons/index.js';
import { createBufferedLayer, createUnionLayer, createIntersectionLayer, createDifferenceLayer, measureArea } from '../MapTools/tools.js';

// Function for rendering individual layers in the layer menu
function LayerDiv(props) {
  const { name, active } = props;

  if (active) {
    return (
      <div className="active-layer layer">
        {name} <ShowIcon />
      </div>
    );
  } else {
    return (
      <div className="disabled-layer layer">
        {name} <HideIcon />
      </div>
    );
  }
}

// Main MapMenu component that renders the layer and tool menus
class MapMenu extends Component {
  constructor(props) {
    super(props);

    this.handleBufferSubmit = this.handleBufferSubmit.bind(this);
    this.handleOtherSubmit = this.handleOtherSubmit.bind(this);
    this.handleMeasurementSubmit = this.handleMeasurementSubmit.bind(this);
  }

  // Function for rendering the list of layers in the layer menu
  renderLayerList = (layers, visibleLayers) => {
    return layers.map(layer => {
      const active = visibleLayers.includes(layer);
      const layerTag = layer.id;
      return (
        <div
          onClick={(e) => this.handleLayerOnClick(layer.id, e)}
          key={layer.id}
        >
          <LayerDiv 
            active={active} 
            name={layerTag} 
          />
        </div>
      );
    });
  }

  handleLayerOnClick = (id, event) => {
    const { layers, visibleLayers } = this.props;
    let updatedLayers = [];
    const clickedLayer = layers.find(layer => layer.id === id);
    if (visibleLayers.includes(clickedLayer)) {
      updatedLayers = visibleLayers.filter(l => l.id !== id);
    } else {
      updatedLayers = [...visibleLayers, clickedLayer];
    }
    this.props.layersChanged(updatedLayers);
  }

  handleBufferSubmit(event) {
    event.preventDefault();
    const layerID = event.target.getElementsByClassName("bufferSelect")[0].value;
    const bufferDist = event.target.getElementsByClassName("bufferDist")[0].value;
    const layer = this.props.layers.find(layer => layer.id === layerID);
    const bufferedLayer = createBufferedLayer(layer.source.data, bufferDist, layerID);
    this.props.addLayer(bufferedLayer);
  }

  handleOtherSubmit(event) {
    event.preventDefault();
    const toolType = event.target.className;
    const layerOneID = event.target.getElementsByClassName("select-one")[0].value;
    const layerTwoID = event.target.getElementsByClassName("select-two")[0].value;
    const layerOne = this.props.layers.find(layer => layer.id === layerOneID);
    const layerTwo = this.props.layers.find(layer => layer.id === layerTwoID);
    let newLayer;
    switch (toolType) {
      case 'intersection-form':
        newLayer = createIntersectionLayer(layerOne.source.data, layerTwo.source.data, `${layerOneID}-${layerTwoID}`);
        break;
      case 'difference-form':
        newLayer = createDifferenceLayer(layerOne.source.data, layerTwo.source.data, `${layerOneID}-${layerTwoID}`);
        break;
      case 'union-form':
        newLayer = createUnionLayer(layerOne.source.data, layerTwo.source.data, `${layerOneID}-${layerTwoID}`);
        break;
      default:
        console.log("ToolType not recognized");
    }
    if (newLayer) this.props.addLayer(newLayer);
  }

  handleMeasurementSubmit(event) {
    event.preventDefault();
    const toolType = event.target.className;
    const layerID = event.target.getElementsByClassName("measurement-select")[0].value;
    const layer = this.props.layers.find(layer => layer.id === layerID);     

    switch (toolType) {
      case 'area-form':
        measureArea(layer.source.data, layerID);
        break;
      default:
        console.log("ToolType not recognized");
    }
  }

  render() {
    const { layers, visibleLayers } = this.props;
    const layerMenuHeading = (
      <div className="collapsible-header">
        <h2>Layers</h2>
        <span className="arrow-icon">▼</span>
      </div>
    );
    const toolsMenuHeading = (
      <div className="collapsible-header">
        <h2>Tools</h2>
        <span className="arrow-icon">▼</span>
      </div>
    );

    return (
      <div className="menu-container">
        <div className="menu-header">
          <h1>QGEESE</h1>
          <p>A simple GIS for all silly geese</p>
        </div>
        <div className="layers-menu-container">
          <Collapsible trigger={layerMenuHeading} open={true}>
            {this.renderLayerList(layers, visibleLayers)}
          </Collapsible>
        </div>
        <div className="tools-menu-container">
          <Collapsible trigger={toolsMenuHeading} open={true}>
            <ToolMenu
              bufferToolSubmit={this.handleBufferSubmit}
              handleOtherToolSubmit={this.handleOtherSubmit}
              handleMeasurementSubmit={this.handleMeasurementSubmit}
              layers={layers}
            />
          </Collapsible>
        </div>
      </div>
    );
  }
}

export default MapMenu;
