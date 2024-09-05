const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    publicPath: "http://localhost:3002/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  mode: "development",
  devServer: {
    hot: true,
    port: 3002,
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
        searchBar: "searchBar@http://localhost:3001/remoteEntry.js",
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
