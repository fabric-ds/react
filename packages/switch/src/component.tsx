import React from 'react';
import { SwitchProps } from './props';
import { classNames } from '@chbphone55/classnames';
import { switchToggle as c } from '@finn-no/fabric-component-classes';

export function Switch({
    id,
    value,
    onClick,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...attrs
}: SwitchProps) {
    const switchFocus =
        'focus:outline-none focus:ring ring-offset-1 ring-blue-200 rounded-full';

    return (
        <div className="tap-highlight-transparent">
            <button
                id={id}
                role="switch"
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-checked={value}
                onClick={() => onClick(!value)}
                className={classNames([c.label, switchFocus])}
                {...attrs}
            >
                <div
                    className={classNames([c.switchTrack, 'top-0'], {
                        [c.switchTrackSelected]: value,
                        [c.switchTrackUnselected]: !value,
                    })}
                />
                <div
                    className={classNames(
                        [c.switchThumb, c.switchThumbNotDisabled],
                        {
                            [c.switchThumbSelected]: value,
                        },
                    )}
                />
            </button>
        </div>
    );
}
