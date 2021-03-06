/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react';
import {render, shallow} from 'enzyme';
import Icon from '../Icon';

test('Icon should render', () => {
    expect(render(<Icon name="su-save" />)).toMatchSnapshot();
});

test('Icon should render with class names', () => {
    expect(render(<Icon className="test" name="su-pen" />)).toMatchSnapshot();
});

test('Icon should render with onClick handler, role and tabindex', () => {
    const onClickSpy = jest.fn();
    expect(render(<Icon className="test" name="su-save" onClick={onClickSpy} />)).toMatchSnapshot();
});

test('Icon should call the callback on click', () => {
    const onClick = jest.fn();
    const stopPropagation = jest.fn();
    const icon = shallow(<Icon className="test" name="su-pen" onClick={onClick} />);
    icon.simulate('click', { stopPropagation });
    expect(onClick).toBeCalled();
    expect(stopPropagation).toBeCalled();
});
