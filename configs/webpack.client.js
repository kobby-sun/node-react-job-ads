var webpack = require("webpack");
var path = require("path");
var moment = require('moment');

module.exports = {
    target: "web",
    cache: false,
    context: __dirname,
    debug: false,
    devtool: false,
    entry: ["../src/client-entry.js"],
    output: {
        path: path.join(__dirname, "../static/dist"),
        filename: "bundle.js",
        chunkFilename: "[name].[id].js"
    },
    plugins: [
        new webpack.DefinePlugin({ __USE_GA__: false, __DEVTOOLS__: false, __CLIENT__: true, __SERVER__: false, __PRODUCTION__: true, __DEVELOPMENT__: false, __AWS__: false, __BUILD__: '"' + moment().format("YYMMDD.hhmmss") + '"' }),
        new webpack.DefinePlugin({ "process.env": { NODE_ENV: '"production"' } }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
        new webpack.ProvidePlugin({
            _: "underscore"
        })
    ],
    module: {
        loaders: [
            { test: /\.json$/, loaders: ["json"] },
            { test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/, loaders: ["file?context=static&name=/[path][name].[ext]"], exclude: /node_modules/ }
        ],
        postLoaders: [
            { test: /\.(js|jsx)$/, loaders: ["babel?presets[]=es2015&presets[]=stage-0&presets[]=react"], exclude: /node_modules/ },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.less$/, loader: "style!css!less?strictMath&noIeCompat" }
        ],
        noParse: /\.min\.js/
    },
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
        fs: 'empty'
    }
};
