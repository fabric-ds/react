module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../packages/**/*.stories.[tj]sx'],
  addons: ['@storybook/addon-actions/register', '@storybook/addon-postcss'],
};
