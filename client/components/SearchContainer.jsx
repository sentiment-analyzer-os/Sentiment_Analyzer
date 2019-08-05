import React from 'react';

// import components

// import css
import './../styling/SearchContainer.css';
import 'animate.css';
import Search from './Search.jsx';

class SearchContainer extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.moveUp = this.moveUp.bind(this);
    }
    moveUp() {

    }
    render() {
        return (
            <div id='SearchContainer' class='animated heartBeat'>
            <Search></Search>
            </div>
        )
    }
}

export default SearchContainer;
