import "../index.css";
import React, { Component } from "react";
import Slider from "./slider";
import Map from "./map";
import MapSelector from "./select";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankingData: null,
      countries: null,
      options: null,
      boxes: null,
      markers: [],
      bounds: [
        [180, 90],
        [-180, -70],
      ],
    };
    this.updateMarkers = this.updateMarkers.bind(this);
    this.setBounds = this.setBounds.bind(this);
  }

  updateMarkers(maxRank) {
    let markers = [];
    for (const [university, element] of Object.entries(
      this.state.rankingData
    )) {
      if (Number.parseFloat(element.rank) <= Number.parseFloat(maxRank)) {
        markers.push({
          university: university,
          rank: element.rank,
          lat: element.lat,
          lng: element.lng,
          url: element.url,
        });
      }
    }
    this.setState({ markers: markers });
  }

  setBounds(area) {
    this.setState({ bounds: this.state.boxes[area] });
  }

  handleRankingData = () => {
    fetch(process.env.PUBLIC_URL + "/data-ranking.json")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ rankingData: data });
        let markers = [];
        let countries = new Set([]);
        for (const [university, element] of Object.entries(data)) {
          markers.push({
            university: university,
            rank: element.rank,
            lat: element.lat,
            lng: element.lng,
            url: element.url,
          });
          countries.add(element.country);
        }
        this.setState({
          markers: markers,
          countries: countries,
        });
      });
  };

  handleBoundingBoxes = () => {
    fetch(process.env.PUBLIC_URL + "/country-boxes.json")
      .then((response) => response.json())
      .then((data) => {
        let boxes = {};
        let options = [];

        // Add World
        options.push({ value: "World", label: "World" });
        boxes["World"] = [
          [180, 90],
          [-180, -70],
        ];

        // Add Europe
        options.push({ value: "Europe", label: "Europe" });
        boxes["Europe"] = [
          [25, 70],
          [0, 30],
        ];

        // Add countries with at least 1 university
        for (const [countryKey, element] of Object.entries(data)) {
          if (this.state.countries.has(countryKey)) {
            const country = element[0];
            const box = [
              [element[1][0], element[1][1]],
              [element[1][2], element[1][3]],
            ];
            boxes[country] = box;
            options.push({ value: country, label: country });
          }
        }

        this.setState({
          options: options,
          boxes: boxes,
        });
      });
  };

  componentDidMount = () => {
    this.handleRankingData();
    this.handleBoundingBoxes();
  };

  render() {
    return (
      <div className="app">
        <Map markers={this.state.markers} bounds={this.state.bounds} />
        <div className="controls">
          <MapSelector
            actionFnct={this.setBounds}
            options={this.state.options}
          />
          <Slider actionFnct={this.updateMarkers} />
        </div>
      </div>
    );
  }
}

export default App;
