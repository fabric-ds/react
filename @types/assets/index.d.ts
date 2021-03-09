declare module '*.mdx' {
    const content: React.FunctionComponent<{}>;
    export default content;
}

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}
