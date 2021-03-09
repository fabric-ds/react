import * as React from 'react';
import { classNames } from '@chbphone55/classnames';

export type BreadcrumbsProps = {
    // prop table doc seems unable to pull out default value with the rename in the function definition
    /** Defines a string value that labels the current element.
     * @default Her er du
     */
    'aria-label'?: string;

    className?: string;

    children?: React.ReactNode[];

    /**
     * Crumb items
     * @deprecated set the crumb links as children of the component
     */
    items?: Array<{ url: string; title: string }>;

    style?: React.CSSProperties;
    // omit aria-label for better prop table docs
} & Omit<React.PropsWithoutRef<JSX.IntrinsicElements['nav']>, 'aria-label'>;

export const Breadcrumbs = ({
    'aria-label': ariaLabel = 'Her er du',
    className,
    children,
    items,
    ...props
}: BreadcrumbsProps) => {
    const crumbs = items
        ? items.map((item) => (
              <a key={item.url + item.title} href={item.url}>
                  {item.title}
              </a>
          ))
        : React.Children.toArray(children);

    const separatedCrumbs = interleave(crumbs);

    return (
        <nav
            aria-label={ariaLabel}
            className={classNames('flex space-x-8', className)}
            {...props}
        >
            {separatedCrumbs}
        </nav>
    );
};

// injects the separator between every element in the list
// interleave function from https://stackoverflow.com/a/55387306/966362
function interleave(array): React.ReactNode[] {
    return []
        .concat(...array.map((crumb, i) => [crumb, <Separator key={i} />]))
        .slice(0, -1);
}

const Separator = () => (
    <span aria-hidden className="select-none">
        /
    </span>
);
