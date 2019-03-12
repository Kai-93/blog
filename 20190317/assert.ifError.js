const assert = require('assert').strict

assert.ifError(null)
// OK
assert.ifError(0)
// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: 0
assert.ifError('error')
// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: 'error'
assert.ifError(new Error())
// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: Error

// Create some random error frames.
let err
;(function errorFrame() {
  err = new Error('test error')
})()
;(function ifErrorFrame() {
  assert.ifError(err)
})()
// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: test error
//     at ifErrorFrame
//     at errorFrame
