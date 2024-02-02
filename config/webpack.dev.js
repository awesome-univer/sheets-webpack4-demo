const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT_DIRECTORY = process.cwd();

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(ROOT_DIRECTORY, "src/index.js"),
  },
  output: {
    path: path.resolve(ROOT_DIRECTORY, "build"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
  },
  devServer: {
    contentBase: path.resolve(ROOT_DIRECTORY, "build"),
    compress: true,
    host: "0.0.0.0",
    port: 3000,
    overlay: true,
    disableHostCheck: true,
  },
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /node_modules\/@univerjs/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            configFile: path.resolve(ROOT_DIRECTORY, "config/babel.config.js"),
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true,
              modules: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              config: {
                path: path.resolve(ROOT_DIRECTORY, "config"),
              },
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true,
              modules: {
                localIdentName: "[name]__[local]--[contenthash:8]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              config: {
                path: path.resolve(ROOT_DIRECTORY, "config"),
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|bmp|webp)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[contenthash:8].[ext]",
              limit: 4096,
              outputPath: "assets",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash:8].[ext]",
              outputPath: "assets",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, "src/index.html"),
      filename: "index.html",
    }),
  ],
};
