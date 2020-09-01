const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    devServer: {
        port: 60010,
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './'),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            src: path.resolve(__dirname, 'src/'),
        },
    },
    devtool: 'source-map',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './'),
    },
    module: {
        rules: [
            {
                test: /\.ts|.tsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.pcss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                    { loader: 'postcss-loader' },
                ],
            },
            {
                test: /\.(svg|png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
    ],
};
