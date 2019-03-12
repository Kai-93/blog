const assert = require('assert').strict

// This fails because 1 !== '1'.
// assert.deepStrictEqual({ a: 1 }, { a: '1' })
// AssertionError: Input A expected to strictly deep-equal input B:
// + expected - actual
//   {
// -   a: 1
// +   a: '1'
//   }

// The following objects don't have own properties
const date = new Date()
const object = {}
const fakeDate = {}
Object.setPrototypeOf(fakeDate, Date.prototype)

// Different [[Prototype]]:
// assert.deepStrictEqual(object, fakeDate)
// AssertionError: Input A expected to strictly deep-equal input B:
// + expected - actual
// - {}
// + Date {}

// Different type tags:
// assert.deepStrictEqual(date, fakeDate)
// AssertionError: Input A expected to strictly deep-equal input B:
// + expected - actual
// - 2018-04-26T00:49:08.604Z
// + Date {}

// assert.deepStrictEqual(NaN, NaN)
// OK, because of the SameValue comparison

// Different unwrapped numbers:
// assert.deepStrictEqual(new Number(1), new Number(2))
// AssertionError: Input A expected to strictly deep-equal input B:
// + expected - actual
// - [Number: 1]
// + [Number: 2]

// assert.deepStrictEqual(new String('foo'), Object('foo'))
// OK because the object and the string are identical when unwrapped.

// assert.deepStrictEqual(-0, -0)
// OK

// Different zeros using the SameValue Comparison:
// assert.deepStrictEqual(0, -0)
// AssertionError: Input A expected to strictly deep-equal input B:
// + expected - actual
// - 0
// + -0

const symbol1 = Symbol()
const symbol2 = Symbol()
// assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol1]: 1 })
// OK, because it is the same symbol on both objects.
// assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol2]: 1 })
// AssertionError [ERR_ASSERTION]: Input objects not identical:
// {
//   [Symbol()]: 1
// }

const weakMap1 = new WeakMap()
const weakMap2 = new WeakMap([[{}, {}]])
const weakMap3 = new WeakMap()
weakMap3.unequal = true

assert.deepStrictEqual(weakMap1, weakMap2)
// OK, because it is impossible to compare the entries

// Fails because weakMap3 has a property that weakMap1 does not contain:
assert.deepStrictEqual(weakMap1, weakMap3)
// AssertionError: Input A expected to strictly deep-equal input B:
// + expected - actual
//   WeakMap {
// -   [items unknown]
// +   [items unknown],
// +   unequal: true
//   }
