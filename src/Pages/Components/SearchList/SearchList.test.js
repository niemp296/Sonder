import React from 'react';
import { mount, shallow , configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchList from './SearchList';

configure({adapter: new Adapter()});

describe("Test case for SearchList layout", () => {
    it("should render 5 text inpubox, 2 radio input box, 1 button", () => {
        const wrapper = shallow(<SearchList />);
        expect(wrapper.find('div').length).toEqual(2);
    });
});

describe('Filter buttons Test', () =>{
    let wrapper = shallow(<SearchList />);
    const preventDefault = jest.fn();

    it('filter buttons default state', () =>{
        expect(wrapper.state('isLoggedIn')).toEqual(false);
        expect(wrapper.state('userId')).toEqual("");
        expect(wrapper.state('plans')).toEqual([]);
        expect(wrapper.state('selectedPlan')).toEqual('');
        expect(wrapper.state('selectedPlanId')).toEqual('');
        expect(wrapper.state('selectedDay')).toEqual('');
        expect(wrapper.state('days')).toEqual([]);
        expect(wrapper.state('selectedTime')).toEqual('');
        expect(wrapper.state('dayTimeDisabled')).toEqual(true);
        expect(wrapper.state('addWithoutPlan')).toEqual(false);
    }) 
})

// describe('Input box Test', () =>{
//     let wrapper = mount(<SearchBar />);
//     const preventDefault = jest.fn();

//     it('input searchbox input', () =>{
//         wrapper.find('input[name="searchbox"]').simulate('change', {target: {name: 'searchbox', value: 'randomString'}});
//         expect(wrapper.state('search')).toEqual('randomString');
//     })
// })
// describe('Filter buttons Test', () =>{
//     let wrapper = shallow(<SearchBar />);
//     const preventDefault = jest.fn();

//     it('filter buttons default state', () =>{
//         expect(wrapper.state('filterCity')).toEqual(true);
//         expect(wrapper.state('filterPlace')).toEqual(false);
//         expect(wrapper.state('filterCountry')).toEqual(false);
//     })
//     it('filter buttons click place', () =>{
//         wrapper.find('Button').at(1).simulate('click', {preventDefault});
//         expect(wrapper.state('filterCity')).toEqual(false);
//         expect(wrapper.state('filterPlace')).toEqual(true);
//         expect(wrapper.state('filterCountry')).toEqual(false);
//     })
//     it('filter buttons click country', () =>{
//         wrapper.find('Button').at(2).simulate('click', {preventDefault});
//         expect(wrapper.state('filterCity')).toEqual(false);
//         expect(wrapper.state('filterPlace')).toEqual(false);
//         expect(wrapper.state('filterCountry')).toEqual(true);
//     })
// })