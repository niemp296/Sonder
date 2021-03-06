import React from 'react';
import { mount, shallow , configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBar from './SearchBar';

configure({adapter: new Adapter()});

describe("Test case for SearchBar layout", () => {
    it("should render 5 text inpubox, 2 radio input box, 1 button", () => {
        const wrapper = shallow(<SearchBar />);
        expect(wrapper.find('input[type="text"]').length).toEqual(1);
        expect(wrapper.find('Button').length).toEqual(3);
    });
});

describe('Input box Test', () =>{
    let wrapper = mount(<SearchBar />);
    const preventDefault = jest.fn();

    it('input searchbox input for place', () =>{
        wrapper.find('input[name="searchbox"]').simulate('change', {target: {name: 'searchbox', value: 'San Luis Obispo'}});
        wrapper.find('Button').at(1).simulate('click', {preventDefault});
        wrapper.find('input').simulate('keypress', {key: 'Enter'})
        expect(wrapper.state('search')).toEqual('San Luis Obispo');
    })
    it('input searchbox input for city', () =>{
        wrapper.find('input[name="searchbox"]').simulate('change', {target: {name: 'searchbox', value: 'San Luis Obispo'}});
        wrapper.find('input').simulate('keypress', {key: 'Enter'})
        expect(wrapper.state('search')).toEqual('San Luis Obispo');
    })
    it('input searchbox input for country', () =>{
        wrapper.find('input[name="searchbox"]').simulate('change', {target: {name: 'searchbox', value: 'San Luis Obispo'}});
        wrapper.find('Button').at(2).simulate('click', {preventDefault});
        wrapper.find('input').simulate('keypress', {key: 'Enter'})
        expect(wrapper.state('search')).toEqual('San Luis Obispo');
    })
    
})
describe('Filter buttons Test', () =>{
    let wrapper = shallow(<SearchBar />);
    const preventDefault = jest.fn();

    it('filter buttons default state', () =>{
        expect(wrapper.state('filterCity')).toEqual(true);
        expect(wrapper.state('filterPlace')).toEqual(false);
        expect(wrapper.state('filterCountry')).toEqual(false);
    })
    it('filter buttons click place', () =>{
        wrapper.find('Button').at(1).simulate('click', {preventDefault});
        expect(wrapper.state('filterCity')).toEqual(false);
        expect(wrapper.state('filterPlace')).toEqual(true);
        expect(wrapper.state('filterCountry')).toEqual(false);
    })
    it('filter buttons click country', () =>{
        wrapper.find('Button').at(2).simulate('click', {preventDefault});
        expect(wrapper.state('filterCity')).toEqual(false);
        expect(wrapper.state('filterPlace')).toEqual(false);
        expect(wrapper.state('filterCountry')).toEqual(true);
    })
    it('filter buttons default city', () =>{
        wrapper.find('Button').at(0).simulate('click', {preventDefault});
        expect(wrapper.state('filterCity')).toEqual(true);
        expect(wrapper.state('filterPlace')).toEqual(false);
        expect(wrapper.state('filterCountry')).toEqual(false);
    })
})

describe("Test case for componentWillUnmount", () => {
    it('componentWillUnmount should be called on unmount', () => {
        const component = shallow(<SearchBar />);
        const componentWillUnmount = jest.spyOn(component.instance(), 'componentWillUnmount');
        component.unmount();
        expect(componentWillUnmount).toHaveBeenCalled();
    });
});