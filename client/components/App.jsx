import React from 'react';
// import ReactDOM from 'react-dom';

// import necessary components
// import Sentiment from './Sentiment.jsx';
import SentimentSearchContainer from './SentimentSearchContainer.jsx';
import Chart from './Chart.jsx';
// import SearchContainer from './SearchContainer.jsx';

// import styling
import './../styling/App.css';
import 'animate.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            move_SentimentSearchContainer: false,
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Query Results',
                        fill: false,
                        lineTension: 0.25,
                        backgroundColor: '#EAC67A',
                        borderColor: '#EAC67A',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: '#984B43',
                        pointBackgroundColor: '#984B43',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: '#984B43',
                        pointHoverBorderColor: '#984B43',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [-7, 3, 59, 80, 81, 56, 55, 40, -4]
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                            min: -10,
                            max: 10
                        }
                    }]
                }
            }
        };
        this.move = this.move.bind(this);
        this.update = this.update.bind(this);
    }
    update(newData) {
        console.log('works1');
        this.setState((state)=>{
            let newState = {...state};
            newState.data.labels = newData.labels;
            newState.data.datasets[0].data = newData.sentimentData;
            console.log('UPDATED STATE ' + newState.data)
            return newState;
        })
        console.log('works');
    }
    move() {
        this.setState({
            move_SentimentSearchContainer: !move_SentimentSearchContainer
        });
    }
    render() {
        console.log('APP.JSX DATA' + this.state.data)
        let classes = [''];
        if (this.state.move_SentimentSearchContainer) {
            classes.push('.move_up');
        }
        return (
            <div id='App'>
                <SentimentSearchContainer updateState={this.update} className={classes.join(' ')} onClick={this.move} data={this.state.data}></SentimentSearchContainer>
                <Chart data={this.state.data} options={this.state.options}></Chart>
                {/* grab values associated with data */}
                {/* {console.log(this.state.data.datasets[0]['data'])} */}
                {/* grab values associated with labels */}
                {/* {console.log(this.state.data.labels)} */}
            </div>
        )
    }
}

export default App;
