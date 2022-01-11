import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Popup from "./popup";

const key = process.env.REACT_APP_MAPBOX_API_KEY;

class Map extends Component {
  removeAllMarkers() {
    this.currentMarkers.forEach((m) => m.remove());
  }

  addMarker(marker) {
    const popup = new mapboxgl.Popup();
    const popupContent = <Popup marker={marker} />;
    popup.setHTML(ReactDOMServer.renderToString(popupContent));
    const element = document.createElement("div");
    element.className = "marker";
    const m = new mapboxgl.Marker(element);
    m.setLngLat([marker.lng, marker.lat]).setPopup(popup).addTo(this.map);
    this.currentMarkers.push(m);
  }

  updateMarkers() {
    this.removeAllMarkers();
    if (this.props.markers.length > 0) {
      const { markers } = this.props;
      markers.forEach((m) => this.addMarker(m));
    }
  }

  updateBounds() {
    const { bounds } = this.props;
    const boundaries = new mapboxgl.LngLatBounds();
    boundaries.extend(bounds[0]);
    boundaries.extend(bounds[1]);
    this.map.fitBounds(boundaries, { duration: 500 });
  }

  componentDidUpdate() {
    this.updateMarkers();
    this.updateBounds();
  }

  componentDidMount() {
    mapboxgl.accessToken = key;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v10",
      projection: "equirectangular",
      interactive: false,
      minZoom: 1.6,
      dragPan: false,
    });
    map.scrollZoom.disable();
    this.map = map;
    this.map.resize();
    this.currentMarkers = [];
    this.updateMarkers();
    this.updateBounds();

    // console.log(this.map.getStyle());
  }

  render() {
    return <div id="map"></div>;
  }
}

export default Map;
