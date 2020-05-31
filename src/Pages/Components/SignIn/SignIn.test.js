import React from 'react';
import { mount, shallow , configure} from 'enzyme';
import SignIn from './SignIn';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe("Test case for SignIn layout", () => {
    it("should render sign in page", () => {
        const wrapper = shallow(<SignIn />);
    });

    it("should render initial layout", () => {
        // when
        const component = shallow(<SignIn/>);
        // then
        expect(component.getElements()).toMatchSnapshot();
    });
});


describe('Test case for testing SignIn',() =>{
    let wrapper;
    const preventDefault = jest.fn();
    
    it('email check',()=>
    {
        wrapper = mount(<SignIn/>);
        wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: 'irennanicole1@gmail.com'}});
        expect(wrapper.state('email')).toEqual('irennanicole1@gmail.com');
    })
    it('password check',()=>{
        wrapper = mount(<SignIn/>);
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: '111111'}});
        expect(wrapper.state('password')).toEqual('111111');
    })
    it('login check with data',()=>{
        wrapper = mount(<SignIn/>);
        wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: 'irennanicole1@gmail.com'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'phuongn123'}});
        wrapper.find('button').simulate('click', { preventDefault });
        wrapper.find('form').simulate('submit', { preventDefault });
        expect(wrapper.state('isSignedIn')).toBe(false);
    })
})


