import { CoverArt } from '../components/CoverArt';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';


describe('CoverArt snapshot test', () => {
  it('renders correct w/ different props', () => {
    const { asFragment } = render(
      <CoverArt cover='' />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
