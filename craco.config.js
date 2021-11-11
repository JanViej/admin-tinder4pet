// eslint-disable-next-line
const CracoLessPlugin = require('craco-less');
// eslint-disable-next-line
require('dotenv/config');
const path = require('path');
// eslint-disable-next-line
const cracoBabelLoader = require('craco-babel-loader');
const themeConfig = require('./src/configs/theme/theme.json');
// const BabelRcPlugin = require('@jackwilsdon/craco-use-babelrc');

const resolvePackage = (relativePath) => path.resolve(__dirname, relativePath);

module.exports = {
  webpack: {
    alias: {
      react: resolvePackage('./node_modules/react'),
      link: resolvePackage('./src/components/common/Link'),
    },
  },
  plugins: [
    // { plugin: BabelRcPlugin },
    {
      plugin: cracoBabelLoader,
      options: {
        ...(process.env.REACT_APP_NODE_ENV === 'dev' && {
          excludes: [/node_modules/],
        }),
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': themeConfig.palette.primary,
              '@font-family': themeConfig.fonts.primary,
              '@layout-body-background': themeConfig.background.content,
              '@card-padding-base': '15px',
              '@input-height-base': '40px',
              '@input-placeholder-color': themeConfig.text.placeholder,
              // '@input-bg': themeConfig.background.input,
              // '@input-border-color': 'transparent',
              '@btn-height-base': '40px',
              '@border-radius-base': themeConfig.borderRadius.default,
              '@pagination-item-size': '40px',
              '@btn-default-color': themeConfig.text.grey2,
              '@btn-default-border': themeConfig.text.grey2,
              '@pagination-item-bg-active': themeConfig.palette.primary,
              '@table-header-color': themeConfig.text.headerTable,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
