import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter:new Adapter()});

describe('<NavigationItems />',()=>{
    let wrapper;

    beforeEach( ()=>{
        return wrapper=shallow(<NavigationItems/>);
    })



    it('should render two <NavigationItems> elements if its not authenticated', ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should render three <NavigationItems> elements if its authenticated', ()=>{
        wrapper=shallow(<NavigationItems isAuthenticated/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should have the exact logout button', ()=>{
        wrapper=shallow(<NavigationItems isAuthenticated/>);
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>));
    });
});