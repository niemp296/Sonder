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
        wrapper = mount(<SearchList items={[{country: "US"}]}
            filterCity={false}
            filterCountry={true}
            filterPlace={false}
            userHasSearched={true}
            isLoggedIn ={true} />);
        expect(wrapper.find('Name').length).toEqual(1);
        expect(wrapper.find('Name').props()).toEqual({title: {text: "Showing you results for US"}});
        wrapper = mount(<SearchList items={[{city: "SLO"}]}
            filterCity={true}
            filterCountry={false}
            filterPlace={false}
            userHasSearched={true}
            isLoggedIn ={true} />);
        expect(wrapper.find('Name').length).toEqual(1);
        expect(wrapper.find('Name').props()).toEqual({title: {text: "Showing you results for SLO"}});
        wrapper = mount(<SearchList items={[{name: "LA"}]}
            filterCity={false}
            filterCountry={false}
            filterPlace={true}
            userHasSearched={true}
            isLoggedIn ={true} />);
        expect(wrapper.find('Name').length).toEqual(1);
        expect(wrapper.find('Name').props()).toEqual({title: {text: "Showing you results for LA"}});
    }) 
})