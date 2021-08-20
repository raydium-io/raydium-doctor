const CracoAlias = require('craco-alias');

module.exports = {
  style: {
    postcss: {
      mode: 'file'
    }
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.extend.json'
      }
    }
  ]
};
