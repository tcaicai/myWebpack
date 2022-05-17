const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const toml = require("toml");
// const yaml = require("yaml");
const json5 = require("json5");

module.exports = (env) => {
  console.log(env);
  return {
    // entry: "./src/index.js",
    // entry: {
    //   index: {
    //     import: "./src/index.js",
    //     dependOn: "shared",
    //   },
    //   other: {
    //     import: "./src/other.js",
    //     dependOn: "shared",
    //   },
    //   shared: "lodash",
    // },
    entry: {
      index: "./src/index.js",
      other: "./src/other.js",
    },
    output: {
      // filename: "[name].bundle.js",
      // filename: "[name].[contenthash].js",
      filename: "scripts/[name].[contenthash].js",
      path: path.resolve(__dirname, "./dist"),
      clean: true,
      assetModuleFilename: "images/[contenthash][ext]",
      publicPath: "http://localhost:8080/",
    },
    mode: env.production ? "production" : "development",
    // mode: "production",
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.png$/,
          type: "asset/resource",
          generator: {
            filename: "images/[contenthash][ext]",
          },
        },
        { test: /\.svg$/, type: "asset/inline" },
        { test: /\.txt$/, type: "asset/source" },
        {
          test: /\.jpeg$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024 * 1024,
            },
          },
        },
        {
          test: /\.(css|less)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
        },
        {
          test: /\.(woff|woff2|oet|ttf|oft)$/,
          type: "asset/resource",
        },
        {
          test: /\.(csv|tsv)$/,
          use: "csv-loader",
        },
        {
          test: /\.xml$/,
          use: "xml-loader",
        },
        {
          test: /\.toml$/,
          type: "json",
          parser: {
            parse: toml.parse,
          },
        },
        // {
        //   test: /\.yaml$/,
        //   type: "json",
        //   parser: {
        //     parse: yaml.parse,
        //   },
        // },
        {
          test: /\.json5$/,
          type: "json",
          parser: {
            parse: json5.parse,
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [["@babel/plugin-transform-runtime"]],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "app.html",
        inject: "body", // 默认在head里生成,
      }),
      new MiniCssExtractPlugin({
        filename: "styles/[contenthash].css",
      }),
    ],
    optimization: {
      minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()], // 着了这个默认的terser会不生效
      splitChunks: {
        // { chunks: "all" }, // webpack内置插件 split-chunks-plugin
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    devServer: {
      static: "./dist",
    },
    performance: {
      hints: false,
    },
  };
};
