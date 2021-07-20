import React, { useState, useEffect } from 'react';
import { toaster as c } from '@finn-no/fabric-component-classes';
import { Toast } from './toast';
import { ToastProps } from './props';

export function ToastContainer() {
    const [toasts, setToasts] = useState<(ToastProps & { id: number })[]>([]);

    return (
        <aside className={c.toasterContainer}>
            <div className={c.toaster}>
                {!!toasts.length &&
                    toasts.map((t, i) => (
                        <Toast {...t} key={`toast-${t.id}-${i}`} />
                    ))}
            </div>
        </aside>
    );
}
