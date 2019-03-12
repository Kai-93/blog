const assert = require('assert').strict

assert.fail()
// AssertionError [ERR_ASSERTION]: Failed

assert.fail('boom')
// AssertionError [ERR_ASSERTION]: boom

assert.fail(new TypeError('need array'))
// TypeError: need array
