import React, { useEffect } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';
import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';
import VectorImageLayer from 'ol/layer/VectorImage.js';

function MapComponent({ job }) {
  useEffect(() => {
    // Ensure job.latlng is available and properly formatted
    if (!job?.latlng) return;

    // Split the latlng string and convert to numbers
    const [longitude, latitude] = job.latlng.split(',').map(Number);

    if (isNaN(longitude) || isNaN(latitude)) return; // Early exit if coordinates are invalid

    // Create a feature for the point
    const feature = new Feature({
      geometry: new Point(fromLonLat([longitude, latitude])),
    });

    // Create a vector source and layer for the markers
    const vectorSource = new VectorSource({
      features: [feature], // Add the feature to the source
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({
          src: '/pin.png', // Path to your marker icon
          scale: 0.02,
        }),
      }),
    });

    // Initialize the map
    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([longitude, latitude]), // Use the coordinates as the center
        zoom: 10,
      }),
      target: 'map',
    });

    // Cleanup function
    return () => {
      map.setTarget(null); // Proper cleanup to prevent memory leaks
    };
  }, [job]); // Depend on 'job' to re-run the effect when it changes

  return (
    <div
      style={{ height: '300px', width: '100%' }}
      id="map"
      className="map-container"
    />
  );
}

export default MapComponent;
