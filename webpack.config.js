const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
      app: ["@babel/polyfill",  "./src/app.js"],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                      // Adds CSS to the DOM by injecting a `<style>` tag
                      loader: 'style-loader'
                    },
                    {
                      // Interprets `@import` and `url()` like `import/require()` and will resolve them
                      loader: 'css-loader'
                    },
                    {
                      // Loader for webpack to process CSS with PostCSS
                      loader: 'postcss-loader',
                      options: {
                        postcssOptions: {
                          plugins: [
                                  'autoprefixer',
                                  'postcss-calc',
                                  'postcss-cssnext'
                              ]
                        }
                      }
                    },
                  ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize : true }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            inject: false
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}
