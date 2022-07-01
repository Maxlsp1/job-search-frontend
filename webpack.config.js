const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require( 'dotenv-webpack' );
const { InjectManifest } = require( 'workbox-webpack-plugin' );
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require("fs");
const CopyPlugin = require("copy-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    devtool: "source-map",
    devServer: {
        port: 5000,
        historyApiFallback: true,
        allowedHosts: ['.loophole.site'],
        client: {
            webSocketURL: 'auto://job-search.loophole.site/ws'
        },
        // server: {
        //     type: "https",
        //     options: {
        //         key: fs.readFileSync('cert.key'),
        //         cert: fs.readFileSync('cert.crt'),
        //         ca: fs.readFileSync('ca.crt'),
        //     },
        // },
        static: {
            directory: path.join(__dirname, 'public'),
        },
        open: true,
        hot: false,
        liveReload: false,
        
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.(scss|css)$/,
                use: [
                  process.env.NODE_ENV !== 'production'
                    ? 'style-loader'
                    : MiniCssExtractPlugin.loader,
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true
                    }
                  }
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html")
        }),
    
        new CopyPlugin({
            patterns: [
                {from: "./public/favicon.ico", to: ""},
                {from: "./public/manifest.json", to: ""},
                {from: "./public/logo192.png", to: ""},
                {from: "./public/logo512.png", to: ""},
                {from: "./public/apple-touch-icon.png", to: ""},
            ],
        }),
    
        new Dotenv( {
            path: './.env', // Path to .env file (this is the default)
            systemvars: true,
        }),
        new InjectManifest({
            swSrc: "./src/sw.js",
            swDest: "sw.js",
            maximumFileSizeToCacheInBytes : 500000000,
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].css'
          }),
    ]

};