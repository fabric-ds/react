import mdx from 'vite-plugin-mdx';
import reactRefresh from '@vitejs/plugin-react-refresh';
import slug from 'remark-slug';
import autoLinkHeadings from 'remark-autolink-headings';

export default function config({ mode }) {
  return {
    base: '/',
    plugins: [
      reactRefresh(),
      mdx({
        remarkPlugins: [
          slug,
          autoLinkHeadings,
          require('./docs/src/plugins/jsxExample.cjs'),
          require('./docs/src/plugins/propTable.cjs'),
        ],
      }),
    ],
    build: {
      outDir: 'site',
    },
  };
}
