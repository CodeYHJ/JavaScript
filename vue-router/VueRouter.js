class VueRouter {
  constructor(options) {
    if (!options)
      throw new Error("must be set options in new VueRouter(options)");
    if (!options.routers) throw new Error("must be set routers in options");
    if (!Array.isArray(options.routers)) throw new Error("routers must be Array");
    this.routers = options.routers;
    this.current = null
    window.addEventListener("hashchange", (el) => {
      console.log(el);
      console.log(this)
      this.app._route = this.routers[1]
    });
  }
  init(vueCompentInstance) {
    this.app = vueCompentInstance
  }
}
