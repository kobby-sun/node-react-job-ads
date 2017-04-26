var webpack = require("webpack");
var config = require("./webpack.server.js");
var wds = {
	hostname: process.env.HOSTNAME || "localhost",
	port: 8080
};
var ExtractTextPlugin = require("extract-text-webpack-plugin");

config.cache = true;
config.debug = true;

config.entry.unshift(
	"webpack/hot/poll?1000"
);

config.output.publicPath = "http://" + wds.hostname + ":" + wds.port + "/";
config.output.hotUpdateMainFilename = "update/[hash]/update.json";
config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";

config.plugins = [
	new webpack.DefinePlugin({ __USE_GA__: false, __DEVTOOLS__: false, __CLIENT__: false, __SERVER__: true, __PRODUCTION__: false, __DEVELOPMENT__: true, __BUILD__: '""', __ELASTICIP__: '"http://localhost"' }),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
		_: "underscore"
	}),
    new ExtractTextPlugin("[name].css")
];

module.exports = config;
