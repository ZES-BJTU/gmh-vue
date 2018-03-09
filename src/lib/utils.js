export default {
  install: function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
      // 逻辑...
    }

    // 2. 添加全局资源
    Vue.directive('my-directive', {
      bind(el, binding, vnode, oldVnode) {
        // 逻辑...
      }
    })

    // 3. 注入组件
    Vue.mixin({
      created: function () {
        // 逻辑...
      }
    })

    // 4. 添加实例方法
    Vue.prototype.setAccountSession = function (account, name, token) {
      sessionStorage.setItem("account", account);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("token", token);
    }
    Vue.prototype.getAccountSession = function () {
      return sessionStorage.getItem('account');
    }
    Vue.prototype.getNameSession = function () {
      return sessionStorage.getItem('name');
    }
    Vue.prototype.getTokenSession = function () {
      return sessionStorage.getItem('token');
    }
    Vue.prototype.clearAccountSession = function () {
      sessionStorage.removeItem("account");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("token");
    }
  }
}
