import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import App from "../client/components/App";
import Chart from "../client/components/Chart";
import Search from "../client/components/Search";
import SearchContainer from "../cient/components/SearchContainer";
import SearchText from "../cient/components/SearctText";
import Sentiment from "../cient/components/Sentiment";
import SentimentSearchContainer from "../client/components/SentimentSearchContainer";
import { Line } from 'react-chartjs-2';

configure({ adapter: new Adapter() });


describe("App", () => {
  let wrapper;

  const props = {};

  beforeAll(() => {
    wrapper = shallow(<App/>);
  });


  it('contains a div which contains a component called \"SentimentSearchContainer\"'), () => {
    //expect three 
    expect(wrapper.find(SentimentSearchContainer)).toBe(true);
    expect(wrapper.find(SentimentSearchContainer)).to.have.lengthOf(1);
    
    //it contains a div containing Sentiment, SearchContainer, Chart componenents
    //expect wrapper label to be these three
  }
}) 

// describe("Chart", () => {
//   //contains a div id is haris
//   //class is animated fadeInUp
//   //returns a div containing a line component
//   //is hooked into Line
//   let wrapper;

//   beforeAll(() => {
//     // wrap component
//     wrapper = shallow(<Chart />);
//   });

//     //snapshot test
//   it('Snapshot testing', () => {
//     expect(toJson(wrapper)).toMatchSnapshot();
//   });

//   it('contains a chart with a Line component inside the div', () => {
//     let wrapper = wrapper.find("<div id=\'haris\' class=\'animated fadeInUp\'/> ");
//     expect(wrapper.find("Line")).toBe(true);
//     expect(wrapper.find("Line")).to.have.lengthOf(1);
//   });


//   it("expects the value passed down as props to be \'data\'", () => {
//     //to be or toEqual here?
//     let wrapper = wrapper.find("<div id=\'haris\' class=\'animated fadeInUp\'/> ");
//     wrapper.setProps({const data = {labels: ['Haris','Andrew','Justin','Danny'] }});
//     expect(wrapper.find({data = {data}}).toBe(true));
//     expect(wrapper.find(width={100} height={50}).toBe(true));
//   });

//   it("expect a div with the id \"haris\" and a class \"animated fadeInUp\"", () => {
//     expect(wrapper.containsMatchingElement("<div id=\'haris\' class=\'animated fadeInUp\'/>").toBe(true));
//   });
// })

// describe("Search", () => {
//   let wrapper;

//   beforeAll(() => {
//     // wrap component
//     wrapper = shallow(<Search />);
//   });

//   it('Snapshot testing', () => {
//     expect(toJson(wrapper)).toMatchSnapshot();
//   });

//   //expect a div with the id search
//   it("expect a search component called \'SearchText\' and a div with the id \'Search\'", () => {
//     expect(wrapper.find("SearchText")).toBe(true);
//   });
// })

// describe("SearchContainer", () => {
//   let wrapper;

//   beforeAll(() => {
//     wrapper = shallow(<SearchContainer /> );
//   });

//   it('Snapshot testing', () => {
//     expect(toJson(wrapper)).toMatchSnapshot();
//   });

//   it("expect a component called \'Search\' and a div with the class \'animated heartbeat\'", () => {

//     expect(wrapper.find("Search")).toBe(true);
//     expect(wrapper.find("animated heartbeat")).toBe(true);

//   });

//   it("expect a component called \'Search\' and a div with the class \'animated heartbeat\'", () => {

//     expect(wrapper.find("Search")).toBe(true);
//     expect(wrapper.find())
//   });
// })

// describe("SearchText", () => {
//   let wrapper;

//   beforeAll(() => {
//     wrapper = shallow(<SearchText />)
//   });

//   it('Snapshot testing', () => {
//     expect(toJson(wrapper)).toMatchSnapshot();
//   });

//   it('expect an event listener with defaultPrevented on keyUps, and a fetch request being made on key \"Enter\"', () => {
//     //code here

    
//   });


//   it('expect a render of a div with the id \'SearchText\'', () => {
//       //enter code
//       expect(wrapper.find("id = \'SearchText\'")).to.have.length.Of(1);
//   });

//   it('expect a helper function to be triggered in the \'onKeyUp\' from within the div, detects enter for api call', () => {
//       //enter code
//       // onKeyUp={this.search}
//       const onKeyUp = sinon.spy();
//       const wrapper = shallow(<SearchText onKeyUp={this.search} />);
//       expect(onKeyUp).to.have.property("this.search");
//   });
// })

// describe("Sentiment", () => {
//   let wrapper;

//   beforeAll(()=> {
//     wrapper = shallow(<Sentiment />)
//   });

//   it('Snapshot testing', () => {
//     expect(toJson(wrapper)).toMatchSnapshot();
//   });

//   it('expect a div with a class that has props', () =>  {
//     //code here
//   });

//   it('expect a div with an onClick handler', () => {
//     //code here
//   });
  
//   it('expect a <p> tag with text enclosed', () => {
//     expect(wrapper.type()).toEqual("p");

//   })
// })

// describe("SentimentSearchContainer", () => {
//   let wrapper;

//   beforeAll(()=> {
//     wrapper = shallow(<SentimentSearchContainer />)
//   });

//   it('Snapshot testing', () => {
//     expect(toJson(wrapper)).toMatchSnapshot();
//   });

//   it("expect a function named \"Toggle\"", () => {
//     //code here

//   });
  
//   it('expect a div with the id \'SentimentSearchContainer\'', () =>  {
//     //code here
//     expect(wrapper.contains(<div id="SentimentSearchContainer" />)).to.equal(true);
//   }); 

//   it('expect a component called \"SearchContainer\"', () => {
//     expect(wrapper.find("SearchContainer")).toBe(true);
//     expect(wrapper.find("SearchContainer")).to.have.lengthOf(1);
//   });

//   it('expect a component called \"Sentiment\"', () => {
//     expect(wrapper.find("Sentiment")).toBe(true);
//     expect(wrapper.find("Sentiment")).to.have.lengthOf(1);
//   })
// })











