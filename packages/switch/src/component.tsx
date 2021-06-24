import React from 'react';
import { SwitchProps } from './props';
import { classNames } from '@chbphone55/classnames';
import { switchToggle as c } from '@finn-no/fabric-component-classes';

export function Switch({ id, disabled, value, onClick }: SwitchProps) {
    return (
        <div className="tap-highlight-transparent">
            <input
                role="switch"
                aria-checked={value}
                type="button"
                className="sr-only"
                id={id}
                checked={value}
                disabled={disabled}
                readOnly
            />
            <label
                htmlFor={id}
                onClick={() => !disabled && onClick(!value)}
                className={classNames(c.label, {
                    [c.labelDisabled]: disabled,
                })}
            >
                <div
                    className={classNames(c.switchTrack, {
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
            </label>
        </div>
    );
}
