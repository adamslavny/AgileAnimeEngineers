import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  //Test 1
  const linkElement = screen.getByText(/Welcome to Animex/i);
  expect(linkElement).toBeInTheDocument();
});

test('numbers', () => {
  render(<App />);
  //Test 2
  const expected = 1;
  const actual = 1;
  expect(actual).toEqual(expected);
});


test('rendering', () => {
  render(<App />);
  //Test 3
  let result = 5 + 2;
  expect(result).toEqual(7);
});
