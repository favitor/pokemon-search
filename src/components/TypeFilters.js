import React, { Component } from 'react';
import '../css/Typefilters.css';

class TypeFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: null,
            filteredPokemons: null,
            gotDataFromFilterSearch: false,
            hideResults: false
        };
    }

    pokemonsFromFilterSearch = dataFromFilter => {
        this.setState({ filteredPokemons: dataFromFilter, gotDataFromFilterSearch: true });
    };

    getTypes = () => {
        const url = 'https://pokeapi.co/api/v2/type/';
        const request = new Request(url);
        fetch(request).then(response => {
            response.json().then(data => {
                const types = data.results
                    .map(typeObj => typeObj.name)
                    // splice last two empty types
                    .splice(0, data.results.length - 2);
                this.setState({ types });
            });
        });
    };

    searchPokemon = event => {
        this.props.callbackFromParent(event.target.id);
        this.setState({ hideResults: true });
    };

    componentDidMount() {
        this.getTypes();
    }

    render() {
        const { gotDataFromFilterSearch, filteredPokemons, hideResults } = this.state;



        const pokemonsFromFilter =
            gotDataFromFilterSearch &&
            filteredPokemons.map(pokemon => (
                <button
                    onClick={this.searchPokemon}
                    key={pokemon}
                    id={pokemon}
                    className="TypeFilter-pokeBtn"
                >
                    {pokemon}
                </button>
            ));

        return (
            <div className="TypeFilters">
                <div className="TypeFilters-results">{!hideResults && pokemonsFromFilter}</div>
            </div>
        );
    }
}

export default TypeFilters;
