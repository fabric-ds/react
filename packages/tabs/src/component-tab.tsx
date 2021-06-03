import React from 'react';
import { classNames as cn } from '@chbphone55/classnames';
import { tab as c } from '@finn-no/fabric-component-classes';
import type { TabProps } from './props';

const setup = ({
    className,
    isActive,
    setActive,
    contained,
    ...rest
}: any) => ({
    tab: cn({
        [className]: !!className,
        [c.tab]: true,
        [c.tabActive]: isActive,
        [c.tabContained]: contained,
        [c.tabContainedActive]: contained && isActive,
    }),
    icon: cn({
        [c.icon]: true,
        [c.iconUnderlined]: !contained,
        [isActive ? c.iconUnderlinedActive : c.iconUnderlinedInactive]:
            !contained,
    }),
    content: cn({
        [c.contentUnderlined]: !contained,
        [isActive ? c.contentUnderlinedActive : c.contentUnderlinedInactive]:
            !contained,
        [c.contentContainedActive]: contained && isActive,
    }),
    attrs: { ...rest },
});

export function Tab(props: TabProps) {
    const { children, label, setActive = () => {}, name, onClick } = props;
    const { tab, icon, content, attrs } = setup(props);

    const handleClick = (e) => {
        setActive(name);
        onClick && onClick(e);
    };

    return (
        <button {...attrs} className={tab} onClick={handleClick}>
            {children && <span className={icon}>{children}</span>}
            <span className={content}>{label}</span>
        </button>
    );
}
