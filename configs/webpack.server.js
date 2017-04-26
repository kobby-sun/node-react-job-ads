var webpack = require("webpack");
var nodeExternals = require("webpack-node-externals");
var path = require("path");
var fs = require("fs");

module.exports = {
    target: "node",
    cache: false,
    context: __dirname,
    debug: false,
    devtool: "source-map",
    entry: ["../src/server-entry.js"],
    output: {
        path: path.join(__dirname, "../"),
        filename: "server.js"
    },
    plugins: [
        new webpack.DefinePlugin({ __USE_GA__: false, __DEVTOOLS__: false, __CLIENT__: false, __SERVER__: true, __PRODUCTION__: true, __DEVELOPMENT__: false, __NODE_ENV__: 'production', __BUILD__: '""', __ELASTICIP__: '"http://dokku-elasticsearch-hometour"' }),
        new webpack.ProvidePlugin({
            _: "underscore"
        })
    ],
    module: {
        loaders: [
            { test: /\.json$/, loaders: ["json"] },
            { test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/, loaders: ["file?context=static&name=/[path][name].[ext]"], exclude: /node_modules/ },
            { test: /\.(js|jsx)$/, loaders: ["babel?presets[]=es2015&presets[]=stage-0&presets[]=react"], exclude: /node_modules/ }
        ],
        postLoaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.less$/, loader: "style!css!less?strictMath&noIeCompat" }
        ],
        noParse: /\.min\.js/
    },
    externals: [nodeExternals({
        whitelist: ["webpack/hot/poll?1000"]
    })],
    resolve: {
        modulesDirectories: [
            "src",
            "node_modules",
            "static"
        ],
        extensions: ["", ".json", ".js", ".jsx"]
    },
    node: {
        __dirname: true,
        fs: "empty"
    }
};
