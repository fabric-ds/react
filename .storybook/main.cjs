module.exports = {
  stories: ['../packages/**/*.stories.[tj]sx'],
  addons: ['@storybook/addon-actions/register', '@storybook/addon-postcss'],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.resolve.alias['@fabric-ds/core/attention'] = require.resolve(
      '../node_modules/@fabric-ds/core/dist/attention/index.js',
    );
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require('@babel/preset-env').default],
          },
        },
      ],
    });
    config.resolve.extensions.push('.js');
    return config;
  },
};
