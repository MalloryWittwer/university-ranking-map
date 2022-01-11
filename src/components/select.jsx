import React, { Component } from "react";
import Select from "react-select";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px solid #fdba00",
    color: "#fdba00",
    padding: 10,
    background: state.isFocused ? 'black' : 'none',
  }),

  indicatorsContainer: (provided, state) => ({
    ...provided,
    background: "black",
    opacity: 0.8,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    background: "black",
    opacity: 0.8,
    border: "2px solid #333333",
  }),

  indicatorSeparator: (provided, state) => ({
    ...provided,
    background: "#999999",
  }),

  singleValue: (provided, state) => ({
    ...provided,
    color: "#fdba00",
  }),

  menu: (provided, state) => ({
    ...provided,
    background: "rgba(0, 0, 0, 0.8)",
    width: 150,
  }),
};

class MapSelector extends Component {
  handleUpdate = (option) => {
    this.props.actionFnct(option.value);
  };

  render() {
    return (
      <Select
        options={[
          { value: "world", label: "World" },
          { value: "usa", label: "USA" },
          { value: "europe", label: "Europe" },
        ]}
        styles={customStyles}
        defaultValue={{ value: "world", label: "World" }}
        onChange={this.handleUpdate}
        id="map-selector"
      />
    );
  }
}

export default MapSelector;
