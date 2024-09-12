import { VolumeControl } from '../components/VolumeControl';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';


describe('VolumeControl snapshot test', () => {
  it('renders correct w/ different props', () => {
    const { asFragment } = render(
      <VolumeControl volume={0}
                    onVolumeChange={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
