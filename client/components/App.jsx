import React from 'react';
// import ReactDOM from 'react-dom';

// import necessary components
import Sentiment from './Sentiment.jsx';
import Chart from './Chart.jsx';
import SearchContainer from './SearchContainer.jsx';

// import styling
import './../styling/App.css';
import 'animate.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div>
                <Sentiment></Sentiment>
                <SearchContainer></SearchContainer>
                <Chart></Chart>
            </div>
        )
    }
}

export default App;
