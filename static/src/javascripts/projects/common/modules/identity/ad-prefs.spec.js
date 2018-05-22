import React from 'react';
import {shallow} from 'enzyme';
import {_} from '../ad-prefs';

const {
    AdPrefsWrapper,
    ConsentBox,
    ConsentRadioButton,
} = _;

const mockAllAdConsents = [
    {
        name: 'test consent',
        cookie: 'gu-test-consent'
    }
];

describe('Ad prefs', () => {

    it('Ad Prefs enables the save button on change', async () => {

        const wrapper = shallow(<AdPrefsWrapper allAdConsents={mockAllAdConsents} />);
        await wrapper.instance().componentDidMount();

        expect(wrapper.state('changesPending')).toEqual(false);

        wrapper.find('input[value=true]').simulate('change');

        expect(wrapper.state('changesPending')).toEqual(true);
    });
})
