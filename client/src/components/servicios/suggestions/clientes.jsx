// modules
import React, { Component } from 'react'
import "./styles.css"
import Autosuggest from 'react-autosuggest';
import axios from "axios";
import { toast } from "react-toastify";

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.nombre;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.nombre} <div className='details'>{suggestion.direccion}, {suggestion.comunidad ? suggestion.comunidad + ", " : ""} {suggestion.ciudad}</div>
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
            clientes: []
        };
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions = value => {
        const { clientes } = this.state;
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : clientes.filter(cliente =>
            cliente.nombre.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    componentDidMount(){

        axios.post(process.env.REACT_APP_SERVER_IP + "api/clientes/listar", { itemsToShow: undefined, filtro: undefined, salto: 0 })
            .then(res => {
                if (!res.data) {
                    return;
                }

                const { clientes } = res.data
                this.setState({
                    suggestions: clientes,
                    clientes
                });

            })
            .catch(err => toast.warn("No se pueden listar los clientes - " + err))
    }

    onChange = (event, { newValue }) => {
        // reset parent client
        const { updateCliente } = this.props;
        updateCliente(undefined);
        
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
        const { updateCliente } = this.props;
        updateCliente(suggestion);
    }

    render() {
        const { value, suggestions, clientes } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: clientes.length === 0 ? "No tienes clientes creados" : "Nombre",
            value,
            onChange: this.onChange,
            disabled: clientes.length === 0
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