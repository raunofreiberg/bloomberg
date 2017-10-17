const webpack = require('webpack');

const makeConfig = require('./config.base');

const config = makeConfig({
    devtool: 'source-map',

    extractCss: true,
    minifyCss: true,

    publicPath: '/',

    prependSources: [],

    plugins: [],
});
console.log("Using PRODUCTION config");


module.exports = config;