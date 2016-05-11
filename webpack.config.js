// webpack.config.js

var webpack = require('webpack');

const path = require('path');

module.exports = {
    "entry": [
        'webpack-dev-server/client?https://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
        './app/index.js'
    ],
    "output": {
        "path": path.join(__dirname, 'build'),
        "filename": "bundle.js"
    },
    devtool: "source-map",
    "module": {
        "loaders": [
            {
                "test": /.js?$/,
                "loader": 'react-hot!babel-loader',
                "exclude": /node_modules/
            },
            {
                "test": /\.scss$/,
                "loaders": ["style", "css?sourceMap", "sass?sourceMap"]
            } 
        ]
    },
    devServer: {
        contentBase: './build',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};