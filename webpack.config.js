const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileCatalogue = require('file-catalogue/FileCatalogue')

module.exports = {
    entry: { 
        example: path.resolve(__dirname, 'src/example'),
        cacheResources: path.resolve(__dirname, 'src/CacheResources')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'lib'),
        library: 'CacheResources',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|svg|png)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Cache Resources',
            filename: path.resolve(__dirname, 'lib/index.html'),
            template: path.resolve(__dirname, 'src/template/index.ejs')
        }),
        new FileCatalogue()
    ]
}
