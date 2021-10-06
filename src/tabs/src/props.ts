import React from 'react';

export type TabsProps = {
  /**
   * Whether the tabs should use the contained look and feel or not.
   * @default false
   */
  contained?: boolean;

  /**
   * The Tabs within the container.
   */
  children: React.ReactNode;

  /**
   * Used to set the name of the Tab that should be active on mount.
   * Defaults to the first tab if not present and isActive is not set on any Tab.
   */
  active?: string;

  /** Additional CSS class for the container */
  className?: string;

  /** Handler that is called when the tab changes. */
  onChange?: (name: string) => void;

  /** Additional CSS styles for the container. */
  style?: React.CSSProperties;
};

export type TabProps = {
  setActive?: (name: string) => void;

  /** Additional CSS class for the tab. */
  className?: string;

  /**
   * Set the over prop to true if you need to move icons to above the tab label
   * @default false
   */
  over?: boolean;

  /** Additional content to be included in the tab (eg. icons). Content is placed above the label. */
  children?: React.ReactNode;

  /** Tab name identifier. This value will be omitted as the argument to the Tabs onChange handler. */
  name: string;

  /** The label of the tab item. */
  label: React.ReactNode;

  /** Used to set which tab should be active on mount. Defaults to the first tab if not present. */
  isActive?: boolean;

  /** Additional CSS styles for the tab. */
  style?: React.CSSProperties;

  /**
   * Action to be called when the component is clicked
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type TabPanelProps = {
  children?: React.ReactNode;

  /** Tab name identifier. Must exactly match the name identifier of a Tab. */
  name: string;

  /** Show/hide panel manually (in server-side rendering). */
  hidden?: boolean;
};
