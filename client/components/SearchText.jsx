import React from 'react';

// import components

// import css
import './../styling/SearchText.css';
import 'animate.css';

class SearchText extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.search = this.search.bind(this);
    }
    search(event) {
        document.addEventListener('keyup', function (event) {
            if (event.defaultPrevented) {
                return;
            }
            var key = event.key || event.keyCode;
            if (key === 'Enter') {
                // make fetch request
            }
        });
    }
    render() {
        return (
            <div id='SearchText'>
                <input type='text' id='Input' onKeyUp={this.search}/>
            </div>
        )
    }
}

export default SearchText;
