const install = (Vue) => {
  // 在每个组件的指定生命周期内，处理你想处理的事情
  Vue.mixin({
    beforeCreate() {
      // 因为此defineReactive会进行依赖收集
      this._route = this.$parent
        ? this.$parent.$options.router
        : this.$options.router;
      this._route.init(this);
      Vue.util.defineReactive(this, "_route", this._route.current);
    },
  });

  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this.$options.router;
    },
  });
};
