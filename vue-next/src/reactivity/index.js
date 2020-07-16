import { isObject } from "../util.js";
import { baseHandle } from "./handle/index.js";

export function reactive(target) {
  if (!isObject(target)) throw new Error("reactive 只接受Object类型");
  return new Proxy(target, baseHandle);
}
