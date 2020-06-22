class VueRouter {
  constructor(options) {
    if (!options)
      throw new Error("must be set options in new VueRouter(options)");
    if (!options.routers) throw new Error("must be set routers in options");
    if (!Array.isArray(options.routers)) throw new Error("routers must be Array");
    this.routers = options.routers;
    this.current = null
    this.comContain=[]
    window.addEventListener("hashchange", (el) => {
      const {newURL}=el
      const target = newURL.split('#')
      if(target.length>0){
        const t = target[1]
        if(t==='a'){
          this.update(this.routers[0])
        }else if(t==='b'){
          this.update(this.routers[1])
        }
        else if(t==='c'){
          this.update(this.routers[2])
        }
      }
    });
  }
  init(vueCompentInstance) {
    this.comContain.push(vueCompentInstance)
  }
  update(com){
    this.comContain.forEach(route=>{
      route._route=com
    })
  }
}
