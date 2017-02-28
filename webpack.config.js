const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileCatalogue = require('file-catalogue/FileCatalogue')

module.exports = {
    entry: path.resolve(__dirname, 'src/example.js'),
    output: {
        filename: 'cacheResources.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
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
            filename: path.resolve(__dirname, 'dist/index.html'),
            template: path.resolve(__dirname, 'src/template/index.ejs')
        }),
        new FileCatalogue()
    ]
}
