const _bind = require("../index");

Function.prototype.bind2 = _bind;

function fn1() {
  return this;
}

console.assert(
  Object.prototype.toString.call(fn1.bind2) === "[object Function]"
);

console.assert(fn1.bind2({ a: 1 })().a === 1);

function fn2(p1, p2) {
  return { that: this.test, p1, p2 };
}
const test2 = fn2.bind2({ test: "测试" }, "dd1", "dd2");
console.assert(test2().that === "测试");
console.assert(test2().p1 === "dd1");
console.assert(test2().p2 === "dd2");

function fn3(p1, p2, p3, p4) {
  return { that: this.test, p1, p2, p3, p4 };
}
const test3 = fn3.bind2({ test: "测试" }, "dd1", "dd2");
console.assert(test3("p3", "p4").that === "测试");
console.assert(test3("p3", "p4").p1 === "dd1");
console.assert(test3("p3", "p4").p2 === "dd2");
console.assert(test3("p3", "p4").p3 === "p3");
console.assert(test3("p3", "p4").p4 === "p4");
