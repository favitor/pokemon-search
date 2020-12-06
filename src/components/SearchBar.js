import React, { Component } from 'react';
import '../css/Form.css';
import FontAwesome from 'react-fontawesome';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            loading: false
        };
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    sendValueToParent = event => {
        event.preventDefault();
        this.props.callbackFromParent(this.state.value);
    };

    render() {
        return (
            <form id="pokemon-search" onSubmit={this.sendValueToParent}>
                <label>
                    Nome ou ID:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                {this.props.loading ? (
                    <FontAwesome name="spinner" spin />
                ) : (
                    <button type="submit" value="Search">
                        <FontAwesome name="search" />{' '}
                    </button>
                )}
            </form>
        );
    }
}

export default SearchBar;
