const isObject = (obj) => obj !== null && typeof obj === "object";

const effectWeaksMap = new WeakMap();

//是否收集依赖
let isTrack = false;
// 当前执行effect的缓存
let currentEffect = null;

const track = (target, key) => {
  if (!isTrack) return;
  let effectDepsMap = effectWeaksMap.get(target);
  if (!effectDepsMap) {
    effectDepsMap = new Map();
    effectWeaksMap.set(target, effectDepsMap);
  }

  let dep = effectDepsMap.get(key);
  if (!dep) {
    dep = new Set();
    effectDepsMap.set(key, dep);
  }
  if (!dep.has(currentEffect)) {
    dep.add(currentEffect);
  }
};

const trigger = (target, key, value) => {
  let effectDepsMap = effectWeaksMap.get(target);
  if (!effectDepsMap) return;
  let dep = effectDepsMap.get(key);
  dep.forEach((el) => {
    el();
  });
};

const openTrack = () => {
  isTrack = true;
  currentEffect = null;
};
const closeTrack = () => {
  isTrack = false;
  currentEffect = null;
};

const baseHandle = {
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

export function reactive(target) {
  if (!isObject(target)) throw new Error("reactive 只接受Object类型");
  return new Proxy(target, baseHandle);
}
export function ref(val) {
  let _value = val;
  const _valueRef = {
    get value() {
      track(_valueRef, "value");
      return _value;
    },
    set value(newValue) {
      _value = newValue;
      trigger(_valueRef, "value");
    },
  };
  return _valueRef;
}
export const effect = (fn) => {
  openTrack();
  try {
    currentEffect = fn;
    fn();
  } finally {
    closeTrack();
  }
};
export const computer=(fn)=>{
    
}