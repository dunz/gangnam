import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const defaultEnv = {
    dev: false,
    prod: true
};

export default (env = defaultEnv) => {
    return {
        devtool: env.dev ? 'inline-source-map' : 'cheap-module-source-map',
        devServer: {
            hot: true
        },
        entry: {
            bundle: [
                ...env.dev ? [
                    'webpack-dev-server/client?http://localhost:8080',
                    'webpack/hot/only-dev-server'
                ] : [],
                path.join(__dirname, 'src/index')
            ]
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js',
            publicPath: '/'
        },
        module: {
            rules: [{
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
                use: ['react-hot-loader', 'babel-loader']
            }]
        },
        plugins: [
            ...env.dev ? [
                new webpack.NamedModulesPlugin()
            ] : [
                    new ExtractTextPlugin('[name].css')
                ],
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html'
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js', '.json', '.jsx', '.css']
        }
    }
};