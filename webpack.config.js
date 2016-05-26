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
    devtool: "cheap-source-map",
    "module": {
        "loaders": [
            {
                "test": /.js?$/,
                "loader": 'react-hot!babel-loader?presets[]=es2015,presets[]=react',
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'API_HOST': JSON.stringify(process.env.API_HOST),
                'API_PORT': JSON.stringify(process.env.API_PORT),
                'API_TOKEN': JSON.stringify(process.env.API_TOKEN)
            }
        })
    ]
};