import React, { Component } from 'react';
import 'animate.css';

class Footer extends Component{
  render(){
    return(
      <div id = 'footer'>
       <p id = 'creators'>
       Created by Danny Byrne, Andrew Tang, Haris Hambasic, and Justin Fung,
       </p> 
       <p id = 'github-handles'>
         github link: <a href = 'https://github.com/team-snape/scratch-project_data-visualization' id = 'links'>Sentiment-Analyzer</a>
       </p>
      </div>
    )
  }
}



export default Footer;