import React from 'react';
import { mount, shallow , configure} from 'enzyme';
import SideBar from './SideBar';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe("Test case for SideBar layout", () => {
    it("should render side bar page", () => {
        const wrapper = shallow(<SideBar />);
    });

    it("should render initial layout", () => {
        // when
        const component = shallow(<SideBar/>);
        // then
        expect(component.getElements()).toMatchSnapshot();
    });
});


