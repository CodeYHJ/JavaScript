import * as chai from "chai";

import * as sinon from "sinon";

import * as sinonChai from "sinon-chai";

chai.use(sinonChai);

const assert = chai.assert;

import deepClone from "../index"

describe("deepClone", () => {
  it("它是一个函数", () => {
    assert.isFunction(deepClone)
  })
})

describe("deepClone传入基础值", () => {
  it("传入字符串返回对应的字符串", () => {
    assert.equal(deepClone("1"), "1")
  })
  it("传入数字返回对应的数字", () => {
    assert.equal(deepClone(1), 1)
  })
  it("传入布尔值返回对应的布尔值", () => {
    assert.equal(deepClone(true), true)
  })
  it("传入undefined返回undefined", () => {
    assert.isUndefined(deepClone(undefined))
  })
  it("传入NaN返回NaN", () => {
    assert.isNaN(deepClone(NaN))
  })
  it("传入symbol返回symbol", () => {
    // @ts-ignore
    const sym = Symbol('1')
    const sym1 = deepClone(sym)
    assert.equal(sym, sym1)
    assert.deepStrictEqual({ [sym]: 1 }, { [sym1]: 1 })
  })
})

describe("deepClone传入数组", () => {
  it("传入数组必须返回一个数组", () => {
    assert.isArray(deepClone([1]))
  })
  it("传入数组不等于返回的数组", () => {
    const list = [1]
    assert.notEqual(deepClone(list), list)
  })
  it("数组内含有重引用数组，将不复制重引用", () => {
    const list: Array<any> = [1, 2]
    list[2] = list;
    assert.isNotNull(deepClone(list))
    assert.isUndefined(deepClone(list)[2])
    assert.deepEqual(deepClone(list), [1, 2])
  })
})

describe("deepClone传入对象", () => {
  it("传入对象必须返回对象", () => {
    const obj = { 1: 1 }
    assert.isObject(deepClone(obj))
  })
  it("传入对象不等于返回对象", () => {
    const obj = { 1: 1 }
    assert.notEqual(deepClone(obj), obj)
  })
  // @ts-ignore
  it("对象对含有重引用，将不复制重引用", () => {
    const obj = { a: { b: 1, c: { d: 1 } } }
    obj.a.c["e"] = obj;
    assert.isUndefined(deepClone(obj).a.c.e)
    assert.deepEqual(deepClone(obj), { a: { b: 1, c: { d: 1 } } })
  })
})