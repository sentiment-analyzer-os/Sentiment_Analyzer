import React from 'react';

// import components

// import css
import './../styling/SearchContainer.css';
import 'animate.css';
import Search from './Search.jsx';

class SearchContainer extends React.Component {
   
    render() {
        return (
            <div id='SearchContainer' className='animated heartBeat'>
                <Search updateState={this.props.updateState} data={this.props.data}></Search>
            </div>
        )
    }
}

export default SearchContainer;
