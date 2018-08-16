const babel = require('@babel/core')

function transform(content, filename) {
    if (/node_modules/.test(filename))
        return content;

    const {code} = babel.transformSync(content, {
        presets: [['@babel/preset-env', {
              "targets": {
                "node": "current"
            },
        }]],
	plugins: ["@babel/plugin-syntax-dynamic-import"],
        cwd: __dirname,
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
