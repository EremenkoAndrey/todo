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
            headers: {
                'Cache-Control': 'no-store',
            },
            compress: true,
            open: true,
            port: 3333
        },
        cache: false // Turned cache off because changes was not detected, and option 'hot' was not worked
    };
};
