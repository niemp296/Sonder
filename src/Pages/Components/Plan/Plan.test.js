import React from 'react';
import { mount, shallow , configure} from 'enzyme';
import Plan from './Plan';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

configure({adapter: new Adapter()});

/* Test 1:
* retrieve user name
* retrieve number of plans & render both
* has a button to add plan

* Test 2:
* click on 'Delete plan' -> rerender with number of plans -= 1
*/

//this should mock axios so that it does nothing
jest.mock('axios');
const plan= {
    name: "plan name",
    locations: [{$oid: 'id_1'}, {$oid: 'id_2'}],
    budget: '1.00',
    author: "Jane Doe"
}
const resp = Promise.resolve({
    status: 200,
    data: plan
});
axios.get.mockResolvedValue(resp);
axios.put.mockResolvedValue();

describe("Test for Plan", () => {
    const id = {
            $oid: ":plan_id"
        }
    
    const wrapper = shallow(<Plan id = {id} />);
    it("plan name, budget, button to remove Plan", () => {
        expect(wrapper.find('h2.planner-activity-text').length).toEqual(2);
        expect(wrapper.find('div.footer-delete-plan').length).toEqual(1);
    });

    it('populate state with plan info', () =>{
        let instance= wrapper.instance();
        instance.getPlanInfo();
        instance.forceUpdate();
        expect(wrapper.state('name')).toEqual('plan name');
        expect(wrapper.state('location_id')).toEqual('id_1');
        expect(wrapper.state('budget')).toEqual('1.00');
        expect(wrapper.state('author')).toEqual("Jane Doe");
    })

});
