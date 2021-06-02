import React, { useState, cloneElement, Children } from 'react';
import { classNames as cl } from '@chbphone55/classnames';
import { tabs as c, tab as ct } from '@finn-no/fabric-component-classes';

const tabSetup = ({ className, isActive, setActive, contained, ...rest }) => ({
    tab: cl({
        [className]: !!className,
        [ct.tab]: true,
        [ct.tabActive]: isActive,
        [ct.tabContained]: contained,
        [ct.tabContainedActive]: contained && isActive,
    }),
    icon: cl({
        [ct.icon]: true,
        [ct.iconUnderlined]: !contained,
        [isActive ? ct.iconUnderlinedActive : ct.iconUnderlinedInactive]:
            !contained,
    }),
    content: cl({
        [ct.contentUnderlined]: !contained,
        [isActive
            ? ct.contentUnderlinedActive
            : ct.contentUnderlinedInactive]: !contained,
        [ct.contentContainedActive]: contained && isActive,
    }),
    attrs: { ...rest }
});

const tabsSetup = ({ className, contained, children, onClick, ...rest }) => ({
    nav: cl({
        [className]: !!className,
        [contained ? c.wrapperContained : c.wrapperUnderlined]: true,
    }),
    div: cl({
        [c.tabContainer]: true,
        [`grid-cols-${children.length}`]: true,
    }),
    wunderbar: cl(c.wunderbar),
    attrs: { ...rest },
});

export function Tab(props) {
    const { children, label, setActive, name, onClick } = props;
    const { tab, icon, content, attrs } = tabSetup(props);

    const handleClick = (e) => {
        setActive(name);
        onClick && onClick(e);
    }

    return (
        <button {...attrs} className={tab} onClick={handleClick}>
            {children && <span className={icon}>{children}</span>}
            <span className={content}>{label}</span>
        </button>
    );
}

export function Tabs(props) {
    const { children, contained, onChange } = props;
    const { nav, div, wunderbar, attrs } = tabsSetup(props);
    const [active, setIsActive] = useState('');

    const setActive = (name) => {
        setIsActive(name);
        onChange && onChange(name);
    };

    return (
        <nav {...attrs} className={nav}>
            <div className={div}>
                {Children.map(children, (child) => {
                    return cloneElement(child, {
                        contained,
                        setActive,
                        isActive:
                            (active && active === child.props.name) ||
                            (!active && child.props.isActive),
                    });
                })}
                {!contained && <span className={wunderbar} />}
            </div>
        </nav>
    );
}
