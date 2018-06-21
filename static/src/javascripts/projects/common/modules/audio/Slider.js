// @flow

import { styled, Component } from '@guardian/dotcom-rendering/packages/guui';

const Scrubber = styled('div')(({ left }) => ({
    backgroundColor: '#ffffff',
    borderRadius: '100%',
    height: '14px',
    left: `${left}px`,
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '14px',
}));

export default function Slider({ min, max, value }) {
    return (
        <Scrubber
            left={value}
            role="slider"
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
        />
    );
}
