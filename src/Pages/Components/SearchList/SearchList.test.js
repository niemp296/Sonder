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

    it('searchlist default state', () =>{
        expect(wrapper.state('isLoggedIn')).toEqual(false);
        expect(wrapper.state('userId')).toEqual("");
        expect(wrapper.state('plans')).toEqual([]);
        expect(wrapper.state('selectedPlan')).toEqual('');
        expect(wrapper.state('selectedPlanId')).toEqual('');
        expect(wrapper.state('selectedDay')).toEqual('');
        expect(wrapper.state('days')).toEqual(1);
        expect(wrapper.state('selectedTime')).toEqual('');
        expect(wrapper.state('dayTimeDisabled')).toEqual(true);
        expect(wrapper.state('addWithoutPlan')).toEqual(false);
        expect(wrapper.find("BoxComponent").length).toEqual(0)
        const item =[{
            _id:{
                $oid: "item_id"
            },
            name: "Boba",
            city: "SLO",
            type: "city",
            country: "US",
            spending: 1,
            addToPlan: jest.fn(),
            url: "image-url"
        }];
        wrapper.setState({filtered: item})
        wrapper = shallow(<SearchList items={item} 
            filterCity={true}
            filterCountry={false}
            filterPlace={false}
            userHasSearched={true}
            isLoggedIn ={true} />)
        expect(wrapper.state('filtered').length).toEqual(1);
        expect(wrapper.find("BoxComponent").length).toEqual(1)
        expect(wrapper.find("Name").props().title.text).toEqual("Showing you results for SLO, US")

        wrapper = shallow(<SearchList items={item} 
            filterCity={false}
            filterCountry={true}
            filterPlace={false}
            userHasSearched={true}
            isLoggedIn ={true} />)
        expect(wrapper.state('filtered').length).toEqual(1);
        expect(wrapper.find("BoxComponent").length).toEqual(1)
        expect(wrapper.find("Name").props().title.text).toEqual("Showing you results for US")

        wrapper = shallow(<SearchList items={item} 
            filterCity={false}
            filterCountry={false}
            filterPlace={true}
            userHasSearched={true}
            isLoggedIn ={true} />)
        expect(wrapper.state('filtered').length).toEqual(1);
        expect(wrapper.find("BoxComponent").length).toEqual(1)
        expect(wrapper.find("Name").props().title.text).toEqual("Showing you results for Boba")
        wrapper.setState({days: 3});
        expect(wrapper.state('days')).toEqual(3);
    });
})