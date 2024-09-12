import { PlayListItem } from '../components/PlayListItem';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';


describe('PlayListItem snapshot test', () => {
  it('renders correct w/ different props', () => {
    const { asFragment } = render(
      <PlayListItem title=''
                    artist=''
                    duration=''
                    isPlaying={false}
                    onClick={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
