import React, { useState, SetStateAction } from 'react';
import { toaster as c } from '@finn-no/fabric-component-classes';
import { Toast } from './toast';
import { ToastProps } from './props';
import { createContext, Dispatch, useContext, useEffect } from 'react';

type Toast = ToastProps & { id: number; programatic?: boolean };

interface ToastContextProps {
    state: Toast[];
    dispatch: Dispatch<SetStateAction<Toast[]>>;
}

export const ToastContext = createContext<ToastContextProps>(
    {} as ToastContextProps,
);

export function useToast(): {
    toast: (message: string, options: Omit<ToastProps, 'text'>) => void;
    removeToast: (id: number) => void;
} {
    const { dispatch } = useContext(ToastContext);

    return {
        toast: (message: string, options: Omit<ToastProps, 'text'>) => {
            const id = Math.floor(Math.random() * 100 + 1);
            dispatch((o) => [
                ...o,
                {
                    id: id as number,
                    programmatic: true,
                    text: message,
                    duration: 2400,
                    ...options,
                },
            ]);
        },
        removeToast: (id: number) => {
            dispatch((o) => o.filter((toast) => toast.id !== id));
        },
    };
}

export function ToastContainer({ children }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        toasts.forEach((t) => {
            if (t.duration) {
                setTimeout(() => {
                    setToasts((o) => o.filter((toast) => toast.id !== t.id));
                }, t.duration + 1000);
            }
        });
    }, [toasts]);

    return (
        <ToastContext.Provider
            value={{
                state: toasts,
                dispatch: setToasts,
            }}
        >
            <aside className={c.toasterContainer}>
                <div className={`${c.toaster} relative`}>
                    {!!toasts.length &&
                        toasts.map((t, i) => (
                            <Toast {...t} key={`toast-${t.id}`} />
                        ))}
                </div>
            </aside>
            {children}
        </ToastContext.Provider>
    );
}
