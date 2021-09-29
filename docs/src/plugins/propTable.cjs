const docgen = require('react-docgen-typescript');
const visit = require('unist-util-visit');
const u = require('unist-builder');
const unified = require('unified');
const path = require('path');
const html = require('rehype-stringify');
const remark2rehype = require('remark-rehype');
const markdown = require('remark-parse');

// currently we are abusing the code fence syntax to create our proptables. This way we don't have to add support for a custom syntax
// eg:
//
// ```props packages/button/src/Button.tsx
// ```

const docGenOptions = {
  // to prevent showing EVERY html prop when for instance a component is a wrapper around an input and the type is defined as { ... } & React.HTMLAttributes<HTMLInputElement>>
  propFilter: (prop, component) => {
    if (prop.parent) {
      return (
        prop.parent.fileName.includes('react-spring-bottom-sheet') ||
        !prop.parent.fileName.includes('node_modules')
      );
    }

    return true;
  },
};

module.exports = () => (tree, file) => {
  const cwd = file.cwd;

  visit(tree, 'code', (node, index) => {
    // We are only interested in code nodes of type `props` with a relative path
    if (node.lang === 'props' && node.meta) {
      let displayName;
      let relativePath;
      if (node.meta.includes(' ')) {
        [relativePath, displayName] = node.meta.split(' ');
      } else {
        relativePath = node.meta;
      }

      // the meta property should be the path to the component file, relative to the root
      const componentPath = path.resolve(cwd, relativePath);

      let docs = docgen.parse(componentPath, docGenOptions);

      docs = parseMarkdownDescriptions(docs);

      if (docs.length > 1 && !displayName) {
        console.warn(
          'Found multiple prop declarations at path: ' +
            componentPath +
            '. You need to specify one of  ' +
            docs.map((comp) => comp.displayName).join(', '),
        );
      }

      // not sure what happens yet if a component has multiple exports/prop types
      let component;
      if (displayName) {
        component = docs.find(
          (d) => d.displayName.toLowerCase() === displayName.toLowerCase(),
        );
      } else {
        component = docs[0];
      }

      if (!component) {
        console.warn(
          'Unable to generate prop table for component at path: ' +
            componentPath +
            ' with displayName ' +
            displayName,
        );
      }

      // Special handling for any `as` prop.
      // We don't want to list every possible HTML element
      if (component && 'as' in component.props) {
        component.props.as.type.name = 'string | Component';
      }

      // Replace the code fence with our prop table component
      // The PropTable component should be made globally available to the MDXProvider (so we don't have to import it in every mdx file)
      tree.children[index] = u('jsx', {
        value: `<PropTable props={${JSON.stringify(component.props)}} />`,
      });
    }
  });
};

// ts doc comments may include markdown, but react-docgen-typescript returns the description as plain text

const processor = unified()
  .use(markdown, { commonmark: true })
  .use(remark2rehype)
  .use(html);

function parseMarkdownDescriptions(docs) {
  return docs.map((component) => {
    const props = {};

    for (const [propName, propDoc] of Object.entries(component.props)) {
      if (propDoc.description) {
        const result = processor.processSync(propDoc.description);
        propDoc.descriptionHtml = result.contents;
      }

      props[propName] = propDoc;
    }

    component.props = props;

    return component;
  });
}
