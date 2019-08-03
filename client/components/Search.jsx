import React from 'react';

// import components
import SearchText from './SearchText.jsx';

//import css
import './../styling/Search.css';
import 'animate.css';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div id='Search'>
                <SearchText></SearchText>
            </div>
        )
    }
}

export default Search;