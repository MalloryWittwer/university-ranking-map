import React, { Component } from "react";

class Slider extends Component {
  handleUpdate = (event) => {
    this.props.actionFnct(event.target.value);
  };

  changeInputLabel = (event) => {
    event.target.nextElementSibling.value = `Max rank: ${event.target.value}`;
  };

  componentDidMount() {
    const slider = document.getElementById("range-slider");
    const defaultValue = 100;
    slider.value = defaultValue;
  }

  render() {
    return (
      <div className="range-container">
        <input
          type="range"
          className="range"
          name="rank"
          min="1"
          max="100"
          onChange={this.handleUpdate}
          onInput={this.changeInputLabel}
          id="range-slider"
        />
        <output>Max rank: 100</output>
      </div>
    );
  }
}

export default Slider;
