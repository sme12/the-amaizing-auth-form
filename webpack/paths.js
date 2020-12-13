/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { join } = require('path');

const srcDir = join(__dirname, '../src');
const destDir = join(__dirname, '../dist/');
const publicDir = join(__dirname, '../public/');
const scriptsDir = join(srcDir, './scripts/');
const stylesDir = join(srcDir, './styles/');

module.exports = {
    srcDir,
    destDir,
    publicDir,
    scriptsDir,
    stylesDir
};
