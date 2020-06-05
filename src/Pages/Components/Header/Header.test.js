import React from 'react';
import { mount, shallow , configure} from 'enzyme';
import Header from './Header';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe("Test case for Header layout", () => {
    it("should render hear page", () => {
        const wrapper = shallow(<Header />);
    });
});

describe("Test case for Header signIn/SignOut", () => {
    it("should render hear page when sign in is false", () => {
        const wrapper = shallow(<Header />);
        wrapper.setState({isLoggedIn: false});
        expect(wrapper.text()).toMatch("Sign UpSign In");
    });
    it("should render hear page when sign in is true", () => {
        const wrapper = shallow(<Header />);
        wrapper.setState({isLoggedIn: true});
        expect(wrapper.text()).toMatch("My Profile");
    });

});


