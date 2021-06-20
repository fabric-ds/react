import React, {
    useState,
    useRef,
    useEffect,
    cloneElement,
    Children,
} from 'react';
import { classNames as cn } from '@chbphone55/classnames';
import { tabs as c } from '@finn-no/fabric-component-classes';
import { debounce } from './utils';
import type { TabsProps } from './props';

const setup = (
    { className, contained, children, onClick, active, ...rest }: any,
    tabsRef,
    wunderbarRef,
) => ({
    nav: cn({
        [className]: !!className,
        [contained ? c.wrapperContained : c.wrapperUnderlined]: true,
    }),
    div: cn({
        [c.tabContainer]: true,
        [`grid-cols-${children.length}`]: true,
    }),
    wunderbar: cn(c.wunderbar),
    attrs: rest,
    updateWunderbar: () => {
        if (contained) return;
        window.requestAnimationFrame(() => {
            try {
                const activeEl = tabsRef.current.querySelector('button[role="tab"][aria-selected="true"]');
                const { left: parentLeft } =
                    tabsRef.current.getBoundingClientRect();
                const { left, width } = activeEl.getBoundingClientRect();
                wunderbarRef.current.style.left = `${left - parentLeft}px`;
                wunderbarRef.current.style.width = `${width}px`;
            } catch (err) {
                console.warn('Problem updating tabs', err);
            }
        });
    },
});

export function Tabs(props: TabsProps) {
    const tabsRef = useRef(null);
    const wunderbarRef = useRef(null);
    const { children, contained, onChange } = props;
    const { nav, div, wunderbar, attrs, updateWunderbar } = setup(
        props,
        tabsRef,
        wunderbarRef,
    );
    const [active, setActive] = useState(
        props.active || (
            children.length > 0 ? (
                children[
                    Math.max(0, children.findIndex((child) => child.props.isActive))
                ].props.name
            ) : ''
        )
    );

    const updatePanels = () => {
        children.forEach((child) => {
            const panel = document.getElementById(`fabric-tabpanel-${child.props.name}`);
            panel && (panel.hidden = child.props.name !== active);
        });
    };

    const change = (name) => {
        setActive(name);
        updateWunderbar();
        onChange && onChange(name);
    };

    const handleKeyDown = (event) => {
        if (!event.getModifierState() && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
            const tabs = [...tabsRef.current.querySelectorAll('button[role="tab"]')];
            const current = tabs.findIndex((tab) => (tab.name === active));
            const next = (() => {
                switch (event.key) {
                    case 'Home': return 0;
                    case 'End': return tabs.length - 1;
                    case 'ArrowLeft': return Math.max(0, current - 1);
                    case 'ArrowRight': return Math.min(tabs.length - 1, current + 1);
                    default: return current;
                }
            })();
            if (current !== next) {
                event.preventDefault();
                change(tabs[next].name);
                tabs[next].focus();
            }
        }
    };

    useEffect(() => {
        updatePanels();
        updateWunderbar();
        const updateDebounced = debounce(updateWunderbar, 100);
        window.addEventListener('resize', updateDebounced);
        return () => window.removeEventListener('resize', updateDebounced);
    });

    return (
        <div {...attrs} className={nav}>
            <div
                role="tablist"
                className={div}
                ref={tabsRef}
                onKeyDown={handleKeyDown}
            >
                {Children.map(children, (child: any) => {
                    return cloneElement(child, {
                        contained,
                        setActive: change,
                        isActive: child.props.name === active,
                    });
                })}
                {!contained && (
                    <span className={wunderbar} ref={wunderbarRef} />
                )}
            </div>
        </div>
    );
}
