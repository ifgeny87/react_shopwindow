var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/index'
    ],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        /*preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint'],
                include: [
                    path.resolve(__dirname, 'src')
                ]
            }
        ],*/
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel-loader?presets[]=es2015&presets[]=stage-0&presets[]=react'],
                include: [
                    path.resolve(__dirname, 'src')
                ],
                plugins: ['transform-runtime']
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: 'style!css!less',
                exclude: /node_modules/
            }
        ]
    },
    postcss: function() {
        return [autoprefixer, precss];
    },
}