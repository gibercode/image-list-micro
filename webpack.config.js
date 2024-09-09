const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  mode: "development",
  mode: "production",
  devServer: {
    hot: true,
    port: 3002,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js|tsx)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "list",
      filename: "remoteEntry.js",
      exposes: {
        "./List": "./src/List",
      },
      remotes: {
        searchBar:
          "searchBar@https://image-search-micro-rfcr.vercel.app/remoteEntry.js",
      },
      shared: {
        zustand: {
          singleton: true,
          eager: true,
        },
        react: {
          singleton: true,
          eager: true,
          requiredVersion: "18.3.1",
        },
        "react-dom": {
          singleton: true,
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
