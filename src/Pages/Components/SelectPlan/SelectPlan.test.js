import React from 'react';
import { mount, shallow , configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SelectPlan from './SelectPlan';

configure({adapter: new Adapter()});

describe('Filter buttons Test', () =>{
    let mockedPlan = [
        {
            "_id": {
                "$oid": "5ed400813b730af6b88b17d1"
            },
            "name": "Untitled Plan",
            "locations": [
                {
                    "morning": [],
                    "afternoon": [],
                    "evening": []
                }
            ],
            "budget": 0.0,
            "author": "5ed400733b730af6b88b17d0"
        },
        {
            "_id": {
                "$oid": "5ed4011f3b730af6b88b17d2"
            },
            "name": "Untitled Plan2",
            "locations": [
                {
                    "morning": [],
                    "afternoon": [],
                    "evening": []
                }
            ],
            "budget": 0.0,
            "author": "5ed400733b730af6b88b17d0"
        },
    ]
    let wrapper = shallow(<SelectPlan />);
    const preventDefault = jest.fn();

    it('filter buttons default state', () =>{
        expect(wrapper.state('selectedPlan')).toEqual('');
        expect(wrapper.state('selectedDay')).toEqual('');
        expect(wrapper.state('days')).toEqual(1);
        expect(wrapper.state('selectedTime')).toEqual('');
        expect(wrapper.state('plans')).toEqual(undefined);
        expect(wrapper.state('dayTimeDisabled')).toEqual(true);
        wrapper.setState({plans: mockedPlan});
        expect(wrapper.state('plans').length).toEqual(2);
    })
})

// import { createShallow } from '@material-ui/core/test-utils';
// import SelectPlan from './SelectPlan';

// describe('<MyComponent />', () => {
//   let shallow;

//   beforeAll(() => {
//     shallow = createShallow(); 
//   });

//   it('should work', () => {
//     const wrapper = shallow(<SelectPlan />);
//     console.log(wrapper.find("FormControl").at(0))
//   });
// });

// describe('Filter buttons Test', () =>{
//     let shallow;

//     beforeAll(() => {
//         shallow = createShallow(); 
//     });

//     it('should work', () => {
//         const wrapper = shallow(<SelectPlan />);
//         expect(wrapper.state('selectedPlan')).toEqual('');
//     });
// })