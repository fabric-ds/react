import React from 'react';
import { SwitchProps } from './props';
import { classNames } from '@chbphone55/classnames';
import { switchToggle as c } from '@finn-no/fabric-component-classes';

export function Switch({
    id,
    disabled,
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
                disabled={disabled}
                role="switch"
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-checked={value}
                onClick={() => !disabled && onClick(!value)}
                className={classNames([c.label, switchFocus], {
                    [c.labelDisabled]: disabled,
                })}
                {...attrs}
            >
                <div
                    className={classNames([c.switchTrack, 'top-0'], {
                        [c.switchTrackSelected]: value && !disabled,
                        [c.switchTrackUnselected]: !value && !disabled,
                        [c.switchTrackDisabled]: disabled,
                    })}
                />
                <div
                    className={classNames(c.switchThumb, {
                        [c.switchThumbSelected]: value,
                        [c.switchThumbDisabled]: disabled,
                        [c.switchThumbNotDisabled]: !disabled,
                    })}
                />
            </button>
        </div>
    );
}
