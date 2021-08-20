var jsconfig = require('./webpack.config');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var compiler = webpack(jsconfig);
var env = process.env.NODE_ENV;
var opn = require('opn');
var config = require('./dev-config');
if (env == 'local') {
    //WebpackDevServer.addDevServerEntrypoints(jsconfig, options);
    var server = new WebpackDevServer(compiler,{
        hot: true,        
        compress: true,
        publicPath: "",
        contentBase: [path.join(__dirname, "src")]
    });
     server.listen(80, "test.m.iqiyi.com", function () {
        var newPage = config.devPages[config.devPages.length -1];
        opn('http://test.m.iqiyi.com/' + newPage);
    });
    
} else {
    compiler.run(function(err, stats) {
        // console.log(stats.toString({
        //     chunks: false,
        //     colors: true
        // }));
    });
}
