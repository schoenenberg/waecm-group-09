import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render, cleanup } from '@testing-library/react';
import { Alert } from './Alert';

let container: HTMLDivElement;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(cleanup);

// -----------------------------------------------------------------------------

it('renders without crashing', () => {
  // empty children
  act(() => {
    ReactDOM.render(<Alert title={'Title'}>{}</Alert>, container);
  });

  // empty children and title
  act(() => {
    ReactDOM.render(<Alert title={''}>{}</Alert>, container);
  });

  // empty children and title
  act(() => {
    ReactDOM.render(
      <Alert title={'Some Title'}>{'Some Children'}</Alert>,
      container,
    );
  });
});

it('renders title prop correctly', () => {
  act(() => {
    const { queryByTestId } = render(
      <Alert title={'Title1'}>{'Some Text'}</Alert>,
    );
    expect(queryByTestId('alert-title')).toHaveTextContent('Title1');
    cleanup();
  });
  act(() => {
    const { queryByTestId } = render(
      <Alert title={'Title2'}>{'Some Text'}</Alert>,
    );
    expect(queryByTestId('alert-title')).toHaveTextContent('Title2');
    cleanup();
  });
  act(() => {
    const { queryByTestId } = render(
      <Alert title={'Title3'}>{'Some Text'}</Alert>,
    );
    expect(queryByTestId('alert-title')).toHaveTextContent('Title3');
    cleanup();
  });
});

it('renders children prop correctly', () => {
  act(() => {
    const { getByTestId } = render(
      <Alert title={'Title1'}>{'Some Text of the first Alert'}</Alert>,
    );
    expect(getByTestId('alert-container')).toHaveTextContent(
      'Some Text of the first Alert',
    );
    cleanup();
  });
  act(() => {
    const { getByTestId } = render(
      <Alert title={'Title2'}>{'Some Text of the second Alert'}</Alert>,
    );
    expect(getByTestId('alert-container')).toHaveTextContent(
      'Some Text of the second Alert',
    );
    cleanup();
  });
  act(() => {
    const { getByTestId } = render(
      <Alert title={'Title3'}>{'Some Text of the third Alert'}</Alert>,
    );
    expect(getByTestId('alert-container')).toHaveTextContent(
      'Some Text of the third Alert',
    );
    cleanup();
  });
});
