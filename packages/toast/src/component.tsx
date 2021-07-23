import { toaster as c } from '@finn-no/fabric-component-classes';
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';
import { ToastProps } from './props';
import { Toast } from './toast';

type Toast = ToastProps & { id: string | number; programatic?: boolean };

interface ToastContextProps {
    state: Toast[];
    dispatch: Dispatch<SetStateAction<Toast[]>>;
}

export const ToastContext = createContext<ToastContextProps>(
    {} as ToastContextProps,
);

export function useToast(): {
    toast: (message: string, options: Omit<ToastProps, 'text'>) => void;
    removeToast: (id: string) => void;
} {
    const { dispatch } = useContext(ToastContext);

    return {
        toast: (message: string, options: Omit<ToastProps, 'text'>) => {
            const id =
                Date.now().toString(36) +
                Math.random().toString(36).slice(2, 5);

            dispatch((o) => [
                ...o,
                {
                    id,
                    programmatic: true,
                    text: message,
                    duration: 2400,
                    ...options,
                },
            ]);
        },
        removeToast: (id: string) => {
            dispatch((o) => o.filter((toast) => toast.id !== id));
        },
    };
}

export function ToastContainer({ children }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        toasts.forEach((t) => {
            if (!t.duration) return;
            setTimeout(() => {
                setToasts((o) => o.filter((toast) => toast.id !== t.id));
            }, t.duration + 1000);
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
