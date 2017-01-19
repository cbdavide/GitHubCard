'use strict';

const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');
const BULD_DIR = path.resolve(__dirname, 'build');

let config = {
    entry: path.join(APP_DIR, 'index.js'),
    output: {
        path: BULD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel'
            }
        ]
    }
}

module.exports = config;
