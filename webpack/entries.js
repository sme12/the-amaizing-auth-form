/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { join } = require('path');
const { scriptsDir, stylesDir } = require('./paths');

module.exports = {
    app: [
        join(scriptsDir, './index.ts'),
        join(stylesDir, './index.scss')
    ]
};
