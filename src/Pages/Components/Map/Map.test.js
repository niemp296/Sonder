import React from 'react';
import { mount, shallow , configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Map from './Map';

configure({adapter: new Adapter()});

describe("Test case for Map layout", () => {
    it("should render 1 Map", () => {
        const items = [
            {
                name: "Biz",
                coord: [35.28275,-120.65962],
                openHours: "10am-3pm",
                spending: 0
            },
            {
                name: "Biz2",
                coord: [35.28275,-125.36432],
                openHours: "10am-3pm",
                spending: 3
            }
        ]
        var wrapper = shallow(<Map items={[]}/>);
        expect(wrapper.find('Map').length).toEqual(1);
        wrapper = shallow(<Map items={items}/>);
        expect(wrapper.find('Map').length).toEqual(1);
        expect(wrapper.state('filtered').length).toEqual(2)
    });
});
