import API_FILACRECHE from "constants/apiFilaCreche.constants";
import React, { Component } from "react";
import Autosuggest from "react-autosuggest";

export class AutoSuggestAddress extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      addressObject: "",
      suggestions: []
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.value
    });
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  handleClearInput = () => {
    this.setState({
      value: '',
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.resetarFile && !prevProps.resetarFile) {
      this.handleClearInput();
    }
  }

  onSuggestionsFetchRequested = async ({ value }) => {
    if (value.length >= 4) {
      const response = await fetch(
        `${API_FILACRECHE.maps_api_endpoint}/q/${value.trim()}.js`
      );
      const json = await response.json();
      this.setState({ suggestions: json.results });
    }
  };

  getSuggestionValue = suggestion => {
    this.setState({ addressObject: suggestion });
    this.props.onAddressSelected(suggestion);
    return suggestion.street || suggestion.name || suggestion.display_name;
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderSuggestion(suggestion) {
    return <span>{suggestion.display_name}</span>;
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Ex: Rua Doutor Diogo de Faria",
      value,
      type: "search",
      onChange: this.onChange,
      autoFocus: true,
      className: `form-control ${this.props.className}`,
      required: this.props.required,
      name: this.props.name
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
