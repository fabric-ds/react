import { classNames } from '@chbphone55/classnames';
import { modal as c } from '@finn-no/fabric-component-classes';
import React, { useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';
import { ModalProps } from './props';
import { setup, teardown } from 'scroll-doctor';

/**
 * A Modal dialog that renders on top the page
 */
export const Modal = ({
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
}: ModalProps) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        teardown();
        if (!contentRef.current) return;
        props.open && setup(contentRef.current);
    }, [props.open, contentRef]);

    useEffect(() => {
        if (!props.initialFocusRef) return;
        props.initialFocusRef.current?.focus();
    }, [props.open, props.initialFocusRef]);

    if (!props.open) return <></>;

    return (
        <FocusLock>
            <div
                id="modal-backdrop"
                className={classNames(props.className, c.backdrop)}
                style={{ ...props.style }}
            >
                <div
                    aria-label={ariaLabel ?? undefined}
                    aria-labelledby={ariaLabelledBy ?? undefined}
                    onKeyDown={(event) => {
                        if (!props.onDismiss) return;
                        if (event.key === 'Escape') {
                            props.onDismiss();
                        }
                    }}
                    className={c.modal}
                    tabIndex={-1}
                    aria-modal="true"
                    role="dialog"
                >
                    <div className={c.title}>
                        {typeof props.left === 'boolean' && props.left ? (
                            <button
                                aria-label="Tilbake"
                                className={classNames([
                                    c.transitionTitle,
                                    c.titleButton,
                                    c.titleButtonLeft,
                                    'justify-self-start',
                                ])}
                            >
                                <svg
                                    className={classNames([
                                        c.titleButtonIcon,
                                        'transform rotate-90',
                                    ])}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill="currentColor"
                                        fillRule="nonzero"
                                        d="M8 2.25a.75.75 0 01.743.648L8.75 3v8.189l3.72-3.72a.75.75 0 011.133.977l-.073.084-5 5a.747.747 0 01-.374.204l-.104.014h-.104a.747.747 0 01-.478-.218l-5-5a.75.75 0 01.976-1.133l.084.073 3.72 3.719V3A.75.75 0 018 2.25z"
                                    ></path>
                                </svg>
                            </button>
                        ) : (
                            props.left
                        )}

                        <div
                            className={classNames({
                                [c.transitionTitle]: true,
                                'justify-self-center': !!props.left,
                                'col-span-2': !!!props.left,
                            })}
                        >
                            {typeof props.title === 'string' ? (
                                <p className={c.titleText}>{props.title}</p>
                            ) : (
                                props.title
                            )}
                        </div>

                        {typeof props.right === 'boolean' && props.right ? (
                            <button
                                aria-label="Lukk"
                                tabIndex={!props.onDismiss ? -1 : undefined}
                                onClick={props.onDismiss}
                                className={classNames([
                                    c.transitionTitle,
                                    c.titleButton,
                                    c.titleButtonRight,
                                    'justify-self-end',
                                ])}
                            >
                                <svg
                                    className={c.titleButtonIcon}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M12 12l6 6-6-6-6 6 6-6zm0 0L6 6l6 6 6-6-6 6z"
                                    />
                                </svg>
                            </button>
                        ) : (
                            props.right
                        )}
                    </div>

                    <div
                        ref={contentRef}
                        className={c.content}
                        id="f-modal-content"
                    >
                        {props.children}
                    </div>

                    {!!props.footer && (
                        <div className={c.footer}>{props.footer}</div>
                    )}
                </div>
            </div>
        </FocusLock>
    );
};
