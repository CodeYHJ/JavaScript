import * as chai from "chai";

import * as sinonChai from "sinon-chai";

chai.use(sinonChai);

const assert = chai.assert;

import EventHub from "../index";

describe("EventHub", () => {
  it("它是一个Map对象", () => {
    const eventhub = new EventHub();
    assert.isObject(eventhub);
  });
  it("它拥有一个emit函数", () => {
    const eventhub = new EventHub();
    assert.isFunction(eventhub.emit);
  });
  it("它拥有一个on函数", () => {
    const eventhub = new EventHub();
    assert.isFunction(eventhub.on);
  });
  it("on注册 -> edmit可以触发", () => {
    let callback = false;
    const eventhub = new EventHub();
    eventhub.on("注册", () => {
      callback = true;
      console.log("注册成功");
    });
    eventhub.emit("注册");
    assert.isTrue(callback);
  });
  it("on注册 -> edmit可以触发", () => {
    let callback = false;
    const eventhub = new EventHub();
    eventhub.on("注册", () => {
      callback = true;
      console.log("注册成功");
    });
    eventhub.emit("注册");
    assert.isTrue(callback);
  });
  it("emit接受参数", () => {
    let callback = false;
    const eventhub = new EventHub();
    eventhub.on("注册", (data) => {
      callback = true;
      console.log(data[0]);
      console.log(data[1]);
    });
    eventhub.emit("注册", ["传参成功1", "传参成功2"]);
    assert.isTrue(callback);
  });
  it("off取消订阅", () => {
    let callback = false;
    const eventhub = new EventHub();
    eventhub.on("注册", () => {
      callback = true;
      console.log("注册成功");
    });
    eventhub.off("注册");
    eventhub.emit("注册");
    assert.isFalse(callback);
  });
});
