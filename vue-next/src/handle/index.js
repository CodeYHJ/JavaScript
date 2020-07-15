import {track,trigger}from '../collect/index.js'
export const baseHandle = {
  get(target, propertyKey, value) {
    // 依赖收集
    track(target,propertyKey)
    const res = Reflect.get(target, propertyKey, value);
    return res || true;
  },
  set(target, propertyKey, value) {
    // 依赖触发
    trigger(target,propertyKey)
    //如果不返回Boolean
    //Uncaught TypeError: 'set' on proxy: trap returned falsish for property 'a'
    return true;
  },
};
