var webpack = require('webpack');

const path = require('path');

module.exports = {
    "entry": [
        './app/index.js'
    ],
    "output": {
        "path": path.join(__dirname, 'build'),
        "filename": "bundle.js"
    },
    devtool: false,
    "module": {
        "loaders": [
            {
                "test": /.js?$/,
                "loader": 'babel-loader?presets[]=es2015,presets[]=react',
                "exclude": /node_modules/
            },
            {
                "test": /\.scss$/,
                "loaders": ["style", "css", "sass"]
            } 
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};