import React from 'react';
import { SwitchProps } from './props';
import { classNames } from '@chbphone55/classnames';
import { switchToggle as c } from '@finn-no/fabric-component-classes';

export function Switch({ id, disabled, value, onChange }: SwitchProps) {
    return (
        <div
            className="tap-highlight-transparent"
            onClick={() => onChange(!value)}
        >
            <input
                type="checkbox"
                className="sr-only"
                id={id}
                checked={value}
                disabled={disabled}
            />
            <label
                htmlFor={id}
                className={classNames({
                    [c.label]: true,
                    [c.labelDisabled]: disabled,
                })}
            >
                <div
                    className={classNames({
                        [c.switchTrack]: true,
                        [c.switchTrackSelected]: value && !disabled,
                        [c.switchTrackUnselected]: !value && !disabled,
                        [c.switchTrackDisabled]: disabled,
                    })}
                />
                <div
                    className={classNames({
                        [c.switchThumb]: true,
                        [c.switchThumbSelected]: value,
                        [disabled
                            ? c.switchThumbDisabled
                            : c.switchThumbNotDisabled]: true,
                    })}
                />
            </label>
        </div>
    );
}
