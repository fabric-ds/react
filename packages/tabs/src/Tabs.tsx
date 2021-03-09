import * as React from 'react';
import {
    Tab as ReachTab,
    TabList as ReachTabList,
    TabPanel as ReachTabPanel,
    TabPanels as ReachTabPanels,
    Tabs as ReachTabs,
    useTabsContext,
} from '@reach/tabs';
import { classNames } from '@chbphone55/classnames';

export type TabsProps = {
    /**
     * Whether the tab items are centered.
     *
     * @deprecated use `variant="centered"` instead.
     */
    centered?: boolean;

    /**
     * The Tabs within the container.
     */
    children: React.ReactNode;

    /** Additional CSS class for the container */
    className?: string;

    /** The default tab index. (Uncontrolled). */
    defaultIndex?: number;

    /** The index of the current selected tab. (Controlled). */
    index?: number;

    /**
     * Whether the tab items are justified.
     *
     * @deprecated use `variant="justified"` instead.
     */
    justified?: boolean;

    /** Handler that is called when the tab changes. */
    onChange?: (tabIndex: number) => void;

    /** Additional CSS styles for the container. */
    style?: React.CSSProperties;

    /**
     * Whether the tab items are justified or centered.
     */
    variant?: 'centered' | 'justified';
};

/**
 * Tabs container.
 */
export const Tabs = ({
    centered,
    justified,
    children,
    variant: providedVariant,
    ...props
}: TabsProps) => {
    let variant = providedVariant;
    if (!variant && centered) {
        variant = 'centered';
    } else if (!variant && justified) {
        variant = 'justified';
    }

    return (
        <ReachTabs {...props}>
            <ReachTabList
                className={classNames('flex text-16 -mb-8', {
                    'items-center justify-center': variant === 'centered',
                })}
            >
                {React.Children.map(
                    children,
                    (child: React.ReactElement<TabProps>, index: number) => (
                        <TabItem
                            index={index}
                            title={child.props.title}
                            variant={variant}
                        />
                    ),
                )}
            </ReachTabList>
            <ReachTabPanels>
                {React.Children.map(
                    children,
                    (child: React.ReactElement<TabProps>) => {
                        // Pull out title here without using, as that applies to tabitems
                        const { title, className, ...props } = child.props;
                        return (
                            <ReachTabPanel
                                className={classNames(
                                    'p-16 rounded-8 bg-blue-50',
                                    className,
                                )}
                                {...props}
                            />
                        );
                    },
                )}
            </ReachTabPanels>
        </ReachTabs>
    );
};

export type TabProps = {
    /** Additional CSS class for the tab panel. */
    className?: string;

    /** The content of the tab panel */
    children: React.ReactNode;

    /** The content of the tab item. */
    title: React.ReactNode;

    /** Additional CSS styles for the tab panel. */
    style?: React.CSSProperties;
};

/**
 * A tab. Should only be rendered inside `<Tabs>`.
 */
export const Tab = (props: TabProps) => {
    // Don't render anything here. To simplify the surface API we simply use this component as a data container.
    // We do the rendering in <Tabs>.

    return null;
};

const TabItem = ({
    index,
    variant,
    title,
}: {
    index: number;
    title: React.ReactNode;
    variant: 'centered' | 'justified' | undefined;
}) => {
    const { selectedIndex } = useTabsContext();

    const isSelected = selectedIndex === index;

    return (
        <ReachTab
            as="div"
            className={classNames(
                'pt-16 pb-24 px-32 rounded-8 cursor-pointer focus-ring hover:underline hover:bg-blue-50',
                {
                    'font-bold bg-blue-50': isSelected,
                    'text-center flex-shrink-0 flex-grow':
                        variant === 'justified',
                },
            )}
        >
            {title}
        </ReachTab>
    );
};
