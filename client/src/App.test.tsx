import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  //Test 1
  const linkElement = screen.getByText(/Welcome to Agile Anime Engineers/i);
  expect(linkElement).toBeInTheDocument();
  //Test 2
  const expected = 1;
  const actual = 1;
  expect(actual).toEqual(expected);
  //Test 3

});
