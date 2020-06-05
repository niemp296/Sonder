import React from 'react';
import { mount, shallow , configure} from 'enzyme';
import Account from './Account';
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
const user= {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane-doe@email.com',
    plans: ['plan_id1', 'plan_id2']
}
const resp = Promise.resolve({
    status: 200,
    data: [user, "succesful"]
});
axios.get.mockResolvedValue(resp);
axios.put.mockResolvedValue();

describe("should render account layout", () => {
    const match = {
        params : {
            id: ":user_id"
        }
    }
    const wrapper = shallow(<Account match = {match} />);
    it("should render the header, add plan button, a space for user's name, and a space for plans", () => {
        expect(wrapper.find('Header').length).toEqual(1);
        expect(wrapper.find('h1.greet_user').length).toEqual(2);
        expect(wrapper.find('button.btn-add-plan').length).toEqual(1);
        expect(wrapper.find('button.btn-sign-out').length).toEqual(1);
        expect(wrapper.find('section#account-plan-list').length).toEqual(1);
    });

    it("change state when user signs out", () =>{
        wrapper.find('button.btn-sign-out').simulate('click');
        expect(wrapper.state('isSignedOut')).toEqual(true);
    })
    
    it('populate state with user info', () =>{
        let instance= wrapper.instance();
        instance.getUserInfo();
        instance.forceUpdate();
        expect(wrapper.state('firstName')).toEqual('Jane');
        expect(wrapper.state('lastName')).toEqual('Doe');
        expect(wrapper.state('email')).toEqual('jane-doe@email.com');
        expect(wrapper.state('plans').length).toEqual(2);
    })

    it('should update plan array on updateUserInfo', async() =>{
        let instance2= wrapper.instance();
        await instance2.updateUserInfo("new_plan_id");
        instance2.forceUpdate();
        expect(wrapper.state('see_plan')).toEqual('new_plan_id');
    })
    it('should renders plans', async() =>{
        let instance = wrapper.instance();
        await instance.getUserInfo();
        const res = instance.renderPlans();
        expect(res.type).toBe('ul');
        expect(res.props.children.length).toEqual(2);  
    })
});
