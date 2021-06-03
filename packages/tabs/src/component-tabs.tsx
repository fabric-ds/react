import React, {
    useState,
    useRef,
    useEffect,
    cloneElement,
    Children,
} from 'react';
import { classNames as cn } from '@chbphone55/classnames';
import { tabs as c } from '@finn-no/fabric-component-classes';
import type { TabsProps } from './props';

const setup = (
    { className, contained, children, onClick, ...rest }: any,
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
    attrs: { ...rest },
    updateWunderbar: () => {
        if (contained) return;
        window.requestAnimationFrame(() => {
            try {
                const activeEl = tabsRef.current.querySelector('.active-tab');
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
    const [active, setIsActive] = useState('');

    const setActive = (name) => {
        setIsActive(name);
        updateWunderbar();
        onChange && onChange(name);
    };

    useEffect(updateWunderbar);

    return (
        <nav {...attrs} className={nav}>
            <div className={div} ref={tabsRef}>
                {Children.map(children, (child: any) => {
                    return cloneElement(child, {
                        contained,
                        setActive,
                        isActive:
                            (active && active === child.props.name) ||
                            (!active && child.props.isActive),
                    });
                })}
                {!contained && (
                    <span className={wunderbar} ref={wunderbarRef} />
                )}
            </div>
        </nav>
    );
}
