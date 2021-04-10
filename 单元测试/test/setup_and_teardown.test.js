/*
 * @Author: Kaiser
 * @Date: 2020-04-03 13:59:54
 * @Last Modified by: Kaiser
 * @Last Modified time: 2020-04-08 17:04:28
 * @Description: 预先设置和设置以及,作用域
 */

// 将最先运行
beforeAll(() => console.log('Global - beforeAll'));
// 将最后运行
afterAll(() => console.log('Global - afterAll'));
// 将在每一个test之前运行
beforeEach(() => console.log('Global - beforeEach'));
// 将在每一个test之后运行
afterEach(() => console.log('Global - afterEach'));

test('Global - test', () => console.log('test for Global'));

// 将测试进行分组
describe('Scoped - describe outer', () => {
  // 在当前分组下最先运行
  beforeAll(() => console.log('Local - beforeAll'));
  // 在当期那分组下最后运行
  afterAll(() => console.log('Local - afterAll'));
  // 在当前分组中的每一个任务之前运行
  beforeEach(() => console.log('Local - beforeEach'));
  // 在当前分组中的每一个任务之后运行
  afterEach(() => console.log('Local - afterEach'));

  console.log('Scoped - describe outer-a');

  // 内分组 1
  describe('Scoped - describe inner 1', () => {
    console.log('inner for describe inner 1');
    test('Scoped - describe inner 1 - test', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('Scoped - describe outer-b');

  test('Scoped - describe outer - test', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  // 内分组 2
  describe('Scoped - describe inner 2', () => {
    console.log('inner for describe inner 2');
    test('Scoped - describe inner 2 - test', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('Scoped - describe outer-c');
});


