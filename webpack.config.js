var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var webpack = require('webpack');
var devConfig = require('./dev-config');
var dates = new Date();
const { VueLoaderPlugin } = require('vue-loader');
let env = process.env.NODE_ENV;
let devPages = devConfig.devPages;
let js_reg = /<script(\s+)(type=\"text\/javascript\"(\s+))?src=[\"|\'](\/(\w+)\/vipApp.js)[\"|\']>(<\/script>)/gm;



// 自定义插件，替换html中的js文件为压缩后的js文件
function HtmlPlugin(options) {
    this.options = options;
}
HtmlPlugin.prototype.apply = function (compiler) {
    var htmlPath = this.options.htmlPath;
    var dst = this.options.dst;
    
    compiler.hooks.emit.tapAsync('HtmlPlugin', function (compilation, callback) {
        for (var value in compilation.options.entry) {
            var entryAry = value.split(path.sep);
            var pageFolder = entryAry[entryAry.length - 2];
            var entry = path.join(htmlPath, pageFolder);
            var outpath = path.join(dst, pageFolder);
            outputHtml(entry, outpath, pageFolder);
        }
        callback();
        function outputHtml(entry, outpath, pageFolder) {
            var fileName = 'index.html';
            var filesAry = fs.readdirSync(entry);
            for (var i = 0; i < filesAry.length; i++) {
                if (/\.html$/.test(filesAry[i])) {
                    fileName = filesAry[i];
                    break;
                }
            }
            if (!fs.existsSync(entry + '/' + fileName)) {
                return;
            }
            var content = fs.readFileSync(entry + '/' + fileName).toString();
            content = content.replace(js_reg, function (arg) {
                if (env == 'test') {
                    return '<script type="text/javascript" src="./' + pageFolder + '_vipApp.js"></script>'
                } else {
                    return '<script type="text/javascript" src="//static.iqiyi.com/lequ/' + formatDate(dates) + '/' + pageFolder + '_vipApp.js"></script>';

                }
            });
            fse.mkdirsSync(outpath);
            fs.writeFileSync(outpath + '/' + fileName, content);
            return content;
        }
    });
}

function getEntry(src) {
    var pages = fs.readdirSync(src);
    var jsEntry = {};
    for (let i = 0; i < pages.length; i++) {
        if (!fs.existsSync(path.join(src, pages[i], 'vipApp.js'))) {
            continue;
        }
        var key, entry;
        if (devPages && devPages.length > 0) {
            if (devPages.indexOf(pages[i]) >= 0) {
                key = env == 'local' ? path.join(pages[i], 'vipApp.js') : path.join(pages[i], pages[i] + '_vipApp.js');
                jsEntry[key] = path.join(src, pages[i], 'vipApp.js');
            }
            continue;
        }
        key = env == 'local' ? path.join(pages[i], 'vipApp.js') : path.join(pages[i], pages[i] + '_vipApp.js');
        jsEntry[key] = path.join(src, pages[i], 'vipApp.js');
    }
    return jsEntry;
}


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
let plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: env == 'product' ? JSON.stringify('production') : JSON.stringify('dev')
        }
    }),
    new HtmlPlugin({
        htmlPath: path.join(__dirname, 'src'),
        dst: path.join(__dirname, 'dist')
    }),
    new VueLoaderPlugin(),
];


module.exports = {
    entry: getEntry(__dirname + '/src'),
    output: {
        path: __dirname + '/dist/',
        filename: '[name]',
        publicPath: ''
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {

            '@': resolve('./src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.tsx?$/,
                exclude: resolve('node_modules'),
                use: [
                    {
                        loader: 'babel-loader'
                    },

                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: resolve('node_modules'),
                include: resolve('src')
            },
        ]
    }

}


//格式化日期
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + mymonth + myweekday);
}



