//
//
//

import React from 'react';
import { Line } from 'react-chartjs-2';

// import './chartrender.js';

// import components

// import css
import './../styling/Chart.css';

// const data = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    // datasets: [
    //   {
    //     label: 'My First dataset',
    //     fill: false,
    //     lineTension: 0.1,
    //     backgroundColor: 'rgba(75,192,192,0.4)',
    //     borderColor: 'rgba(75,192,192,1)',
    //     borderCapStyle: 'butt',
    //     borderDash: [],
    //     borderDashOffset: 0.0,
    //     borderJoinStyle: 'miter',
    //     pointBorderColor: 'rgba(75,192,192,1)',
    //     pointBackgroundColor: '#fff',
    //     pointBorderWidth: 1,
    //     pointHoverRadius: 5,
    //     pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    //     pointHoverBorderColor: 'rgba(220,220,220,1)',
    //     pointHoverBorderWidth: 2,
    //     pointRadius: 1,
    //     pointHitRadius: 10,
    //     data: [65, 59, 80, 81, 56, 55, 40]
    //   }
    // ]
  // };

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        console.log('Das Data => ', this.props.data.datasets);
        console.log('PROPDATA FOR CHART' +this.props.data.labels)

        return (
            <div id='haris' class='animated fadeInUp'>
                <Line data = {this.props.data} options={this.props.options} width={800} height={400}></Line>
                {/* {console.log('das data => ', this.props.data)} */}
            </div>
        )
    }
}

export default Chart;