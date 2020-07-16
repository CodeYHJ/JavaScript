import { track, trigger } from "../collect/index.js";
export const baseHandle = {
  get(target, propertyKey, value) {
    // 依赖收集
    track(target, propertyKey);
    const res = Reflect.get(target, propertyKey, value);
    return res;
  },
  set(target, propertyKey, value, receiver) {
    // 值更新
    const result = Reflect.set(target, propertyKey, value, receiver);
    // 依赖触发
    trigger(target, propertyKey);

    return result;
  },
};
