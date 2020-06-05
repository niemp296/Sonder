import React from 'react';
import { mount, shallow , configure} from 'enzyme';
import SignUp from './SignUp';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe("Test case for SignUp layout", () => {
    it("should render 5 text inpubox, 2 radio input box, 1 button", () => {
        const wrapper = shallow(<SignUp />);
        expect(wrapper.find('input').length).toEqual(7);
        expect(wrapper.find('input[type="radio"]').length).toEqual(2);
        expect(wrapper.find('button').length).toEqual(1);
    });
});

describe('Input box is working', () =>{
    let wrapper = mount(<SignUp />);
    const preventDefault = jest.fn();

    it('input first name', () =>{
        wrapper.find('input[name="firstName"]').simulate('change', {target: {name: 'firstName', value: 'arandomfirstname'}});
        expect(wrapper.state('firstName')).toEqual('arandomfirstname');
    })
    it('input last name', () =>{
        let lastName= "arandomlastname";
        wrapper.find('input[name="lastName"]').simulate('change', {target: {name: 'lastName', value: lastName}});
        expect(wrapper.state('lastName')).toEqual(lastName);
    })
    it('input email', () =>{
        let email= "arandomemail@randomdomain.com";
        wrapper.find('input[name="email"]').simulate('change', {target: {name: 'email', value: email}});
        expect(wrapper.state('email')).toEqual(email);
    })
    it('input password', () =>{
        let password= "$up3rR4nd0mM3g4P4ssw0rd5";
        wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: password}});
        expect(wrapper.state('password')).toEqual(password);
    })
    it('input confirmPassword', () =>{
        let password= "$up3rR4nd0mM3g4P4ssw0rd5";
        wrapper.find('input[name="confirmPassword"]').simulate('change', {target: {name: 'confirmPassword', value: password}});
        expect(wrapper.state('confirmPassword')).toEqual(password);
    })

    it('check traveller radio', () =>{
        wrapper.find('input[name="traveler"]').simulate('change');
        expect(wrapper.state('traveler')).toEqual(true);
        expect(wrapper.state('advertiser')).toEqual(false);
    })
    it('check advertiser radio', () =>{
        wrapper.find('input[name="advertiser"]').simulate('change');
        expect(wrapper.state('traveler')).toEqual(false);
        expect(wrapper.state('advertiser')).toEqual(true);
    })
    it('sign up check with data',()=>{
        wrapper = mount(<SignUp/>);
        wrapper.find('input[name="firstName"]').simulate('change', {target: {name: 'firstName', value: 'arandomfirstname'}});
        wrapper.find('input[name="lastName"]').simulate('change', {target: {name: 'lastName', value: 'aaaaa'}});
        wrapper.find('input[name="email"]').simulate('change', {target: {name: 'email', value: 'p@gmail.com'}});
        wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'aaaaaaa'}});
        wrapper.find('input[name="confirmPassword"]').simulate('change', {target: {name: 'confirmPassword', value: 'aaaaaaa'}});
        wrapper.find('input[name="traveler"]').simulate('change');
        wrapper.find('button').simulate('click', { preventDefault });
        wrapper.find('form').simulate('submit', { preventDefault });
        expect(wrapper.state('traveler')).toEqual(true);
    })
})
