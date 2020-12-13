'use strict';

const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer, csso]
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanPlugin(),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ]
};
