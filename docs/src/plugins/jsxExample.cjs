const visit = require('unist-util-visit');
const u = require('unist-builder');

/**
 * Remark plugin renders JSX code fences marked `example`
 */

module.exports = () => (tree, file) => {
    let statefulExampleCount = 0;

    visit(tree, 'code', (node, index) => {
        // We are only interested in code nodes of type jsx which are marked example
        if (node.lang === 'jsx' && /^example/.test(node.meta)) {
            // MDX doesn't only supports variables as exports.
            // So for stateful examples (hooks) we export the example snippet, and render it with jsx

            // FIXME: this is a really poor way of separating interactive examples with state and plain jsx (which works fine in mdx)
            if (node.value.includes('function')) {
                tree.children.splice(
                    index + 1,
                    0,
                    u('jsx', {
                        value: `<div className="example"><Example${statefulExampleCount} /></div>`,
                    }),
                );
                tree.children.push(
                    u('export', {
                        value:
                            `export const Example${statefulExampleCount} = ` +
                            node.value,
                    }),
                );

                statefulExampleCount = statefulExampleCount + 1;
            } else {
                // take the content of the code fence, and add it after the current node as a jsx type
                tree.children.splice(
                    index + 1,
                    0,
                    u('jsx', {
                        value: `<div className="example">${node.value}</div>`,
                    }),
                );
            }
        }
    });
};
