const path = require('path');
const webpack = require('webpack');

const makeConfig = require('./config.base');

const config = makeConfig({
    devtool: 'eval-source-map',

    extractCss: true,
    minifyCss: false,

    publicPath: '/',

    prependSources: [],

    plugins: [],
});
console.log("Using DEV config");


module.exports = config;