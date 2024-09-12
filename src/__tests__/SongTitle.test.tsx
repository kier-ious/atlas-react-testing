import { SongTitle } from '../components/SongTitle';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';


describe('SongTitle snapshot test', () => {
  it('renders correct w/ different props', () => {
    const { asFragment } = render(
      <SongTitle title='' />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
