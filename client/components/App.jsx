import React from 'react';
// import ReactDOM from 'react-dom';

// import necessary components
// import Sentiment from './Sentiment.jsx';
import SentimentSearchContainer from './SentimentSearchContainer.jsx';
import Chart from './Chart.jsx';
import Footer from './Footer.jsx'
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
                name: 'Sentiment Over Time',
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Sentiment',
                        fill: false,
                        lineTension: 0.25,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        // pointBackgroundColor: '#984B43',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,0.4)',
                        pointHoverBorderColor: 'rgba(75,192,192,0.4)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: new Array(139).fill(0),
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor:'white',
                            beginAtZero: false,
                            min: -10,
                            max: 20
                        },
                        gridLines: {
                            color: '#334449'
                        }
                    }],
                    xAxes:[
                        {
                            ticks:{
                                maxTicksLimit: 10,
                                autoSkip: true,
                                fontColor:'white'
                            },
                            gridLines: {
                                color: '#233237'
                            }
                        }
                    ]
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
                <Footer/>
            </div>
        )
    }
}

export default App;
