import React from "react";
import { configure, shallow } from enzyme;
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

import App from "../client/components/App";
import Chart from "../client/components/Chart";
import Search from "../client/components/Search";
import SearchContainer from "../cient/components/SearchContainer";
import SearchText from "../cient/components/SearctText";
import Sentiment from "../cient/components/Sentiment";

configure ({ adapter = new Adapter() });

describe ("React Unit Test", () => {
  describe("App", () => {
    let wrapper;

    const props = {};

    beforeAll(() => {
      wrapper = shallow(<App {...props} />);
    });


    it('contains a div containing Sentiment, SearchContainer, Chart componenents'), () => {
      //expect three 
      expect(wrapper.find("Sentiment")).toBe(true);
      expect(wrapper.find("SearchContainer")).toBe(true);
      expect(wrapper.find("Chart")).toBe(true);
      //it contains a div containing Sentiment, SearchContainer, Chart componenents
      //expect wrapper label to be these three
    }
  }) 

  describe("Chart", () => {
    //contains a div id is haris
    //class is animated fadeInUp
    //returns a div containing a line component
    //is hooked into Line
    let wrapper;

    beforeAll(() => {
      // wrap component
      wrapper = shallow(<Chart {...props} />);
    });

      //snapshot test
    it('Snapshot testing', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('contains a chart with a Line component', () => {
      expect(wrapper.find("Line")).toBe(true);
    });


    it("expects the value passed down as props to be \'data\'", () => {
      //to be or toEqual here?
      expect(wrapper.find({data = {data}}).toBe(true));
    };
  })

  describe("Search", () => {
    let wrapper;

    beforeAll(() => {
      // wrap component
      wrapper = shallow(<Search />);
    });

    it('Snapshot testing', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    //expect a div with the id search
    it("expect a search component called \'SearchText\' and a div with the id \'Search\'", () => {
      expect(wrapper.find("SearchText")).toBe(true);
    });
  })

  describe("SearchContainer", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(<SearchContainer /> );
    });

    it('Snapshot testing', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("expect a component called \'Search\' and a div with the class \'animated heartbeat\'", () => {

      expect(wrapper.find("Search")).toBe(true);
      expect(wrapper.find("animated heartbeat")).toBe(true);

    });

    it("expect a component called \'Search\' and a div with the class \'animated heartbeat\'", () => {

      expect(wrapper.find("Search")).toBe(true);
      expect(wrapper.find())
    });
  })

  describe("SearchText", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(<SearchText />)
    });

    it('Snapshot testing', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('expect an event listener with defaultPrevented on keyUps, and with Enter making fetch request ', () => {
      //code here
    });

    it('expect a render of a div with the id \'SearchText\'', () => {
        //enter code
    });

    it('expect a helper functiomn to be triggered in the OnKeyUp from within the div, detects enter for api call', () => {
        //enter code
    });
  })
  
  describe("Sentiment", () => {
    let wrapper;

    beforeAll(()=> {
      wrapper = shallow(<SearchText />)
    });

    it('Snapshot testing', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('expect an div with the id \'sentiment\'', () =>  {
      //code here
    });
  })
})










