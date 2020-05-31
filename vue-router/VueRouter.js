class VueRouter {
  constructor() {
    window.addEventListener("hashchange", (el) => {
      console.log(el);
    });
  }
  init() {}
}
