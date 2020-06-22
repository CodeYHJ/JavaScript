const regView = (Vue) => {
  Vue.component("router-view", {
    functional: true,
    render(createElement, { props, children, parent, data }) {
      const router = (parent.$router && parent.$router.routers) || [];
      const component = parent._route;
      if (!component) {
        return createElement();
      }
      return createElement(component);
    },
  });
};
