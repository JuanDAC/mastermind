const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: ["@babel/polyfill",  "./src/js/main.js"],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    query: {
                      presets: ["esnext", "stage-0", "stage-1", "stage-2"]
                    }
                }
            },
            {
                test: /\.scss$/,
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
                        plugins: function () {
                          return [
                            require('autoprefixer'),
                            require('postcss-calc'),
                            require('postcss-cssnext')
                          ];
                        }
                      }
                    },
                    {
                      // Loads a SASS/SCSS file and compiles it to CSS
                      loader: 'sass-loader'
                    }
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
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}
