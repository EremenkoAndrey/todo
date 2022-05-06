"use strict";

const webpack = require('webpack');
const path = require("path");

module.exports = (env, argv) => {
    const mode = argv.mode === 'production' ? 'production' : 'development';
    const __DEV__ = mode !== 'production';

    return {
        mode,
        devtool: __DEV__ ? "inline-source-map" : false,
        entry: {
            app: path.join(__dirname, 'index.tsx')
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            publicPath: '',
            filename: 'app.js',
            umdNamedDefine: true,
            clean: true
        },
        plugins: [
            new webpack.DefinePlugin({
                __DEV__: JSON.stringify(__DEV__)
            })
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader"
                },
                // Pure CSS only
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1
                            }
                        }
                    ]
                },
                // CSS modules
                {
                    test: /\.module\.less$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: {
                                    localIdentName: "[name]__[local]--[hash:base64:5]"
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".css"]
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'server-static'),
                publicPath: '/'
            },
            compress: true,
            open: true,
            port: 3333
        }
    };
};
