const babel = require('@babel/core')
const path = require('path')

function transform(content, filename) {
    if (/node_modules/.test(filename))
        return content;

    const {code} = babel.transformSync(content, {
        extends: path.join(__dirname, '.babelrc'),
        filename: filename,
        sourceFileName: filename,
        sourceMaps: 'inline',
        auxiliaryCommentBefore: '$lab:coverage:off$',
        auxiliaryCommentAfter: '$lab:coverage:on$'
    })
    return code
}

module.exports = ['js', 'jsx', 'mjs', 'es', 'es6']
    .map(ext => ({ext, transform}))
