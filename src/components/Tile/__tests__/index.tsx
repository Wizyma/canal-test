import { render, screen } from '@testing-library/react';

import Component from '..'

test(`It should render the ${Component.name} component`, () => {
  const { asFragment } = render(<Component title="Jest Test" poster_path='/nothing' />)

  // ensure element has been rendered
  expect(screen.getByText('Jest Test')).toHaveTextContent('Jest Test');
  expect(asFragment()).toMatchSnapshot()
})