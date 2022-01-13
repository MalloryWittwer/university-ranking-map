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
    if (area === "usa") {
      this.setState({
        bounds: [
          [-100, 60],
          [-110, 15],
        ],
      });
    } else if (area === "europe") {
      this.setState({
        bounds: [
          [25, 70],
          [0, 30],
        ],
      });
    } else {
      this.setState({
        bounds: [
          [180, 90],
          [-180, -70],
        ],
      });
    }
  }

  componentDidMount = () => {
    fetch(process.env.PUBLIC_URL + '/data-ranking.json')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ rankingData: data });
        let markers = [];
        for (const [university, element] of Object.entries(data)) {
          markers.push({
            university: university,
            rank: element.rank,
            lat: element.lat,
            lng: element.lng,
            url: element.url,
          });
        }
        this.setState({ markers: markers });
      });
  };

  render() {
    return (
      <div className="app">
        <div className="controls">
          <MapSelector actionFnct={this.setBounds} />
          <Slider actionFnct={this.updateMarkers} />
        </div>
        <Map markers={this.state.markers} bounds={this.state.bounds} />
      </div>
    );
  }
}

export default App;
