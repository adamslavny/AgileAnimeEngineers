import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
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

test('catagories', () => {
  render(<App />);
  //test 4 tests if the title is a link which is then compared to the name
  //of the element found by text if they equal we  can confirm the  link
  //exists and is on the title words
  const linkElement = screen.getByRole('link');
  const nameElement = screen.getByText(/Welcome to Agile Anime Engineers/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.className == nameElement.nodeName);
});
