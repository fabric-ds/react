import { classNames } from '@chbphone55/classnames';
import { toast as c } from '@finn-no/fabric-component-classes';
import React, { useEffect, useState } from 'react';
import { useToast } from './component';
import { ToastProps } from './props';
import './styles.css';

export function Toast({
    canClose = true,
    ...props
}: ToastProps & { id?: string; programmatic?: boolean }) {
    const { removeToast } = useToast();

    const isSuccess = props.type === 'success';
    const isWarning = props.type === 'warning';
    const isError = props.type === 'error';
    const isInfo = props.type === 'info';
    // const isLoading = props.type === 'loading';

    const isProgrammatic = props.programmatic;
    const [disappeared, setDisappeared] = useState(false);

    const handleClose = () => {
        if (props.onClose) props.onClose();
        if (isProgrammatic) {
            setDisappeared(true);
            setTimeout(() => {
                removeToast(props.id as string);
            }, 1000);
        }
    };

    useEffect(() => {
        if (!props.duration) return;

        setTimeout(() => {
            setDisappeared(true);
        }, props.duration);
    });

    return (
        <div
            className={classNames(c.toastWrapper, {
                expandIn: isProgrammatic && !disappeared,
                expandOut: isProgrammatic && disappeared,
            })}
            role="status"
            aria-live="polite"
        >
            <div
                id={`toast-${props.id}-wrapper`}
                className={classNames({
                    [c.toast]: true,
                    [c.toastPositive]: isSuccess,
                    [c.toastWarning]: isWarning,
                    [c.toastNegative]: isError,
                    [c.toastNeutral]: isInfo,
                })}
            >
                <div
                    className={classNames({
                        [c.toastIcon]: true,
                        [c.toastIconPositive]: isSuccess,
                        [c.toastIconWarning]: isWarning,
                        [c.toastIconNegative]: isError,
                        [c.toastIconNeutral]: isInfo,
                        // [c.toastIconLoading]: isLoading,
                    })}
                >
                    {props.type === 'success' ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 16 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M5.5 9l2 1.5L11 6"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 16 16"
                            className={classNames(
                                'transition-transform duration-200',
                                {
                                    'transform-rotate-180': isInfo,
                                },
                            )}
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeMiterlimit="10"
                                strokeWidth="1.5"
                                d="M8 9V4"
                            />
                            <circle
                                cx="8"
                                cy="11.8"
                                r=".8"
                                fill="currentColor"
                            />
                        </svg>
                    )}
                </div>
                <div className={c.toastContent}>
                    <p>{props.text}</p>
                </div>
                {canClose && (
                    <button className={c.toastClose} onClick={handleClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M4.03 2.97a.75.75 0 00-1.06 1.06L6.94 8l-3.97 3.97a.75.75 0 101.06 1.06L8 9.06l3.97 3.97a.75.75 0 101.06-1.06L9.06 8l3.97-3.97a.75.75 0 00-1.06-1.06L8 6.94 4.03 2.97z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
