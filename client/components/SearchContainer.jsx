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
    }
    render() {
        return (
            <div id='SearchContainer' className='animated heartBeat'>
                <Search></Search>
            </div>
        )
    }
}

export default SearchContainer;
