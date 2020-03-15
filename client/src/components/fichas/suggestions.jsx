// modules
import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import { toast } from "react-toastify";

import axios from "axios";
const CancelToken = axios.CancelToken;
let cancel;

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.nombre;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.nombre} <div className='details'>{suggestion.localidad} - {suggestion.ip}</div>
    </div>
);

export default class SuggestClientes extends Component {

    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: [],
            pv: []
        };
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions = value => {
        const { pv } = this.state;
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : pv.filter(x => x.nombre.toLowerCase().includes(inputValue.toLowerCase()));
    };

    componentWillUnmount() {
        cancel("cantFill");
    }

    componentDidMount() {

        axios({
            method: "get",
            url: process.env.REACT_APP_SERVER_IP + "api/pv/listar",
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
            })
        }).then(res => {
            if (!res.data) {
                return;
            }

            const data = res.data
            this.setState({
                suggestions: data,
                pv: data
            });

        })
            .catch(err => {
                if (err.message && err.message !== "cantFill") {
                    toast.warn("No se pueden listar los puntos de venta - " + err)
                }
            })
    }

    onChange = (event, { newValue }) => {
        // reset parent client
        const { updatePV } = this.props;
        updatePV(undefined);

        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion, method }) => {
        // send selected suggestion to parent component
        const { updatePV } = this.props;
        updatePV(suggestion);
    }

    render() {
        const { value, suggestions, pv } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: pv.length === 0 ? "No tienes puntos de venta creados" : "Nombre PV",
            value,
            onChange: this.onChange,
            disabled: pv.length === 0
        };

        // Finally, render it!
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                onSuggestionSelected={this.onSuggestionSelected}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}