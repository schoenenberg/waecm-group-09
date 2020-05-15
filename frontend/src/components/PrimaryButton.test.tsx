import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { PrimaryButton } from './PrimaryButton';

afterEach(() => {
  cleanup();
});

it('renders without crashing', () => {
  const { queryByTestId } = render(
    <PrimaryButton onClickHandler={() =>{}}>
      Some children
    </PrimaryButton>
  );

  expect(queryByTestId('primary-button')).toBeTruthy();
});

it('renders children prop correctly', () => {
  const title = "title";
  const { getByTestId } = render(
    <PrimaryButton onClickHandler={() =>{}}>
      {title}
    </PrimaryButton>
  );

  expect(getByTestId('primary-button')).toHaveTextContent(
    'title',
  );
});

it('renders disabled state correctly', () => {
  const title = "title";
  const { getByTestId } = render(
    <PrimaryButton onClickHandler={() => {}} disabled={true}>
      {title}
    </PrimaryButton>
  );

  expect(getByTestId('primary-button')).toBeDisabled();
});


it('executes click handler on click', () => {
  let title = "title";
  const handleClick = jest.fn();

  const { getByTestId } = render(
    <PrimaryButton onClickHandler={handleClick}>
      {title}
    </PrimaryButton>
  );

  fireEvent.click(getByTestId('primary-button'));

  expect(getByTestId('primary-button')).toHaveBeenCalled();
});
