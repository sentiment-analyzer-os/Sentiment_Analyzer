import React from 'react';

// import styling
import './../styling/Sentiment.css';
import 'animate.css';

class Sentiment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className={this.props.classes + ' ' + 'animated' + ' ' + 'fadeInDown'} onClick={this.props.clickMe}>
                <p>Search for a technology and receive its developer sentiment</p>
            </div>
        )
    }
}

export default Sentiment;