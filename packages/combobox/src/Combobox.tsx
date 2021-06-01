import * as React from 'react';
import {
    ComboboxList as List,
    ComboboxPopover as Popover,
    ComboboxOption as Option,
    ComboboxInput as Input,
    Combobox as ReachCombobox,
} from '@reach/combobox';
import type { ComboboxContextValue } from '@reach/combobox';
import type { ForwardRefExoticComponentWithAs } from '@reach/utils';
import { classNames } from '@chbphone55/classnames';
import { useId } from '@finn-no/fabric-react-utils';

export { ComboboxOptionText, useComboboxContext } from '@reach/combobox';

const MatchTextSegmentsContext = React.createContext<boolean>(false);

const OPTION_HIGHLIGHT_COLOR = 'bluegray-100';
const OPTION_CLASS_NAME = 'f-react-combobox-option';
const MATCH_SEGMENTS_CLASS_NAME = 'f-react-combobox-match';

export type ComboboxProps = {
    children:
        | React.ReactNode
        | ((props: ComboboxContextValue) => React.ReactNode);
    /**
     * Whether the popover opens when focus is on the text field
     *
     * @default false
     */
    openOnFocus?: boolean;

    /**
     * Whether the matching text segments in the options should be highlighted.
     *
     * Note that you only need to set this if you want to use the component's default styling for matched text.
     * The CSS selectors are applied regardless of this prop, so you can style text matches however you like
     * without setting this to `true`.
     */
    matchTextSegments?: boolean;

    /**
     * Called with the selection value when the user makes a selection from the
     * list.
     */
    onSelect?(value: string): void;

    className?: string;
    style?: React.CSSProperties;
} & Omit<React.PropsWithoutRef<JSX.IntrinsicElements['div']>, 'onSelect'>;

/**
 * Combobox
 *
 */
export const Combobox = ({
    matchTextSegments = false,
    ...props
}: ComboboxProps) => {
    // we need to use our own id hook, because ours is safe across multiple react roots,
    // while Reach's isn't
    const id = useId(props.id);

    useInjectStyleSheet();

    return (
        <MatchTextSegmentsContext.Provider value={matchTextSegments}>
            <ReachCombobox {...props} id={id} />
        </MatchTextSegmentsContext.Provider>
    );
};

export type ComboboxPopoverProps = {
    children: React.ReactNode;

    /** If `false` the popover will not render inside of a portal,
     * but in the same order as the React tree.
     * This is mostly useful for styling the entire component together.
     *
     * @default false
     */
    portal?: boolean;

    className?: string;
    style?: React.CSSProperties;
};

/**
 * ComboboxPopover
 *
 * Contains the popup that renders the list. Because some UI needs to render
 * more than the list in the popup, you need to render one of these around the
 * list. For example, maybe you want to render the number of results suggested.
 *
 */
export const ComboboxPopover = ({
    className,
    ...props
}: ComboboxPopoverProps) => (
    <Popover
        className={classNames('pb-8 rounded-8 bg-white shadow', className)}
        {...props}
    />
);

export type ComboboxInputProps = {
    /**
     * A string representing an HTML element or a React component that will tell the ComboboxInput what element to render.
     *
     * @default input
     */
    as?: keyof JSX.IntrinsicElements | React.ComponentType;

    /**
     * Determines if the value in the input changes or not as the user navigates
     * with the keyboard. If true, the value changes, if false the value doesn't
     * change.
     *
     * Set this to false when you don't really need the value from the input but
     * want to populate some other state (like the recipient selector in Gmail).
     * But if your input is more like a normal `<input type="text"/>`, then leave
     * the `true` default.
     *
     * @default true
     *
     */
    autocomplete?: boolean;
    /**
     * If true, when the user clicks inside the text box the current value will
     * be selected. Use this if the user is likely to delete all the text anyway
     * (like the URL bar in browsers).
     *
     * However, if the user is likely to want to tweak the value, leave this
     * false, like a google search - the user is likely wanting to edit their
     * search, not replace it completely.
     *
     * @default false
     */
    selectOnClick?: boolean;
};

/**
 * ComboboxInput
 *
 * Wraps an `<input/>` with a couple extra props that work with the combobox.
 *
 */
export const ComboboxInput = React.forwardRef<'input', ComboboxInputProps>(
    (props, ref) => (
        <Input
            as="input"
            {...props}
            // @ts-ignore not sure why I have to ignore here
            ref={ref}
        />
    ),
    // hack copied from Reach to get some kind of type support for props with a forwardref and an `as` prop
) as ForwardRefExoticComponentWithAs<'input', ComboboxInputProps>;

export type ComboboxListProps = {
    children: React.ReactNode;
    /**
     * When true and the list is opened, if an option's value
     * matches the value in the input, it will automatically be highlighted and
     * be the starting point for any keyboard navigation of the list.
     *
     * This allows you to treat a Combobox more like a `<select>` than an
     * `<input/>`, but be mindful that the user is still able to put any
     * arbitrary value into the input, so if the only valid values for the input
     * are from the list, your app will need to do that validation on blur or
     * submit of the form.
     *
     * @default false
     *
     */
    persistSelection?: boolean;

    className?: string;
    style?: React.CSSProperties;
} & React.PropsWithoutRef<JSX.IntrinsicElements['ul']>;

/**
 * ComboboxList
 *
 * Contains the `ComboboxOption` elements and sets up the proper aria attributes
 * for the list.
 */
export const ComboboxList = ({ className, ...props }: ComboboxListProps) => {
    const matchTextSegments = React.useContext(MatchTextSegmentsContext);
    return (
        <List
            className={classNames(
                'm-0 p-0 select-none list-none',
                { [MATCH_SEGMENTS_CLASS_NAME]: matchTextSegments },
                className,
            )}
            {...props}
        />
    );
};

export type ComboboxOptionProps = {
    /**
     * If omitted, the `value` will be used as the children.
     */
    children?: React.ReactNode;
    /** The value to match against when suggesting. */
    value: string;

    className?: string;
    style?: React.CSSProperties;
} & Omit<React.PropsWithoutRef<JSX.IntrinsicElements['li']>, 'value'>;

/**
 * ComboboxOption
 *
 * An option that is suggested to the user as they interact with the combobox.
 *
 */
export const ComboboxOption = ({
    className,
    ...props
}: ComboboxOptionProps) => (
    <Option
        className={classNames(
            `cursor-pointer p-8 hover:bg-${OPTION_HIGHLIGHT_COLOR} ${OPTION_CLASS_NAME}`,
            className,
        )}
        {...props}
    />
);

/**
 * There are two things we are unable to style in Reach Combobox with the utility classes
 * because they require attribute selectors: the highlighted option (when navigating the comboboxlist using the keyboard) and the matching text segments.
 *
 * Therefore we dynamically inject a small style element to style these things. Then the consumers of the component doesn't have to include any CSS.
 * This isn't an issue with SSR either, as the the matching and highlighting only works on the client.
 */
function useInjectStyleSheet(): void {
    React.useEffect(() => {
        const head = document.head;

        // if we've already added the styles to this page, bail out
        if (head.querySelector('style[data-fabric-react-combobox]')) {
            return;
        }

        const style = document.createElement('style');

        style.innerHTML = `.${OPTION_CLASS_NAME}[data-highlighted]{background-color:var(--f-${OPTION_HIGHLIGHT_COLOR})} .${MATCH_SEGMENTS_CLASS_NAME} [data-suggested-value]{font-weight:bold}`;

        style.dataset['fabricReactCombobox'] = '';

        head.appendChild(style);
    }, []);
}
