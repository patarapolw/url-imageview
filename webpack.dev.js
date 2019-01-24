const path = require("path");
const common = require('./webpack.common.js');

module.exports = {
    ...common,
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        watchContentBase: true,
        port: 3000,
        proxy: {
            "/api": "http://localhost:5000"
        }
    }
};