import React from 'react';

// import components

// import css
import './../styling/SearchText.css';
import 'animate.css';

class SearchText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
        this.search = this.search.bind(this);
    }
    search(event) {
        console.log('keyed up');
            if (event.defaultPrevented) {
                return;
            }
            var key = event.key || event.keyCode;
            if (key === 'Enter') {
                fetch('/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        queryString: event.target.value
                    })
                })
                .then(function(response) {
                    // console.log(response.json());
                    return response.json();
                })
                // use an arrow function to re-bind
                .then(response => {
                    // console.log(response['labels']);
                    // console.log(response['values']);
                    
                    // sets state for only this component
                    // this.setState({
                        // ...state,
                    //     data: {
                    //         labels: response['labels'],
                    //         // values: response['values']
                    //         datasets: [
                    //             {
                    //                 label: 'My First dataset',
                    //                 fill: false,
                    //                 lineTension: 0.1,
                    //                 backgroundColor: 'rgba(75,192,192,0.4)',
                    //                 borderColor: 'rgba(75,192,192,1)',
                    //                 borderCapStyle: 'butt',
                    //                 borderDash: [],
                    //                 borderDashOffset: 0.0,
                    //                 borderJoinStyle: 'miter',
                    //                 pointBorderColor: 'rgba(75,192,192,1)',
                    //                 pointBackgroundColor: '#fff',
                    //                 pointBorderWidth: 1,
                    //                 pointHoverRadius: 5,
                    //                 pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    //                 pointHoverBorderColor: 'rgba(220,220,220,1)',
                    //                 pointHoverBorderWidth: 2,
                    //                 pointRadius: 1,
                    //                 pointHitRadius: 10,
                    //                 data: [231, 98, 2, 180, 134, 12, 69]
                    //             }
                    //         ]
                    //     }
                    // })
                    // update the state
                    this.props.data['labels'] = response['labels'];
                    // update the state
                    // this.props.data['values'] = response['values'];
                    this.props.data.datasets[0].data = [231, 98, 2, 180, 134, 12, 69];
                    // console.log(this.props.data);
                    // console.log(response);
                    // this.props.updateState(response);
                    return;
                })
        }
        console.log('Logging data...');
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
