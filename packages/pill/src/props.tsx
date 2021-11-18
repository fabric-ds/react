export type PillProps = {
  /**
   * Render text inside of Pill
   */
  label?: string;

  /**
   * Label read by screen readers when targetting a pill
   */
  openSRLabel?: string;

  /**
   * Label read by screen readers when targetting the pill close button
   */
  closeSRLabel?: string;

  /**
   * Render icon inside of Pill
   */
  icon?: React.ReactNode;

  /**
   * Whether Pill should render a closing button, use onClick
   * @default false
   */
  canClose?: boolean;

  /**
   * Whether Pill should be rendered as a suggestion
   * @default false
   */
  suggestion?: boolean;

  /**
   * Action to be called when the Pill is clicked
   */
  onClick?: () => void;

  /**
   * Action to be called when the close button is clicked
   */
  onClose?: () => void;

  /**
   * Additional styles applied to the Pill
   */
  className?: string;
};
