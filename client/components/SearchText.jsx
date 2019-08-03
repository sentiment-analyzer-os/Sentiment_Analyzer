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
        console.log('keyed up');
            if (event.defaultPrevented) {
                return;
            }
            var key = event.key || event.keyCode;
            if (key === 'Enter') {
                console.log(event.target.value);
                console.log('fetch sending...');
                fetch('/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        queryString: 'message from haris'
                    })
                })
                .then(function(response) {
                    return console.log(response.json());
                })
                // .then(function(response) {

                // })
                console.log('fetch sent...');
        }

    }
    render() {
        return (
            <div id='SearchText'>
                <input type='text' placeholder='Enter a search item...' id='Input' onKeyUp={this.search}/>
            </div>
        )
    }
}

export default SearchText;
