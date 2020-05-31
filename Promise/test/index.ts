import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
chai.use(sinonChai);
const assert = chai.assert;
import MyPromise from "../index";
import { promises } from "fs";

describe("promise测试", () => {
  it("promise是一个类", async () => {
    // const promise = new MyPromise();
    // assert.instanceOf(promise, MyPromise);
  });
  it("new Promise必需接收一个函数，否则报错", () => {
    assert.throw(() => {
      //   @ts-ignore
      new promises(false);
    });
    assert.throw(() => {
      //   @ts-ignore
      new promises("123");
    });
    assert.throw(() => {
      //   @ts-ignore
      new promises(false);
    });
  });

  it("new promise(fn)生成一个对象", () => {
    const promise = new MyPromise(() => {});
    assert.isObject(promise);
  });

  it("new promise(fn)中 fn是立即执行函数", () => {
    let fn = sinon.fake();
    new MyPromise(fn);
    assert(fn.called);
  });
  it("new promise(fn)中，fn接收两个函数，resolve、reject", (done) => {
    //   @ts-ignore
    new MyPromise((resolve, reject) => {
      assert.isFunction(resolve);
      assert.isFunction(reject);
      done();
    });
  });
  it("new promise(fn)有个then方法", () => {
    const promise = new MyPromise(() => {});
    assert.isFunction(promise.then);
  });
  it("new promise(fn).then(sucessFn)中的sucessFn会在resolve后被调用", (done) => {
    let sucessFn = sinon.fake();
    //   @ts-ignore
    const promise = new MyPromise((resolve, reject) => {
      assert.isFalse(sucessFn.called);
      resolve();
      setTimeout(() => {
        assert.isTrue(sucessFn.called);
        done();
      }, 0);
    });
    promise.then(sucessFn);
  });
  it("new promise(fn).then(sucessFn)中的failFn会在reject后被调用", (done) => {
    let failFn = sinon.fake();
    //   @ts-ignore
    const promise = new MyPromise((resolve, reject) => {
      assert.isFalse(failFn.called);
      reject();
      setTimeout(() => {
        assert.isTrue(failFn.called);
        done();
      }, 0);
    });
    promise.then(null, failFn);
  });
  it("2.2.1", () => {
    const promise = new MyPromise((resolve) => {
      resolve();
    });
    //   @ts-ignore
    promise.then(false, null);
  });
  it("2.2.2", (done) => {
    let sucessFn = sinon.fake();
    //   @ts-ignore
    const promise = new MyPromise((resolve, reject) => {
      assert.isFalse(sucessFn.called);
      resolve(123);
      resolve(234);

      setTimeout(() => {
        assert.isTrue(sucessFn.calledOnce);
        assert(sucessFn.calledWith(123));
        done();
      }, 0);
    });
    promise.then(sucessFn);
  });
  it("2.2.3", (done) => {
    let failFn = sinon.fake();
    //   @ts-ignore
    const promise = new MyPromise((resolve, reject) => {
      assert.isFalse(failFn.called);
      reject(123);
      reject(234);

      setTimeout(() => {
        assert.isTrue(failFn.calledOnce);
        assert(failFn.calledWith(123));
        done();
      }, 0);
    });
    promise.then(null, failFn);
  });
  it("2.2.4,代码未执行完，不能运行then", (done) => {
    let sucessFn = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      resolve();
    });
    promise.then(sucessFn);
    assert.isFalse(sucessFn.called);
    setTimeout(() => {
      assert.isTrue(sucessFn.called);
      done();
    }, 0);
  });
  it("2.2.4,代码未执行完且失败，不能运行then", (done) => {
    let failFn = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      reject();
    });
    promise.then(null, failFn);
    assert.isFalse(failFn.called);
    setTimeout(() => {
      assert.isTrue(failFn.called);
      done();
    }, 0);
  });
  it("2.2.5", (done) => {
    const promise = new MyPromise((resolve, reject) => {
      resolve();
    });
    promise.then(function () {
      "use strict";
      //   @ts-ignore
      assert(this === undefined);
      done();
    });
  });
  it("2.2.6 ,promise被resolve后，then可以被多次调用", (done) => {
    const promise = new MyPromise((resolve, reject) => {
      resolve();
    });
    const cbList = [sinon.fake(), sinon.fake(), sinon.fake()];
    promise.then(cbList[0]);
    promise.then(cbList[1]);
    promise.then(cbList[2]);
    setTimeout(() => {
      assert(cbList[0].called);
      assert(cbList[1].called);
      assert(cbList[2].called);
      assert(cbList[1].calledAfter(cbList[0]));
      assert(cbList[2].calledAfter(cbList[1]));
      done();
    }, 0);
  });
  it("2.2.6.2 ,promise被reject后，then可以被多次调用", (done) => {
    const promise = new MyPromise((resolve, reject) => {
      reject();
    });
    const cbList = [sinon.fake(), sinon.fake(), sinon.fake()];
    promise.then(null, cbList[0]);
    promise.then(null, cbList[1]);
    promise.then(null, cbList[2]);
    setTimeout(() => {
      assert(cbList[0].called);
      assert(cbList[1].called);
      assert(cbList[2].called);
      assert(cbList[1].calledAfter(cbList[0]));
      assert(cbList[2].calledAfter(cbList[1]));
      done();
    }, 0);
  });
  it("2.2.7,then返回一个新的promise", () => {
    const promise = new MyPromise((resolve, reject) => {
      reject();
    });
    const promise2 = promise.then(() => {});
    assert.instanceOf(promise2, MyPromise);
  });
  it("2.2.7.1 如果 then(onFulfilled,onRejected)中onFulfilled 或 onRejected 返回的是一个 x，那么它会以[[Resolve]](promise2, x) 处理解析", (done) => {
    const promise = new MyPromise((resolve, reject) => {
      resolve();
    });
    const promise2 = promise.then(() => {
      return "xxx";
    });
    promise2.then((result) => {
      assert.equal(result, "xxx");
      done();
    });
  });
  it("2.2.7.2 如果 x 是一个promise", (done) => {
    const fn = sinon.fake();
    const promise = new MyPromise((resolve, reject) => {
      resolve();
    });
    const promise2 = promise
      .then(() => {
        return new MyPromise((resolve) => {
          resolve();
        });
      })
      .then(fn);
    setTimeout(() => {
      assert.isTrue(fn.called);
      done();
    }, 10);
  });
});
