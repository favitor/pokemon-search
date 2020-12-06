import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import '../css/App.css';
import Form from './SearchBar';
import Card from './Card';
import TypeFilters from './TypeFilters';
import Background from '../img/bg/bg.png';

console.log(Background);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gotFormData: false,
            valueFromForm: null,
            loading: false,
            pokemonData: {}
        };
    }

    myCallback = dataFromChild => {
        this.searchPokemon(dataFromChild);
    };

    setPokemonData = data => {
        const pokemon = {
            pokemon_id: data.id,
            pokemon: data.name,
            types: data.types
                .map(d => {
                    return d.type.name;
                })
                .reverse(),
            picture: data['sprites']['front_default'],
            species_url: data.species.url,
            stats: data.stats,
            height: data.height,
            weight: data.weight,
            happiness: data.base_happiness
        };

        const request = new Request(pokemon.species_url);
        fetch(request).then(response => {
            // Check if there is existing data in cache
            response.json().then(data => {
                console.log(data);
                this.setAdditionalPokemonData(data, pokemon);
            });
        });
    };

    setAdditionalPokemonData = (data, pokemon) => {
        pokemon.genus = data.genera[2]['genus'];
        pokemon.capture_rate = data.capture_rate;

        //Loop through descriptions and search for the first english one
        for (let i = 0; i < data['flavor_text_entries'].length; i++) {
            if (data['flavor_text_entries'][i]['language']['name'] === 'en') {
                pokemon.description = data['flavor_text_entries'][i]['flavor_text'];
                this.setState({ loading: false, gotFormData: true, pokemonData: pokemon });
                break;
            }
        }
    };

    searchPokemon = pokemonID => {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}/`;
        const request = new Request(url);
        this.setState({ loading: true });
        fetch(request).then(response => {
            response.json().then(data => {
                this.setPokemonData(data);
            });
        });
    };

    render() {
        return (
            <div className="App">
                <div className="Background">
                <h1 className="App-title">Search Pokemons</h1>
                <Form callbackFromParent={this.myCallback} loading={this.state.loading} />
                <TypeFilters callbackFromParent={this.myCallback} />
                {this.state.gotFormData &&
                    !this.state.loading && (
                        <Card
                            pokemonInfo={this.state.pokemonData}
                            callbackFromParent={this.myCallback}
                        />
                    )}
                {this.state.loading && <FontAwesome name="spinner" spin />}
                </div>
            </div>
        );
    }
}

export default App;
