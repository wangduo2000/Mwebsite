function Router() {
    this.routes = {}
    this.currentHash = ''
  }
  
  var noop = function () {}
  
  // 路由注册
  Router.prototype.route = function (hash, cb) {
    this.currentHash = hash
    this.routes[this.currentHash] = cb || noop
  }
  
  // 路由刷新
  Router.prototype.refresh = function () {
    let hash = location.hash || '#login'
    this.currentHash = hash
    this.routes[this.currentHash]()
    this.switchTabbar()
  }
  
  // tabbar switch
  Router.prototype.switchTabbar = function () {
    let hashs = ['#login','#resign']
    //let index = hashs.indexOf(this.currentHash) 
  }
  
  // 路由切换监听
  Router.prototype.init = function () {
    window.addEventListener('load', this.refresh.bind(this))
    window.addEventListener('hashchange', this.refresh.bind(this))
  }
  
  export default Router