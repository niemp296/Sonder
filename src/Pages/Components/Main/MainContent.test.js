import React from 'react';
import { mount, shallow , configure} from 'enzyme';
import MainContent from './MainContent';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe("Test case for Main Content layout", () => {
    it("should render main content page", () => {
        const wrapper = shallow(<MainContent />);
    });

    it("should render initial layout", () => {
        // when
        const component = shallow(<MainContent/>);
        // then
        expect(component.getElements()).toMatchSnapshot();
    });
});


