import * as turf from '@turf/turf';

/**
 * Creates a buffered layer from the given layer and buffer distance.
 * @param {Object} layer - The GeoJSON layer to buffer.
 * @param {number} distance - The buffer distance in meters.
 * @param {string} name - The name of the resulting layer.
 * @returns {Object} - The new buffered layer.
 */
export function createBufferedLayer(layer, distance, name) {
    const bufferedData = turf.buffer(layer, distance, { units: 'meters' });
    return generateLayerFromGeoJSON(bufferedData, 'fill', `${name}-${distance}`);
}

/**
 * Creates a union of two layers.
 * @param {Object} layer1 - The first GeoJSON layer.
 * @param {Object} layer2 - The second GeoJSON layer.
 * @param {string} name - The name of the resulting layer.
 * @returns {Object} - The new union layer or null if no result.
 */
export function createUnionLayer(layer1, layer2, name) {
    const unionData = turf.union(layer1, layer2);
    if (unionData === null) {
        alert("No result from union operation");
        return null;
    } else {
        return generateLayerFromGeoJSON(unionData, 'fill', `${name}-union`);
    }
}

/**
 * Creates an intersection of two layers.
 * @param {Object} layer1 - The first GeoJSON layer.
 * @param {Object} layer2 - The second GeoJSON layer.
 * @param {string} name - The name of the resulting layer.
 * @returns {Object} - The new intersection layer or null if no result.
 */
export function createIntersectionLayer(layer1, layer2, name) {
    const intersectionData = turf.intersect(layer1, layer2);
    if (intersectionData === null) {
        alert("No result from intersection operation");
        return null;
    } else {
        return generateLayerFromGeoJSON(intersectionData, 'fill', `${name}-intersection`);
    }
}



/**
 * Measures the area of a polygon layer.
 * @param {Object} layer - The GeoJSON polygon layer.
 * @param {string} name - The name of the layer.
 */
export function measureArea(layer, name) {
    const area = turf.area(layer);
    alert(`The area of ${name} is ${area.toFixed(2)} square meters`);
}

/**
 * Creates a difference layer by subtracting one layer from another.
 * @param {Object} layer - The base GeoJSON layer.
 * @param {Object} subtractLayer - The GeoJSON layer to subtract.
 * @param {string} name - The name of the resulting layer.
 * @returns {Object} - The new difference layer or null if no result.
 */
export function createDifferenceLayer(layer, subtractLayer, name) {
    const differenceData = turf.difference(layer, subtractLayer);
    if (differenceData === null) {
        alert("No result from difference operation");
        return null;
    } else {
        return generateLayerFromGeoJSON(differenceData, 'fill', `${name}-difference`);
    }
}

/**
 * Generates a layer object from GeoJSON data.
 * @param {Object} data - The GeoJSON data.
 * @param {string} type - The type of layer (fill, circle, line).
 * @param {string} name - The name of the layer.
 * @returns {Object} - The new layer object.
 */
export function generateLayerFromGeoJSON(data, type, name) {
    switch (type) {
        case 'fill':
            return createFillLayer(data, name);
        case 'circle':
            return createCircleLayer(data, name);
        case 'line':
            return createLineLayer(data, name);
        default:
            console.error("Unrecognized layer type");
            return null;
    }
}

/**
 * Creates a fill layer from GeoJSON data.
 * @param {Object} data - The GeoJSON data.
 * @param {string} name - The name of the layer.
 * @returns {Object} - The new fill layer.
 */
function createFillLayer(data, name) {
    return {
        id: name,
        type: 'fill',
        source: {
            type: 'geojson',
            data: data
        },
        paint: {
            'fill-color': '#ff69b4',
            'fill-opacity': 0.4
        },
        layout: {
            visibility: 'visible'
        }
    };
}

/**
 * Creates a circle layer from GeoJSON data.
 * @param {Object} data - The GeoJSON data.
 * @param {string} name - The name of the layer.
 * @returns {Object} - The new circle layer.
 */
function createCircleLayer(data, name) {
    return {
        id: name,
        type: 'circle',
        source: {
            type: 'geojson',
            data: data
        },
        paint: {
            'circle-color': '#e23f04',
            'circle-radius': 6,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        },
        layout: {
            visibility: 'visible'
        }
    };
}

/**
 * Creates a line layer from GeoJSON data.
 * @param {Object} data - The GeoJSON data.
 * @param {string} name - The name of the layer.
 * @returns {Object} - The new line layer.
 */
function createLineLayer(data, name) {
    return {
        id: name,
        type: 'line',
        source: {
            type: 'geojson',
            data: data
        },
        paint: {
            'line-color': '#ff69b4',
            'line-width': 1
        },
        layout: {
            visibility: 'visible'
        }
    };
}
