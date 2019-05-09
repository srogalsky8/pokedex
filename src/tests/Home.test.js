import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Home} from '../components/Home';

configure({adapter: new Adapter()});

const pokemonList = Array.from({length:50}, (element, idx) => ({id: idx+1, name: 'name'}))
const bag = {1: true, 4: true, 38: true};

describe('Home component', () => {

  let props = {
    pokemonList,
    bag
  }
  let wrapper = shallow(<Home {...props} />);

  it('renders 20 cards on load', () => {
    wrapper = shallow(<Home {...props} />);
    expect(wrapper.find('.card')).toHaveLength(20);
  });

  it('shows 3 cards when bag has 3 items and filtering', () => {
    wrapper = shallow(<Home {...props} />);
    wrapper.find('.bag-btn').simulate('click');
    expect(wrapper.find('.card')).toHaveLength(3);
  })

  it('shows 0 cards when bag is empty and filtering', () => {
    props = {
      pokemonList,
      bag: {}
    }
    wrapper = shallow(<Home {...props} />);
    wrapper.find('.bag-btn').simulate('click');
    expect(wrapper.find('.card')).toHaveLength(0);
  });

});