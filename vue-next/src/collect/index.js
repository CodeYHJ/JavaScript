const effectWeaksMap = new WeakMap();
//是否收集依赖
let isTrack = false;
// 当前执行effect的缓存
let currentEffect = null;

export const track = (target, key) => {
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

export const trigger = (target, key,value) => {

  let effectDepsMap = effectWeaksMap.get(target);
  if (!effectDepsMap) return;
  let dep = effectDepsMap.get(key);
  dep.forEach((el) => {
    el();

  });
};

export const effect = (fn) => {
  openTrack();
  try {
    currentEffect = fn;
    fn();
  } finally {
    closeTrack();
  }
};

const openTrack = () => {
  isTrack = true;
  currentEffect = null;
};
const closeTrack = () => {
  isTrack = false;
  currentEffect = null;
};
