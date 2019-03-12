const assert = require('assert').strict

assert.notDeepStrictEqual({ a: 1 }, { a: '1' })
// OK
