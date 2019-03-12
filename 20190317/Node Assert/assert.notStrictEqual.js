const assert = require('assert').strict

assert.notStrictEqual(1, 2)
// OK

assert.notStrictEqual(1, 1)
// AssertionError [ERR_ASSERTION]: Identical input passed to notStrictEqual: 1

assert.notStrictEqual(1, '1')
// OK
