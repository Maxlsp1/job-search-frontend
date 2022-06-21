const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require( 'dotenv-webpack' );
const { InjectManifest } = require( 'workbox-webpack-plugin' );
const fs = require("fs");

const CopyPlugin = require("copy-webpack-plugin");

module.exports = {

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    devServer: {
        port: 5000,
        server: {
            type: "https",
            options: {
                key: fs.readFileSync('cert.key'),
                cert: fs.readFileSync('cert.crt'),
                ca: fs.readFileSync('ca.crt'),
            },
        },
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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
            swDest: "sw.js"
        })
    ]

};