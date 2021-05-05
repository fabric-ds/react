export function getButtonVariant(
    variant: 'primary' | 'secondary' | 'destructive' | 'order' | 'utility',
    flat?: boolean,
) {
    if (variant === 'destructive' && flat) {
        return 'destructive-flat';
    } else if (flat) {
        return 'tertiary';
    }
    return variant;
}
