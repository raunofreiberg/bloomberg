const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const app_root = path.resolve(__dirname, '..');

const js_out_template = '[name].js';
const styles_out_template = '[name].css';

function makeConfig(options) {
    const output = {
        path: path.resolve(app_root, 'build'),
        filename: js_out_template,
        publicPath: options.publicPath,
        library: 'bloomfield',
    };

    return {
        entry: {
            app: options.prependSources.concat([
                'babel-polyfill',
                path.resolve(app_root, 'js', 'main.js'),
            ]),
            styles: options.prependSources.concat([
                path.resolve(app_root, 'scss', 'main.js'),
            ]),
        },

        output,

        module: {
            rules: [{
                test: /\.jsx?$/, // Transform all .js files required somewhere with Babel
                exclude: /node_modules/,
                use: 'babel-loader',
            }, {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            minimize: options.minifyCss,
                        },
                    }, {
                        loader: "postcss-loader",
                        options: {
                            plugins() {
                                return [autoprefixer];
                            },
                        },
                    }, {
                        loader: "resolve-url-loader",
                    }, {
                        loader: "sass-loader",
                        options: {
                            includePaths: [path.resolve(app_root, 'node_modules', 'bootstrap-sass', 'assets', 'stylesheets')],
                            sourceMap: true,
                        },
                    }],
                    fallback: 'style-loader',
                }),
            }, {
                test: /\.(jpe?g|png|gif|svg|woff2?|eot|ttf)$/,
                loader: 'url-loader',
                query: {
                    limit: 2000,
                    name: 'assets/[name].[hash].[ext]',
                },
            }],
        },

        plugins: [
            new ExtractTextPlugin({
                filename: styles_out_template,
                disable: !options.extractCss,
            }),
            new CopyWebpackPlugin([
                { from: 'client/static' },
            ]),
        ].concat(options.plugins),

        resolve: {
            modules: ['./js', 'node_modules'],
            extensions: ['.js', '.jsx'],
        },

        devtool: options.devtool,
        target: 'web', // Make web variables accessible to webpack, e.g. window
        // stats: false, // Don't show stats in the console

        performance: options.performance,
    };
}


module.exports = makeConfig;
