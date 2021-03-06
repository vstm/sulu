// @flow
import React from 'react';
import {render, mount} from 'enzyme';
import moment from 'moment-timezone';
import DatePicker from '../DatePicker';

beforeEach(() => {
    const constantDate = new Date(Date.UTC(2017, 3, 15, 6, 32, 20));
    (Date: any).now = jest.fn().mockReturnValue(constantDate);

    moment.tz.setDefault('Europe/Vienna');
});

test('DatePicker should render', () => {
    const onChange = jest.fn();
    expect(mount(<DatePicker value={null} onChange={onChange} />)).toMatchSnapshot();
});

test('DatePicker should render with placeholder', () => {
    const onChange = jest.fn();
    expect(render(<DatePicker value={null} placeholder="My placeholder" onChange={onChange} />)).toMatchSnapshot();
});

test('DatePicker should render with value', () => {
    const onChange = jest.fn();
    const value = new Date('2017-05-23');
    expect(render(<DatePicker value={value} onChange={onChange} />)).toMatchSnapshot();
});

test('DatePicker should render null value as empty string', () => {
    const onChange = jest.fn();
    expect(render(<DatePicker value={null} onChange={onChange} />)).toMatchSnapshot();
});

test('DatePicker should render date format only with month', () => {
    const onChange = jest.fn();
    const options = {
        dateFormat: 'MMMM',
    };
    expect(render(<DatePicker value={null} onChange={onChange} options={options} />)).toMatchSnapshot();
});

test('DatePicker should render date format only with year', () => {
    const onChange = jest.fn();
    const options = {
        dateFormat: 'YYYY',
    };
    expect(render(<DatePicker value={null} onChange={onChange} options={options} />)).toMatchSnapshot();
});

test('DatePicker should render date picker with time picker', () => {
    const onChange = jest.fn();
    const options = {
        timeFormat: true,
    };
    expect(render(<DatePicker value={null} onChange={onChange} options={options} />)).toMatchSnapshot();
});

test('DatePicker should render error', () => {
    const onChange = jest.fn();
    expect(render(<DatePicker value={null} onChange={onChange} valid={false} />)).toMatchSnapshot();
});

test('DatePicker should render error when invalid value is set', () => {
    const onChange = jest.fn();
    const options = {
        dateFormat: 'YYYY',
    };
    const datePicker = mount(<DatePicker value={null} onChange={onChange} options={options} />);

    // check if showError is set correctly
    datePicker.find('Input').instance().props.onChange('xxx', {target: {value: 'xxx'}});
    datePicker.find('Input').instance().props.onBlur();
    datePicker.update();
    expect(datePicker.instance().showError).toBe(true);

    // snapshot
    expect(render(datePicker)).toMatchSnapshot();

    // now add a valid value
    datePicker.find('Input').instance().props.onChange('2018', {target: {value: '2018'}});
    datePicker.find('Input').instance().props.onBlur();
    datePicker.update();
    expect(datePicker.instance().showError).toBe(false);
});

test('DatePicker should set class correctly when overlay was opened/closed', () => {
    const onChange = jest.fn();
    const input = mount(<DatePicker value={null} onChange={onChange} />);

    // overlay should be closed
    expect(input.find('.rdt').hasClass('rdtOpen')).toBe(false);

    // open dialog and check if class is set
    input.find('Input Icon span').simulate('click');
    expect(input.find('.rdt').hasClass('rdtOpen')).toBe(true);

    // choose a date and check if class was removed again
    input.find('.rdtPicker tbody tr td').first().simulate('click');
    expect(input.find('.rdt').hasClass('rdtOpen')).toBe(false);

    // check if value is in input
    expect(input.find('Input').prop('value')).toBe('03/26/2017');
});
