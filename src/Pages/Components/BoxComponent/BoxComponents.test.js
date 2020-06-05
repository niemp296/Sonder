import React from 'react';
import { mount, shallow , configure} from 'enzyme';
import BoxComponent from './BoxComponent';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe("Test case for BoxComponents", () => {
    
    it("should render name, info, and budget (free)", () => {
        const item ={
            _id:{
                $oid: "item_id"
            },
            name: "Name",
            type: "type",
            spending: 0,
            addToPlan: jest.fn(),
            url: "image-url"
        };
        const wrapper = shallow(<BoxComponent item = {item}/>);
        expect(wrapper.find('div.SmallResourceBox').length).toEqual(1);
        expect(wrapper.find('img.Image').getElements()[0].props.src).toEqual("image-url");
        expect(wrapper.find('Name').getElement().props.title.text).toEqual("Name");
        expect(wrapper.find('Info').getElements()[0].props.title.text).toEqual("type");
        expect(wrapper.find('Info').getElements()[1].props.title.text).toEqual("Budget: Free");
    });
    it("should format budget not free", () =>{
        const item ={
            _id:{
                $oid: "item_id"
            },
            name: "Name",
            type: "type",
            spending: 1,
            addToPlan: jest.fn(),
            url: "image-url"
        };
        const wrapper = shallow(<BoxComponent item = {item}/>);
        expect(wrapper.find('Info').getElements()[1].props.title.text).toEqual("Budget: $1")
    });
});