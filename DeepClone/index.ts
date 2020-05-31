type targetType = string | number | boolean | symbol | object | Array<any>

// const ref = new WeakSet();

function deepClone(target: targetType, ref = new WeakSet()) {
  const baseData = ["string", "number", "boolean", "symbol", "undefined"]
  let newValue;

  if (baseData.includes(typeof target)) {
    newValue = target
  } else if (target instanceof Array) {
    const cach = []
    ref.add(target)
    for (let i = 0; i < target.length; i++) {
      if (ref.has(target[i])) continue;
      const item = target[i]
      cach.push(deepClone(item, ref))
    }
    newValue = cach
  } else if (target instanceof Object) {
    let cach = {}
    ref.add(target)
    const oKeys = Object.keys(target)
    for (let i = 0; i < oKeys.length; i++) {
      const key = oKeys[i]
      const value = target[key];
      if (ref.has(value)) continue;
      cach[key] = deepClone(value, ref)
    }
    newValue = cach
  }

  return newValue;
}

export default deepClone;
