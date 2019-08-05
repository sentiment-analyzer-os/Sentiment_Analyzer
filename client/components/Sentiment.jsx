import React from 'react';

// import styling
import './../styling/Sentiment.css';
import 'animate.css';

class Sentiment extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div id='sentiment' class='animated fadeInDown'>
                <p>Search for a technology and receive its developer sentiment</p>
            </div>
        )
    }
}

export default Sentiment;