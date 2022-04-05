module.exports = {
  branches: ['main', 'next'],
  plugins: [
    '@eik/semantic-release',
    ['@semantic-release/git', { assets: ['package.json'] }],
  ],
};
