---
to: lib/components/<%=name%>/<%=name%>.test.tsx
---
import React from 'react'
import { render } from '@testing-library/react';
import <%=name%> from './index';

describe('test for <<%=name%> />', () => {
  it('render the component', () => {
    const { getByText, getByAltText, getByTestId  } = render(<<%=name%> />);
  })
})
