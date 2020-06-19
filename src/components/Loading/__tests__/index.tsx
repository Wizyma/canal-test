import { render } from '@testing-library/react';

import Component from '..'

test(`It should render the ${Component.name} component`, () => {
  const { asFragment } = render(<Component />)

  expect(asFragment()).toMatchSnapshot()
})