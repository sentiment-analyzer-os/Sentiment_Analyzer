import React from 'react';

// import components
import SearchText from './SearchText.jsx';

//import css
import './../styling/Search.css';
import 'animate.css';

class Search extends React.Component {
    render() {
        return (
            <div id='Search'>
                <SearchText updateState={this.props.updateState} data={this.props.data}></SearchText>
            </div>
        )
    }
}

export default Search;
