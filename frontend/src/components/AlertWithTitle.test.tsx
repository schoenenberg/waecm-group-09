import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { AlertWithTitle } from './AlertWithTitle';

afterEach(() => {
  cleanup();
});

// -----------------------------------------------------------------------------

it('renders without crashing', () => {
  const { queryByTestId } = render(
    <AlertWithTitle title={''} severity={'info'}>
      {}
    </AlertWithTitle>,
  );

  expect(queryByTestId('alert-title')).toBeTruthy();
  expect(queryByTestId('alert-container')).toBeTruthy();
});

it('renders title prop correctly', () => {
  const { queryByTestId } = render(
    <AlertWithTitle title={'Title1'} severity={'warning'}>
      {'Some Text'}
    </AlertWithTitle>,
  );
  expect(queryByTestId('alert-title')).toHaveTextContent('Title1');
});

it('renders children prop correctly', () => {
  const { getByTestId } = render(
    <AlertWithTitle title={'Title1'} severity={'info'}>
      {'Some Text of the first Alert'}
    </AlertWithTitle>,
  );
  expect(getByTestId('alert-container')).toHaveTextContent(
    'Some Text of the first Alert',
  );
});

it('renders when no severity prop is provided', () => {
  const { getByTestId } = render(
    <AlertWithTitle title={'Title'}>{'Some Text'}</AlertWithTitle>,
  );
  expect(getByTestId('alert-container')).toBeTruthy();
});
