import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

process.noDeprecation = true;

const defaultEnv = {
    dev: false,
    prod: true
};

export default (env = defaultEnv) => {
    return {
        entry: [
            ...env.dev ? [
                'webpack-dev-server/client?http://localhost:8080',
                'webpack/hot/only-dev-server',
            ] : [],
            path.join(__dirname, 'src/index')
        ],
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/'
        },
        devtool: env.dev ? 'inline-source-map' : 'cheap-module-source-map',
        devServer: {
            inline: false,
            host: 'localhost',
            port: 8080,
            contentBase: path.join(__dirname, 'dist'),
            hot: true,
            publicPath: '/'
        },
        plugins: [
            ...env.dev ? [
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NamedModulesPlugin()
            ] : [
                    new ExtractTextPlugin('[name].css')
                ],
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html'
            })
        ],
        module: {
            rules: [
                {
                    test: /.(js|jsx)$/,
                    exclude: /node_modules/,
                    include: path.join(__dirname, 'src'),
                    use: [{
                        loader: 'babel-loader',
                    }]
                },
                {
                    test: /\.(css|sass|scss)$/,
                    include: path.resolve(__dirname, 'src'),
                    use: env.dev ?
                        [
                            'style-loader',
                            'css-loader',
                        ]
                        : ExtractTextPlugin
                            .extract({
                                fallback: 'style-loader',
                                use: [
                                    { loader: 'css-loader', query: { modules: true, sourceMaps: true } },
                                ]
                            }),
                }
            ]
        }
    }
};